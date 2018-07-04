const db = require("./DB");
const mysql = require("mysql");



function createAccount(userData) {
    db.query('INSERT INTO user SET ?', userData, (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result);
    });
}

function getData(query){
    return new Promise((resolve, reject) => {
        try{
            console.log(query);
            db.query(query, (error, result) => {
                resolve(result);
            })
        }
        catch(error){
            console.log(error);
        }
    })
}

async function userExist(token) {
    queryString = "SELECT 1 FROM user WHERE EXISTS (SELECT 1 FROM user WHERE token = " +
        token + ") ORDER BY token LIMIT 1;"
    let ret = await getData(queryString);
    console.log(ret);
    return Boolean(ret.length);
}

async function getUserInfo(token){
    let sql = 'SELECT * FROM user WHERE token = ?';
    let query = mysql.format(sql, token);
    let userInfo = await getData(query);
    return userInfo[0];
}

module.exports = {
    userExist: userExist,
    createAccount: createAccount,
    getUserInfo: getUserInfo
}
