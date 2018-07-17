const { userTable, commentTable, songTable, relationTable, songListTable } = require('./database');

const emitURLInfoArray = require('./songSearch');

function ytAPIService(socket) {
    socket.on('getSearchResults', async (URL) => {
        await emitURLInfoArray(URL, socket);
    });
}

module.exports = ytAPIService;
