const { db, getData, applyQuery } = require('./DB');
const mysql = require('mysql');
const songTable = require('./songTable')
const userTable = require('./userTable')

/* column in songListTable
 *
 * token
 * listId
 * name
 * des
 * date
 * cover
 */

function createPlayList(playlistInfo) {
    const sql = 'INSERT INTO songList SET ?';
    const insert = {
        token: playlistInfo.token,
        listId: playlistInfo.listId,
        name: playlistInfo.name,
        des: playlistInfo.des,
        date: playlistInfo.date,
        cover: playlistInfo.uploadCover
    }
    const query = mysql.format(sql, insert);
    applyQuery(query);

    /* add song to database */
    songTable.createMultipleSong(playlistInfo);
}

function deletePlayList(playlistInfo) {
    const sql = 'DELETE FROM songList WHERE ?? = ? AND ?? = ?';
    const insert = [
        'token', playlistInfo.token,
        'listId', playlistInfo.listId,
    ]
    const query = mysql.format(sql, insert);
    applyQuery(query);

    /* delete song in database */
    songTable.deleteSongInList(playlistInfo);
}

async function modifyPlayList(playlistInfo) {
    await deletePlayList(playlistInfo);
    createPlayList(playlistInfo);
}

async function getCompleteplaylistInfo(playlistInfo){
    let sql = 'SELECT l.*, u.userName, u.avatar, u.bio \
               FROM songList l, user u \
               WHERE l.token = ? and l.listId = ? and l.token = u.token';
    let insert = [playlistInfo.token, playlistInfo.listId];
    let query = mysql.format(sql, insert);
    let songListData = await getData(query);

    if(songListData.length == 0){
        console.log('no list');
        const userInfo = await userTable.getUserInfo(playlistInfo.token);
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

    insert = [playlistInfo.token, playlistInfo.listId];
    query = mysql.format(sql, insert);
    const songData = await getData(query);

    songData.map(element => {element['comments'] = []});
    ret = makeLatestPlayLists(songListData, songData);
    return ret[0];
}

function makeLatestPlayLists(songListData, songData){
    let latestSongPlaylists = [];
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
        });

        for(index = global_index; index < songData.length; index++){
            if(songData[index].listId === songList.listId
               && songData[index].token === songList.token){
               songData[index]['like'] = songData[index].likeNum;
               latestSongPlaylists[listIndex].playlistInfo.songList.push(songData[index]);
               continue;
            }

            global_index = index;
            break;
        }
    });

    return latestSongPlaylists;
}

function min(a, b){
    return a < b ? a : b ;
}

async function getLatestPlaylists(limitNum){
    let sql = 'SELECT s.* ,u.userName, u.avatar FROM songList s, user u \
               where s.token = u.token \
               ORDER BY s.date DESC LIMIT ?';
    let query = mysql.format(sql, [limitNum]);
    const songListData = await getData(query);
    if(songListData.length == 0)
        return [];

    sql = '';
    for(index = 0 ; index < min(songListData.length - 1, limitNum-1) ; index++){
        sql += 'SELECT *  \
                FROM song \
                WHERE token = ? and listId = ?  \
                Union ';
    }
    sql += 'SELECT *  \
            FROM song \
            WHERE token = ? and listId = ? ';

    /* get whole song list */
    let insert = [];
    songListData.map((element) => {
        insert.push(element.token);
        insert.push(element.listId);
    })
    query = mysql.format(sql, insert);
    const songData = await getData(query);

    return makeLatestPlayLists(songListData, songData);
}

module.exports = {
    createPlayList,
    deletePlayList,
    modifyPlayList,
    getCompleteplaylistInfo,
    getLatestPlaylists,
    makeLatestPlayLists,
};
