const { db, getData, applyQuery } = require('./DB');
const mysql = require('mysql');

async function checkLikeExist(likeInfo) {
    const sql = 'SELECT * FROM likeInfo WHERE token = ? AND listId = ? AND songIndex = ?';
    const insert = [likeInfo.token, likeInfo.listId, likeInfo.songIndex];
    const query = mysql.format(sql, insert);
    const ret = await getData(query);
    console.log(Boolean(ret.length));
    return Boolean(ret.length);
}

async function addLikeInfo(likeInfo) {
    const sql = 'INSERT INTO likeInfo SET ?';
    const insert = {
        token: likeInfo.token,
        listId: likeInfo.listId,
        songIndex: likeInfo.songIndex,
    };
    const query = mysql.format(sql, insert);
    const ret = await applyQuery(query);
    return ret;
}

async function deleteLikeInfo(likeInfo) {
    const sql = 'DELETE FROM likeInfo WHERE token = ? AND listId = ? AND songIndex = ?';
    const insert = [likeInfo.token, likeInfo.listId, likeInfo.songIndex];
    const query = mysql.format(sql, insert);
    const ret = applyQuery(query);
}

async function getLikeList(songInfo) {
    const sql = 'SELECT u.userName, u.avatar, u.token FROM user u, likeInfo l \
                 WHERE l.listId = ? AND l.songIndex = ? AND l.token = u.token';
    const insert = [songInfo.listId, songInfo.songIndex];
    const query = mysql.format(sql, insert);
    const likeList = await getData(query);
    console.log(likeList);
    return likeList;
}

module.exports = {
    checkLikeExist,
    addLikeInfo,
    getLikeList,
};
