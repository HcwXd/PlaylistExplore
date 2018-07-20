const sharedsession = require('express-socket.io-session');
const ytAPIService = require('./ytAPIService');
const songlistService = require('./songlistService');
const commentService = require('./commentService');
const userService = require('./userService');
const relationService = require('./relationService');
const likeService = require('./likeService');
const Socket = require('socket.io');

function initializeSocket(server, session) {
    const io = Socket(server);
    io.use(
        sharedsession(session, {
            autoSave: true,
        })
    );

    io.on('connect', async (socket) => {
        ytAPIService(socket);
        songlistService(socket);
        userService(socket);
        relationService(socket);
        commentService(socket);
        likeService(socket);
    });

    return io;
}

module.exports = initializeSocket;
