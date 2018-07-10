const db = require("./DB");
const mysql = require("mysql");
const { map } = require('p-iteration');
const userTable = require('./userTable');
/*
    Primary Key
    token
    listId
    songIndex

    url
    songName
    cover
    des
    likeNum
*/

function getData(query) {
    return new Promise((resolve, reject) => {
        try {
            console.log(query);
            db.query(query, (error, result) => {
                if(error)
                    console.log(error);
                resolve(result);
            })
        } catch (error) {
            console.log(error);
        }
    })
}

function applyQuery(query){
    db.query(query, (error, result) => {
        if(error){
            console.log(error);
            return;
        }
        console.log(result);
    })
}

function createSong(songListInfo, singleSongInfo){
    console.log('create song');
    console.log(singleSongInfo);
    let sql = "INSERT INTO song SET ?";
    let insertObject = {
        token: songListInfo.token,
        listId: songListInfo.listId,
        songIndex: singleSongInfo.songIndex,
        url: singleSongInfo.url,
        songName: singleSongInfo.songName,
        cover: singleSongInfo.cover,
        des: singleSongInfo.des || ' ',
        likeNum: singleSongInfo.like
    }
    let query = mysql.format(sql, insertObject);
    applyQuery(query);
}

function deleteSongInList(songListInfo){
    let sql = "DELETE FROM song WHERE ?? = ? AND ?? = ?";
    let condition = [
        'token', songListInfo.token,
        'listId', songListInfo.listId
    ]
    let query = mysql.format(sql, condition);
    applyQuery(query);

/* delete comment when song list delete */
    sql = "DELETE FROM comment WHERE ??=? and ?? = ?";
    insert = [
        'listOwnerToken', songListInfo.token,
        'listId', songListInfo.listId
    ]
    query = mysql.format(sql, insert);
    applyQuery(query);
}

function deleteSong(singleSongInfo){
    let sql = "DELETE FROM song WHERE ?? = ? AND ?? = ? AND ?? = ?";
    let condition = [
        'token', singleSongInfo.token,
        'listId', singleSongInfo.id,
        'songIndex', singleSongInfo.songIndex
    ]
    let query = mysql.format(sql, condition);
    applyQuery(query);
}

function modifySong(singleSongInfo){
    let sql = "UPDATE songList SET ? WHERE ?? = ? and ?? = ? and ?? = ?";
    let setValue = {
        url: singleSongInfo.url,
        songName: singleSongInfo.songName,
        cover: singleSongInfo.cover,
        des: singleSongInfo.des,
        likeNum: singleSongInfo.likeNum
    }
    let insert = [
        setValue,
        'token', singleSongInfo.token ,
        'listId', singleSongInfo.listId,
        'songIndex', singleSongInfo.songIndex
    ];
    let query = mysql.format(sql, insert);
    applyQuery(query);
}

async function updateLike(songInfo){
    sql = 'UPDATE song SET likeNum = likeNum + 1 WHERE token = ? AND listId = ? AND songIndex = ?';
    insert = [songInfo.listOwnerToken, songInfo.listId, songInfo.songIndex];
    query = mysql.format(sql, insert);
    result = getData(query);
    console.log(result);
}

async function getCommentInfo(songInfo) {
    console.log(songInfo);
    sql = "SELECT c.* ,u.userName, u.avatar \
           FROM comment c, user u \
           WHERE c.listOwnerToken = ? AND c.songIndex = ? AND c.commentToken = u.token AND c.listId = ? \
           ORDER BY c.commentIndex";
    insert = [songInfo.token, songInfo.songIndex, songInfo.listId];
    query = mysql.format(sql, insert);
    result = await getData(query);
    let commentInfoArray = [];
    result.map((element, index) => {
        commentInfoArray[index] = {
            userName: element.userName,
            avatar: element.avatar,
            commentIndex: element.commentIndex,
            content: element.commentContent
        }
    });
    console.log(commentInfoArray);
    return commentInfoArray;
}

/* test
songInfo = {
    token: '1813929758691464',
    url: 'https://www.youtube.com/watch?v=Omv3OFcocNM',
    songIndex: 0
}
getCommentInfo(songInfo);
*/




/* test
songInfo = {
    like: 88,
    token: '1813929758691464',
    listId: 1,
    songIndex: 1
}

updateLike(songInfo);
*/

module.exports = {
    createSong: createSong,
    deleteSong: deleteSong,
    modifySong: modifySong,
    deleteSongInList: deleteSongInList,
    updateLike: updateLike,
    getCommentInfo: getCommentInfo
}
