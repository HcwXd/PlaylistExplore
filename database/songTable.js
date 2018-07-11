const { db, getData, applyQuery } = require('./DB');
const mysql = require('mysql');
const { map } = require('p-iteration');
const userTable = require('./userTable');

function createSong(songListInfo, singleSongInfo){
    const sql = 'INSERT INTO song SET ?';
    const insertObject = {
        token: songListInfo.token,
        listId: songListInfo.listId,
        songIndex: singleSongInfo.songIndex,
        url: singleSongInfo.url,
        songName: singleSongInfo.songName,
        cover: singleSongInfo.cover,
        des: singleSongInfo.des || ' ',
        likeNum: singleSongInfo.like
    }
    const query = mysql.format(sql, insertObject);
    applyQuery(query);
}

function createMultipleSong(playlistInfo){
    const sql = 'INSERT INTO song \
               (token, listId, songIndex, url, songName, cover, des, likeNum) \
               VALUES ?';
    const token = playlistInfo.token;
    const listId = playlistInfo.listId;
    let insert = [];
    playlistInfo.songList.map( (song, index) => {
        insert.push([
            token, listId, index, song.url, song.songName, song.cover, song.des || ' ', song.like,
        ]);
    });
    const query = mysql.format(sql, [insert]);
    applyQuery(query);
}

function deleteSongInList(songListInfo){
    let sql = 'DELETE FROM song WHERE ?? = ? AND ?? = ?';
    let insert = [
        'token', songListInfo.token,
        'listId', songListInfo.listId,
    ];
    let query = mysql.format(sql, insert);
    applyQuery(query);

    /* delete comment when song list delete */
    sql = 'DELETE FROM comment WHERE ?? = ? and ?? = ?';
    insert = [
        'listOwnerToken', songListInfo.token,
        'listId', songListInfo.listId,
    ];
    query = mysql.format(sql, insert);
    applyQuery(query);
}

async function updateLike(songInfo){
    const sql = 'UPDATE song SET likeNum = likeNum + 1 WHERE token = ? AND listId = ? AND songIndex = ?';
    const insert = [songInfo.listOwnerToken, songInfo.listId, songInfo.songIndex];
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

async function getCommentInfo(songInfo) {
    const sql = 'SELECT c.* ,u.userName, u.avatar \
           FROM comment c, user u \
           WHERE c.listOwnerToken = ? AND c.songIndex = ? AND c.commentToken = u.token AND c.listId = ? \
           ORDER BY c.commentIndex';
    const insert = [songInfo.token, songInfo.songIndex, songInfo.listId];
    const query = mysql.format(sql, insert);
    const result = await getData(query);

    let commentInfoArray = [];
    result.map((element) => {
        element['content'] = element.commentContent;
        commentInfoArray.push(element);
    });
    return commentInfoArray;
}

module.exports = {
    createSong,
    deleteSongInList,
    updateLike,
    getCommentInfo,
    createMultipleSong,
}
