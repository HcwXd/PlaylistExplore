const sharedsession = require('express-socket.io-session');
const ytAPIService = require('./ytAPIService');
const songlistService = require('./songlistService');
const commentService = require('./commentService');
const userService = require('./userService');
const relationService = require('./relationService');
const likeService = require('./likeService');
const notificationService = require('./notificationService');
const Socket = require('socket.io');
const socketMap = require('./socketMap');

function initializeSocket(server, session) {
    const io = Socket(server);
    io.use(
        sharedsession(session, {
            autoSave: true,
        })
    );

    io.on('connect', async (socket) => {
        if (socket.handshake.session.token && !socketMap.has(socket.handshake.session.token)) {
            socketMap.set(socket.handshake.session.token, socket);
        }

        ytAPIService(socket);
        songlistService(socket);
        userService(socket);
        relationService(socket);
        commentService(socket);
        likeService(socket);
        notificationService(socket);

        socket.on('disconnect', () => {
            if (socket.handshake.session.token) {
                socketMap.delete(socket.handshake.session.token);
                console.log(`${socket.handshake.session.token} is disconnect`);
                return;
            }
            console.log('Unknown user is disconnect');
        });
    });

    return io;
}

module.exports = initializeSocket;
