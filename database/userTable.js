const db = require("./DB");
const mysql = require("mysql");

function applyQuery(query){
    db.query(query, (error, result) => {
        if(error){
            console.log(error);
            return;
        }
        console.log(result);
    })
}


function createAccount(userData) {
    db.query('INSERT INTO user SET ?', userData, (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(`Create ${userData.userName} successfully`);
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
    sql = "SELECT token FROM user WHERE token =  ?";
    insert = [token];
    query = mysql.format(sql, insert);
    let ret = await getData(query);
    console.log("In userExist");
    console.log(ret.length);
    console.log(Boolean(ret.length));
    return Boolean(ret.length);
}

async function getUserInfo(token){
    let sql = 'SELECT * FROM user WHERE token = ?';
    let query = mysql.format(sql, token);
    let userInfo = await getData(query);
    console.log(userInfo);
    return userInfo[0];
}

async function updateBio(bioInfo){
    let sql = 'UPDATE user SET ? WHERE token = ?';
    let insert = [{bio: bioInfo.content}, bioInfo.token];
    let query = mysql.format(sql, insert);
    applyQuery(query);
}

async function confirmUser(userInfo){
    console.log(userInfo);
    let sql = "SELECT password from user where token = ?";
    let insert = [userInfo.account];
    let query = mysql.format(sql, insert);
    let result = await getData(query);
    console.log(result);
    if(result[0].password == userInfo.password){
        console.log("sign in success");
        return true;
    }
    else {
        return false;
    }
}



module.exports = {
    userExist: userExist,
    createAccount: createAccount,
    getUserInfo: getUserInfo,
    updateBio: updateBio,
    confirmUser: confirmUser
}
