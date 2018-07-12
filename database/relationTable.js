const { db, getData, applyQuery } = require('./DB');
const mysql = require('mysql');
const userTable = require('./userTable');
const songListTable = require('./songListTable');

async function createRelation(token, followToken){
    const sql = 'INSERT relation SET ?';
    const insert = {
        token,
        followToken,
    }
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

async function deleteRelation(token, followToken){
    const sql = 'DELETE FROM relation WHERE token = ? AND followToken = ?';
    const insert = [token, followToken];
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

function min(a, b){
    return a < b ? a : b ;
}

async function getFriendsLatest(token, limitNum){
    /* get friends' latest songlist infomation */
    let sql = 'SELECT s.*, u.userName, u.avatar from songList s, user u \
               WHERE s.token in (SELECT followToken FROM relation WHERE token = ?) \
               AND s.token = u.token \
               ORDER BY date DESC LIMIT ?';
    let insert = [token, limitNum];
    let query = mysql.format(sql, insert);
    const songListData = await getData(query);

    if(songListData.length == 0)
        return [];

    /* get the song batch in the list we get */
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
    insert = [];
    songListData.map((element) => {
        insert.push(element.token);
        insert.push(element.listId);
    });

    query = mysql.format(sql, insert);
    const songData = await getData(query);

    /* merge the songlist and song information */
    result = songListTable.makeLatestPlayLists(songListData, songData);
}

module.exports = {
    createRelation,
    getFriendsLatest,
    deleteRelation,
}
