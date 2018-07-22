const { db, getData, applyQuery, multipleGetData } = require('./DB');
const mysql = require('mysql');
const fecha = require('fecha');
const emptyPromise = require('empty-promise');
/*
id
| type
| isRead
| receiverToken
| triggerToken
| referenceIndex
| date
*/

async function getCommentNotification(refferenceIndex) {
    const sql =
        'SELECT u.userName as triggerName, u.avatar as triggerAvatar, c.listOwnerToken, c.listId, c.songIndex, c.commentContent \
                 FROM user u, comment c \
                 WHERE u.token = c.commentToken AND c.commentIndex = ?';
    const query = mysql.format(sql, [refferenceIndex]);
    const commentNotificationInfo = await getData(query);
    return commentNotificationInfo[0];
}

async function getLikeNotification(refferenceIndex) {
    const sql =
        'SELECT u.userName as triggerName, u.avatar as triggerAvatar, s.token as listOwnerToken, l.listId, l.songIndex \
                 FROM user u, songList s, likeInfo l \
                 WHERE l.id = ? AND u.token = l.token AND s.listId = l.listId';
    const query = mysql.format(sql, [refferenceIndex]);
    const likeNotificationInfo = await getData(query);
    return likeNotificationInfo[0];
}

async function getFollowNotificaiton(triggerToken) {
    const sql = 'SELECT userName as triggerName, avatar as triggerAvatar FROM user WHERE token = ?';
    const query = mysql.format(sql, [triggerToken]);
    const followNotificationInfo = await getData(query);
    return followNotificationInfo[0];
}

function createNotificationObject(type, info) {
    const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    switch (type) {
        case 'like': {
            return {
                type: 'like',
                isRead: 0,
                receiverToken: info.listOwnerToken,
                triggerToken: info.token,
                referenceIndex: info.id,
                date: date,
            };
        }

        case 'comment': {
            return {
                type: 'comment',
                isRead: 0,
                receiverToken: info.listOwnerToken,
                triggerToken: info.commentToken,
                referenceIndex: info.id,
                date: date,
            };
        }

        case 'follow': {
            return {
                type: 'follow',
                isRead: 0,
                receiverToken: info.listOwnerToken,
                triggerToken: info.userToken,
                referenceIndex: info.id,
                date: date,
            };
        }
    }
}

/*
triggerToken triggerName triggerAvatar isRead id
type
follow token
Comment/like
listOwnerToken listId songIndex

tagRead
Client: array of notification id
*/

async function formatNotification(notification) {
    switch (notification.type) {
        case 'comment': {
            const info = await getCommentNotification(notification.referenceIndex);
            return {
                id: notification.id,
                isRead: notification.isRead,
                triggerToken: notification.triggerToken,
                triggerName: info.triggerName,
                triggerAvatar: info.triggerAvatar,
                type: 'comment',
                listOwnerToken: info.listOwnerToken,
                listId: info.listId,
                songIndex: info.songIndex,
                content: info.commentContent,
                date: notification.date,
            };
            break;
        }

        case 'like': {
            const info = await getLikeNotification(notification.referenceIndex);
            return {
                id: notification.id,
                isRead: notification.isRead,
                triggerToken: notification.triggerToken,
                triggerName: info.triggerName,
                triggerAvatar: info.triggerAvatar,
                type: 'like',
                listOwnerToken: info.listOwnerToken,
                listId: info.listId,
                songIndex: info.songIndex,
                date: notification.date,
            };
            break;
        }

        case 'follow': {
            const info = await getFollowNotificaiton(notification.triggerToken);
            return {
                id: notification.id,
                isRead: notification.isRead,
                triggerToken: notification.triggerToken,
                triggerName: info.triggerName,
                triggerAvatar: info.triggerAvatar,
                type: 'follow',
                date: notification.date,
            };
        }
    }
}

async function insertNotification(notificationInfo) {
    const sql = 'INSERT INTO notification SET ?';
    const insert = notificationInfo;
    const query = mysql.format(sql, insert);
    const ret = await applyQuery(query);
    return ret;
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
                 ORDER BY date DESC';
    const insert = [receiverToken, date];
    const query = mysql.format(sql, insert);
    const notificationList = await getData(query);
    return notificationList;
}

