const { userTable, commentTable, songTable, relationTable, songListTable, likeTable, notificationTable } = require('./database');
const fecha = require('fecha');

function relationService(socket) {
    socket.on('followUser', async (relation) => {
        const ret = await relationTable.createRelation(relation.userToken, relation.listOwnerToken);
        relation['id'] = ret.insertId;

        const notification = notificationTable.createNotificationObject('follow', relation);
        notificationTable.insertNotification(notification);
    });

    socket.on('unfollowUser', async (relation) => {
        relationTable.deleteRelation(relation.userToken, relation.listOwnerToken);

        notificationTable.deleteNotification({
            type: 'follow',
            referenceIndex: relation.id,
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
