const { notificationTable, formatTime } = require('./database');

function notificationService(socket) {
    socket.on('getLatestNotification', async (date) => {
        date = formatTime.getUTCString(new Date(date));
        if (!socket.handshake.session.token) return;
        const notificationList = await notificationTable.getLatestNotification(socket.handshake.session.token, date);
        socket.emit('getLatestNotification', notificationList);
    });

    socket.on('tagRead', (idArray) => {
        if (idArray.length === 0) return;
        notificationTable.tagRead(idArray);
    });
}

module.exports = notificationService;
