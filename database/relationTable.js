const db = require("./DB");
const mysql = require("mysql");
const { map } = require('p-iteration');
const userTable = require('./userTable');
const songListTable = require('./songListTable');
/*
    Primary Key
    token
    followToken
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

async function createRelation(token, followToken){
    let sql = 'INSERT relation SET ?';
    let insert = {
        token,
        followToken
    }
    let query = mysql.format(sql, insert);
    applyQuery(query);
}

function min(a, b){
    return a < b ? a : b ;
}

async function getFriendsLatest(token, limitNum){
    let sql = 'SELECT s.*, u.userName, u.avatar from songList s, user u \
               WHERE s.token in (SELECT followToken FROM relation WHERE token = ?) \
               AND s.token = u.token \
               ORDER BY date DESC LIMIT ?';
    let insert = [token, limitNum];
    let query = mysql.format(sql, insert);
    let songListData = await getData(query);
    console.log(songListData);
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
    insert = [];
    songListData.map((element) => {
        insert.push(element.token);
        insert.push(element.listId);
    })
    query = mysql.format(sql, insert);
    //console.log(query);
    songData = await getData(query);
    //console.log(songData);
    result = songListTable.makeLatestPlayLists(songListData, songData);
    console.log(result);
}

//getFriendsLatest('B04703002', 5);
//createRelation('B04703002', 'B04703004');

module.exports = {
    createRelation,
    getFriendsLatest
}
