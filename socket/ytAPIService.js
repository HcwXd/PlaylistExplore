const { userTable,
        commentTable,
        songTable,
        relationTable,
        songListTable, } = require('./database');

var getSingleSongInfoArray = require('../routes/songSearch');

function ytAPIService(socket){
    socket.on('getSearchResults', async (URL) => {
        const singleSongInfos = await getSingleSongInfoArray(URL);
        socket.emit('getSearchResults', singleSongInfos);
    });
}

module.exports = ytAPIService;
