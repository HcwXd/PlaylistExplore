const db = require("./DB");
const mysql = require("mysql");

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
    let sql = "INSERT INTO song SET ?";
    let insertObject = {
        token: songListInfo.token,
        listId: songListInfo.listId,
        songIndex: singleSongInfo.songIndex,
        url: singleSongInfo.url,
        songName: singleSongInfo.songName,
        cover: singleSongInfo.cover,
        des: singleSongInfo.des,
        likeNum: singleSongInfo.likeNum
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

module.exports = {
    createSong: createSong,
    deleteSong: deleteSong,
    modifySong: modifySong,
    deleteSongInList: deleteSongInList,
}
