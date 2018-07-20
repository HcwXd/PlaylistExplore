const { db, getData, applyQuery } = require('./DB');
const mysql = require('mysql');
const userTable = require('./userTable');
const songListTable = require('./songListTable');

async function createRelation(token, followToken) {
    const sql = 'INSERT relation SET ?';
    const insert = {
        token,
        followToken,
    };
    const query = mysql.format(sql, insert);
    return await applyQuery(query);
}

async function deleteRelation(token, followToken) {
    const sql = 'DELETE FROM relation WHERE token = ? AND followToken = ?';
    const insert = [token, followToken];
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

async function isFriend(token, followToken) {
    const sql = 'SELECT * from relation WHERE token = ? AND followToken = ?';
    const insert = [token, followToken];
    const query = mysql.format(sql, insert);
    const result = await getData(query);
    return Boolean(result.length);
}

async function getRelationId(token, followToken) {
    const sql = 'SELECT id from relation WHERE token = ? AND followToken = ?';
    const insert = [token, followToken];
    const query = mysql.format(sql, insert);
    const ret = await getData(query);
    return ret[0].id;
}

module.exports = {
    createRelation,
    deleteRelation,
    isFriend,
    getRelationId,
};
