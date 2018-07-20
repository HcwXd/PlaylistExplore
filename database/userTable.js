const { db, getData, applyQuery } = require('./DB');
const mysql = require('mysql');

function createAccount(userData) {
    const sql = 'INSERT INTO user SET ?';
    const insert = userData;
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

async function userExist(token) {
    const sql = 'SELECT token FROM user WHERE token =  ?';
    const insert = [token];
    const query = mysql.format(sql, insert);
    const ret = await getData(query);
    return Boolean(ret.length);
}

async function getUserInfo(token) {
    const sql = 'SELECT userName, token, avatar, bio FROM user WHERE token = ?';
    const query = mysql.format(sql, token);
    const userInfo = await getData(query);
    console.log(userInfo);
    return userInfo[0];
}

async function updateBio(bioInfo) {
    const sql = 'UPDATE user SET ? WHERE token = ?';
    const insert = [{ bio: bioInfo.content }, bioInfo.token];
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

async function confirmUser(userInfo) {
    const sql = 'SELECT password from user where token = ?';
    const insert = [userInfo.account];
    const query = mysql.format(sql, insert);
    const result = await getData(query);
    if (result[0].password == userInfo.password) {
        console.log('sign in success');
        return true;
    }

    return false;
}

async function getUserList() {
    const query = 'SELECT userName, token, avatar FROM user';
    const ret = await getData(query);
    return ret;
}

module.exports = {
    userExist,
    createAccount,
    getUserInfo,
    updateBio,
    confirmUser,
    getUserList,
};
