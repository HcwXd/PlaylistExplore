const db = require("./DB");
const mysql = require("mysql");
const songTable = require('./songTable')
const userTable = require('./userTable')
const { map } = require('p-iteration');


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
            //console.log(query);
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

function createPlayList(playListInfo) {
    let sql = "INSERT INTO songList SET ?";
    let insertObject = {
        token: playListInfo.token,
        listId: playListInfo.listId,
        name: playListInfo.name,
        des: playListInfo.des,
        date: playListInfo.date,
        cover: playListInfo.uploadCover
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



async function getCompletePlayListInfo(playListInfo){

    sql = 'SELECT l.*, u.userName, u.avatar, u.bio \
           FROM songList l, user u \
           WHERE l.token = ? and l.listId = ? and l.token = u.token';
    insert = [playListInfo.token, playListInfo.listId];
    query = mysql.format(sql, insert);
    songListData = await getData(query);
    console.log("getCompletePlayListInfo");
    console.log(songListData);
    if(songListData.length == 0){
        console.log("no list");
        userInfo = await userTable.getUserInfo(playListInfo.token);
        console.log(userInfo);
        return {
            userName: userInfo.userName,
            avatar: userInfo.avatar,
            bio: userInfo.bio,
            playlistInfo: {
                songList: [],
                name: '',
                des: '',
                date: '',
                token: '',
                listId: '',
                uploadCover: ''
            }
        }
    }

    sql = 'SELECT *  \
            FROM song \
            WHERE token = ? and listId = ? ';
    insert = [playListInfo.token, playListInfo.listId];
    query = mysql.format(sql, insert);
    //console.log(query);
    songData = await getData(query);
    //console.log(songData);
    songData.map(element => {element['comments'] = []});
    songData[0]['comments'] = await songTable.getCommentInfo(songData[0]);

    result = makeLatestPlayLists(songListData, songData);
    return result[0];
}


playListInfo = {
    token: '2159235527438018',
    listId: 1
}

function makeLatestPlayLists(songListData, songData){
    console.log("enter");
    latestSongPlaylists = [];
    let global_index = 0;
    songListData.map((songList, listIndex) => {

        latestSongPlaylists.push({
            userName: songList.userName,
            avatar: songList.avatar,
            bio: songList.bio,
            playlistInfo: {
                songList: [],
                name: songList.name,
                des: songList.des,
                date: songList.date,
                token: songList.token,
                listId: songList.listId,
                uploadCover: songList.cover
            }
        })
        for(index = global_index; index < songData.length; index++){
            if(songData[index].listId == songList.listId &&
               songData[index].token == songList.token){
                   songData[index]['like'] = songData[index].likeNum;
                   latestSongPlaylists[listIndex].playlistInfo.songList.push(songData[index]);
               }
               else{
                   global_index = index;
                   break;
               }
        }
    })
    return (latestSongPlaylists);
}

async function getLatestPlaylists(limitNum){
    sql = 'SELECT s.* ,u.userName, u.avatar FROM songList s, user u \
           where s.token = u.token \
           ORDER BY s.date DESC LIMIT ?';
    query = mysql.format(sql, [limitNum]);
    songListData = await getData(query);
    //console.log(songListData);
    sql = '';
    for(index = 0 ; index < limitNum-1 ; index++){
        sql += 'SELECT *  \
               FROM song \
               WHERE token = ? and listId = ?  \
               Union ';
    }
    sql += 'SELECT *  \
            FROM song \
            WHERE token = ? and listId = ? ';
    /* get whole song list */
    insert = [];
    songListData.map((element) => {
        insert.push(element.token);
        insert.push(element.listId);
    })
    query = mysql.format(sql, insert);
    //console.log(query);
    songData = await getData(query);
    //console.log(songData);
    return makeLatestPlayLists(songListData, songData);
}


/* test
    playListInfo = {
        token: '2159235527438018',
        listId: 1
    }
    getCompletePlayListInfo_(playListInfo);
*/
    //getLatestPlaylists();

module.exports = {
    createPlayList: createPlayList,
    deletePlayList: deletePlayList,
    modifyPlayList: modifyPlayList,
    getCompletePlayListInfo: getCompletePlayListInfo,
    getLatestPlaylists: getLatestPlaylists
}
