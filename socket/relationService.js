const { userTable, commentTable, songTable, relationTable, songListTable } = require('./database');
const fecha = require('fecha');

function relationService(socket) {
    socket.on('followUser', async (relation) => {
        relationTable.createRelation(relation.userToken, relation.listOwnerToken);
    });

    socket.on('unfollowUser', async (relation) => {
        relationTable.deleteRelation(relation.userToken, relation.listOwnerToken);
    });

    socket.on('getFriendsLatest', async (date) => {
        date = fecha.format(new Date(date), 'YYYY-MM-DD hh:mm:ss');
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
