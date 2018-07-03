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
    let sql = "INSERT INTO song SET ?";
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

function deleteComment(singleSongInfo){
    let sql = "DELETE FROM song WHERE ?? = ? AND ?? = ? AND ?? = ? AND ?? = ?";
    let condition = [
        listOwnerToken: commentInfo.listOwnerToken,
        listId: commentInfo.listId,
        songIndex: commentInfo.songIndex,
        commentIndex: commentInfo.commentIndex,
    ]
    let query = mysql.format(sql, condition);
    applyQuery(query);
}

function modifyComment(singleSongInfo){
    let sql = "UPDATE songList SET ? WHERE ?? = ? AND ?? = ? AND ?? = ? AND ?? = ?";
    let setValue = {
        commentContent: commentInfo.commentContent
    }
    let insert = [
        setValue,
        'listOwnerToken', commentInfo.listOwnerToken,
        'listId', commentInfo.listId,
        'songIndex', commentInfo.songIndex,
        'commentIndex', commentInfo.commentIndex,
    ];
    let query = mysql.format(sql, insert);
    applyQuery(query);
}

module.exports = {
    createSong = createComment,
    deleteSong = deleteComment,
    modifySong = modifyComment
}
