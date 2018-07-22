const { notificationTable } = require('./database');
const fecha = require('fecha');

function notificationService(socket) {
    socket.on('getLatestNotification', async (date) => {
        date = fecha.format(new Date(date), 'YYYY-MM-DD HH:mm:ss');
        if (!socket.handshake.session.token) return;
        const notificationList = await notificationTable.getLatestNotification(socket.handshake.session.token, date);
        console.log(notificationList);
        socket.emit('getLatestNotification', notificationList);
    });

    socket.on('tagRead', (idArray) => {
        notificationTable.tagRead(idArray);
    });
}

module.exports = notificationService;
