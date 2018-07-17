const { userTable, commentTable, songTable, relationTable, songListTable } = require('./database');

function relationService(socket) {
    socket.on('followUser', async (relation) => {
        relationTable.createRelation(relation.userToken, relation.listOwnerToken);
    });

    socket.on('unfollowUser', async (relation) => {
        relationTable.deleteRelation(relation.userToken, relation.listOwnerToken);
    });

    socket.on('getFriendsLatest', async (date) => {
        const latestFriendPlaylistArray = await songListTable.getLatestPlaylists(5, date, socket.handshake.session.token, true);
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
