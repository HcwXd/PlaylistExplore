const { db, getData, applyQuery, multipleGetData } = require('./DB');
const mysql = require('mysql');
/*
id
| type
| isRead
| receiverToken
| triggerToken
| referenceIndex
| date
*/

async function insertNotification(notificationInfo) {
    notificationInfo['date'] = new Date();
    notificationInfo['isRead'] = 0;
    const sql = 'INSERT INTO notification SET ?';
    const insert = notificationInfo;
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

async function deleteNotification(deletionInfo) {
    const { type, referenceIndex } = deletionInfo;
    const sql = 'DELETE FROM notification WHERE type = ? AND referenceIndex = ?';
    const insert = [type, referenceIndex];
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

async function tagRead(notificationInfo) {
    const { isRead, type, referenceIndex } = notificationInfo;
    const sql = 'UPDATE notification SET isRead = ? WHERE type = ? AND referenceIndex = ?';
    const insert = [isRead, type, referenceIndex];
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

async function getLatestNotificationMeta(receiverToken, date) {
    const sql = 'SELECT * FROM notification WHERE receiverToken = ? AND date < ? \
                 ORDER BY date';
    const insert = [receiverToken, date];
    const query = mysql.format(sql, insert);
    const notificationList = await getData(query);
    return notificationList;
}

function unionQuery(query, table, columnName, id) {
    let sql = 'SELECT * FROM ?? WHERE ?? = ?';
    const insert = [table, columnName, id];
    let newQuery = mysql.format(sql, insert);
    if (query === 'empty') return newQuery;
    return query + ' UNION ' + newQuery;
}

function mergeData(notificationList, likeData, commentData, relationData) {
    let notificationInfo = [];
    let likeIndex = 0,
        commentIndex = 0,
        relationIndex = 0;
    notificationList.forEach((element, index) => {
        if (element.type === 'like') {
            notificationInfo.push(likeData[likeIndex++]);
        } else if (element.type === 'comment') {
            notificationInfo.push(commentData[commentIndex++]);
        } else if (element.type === 'follow') {
            notificationInfo.push(relationData[relationIndex++]);
        }
        notificationInfo[index]['type'] = element.type;
    });
    return notificationInfo;
}

async function getNotificationInfo(notificationList) {
    let likeQuery = 'empty';
    let commentQuery = 'empty';
    let relationQuery = 'empty';
    notificationList.forEach((element) => {
        if (element.type === 'like') {
            likeQuery = unionQuery(likeQuery, 'likeInfo', 'id', element.referenceIndex);
            console.log(likeQuery);
        } else if (element.type === 'comment') {
            commentQuery = unionQuery(commentQuery, 'comment', 'commentIndex', element.referenceIndex);
            console.log(commentQuery);
        } else if (element.type === 'follow') {
            relationQuery = unionQuery(relationQuery, 'relation', 'id', element.referenceIndex);
            console.log(relationQuery);
        }
    });

    const data = await multipleGetData([getData(likeQuery), getData(commentQuery), getData(relationQuery)]);
    const [likeData, commentData, relationData] = data;
    return await mergeData(notificationList, likeData, commentData, relationData);
}

async function getLatestNotification(receiverToken, date) {
    const notificationList = await getLatestNotificationMeta(receiverToken, date);
    const notificationInfo = await getNotificationInfo(notificationList);
    console.log(notificationInfo);
}

module.exports = {
    insertNotification,
    deleteNotification,
    tagRead,
    getNotificationInfo,
};
