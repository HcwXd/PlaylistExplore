const { userTable,
        commentTable,
        songTable,
        relationTable,
        songListTable, } = require('./database');

function relationService(socket){
    socket.on('follow', async (relation) => {
        relationTable.createRelation(relation.token, relation.followToken);
    });

    socket.on('unfollow', async (relation) => {
        relationTable.deleteRelation(relation.token, relation.followToken);
    })

    socket.on('getFriendsLatest', async() => {
        const latestFriendPlaylistArray = await relationTable.getFriendsLatest(socket.handshake.session.token, 5)
        socket.emit('getFriendLatest', latestFriendPlaylistArray);
    });
}

module.exports = relationService;
