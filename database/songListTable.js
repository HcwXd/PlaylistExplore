const { db, getData, applyQuery } = require('./DB');
const mysql = require('mysql');
const songTable = require('./songTable');
const userTable = require('./userTable');

/* column in songListTable
 *
 * token
 * listId
 * name
 * des
 * date
 * cover
 */

async function createPlayList(playlistInfo) {
    const defaultCover = `https://img.youtube.com/vi/${playlistInfo.songList[0].url}/hqdefault.jpg`;
    const sql = 'INSERT INTO songList SET ?';
    const insert = {
        token: playlistInfo.token,
        name: playlistInfo.name,
        des: playlistInfo.des,
        date: playlistInfo.date,
        cover: playlistInfo.uploadCover || defaultCover,
    };
    const query = mysql.format(sql, insert);
    const ret = await applyQuery(query);

    /* add song to database */
    playlistInfo['listId'] = ret.insertId;
    await songTable.createMultipleSong(playlistInfo);
}

async function deletePlayList(playlistInfo) {
    const sql = 'DELETE FROM songList WHERE ?? = ? AND ?? = ?';
    const insert = ['token', playlistInfo.token, 'listId', playlistInfo.listId];
    const query = mysql.format(sql, insert);
    applyQuery(query);

    /* delete song in database */
    songTable.deleteSongInList(playlistInfo);
}

async function modifyPlayList(playlistInfo) {
    if (playlistInfo.listId == -1) {
        await createPlayList(playlistInfo);
        return;
    }
    await deletePlayList(playlistInfo);
    await createPlayList(playlistInfo);
}

async function getCompleteplaylistInfo(playlistInfo) {
    let sql = 'SELECT l.*, u.userName, u.avatar, u.bio \
               FROM songList l, user u \
               WHERE l.token = ? and l.listId = ? and l.token = u.token';
    let insert = [playlistInfo.token, playlistInfo.listId];
    let query = mysql.format(sql, insert);
    let songListData = await getData(query);

    if (songListData.length == 0) {
        console.log('no list');
    }

    sql = 'SELECT *  \
           FROM song \
           WHERE token = ? and listId = ? ';

    insert = [playlistInfo.token, playlistInfo.listId];
    query = mysql.format(sql, insert);
    const songData = await getData(query);

    songData.map((element) => {
        element['comments'] = [];
    });
    ret = makeLatestPlayLists(songListData, songData);
    return ret[0];
}

function makeLatestPlayLists(songListData, songData) {
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
                uploadCover: songList.cover,
            },
        });

        for (index = global_index; index < songData.length; index++) {
            if (songData[index].listId === songList.listId && songData[index].token === songList.token) {
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

function min(a, b) {
    return a < b ? a : b;
}

async function getPageSongList(limitNum, date, token, friends) {
    let sql, query;
    if (friends) {
        sql =
            'SELECT s.*, u.userName, u.avatar from songList s, user u \
               WHERE s.token in (SELECT followToken FROM relation WHERE token = ?) \
               AND s.token = u.token AND s.date < ? \
               ORDER BY date DESC LIMIT ?';
        query = mysql.format(sql, [token, date, limitNum]);
    } else if (token) {
        sql =
            'SELECT s.* ,u.userName, u.avatar FROM songList s, user u \
               where s.token = u.token \
               AND u.token NOT IN (SELECT followToken FROM relation WHERE token = ?) \
               AND s.date < ? \
               ORDER BY s.date DESC LIMIT ?';
        query = mysql.format(sql, [token, date, limitNum]);
    } else {
        sql = 'SELECT s.* ,u.userName, u.avatar FROM songList s, user u \
               where s.token = u.token AND s.date < ? \
               ORDER BY s.date DESC LIMIT ?';
        query = mysql.format(sql, [date, limitNum]);
    }

    return await getData(query);
}

async function getPageSongData(limitNum, songListData) {
    let sql = '';
    for (index = 0; index < min(songListData.length - 1, limitNum - 1); index++) {
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
    });
    let query = mysql.format(sql, insert);
    return await getData(query);
}

async function getLatestPlaylists(limitNum, date, token, friends) {
    const songListData = await getPageSongList(limitNum, date, token, friends);
    if (songListData.length == 0) return [];

    const songData = await getPageSongData(limitNum, songListData);
    return makeLatestPlayLists(songListData, songData);
}

async function getOwnerHistory(token) {
    const sql = 'SELECT * FROM songList WHERE token = ? ORDER BY date DESC';
    const insert = [token];
    const query = mysql.format(sql, insert);
    const ownerHistory = await getData(query);
    return ownerHistory;
}

module.exports = {
    createPlayList,
    deletePlayList,
    modifyPlayList,
    getCompleteplaylistInfo,
    getLatestPlaylists,
    makeLatestPlayLists,
    getOwnerHistory,
};
