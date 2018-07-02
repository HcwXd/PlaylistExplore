const db = require("./DB");

async function userExist(token) {
    queryString = "SELECT 1 FROM user WHERE EXISTS (SELECT 1 FROM user WHERE token = " +
        token + ") ORDER BY token LIMIT 1;"
    var ret = null;
    await db.query(queryString, (error, result) => {
        if (error){
            console.log(error);
        }
        ret = Boolean(result.length);
    })
    return ret;
}

function createAccount(userData) {
    db.query('INSERT INTO user SET ?', userData, (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result);
    });
}
module.exports = {
    userExist: userExist,
    createAccount: createAccount
}
