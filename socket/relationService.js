const { userTable,
        commentTable,
        songTable,
        relationTable,
        songListTable, } = require('./database');

function relationService(socket){
    socket.on('issueFollow', async (relation) => {
        relationTable.createRelation(relation.token, relation.followToken);
    });

    socket.on('getFriendsLatest', async() => {
        const latestFriendPlaylistArray = await relationTable.getFriendsLatest(socket.handshake.session.token, 5)
        socket.emit('getFriendLatest', latestFriendPlaylistArray);
    });
}

module.exports = relationService;
