const mysql = require('mysql');
const config = require('./config');
const con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});

const db = con;
con.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('connection success');
});

function getData(query) {
    return new Promise((resolve, reject) => {
        try {
            db.query(query, (error, result) => {
                console.log(query);
                if (error) console.log(error);
                console.log(result);
                resolve(result);
            });
        } catch (error) {
            console.log(error);
        }
    });
}

function applyQuery(query) {
    return new Promise((resolve, reject) => {
        try {
            db.query(query, (error, result) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(query);
                console.log(result);
                resolve(result);
            });
        } catch (error) {
            console.log(error);
        }
    });
}

function multipleGetData(queryArray) {
    return Promise.all(queryArray);
}

module.exports = {
    applyQuery,
    getData,
    multipleGetData,
    db,
};