function unionQuery(query, table, tokenColumn, idColumn, id) {
    let newQuery = '';
    if (table === 'likeInfo') {
        newQuery = `SELECT ${table}.*, user.userName, user.avatar, songList.token as listOwnerToken FROM ${table}, user, songList
                    WHERE ${table}.${idColumn} = ${id} AND ${table}.${tokenColumn} = user.token AND ${table}.listId = songList.listId`;
    } else {
        newQuery = `SELECT ${table}.*, user.userName, user.avatar FROM ${table}, user
                    WHERE ${table}.${idColumn} = ${id} AND ${table}.${tokenColumn} = user.token`;
    }
    if (query === 'empty') return newQuery;
    return query + ' UNION ' + newQuery;
}

function mergeData(notificationList, likeData, commentData, relationData) {
    let notificationInfo = [];
    let likeIndex = 0,
        commentIndex = 0,
        relationIndex = 0;

    notificationList.forEach((element, index) => {
        const date = fecha.format(new Date(element.date), 'YYYY-MM-DD HH:mm:ss');
        if (element.type === 'like') {
            const likeInfo = likeData[likeIndex++];
            notificationInfo.push({
                id: element.id,
                isRead: element.isRead,
                triggerToken: likeInfo.token,
                triggerName: likeInfo.userName,
                triggerAvatar: likeInfo.avatar,
                type: 'like',
                listOwnerToken: likeInfo.listOwnerToken,
                listId: likeInfo.listId,
                songIndex: likeInfo.songIndex,
                date: date,
            });
        } else if (element.type === 'comment') {
            const commentInfo = commentData[commentIndex + 1];
            notificationInfo.push({
                id: element.id,
                isRead: element.isRead,
                triggerToken: commentInfo.commentToken,
                triggerName: commentInfo.userName,
                triggerAvatar: commentInfo.avatar,
                type: 'comment',
                listOwnerToken: commentInfo.listOwnerToken,
                listId: commentInfo.listId,
                songIndex: commentInfo.songIndex,
                content: commentInfo.commentContent,
                date: date,
            });
        } else if (element.type === 'follow') {
            const relationInfo = relationData[relationIndex++];
            notificationInfo.push({
                id: element.id,
                isRead: element.isRead,
                triggerToken: relationInfo.token,
                triggerName: relationInfo.userName,
                triggerAvatar: relationInfo.avatar,
                type: 'follow',
                date: date,
            });
        }
    });
    return notificationInfo;
}

async function getNotificationInfo(notificationList) {
    let likeQuery = 'empty';
    let commentQuery = 'empty';
    let relationQuery = 'empty';
    notificationList.forEach((element) => {
        if (element.type === 'like') {
            likeQuery = unionQuery(likeQuery, 'likeInfo', 'token', 'id', element.referenceIndex);
        } else if (element.type === 'comment') {
            commentQuery = unionQuery(commentQuery, 'comment', 'commentToken', 'commentIndex', element.referenceIndex);
        } else if (element.type === 'follow') {
            relationQuery = unionQuery(relationQuery, 'relation', 'token', 'id', element.referenceIndex);
        }
    });

    const promiseArray = [];
    if (likeQuery !== 'empty') promiseArray.push(getData(likeQuery));
    else promiseArray.push(emptyPromise().resolve([]));

    if (commentQuery !== 'empty') promiseArray.push(getData(commentQuery));
    else promiseArray.push(emptyPromise().resolve([]));

    if (relationQuery !== 'empty') promiseArray.push(getData(relationQuery));
    else promiseArray.push(emptyPromise().resolve([]));

    const data = await multipleGetData(promiseArray);
    const [likeData, commentData, relationData] = data;
    return await mergeData(notificationList, likeData, commentData, relationData);
}

async function getLatestNotification(receiverToken, date) {
    const notificationList = await getLatestNotificationMeta(receiverToken, date);
    const notificationInfo = await getNotificationInfo(notificationList);
    return notificationInfo;
}

module.exports = {
    insertNotification,
    deleteNotification,
    tagRead,
    getNotificationInfo,
    createNotificationObject,
    getLatestNotification,
    formatNotification,
};
