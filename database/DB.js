const mysql = require('mysql');
const config = require('./config')
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
            console.log(query);
            db.query(query, (error, result) => {
                if(error)
                    console.log(error);
                console.log(result);
                resolve(result);
            });
        } catch (error) {
            console.log(error);
        }
    });
}

function applyQuery(query){
    db.query(query, (error, result) => {
        if(error){
            console.log(error);
            return;
        }
        console.log(result);
    });
}

module.exports = {
    applyQuery,
    getData,
    db,
};
