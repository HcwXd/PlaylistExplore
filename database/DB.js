const mysql = require('mysql');
const config = require('./config');
const MysqlCache = require('mysql-cache')

const con = new MysqlCache({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    cacheProvider:   'LRU',
    typeCast: function castField(field, useDefaultTypeCasting) {
        if (field.type === 'BIT' && field.length === 1) {
            var bytes = field.buffer();
            return bytes[0] === 1;
        }
        return useDefaultTypeCasting();
    },
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
            db.query(query, (error, result, cache) => {
                /* console.log cache */
                console.log(cache.hash + ' is the cache key')
                console.log(cache.sql + ' was the sql generated and run (if not cached)')
                console.log(cache.isCache + ' boolean if the result was from cache or not')
                
                console.log(query);
                if (error) console.log(error);
                //console.log(result);
                console.log('success');
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
                console.log(query);
                if (error) {
                    console.log(error);
                    return;
                }
                console.log('success');
                //console.log(result);
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
