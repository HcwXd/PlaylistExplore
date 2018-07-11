const { userTable,
        commentTable,
        songTable,
        relationTable,
        songListTable, } = require('./database');

function songlistService(socket){
    socket.on('publishNewPlaylist', (playlistInfo) => {
        playlistInfo['token'] = socket.handshake.session.token;
        songListTable.modifyPlayList(playlistInfo);
    });

    socket.on('getLatestPlaylists', async () => {
        let latestplaylistInfo = await songListTable.getLatestPlaylists(5);
        socket.emit('getLatestPlaylists', latestplaylistInfo);
    })

    socket.on('getOwnerInfo', async (pageToken) => {
        let playlistInfo = {
            token: pageToken,
            listId: 1,
        }
        let ownerInfo = await songListTable.getCompleteplaylistInfo(playlistInfo, true);
        socket.emit('getOwnerInfo', ownerInfo);
    })

    socket.on('newLike', async (songInfo) => {
        songTable.updateLike(songInfo);
    });

    socket.on('editPlaylist', (ownerInfo) => {
        socket.emit('editPlaylist', ownerInfo);
    })
}

module.exports = songlistService;
