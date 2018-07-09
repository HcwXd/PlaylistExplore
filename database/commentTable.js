const db = require("./DB");
const mysql = require("mysql");

/*
PRIMARY KEY
listOwnerToken
listId
songIndex
commentIndex

commentToken
commentContent
*/

function applyQuery(query){
    db.query(query, (error, result) => {
        if(error){
            console.log(error);
            return;
        }
        console.log(result);
    })
}

function createComment(commentInfo){
    let sql = "INSERT INTO comment SET ?";
    let insertObject = {
        listOwnerToken: commentInfo.listOwnerToken,
        listId: commentInfo.listId,
        songIndex: commentInfo.songIndex,
        commentIndex: commentInfo.commentIndex,
        commentToken: commentInfo.commentToken,
        commentContent: commentInfo.commentContent
    }
    let query = mysql.format(sql, insertObject);
    applyQuery(query);
}

function deleteComment(commentInfo){
    let sql = "DELETE FROM comment WHERE ?? = ? AND ?? = ? AND ?? = ? AND ?? = ? AND ?? = ?";
    let condition = [
        'listOwnerToken', commentInfo.listOwnerToken,
        'listId', commentInfo.listId,
        'songIndex', commentInfo.songIndex,
        'commentIndex', commentInfo.commentIndex,
    ]
    let query = mysql.format(sql, condition);
    applyQuery(query);
}

function modifyComment(commentInfo){
    let sql = "UPDATE comment SET ? WHERE ?? = ? AND ?? = ? AND ?? = ? AND ?? = ?";
    let setValue = {
        commentContent: commentInfo.commentContent
    }
    let insert = [
        setValue,
        'listOwnerToken', commentInfo.listOwnerToken,
        'songIndex', commentInfo.songIndex,
        'commentIndex', commentInfo.commentIndex,
        'listId', commentInfo.listID
    ];
    let query = mysql.format(sql, insert);
    applyQuery(query);
}

/* test
commentInfo = {
    listOwnerToken: 1813929758691464,
    url: 'https://www.youtube.com/watch?v=Omv3OFcocNM',
    commentToken: '1813929758691464',
    commentContent: 'I like this song!'
}
createComment(commentInfo);
*/

/* test
    modifyComment(commentInfo);
*/
module.exports = {
    createComment: createComment,
    deleteComment: deleteComment,
    modifyComment: modifyComment
}
