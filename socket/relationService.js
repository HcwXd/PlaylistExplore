const { userTable, commentTable, songTable, relationTable, songListTable } = require('./database');

function relationService(socket) {
    socket.on('followUser', async (relation) => {
        relationTable.createRelation(relation.userToken, relation.listOwnerToken);
    });

    socket.on('unfollowUser', async (relation) => {
        relationTable.deleteRelation(relation.userToken, relation.listOwnerToken);
    });

    socket.on('getFriendsLatest', async () => {
        const latestFriendPlaylistArray = await relationTable.getFriendsLatest(socket.handshake.session.token, 5);
        socket.emit('getFriendLatest', latestFriendPlaylistArray);
    });

    socket.on('getFollowState', async (token, listOwnerToken) => {
        if (await relationTable.isFriend(token, listOwnerToken)) {
            socket.emit('getFollowState', true);
            return;
        }
        socket.emit('getFollowState', false);
    });
}

module.exports = relationService;
