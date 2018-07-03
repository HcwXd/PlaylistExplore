const db = require("./DB");
const mysql = require("mysql");
const songTable = require('./songTable')

/*
    PRIMARY KEY
    token
    listID

    name
    des
    date
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

function createPlayList(playListInfo){
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

function deletePlayList(playListInfo){
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

async function modifyPlayList(playListInfo){
    await deletePlayList(playListInfo);
    createPlayList(playListInfo);
}

module.exports = {
    createPlayList: createPlayList,
    deletePlayList: deletePlayList,
    modifyPlayList: modifyPlayList,
}
