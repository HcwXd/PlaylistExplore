const db = require("./DB");
const mysql = require("mysql");
const songTable = require('./songTable')
const userTable = require('./userTable')

/*
    PRIMARY KEY
    token
    listID

    name
    des
    date
*/

function applyQuery(query) {
    db.query(query, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(result);
    })
}

function getData(query) {
    return new Promise((resolve, reject) => {
        try {
            console.log(query);
            db.query(query, (error, result) => {
                resolve(result);
            })
        } catch (error) {
            console.log(error);
        }
    })
}

function createPlayList(playListInfo) {
    let sql = "INSERT INTO songList SET ?";
    let insertObject = {
        token: playListInfo.token,
        listId: playListInfo.listId,
        name: playListInfo.name,
        des: playListInfo.des,
        date: playListInfo.date
    }
    let query = mysql.format(sql, insertObject);
    applyQuery(query);

    /* add song to database */
    playListInfo.songList.map((element, index) => {
        element['songIndex'] = index;
        songTable.createSong(insertObject, element);
    })
}

function deletePlayList(playListInfo) {
    let sql = "DELETE FROM songList WHERE ?? = ? AND ?? = ?";
    let condition = [
        'token', playListInfo.token,
        'listId', playListInfo.listId,
    ]
    let query = mysql.format(sql, condition);
    console.log(query);
    applyQuery(query);

    /* delete song in database */
    songTable.deleteSongInList(playListInfo);
}

async function modifyPlayList(playListInfo) {
    await deletePlayList(playListInfo);
    createPlayList(playListInfo);
}

async function getSongArrayInfo(playListInfo) {
    sql = 'SELECT * FROM song WHERE token = ?';
    insert = [playListInfo.token];
    query = mysql.format(sql, insert);
    return await getData(query);

}

async function getCommentInfo(songInfo){
    sql = "SELECT * FROM comment WHERE listOwnerToken = ? AND songIndex = ? ORDER BY commentIndex";
    insert = [songInfo.token, songInfo.songIndex];
    query = mysql.format(sql, insert);
    result = await getData(query);
    console.log(result);
    return result;
}

async function getCompletePlayList(songListResult) {
    let songList = [];
    songListResult.map(async (element) => {
        console.log(element);
        let commentResult = await getCommentInfo(element);
        songList[element.songIndex] = {
            url: element.url,
            songName: element.songName,
            cover: element.cover,
            des: element.des,
            like: element.likeNum,
            comment: commentResult,
        };
        console.log(songList);
    })
    return songList;
}

async function getCompletePlayListInfo(playListInfo) {

    let playListMeta = await getPlayList(playListInfo);
    songListResult = await getSongArrayInfo(playListInfo);
    let songList = await getCompletePlayList(songListResult);
    let userInfo = await userTable.getUserInfo(playListInfo.token);
    let completePlayListInfo = {
        userName: userInfo.userName,
        avatar: userInfo.avatar,
        bio: userInfo.bio,
        playlistInfo: {
            songList: songList,
            name: playListMeta.name,
            des: playListMeta.des,
            date: playListMeta.date,
            token: playListInfo.token,
            listId: playListInfo.listId
        }
    };
    console.log(completePlayListInfo);
    return completePlayListInfo;
}

async function getPlayList(playListInfo) {
    sql = 'SELECT * FROM songList WHERE token = ?';
    insert = [playListInfo.token];
    query = mysql.format(sql, insert);
    result = await getData(query);
    return result[0];
}

playListInfo = {
    token: '2159235527438018',
    listId: 1
}
/* test
    getCompletePlayListInfo(playListInfo);
*/


module.exports = {
    createPlayList: createPlayList,
    deletePlayList: deletePlayList,
    modifyPlayList: modifyPlayList,
    getCompletePlayListInfo: getCompletePlayListInfo
}
