const mysql = require("mysql");
const config = require("./config")
const con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
})

con.connect((error) => {
    if (error) {
        console.log('connection error');
        return;
    }
    console.log('connection success');
});

module.exports = con;