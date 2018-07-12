const {
    userTable,
    commentTable,
    songTable,
    relationTable,
    songListTable,
} = require('./database');

let ownerInfoMap = {};

function songlistService(socket) {
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

        let ownerHistory = await songListTable.getOwnerHistory(pageToken);
        socket.emit('getOwnerHistory', ownerHistory);
    })

    socket.on('newLike', async (songInfo) => {
        songTable.updateLike(songInfo);
    });

    socket.on('editPlaylist', (ownerInfo) => {
        const token = ownerInfo.playlistInfo.token;
        ownerInfoMap[`${token}`] = ownerInfo;
        socket.emit('redirect', `edit?id=${token}`);
    })

    socket.on('getEditInfo', (token = {}) => {
        console.log(ownerInfoMap[token]);
        socket.emit('getEditInfo', ownerInfoMap[token]);
    })
}

module.exports = songlistService;
