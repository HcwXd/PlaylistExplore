const { db, getData, applyQuery } = require('./DB');
const mysql = require('mysql');

/* column in comment table
 *
 * listOwnerToken
 * listId
 * songIndex
 * commentIndex
 * commentToken
 * commentContent
 */

function createComment(commentInfo) {
    const sql = 'INSERT INTO comment SET ?';
    const insert = commentInfo;
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

function deleteComment(commentIndex) {
    const sql = 'DELETE FROM comment WHERE commentIndex = ?';
    const insert = [commentIndex];
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

function modifyComment(commentInfo) {
    const sql = 'UPDATE comment SET ? WHERE ?? = ? AND ?? = ? AND ?? = ? AND ?? = ?';
    const setValue = {
        commentContent: commentInfo.commentContent,
    };
    const insert = [setValue, 'listOwnerToken', commentInfo.listOwnerToken, 'songIndex', commentInfo.songIndex, 'commentIndex', commentInfo.commentIndex, 'listId', commentInfo.listID];
    const query = mysql.format(sql, insert);
    applyQuery(query);
}

module.exports = {
    createComment,
    deleteComment,
    modifyComment,
};

/* test
commentInfo = {
    listOwnerToken: 1813929758691464,
    url: 'https://www.youtube.com/watch?v=Omv3OFcocNM',
    commentToken: '1813929758691464',
    commentContent: 'I like this song!'
}
*/
