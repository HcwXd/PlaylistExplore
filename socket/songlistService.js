const { userTable, commentTable, songTable, relationTable, songListTable } = require('./database');
const fecha = require('fecha');

let ownerInfoMap = {};

function songlistService(socket) {
    socket.on('publishNewPlaylist', async (playlistInfo) => {
        playlistInfo['token'] = socket.handshake.session.token;
        await songListTable.modifyPlayList(playlistInfo);
    });

    socket.on('getLatestPlaylists', async (date) => {
        date = fecha.format(new Date(date), 'YYYY-MM-DD hh:mm:ss');
        let latestplaylistInfo = await songListTable.getLatestPlaylists(5, date, socket.handshake.session.token, false);
        socket.emit('getLatestPlaylists', latestplaylistInfo);
    });

    socket.on('getOwnerInfo', async (pageInfo) => {
        const token = pageInfo.listOwnerToken;
        let ownerHistory = await songListTable.getOwnerHistory(token);
        socket.emit('getOwnerHistory', ownerHistory);

        if (ownerHistory.length === 0) {
            const userInfo = await userTable.getUserInfo(token);
            const ret = {
                userName: userInfo.userName,
                avatar: userInfo.avatar,
                bio: userInfo.bio,
                playlistInfo: {
                    songList: [],
                    name: '',
                    des: '',
                    date: '',
                    token: '',
                    listId: '',
                    uploadCover: '',
                },
            };
            socket.emit('getOwnerInfo');
            return;
        }

        let playlistInfo = {
            token: token,
            listId: Number(pageInfo.listId) === -1 ? ownerHistory[0].listId : pageInfo.listId,
        };

        let ownerInfo = await songListTable.getCompleteplaylistInfo(playlistInfo, true);
        socket.emit('getOwnerInfo', ownerInfo);
    });

    socket.on('newLike', async (songInfo) => {
        songTable.updateLike(songInfo);
    });

    socket.on('editPlaylist', (ownerInfo) => {
        const token = ownerInfo.playlistInfo.token;
        ownerInfoMap[token] = ownerInfo;
        socket.emit('redirect', `edit?id=${token}`);
    });

    socket.on('getEditInfo', (token = {}) => {
        console.log(ownerInfoMap[token]);
        socket.emit('getEditInfo', ownerInfoMap[token]);
    });
}

module.exports = songlistService;
