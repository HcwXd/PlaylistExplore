const { userTable, commentTable, songTable, relationTable, songListTable, likeTable } = require('./database');

async function emitLatestComment(socket, listOwnerToken, songIndex, listId) {
    songInfo = {
        token: listOwnerToken,
        songIndex: songIndex,
        listId: listId,
    };
    comments = await songTable.getCommentInfo(songInfo);
    socket.emit('getSongComment', comments);
}

function commentService(socket) {
    socket.on('getSongComment', async (songInfo) => {
        comments = await songTable.getCommentInfo(songInfo);
        socket.emit('getSongComment', comments);
    });

    socket.on('newComment', async (commentInfo) => {
        if (commentInfo.commentContent) {
            commentInfo['commentToken'] = socket.handshake.session.token;
            await commentTable.createComment(commentInfo);
        }
        emitLatestComment(socket, commentInfo.listOwnerToken, commentInfo.songIndex, commentInfo.listId);
    });

    socket.on('deleteComment', async (commentInfo) => {
        commentTable.deleteComment(commentInfo.commentIndex);
        emitLatestComment(socket, commentInfo.listOwnerToken, commentInfo.songIndex, commentInfo.listId);
    });
}

module.exports = commentService;
