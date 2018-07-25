const { userTable, commentTable, songTable, relationTable, songListTable, likeTable, notificationTable } = require('./database');
const socketMap = require('./socketMap');

function likeService(socket) {
    socket.on('newLike', async (likeInfo) => {
        console.log(likeInfo);
        songTable.addLike(likeInfo);
        const ret = await likeTable.addLikeInfo(likeInfo);

        if (likeInfo.token === likeInfo.listOwnerToken) return;

        likeInfo['id'] = ret.insertId;
        const notification = notificationTable.createNotificationObject('like', likeInfo);
        const ret_ = await notificationTable.insertNotification(notification);

        if (!socketMap.has(likeInfo.listOwnerToken)) return;

        notification['id'] = ret_.insertId;
        const notificationInfo = await notificationTable.formatNotification(notification);
        console.log(notificationInfo);
        const informSocket = socketMap.get(likeInfo.listOwnerToken);
        informSocket.emit('newNotification', notificationInfo);

        if (informSocket.handshake.session.notificationList) {
            informSocket.handshake.session.notificationList.unshift(notificationInfo);
            informSocket.handshake.session.save();
        }
    });

    socket.on('unlike', async (unlikeInfo) => {
        const likeId = await likeTable.getLikeId(unlikeInfo);
        likeTable.deleteLikeInfo(unlikeInfo);
        songTable.deleteLike(unlikeInfo);

        if (unlikeInfo.token === unlikeInfo.listOwnerToken) return;

        notificationTable.deleteNotification({
            type: 'like',
            referenceIndex: likeId,
        });
    });

    socket.on('getLikeList', async (songInfo) => {
        const likeList = likeTable.getLikeList(songInfo);
        socket.emit('getLikeList', likeList);
    });

    socket.on('getLikeStatus', async (songInfo) => {
        const bool = await likeTable.checkLikeExist(songInfo);
        socket.emit('getLikeStatus', bool);
    });
}

module.exports = likeService;
