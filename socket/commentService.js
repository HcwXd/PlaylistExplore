const { userTable,
        commentTable,
        songTable,
        relationTable,
        songListTable, } = require('./database');

function commentService(socket){
    socket.on('getSongComment', async (songInfo) => {
        comments = await songTable.getCommentInfo(songInfo);
        socket.emit('getSongComment', comments);
    });

    socket.on('newComment', async (commentInfo) => {
        if(commentInfo.commentContent){
            commentInfo['commentToken'] = socket.handshake.session.token;
            await commentTable.createComment(commentInfo);
        }
        songInfo = {
            token: commentInfo.listOwnerToken,
            songIndex: commentInfo.songIndex,
            listId: commentInfo.listId
        }
        comments = await songTable.getCommentInfo(songInfo);
        socket.emit('getSongComment', comments);
    });

    socket.on('deleteComment', async (commentIndex) => {
        commentTable.deleteComment(commentIndex);
    })
};

module.exports = commentService;
