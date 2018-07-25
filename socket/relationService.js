const { userTable, commentTable, songTable, relationTable, songListTable, likeTable, notificationTable } = require('./database');
const fecha = require('fecha');
const socketMap = require('./socketMap');

function relationService(socket) {
    socket.on('followUser', async (relation) => {
        const ret = await relationTable.createRelation(relation.userToken, relation.listOwnerToken);
        relation['id'] = ret.insertId;

        const notification = notificationTable.createNotificationObject('follow', relation);
        console.log(notification);
        const ret_ = await notificationTable.insertNotification(notification);

        if (!socketMap.has(relation.listOwnerToken)) return;
        notification.id = ret_.insertId;
        const notificationInfo = await notificationTable.formatNotification(notification);
        console.log(notificationInfo);
        const informSocket = socketMap.get(relation.listOwnerToken);
        informSocket.emit('newNotification', notificationInfo);

        if (informSocket.handshake.session.notificationList) {
            informSocket.handshake.session.notificationList.unshift(notificationInfo);
            informSocket.handshake.session.save();
        }
    });

    socket.on('unfollowUser', async (relation) => {
        const relationId = await relationTable.getRelationId(relation.userToken, relation.listOwnerToken);
        relationTable.deleteRelation(relation.userToken, relation.listOwnerToken);

        console.log(relationId);

        notificationTable.deleteNotification({
            type: 'follow',
            referenceIndex: relationId,
        });
    });

    socket.on('getFriendsLatest', async (date) => {
        date = fecha.format(new Date(date), 'YYYY-MM-DD HH:mm:ss');
        const latestFriendPlaylistArray = await songListTable.getLatestPlaylists(5, date, socket.handshake.session.token, true);
        socket.emit('getFriendsLatest', latestFriendPlaylistArray);
    });

    socket.on('getFollowState', async (token, listOwnerToken) => {
        if (await relationTable.isFriend(token, listOwnerToken)) {
            socket.emit('getFollowState', new Boolean(true));
            return;
        }
        socket.emit('getFollowState', new Boolean(false));
    });
}

console.log(fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'));
module.exports = relationService;
