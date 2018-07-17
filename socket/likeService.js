const { userTable, commentTable, songTable, relationTable, songListTable, likeTable } = require('./database');

function likeService(socket) {
    socket.on('newLike', async (likeInfo) => {
        likeTable.addLikeInfo(likeInfo);
        songTable.addLike(likeInfo);
    });

    socket.on('unlike', async (unlikeInfo) => {
        likeTable.deleteLikeInfo(unlikeInfo);
        songTable.deleteLike(unlikeInfo);
    });

    socket.on('getLikeList', async (songInfo) => {
        const likeList = likeTable.getLikeList(songInfo);
        socket.emit('getLikeList', likeList);
    });

    socket.on('getLikeStatus', async (songInfo) => {
        const token = socket.handshake.session.token;
        songInfo[token] = token;
        const bool = await checkLikeExist(songInfo);
        socket.emit('getLikeStatus', bool);
    });
}
