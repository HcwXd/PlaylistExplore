const {
    userTable,
    commentTable,
    songTable,
    relationTable,
    songListTable,
} = require('./database');

let ownerInfoMap = {};

function songlistService(socket) {
    socket.on('publishNewPlaylist', async (playlistInfo) => {
        playlistInfo['token'] = socket.handshake.session.token;
        await songListTable.modifyPlayList(playlistInfo);
    });

    socket.on('getLatestPlaylists', async () => {
        let latestplaylistInfo = await songListTable.getLatestPlaylists(5);
        socket.emit('getLatestPlaylists', latestplaylistInfo);
    })

    socket.on('getOwnerInfo', async (pageInfo) => {
        let ownerHistory = await songListTable.getOwnerHistory(pageInfo.token);
        socket.emit('getOwnerHistory', ownerHistory);

        if(ownerHistory.length === 0){
            const userInfo = await userTable.getUserInfo(pageInfo.token);
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
                    uploadCover: ''
                }
            };
            socket.emit('getOwnerInfo');
            return;
        }

        let playlistInfo = {
            token: pageInfo.token,
            listId: pageInfo.listId === -1 ? ownerHistory[0].listId : pageInfo.listId,
        }

        let ownerInfo = await songListTable.getCompleteplaylistInfo(playlistInfo, true);
        socket.emit('getOwnerInfo', ownerInfo);
    })

    socket.on('newLike', async (songInfo) => {
        songTable.updateLike(songInfo);
    });

    socket.on('editPlaylist', (ownerInfo) => {
        const token = ownerInfo.playlistInfo.token;
        ownerInfoMap[token] = ownerInfo;
        socket.emit('redirect', `edit?id=${token}`);
    })

    socket.on('getEditInfo', (token = {}) => {
        console.log(ownerInfoMap[token]);
        socket.emit('getEditInfo', ownerInfoMap[token]);
    })
}

module.exports = songlistService;
