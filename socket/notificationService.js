const { notificationTable } = require('./database');
const fecha = require('fecha');

function notificationService(socket) {
    socket.on('getLatestNotification', async (date) => {
        if (socket.handshake.session.notificationList) {
            socket.emit('getLatestNotification', socket.handshake.session.notificationList);
            return;
        }
        date = fecha.format(new Date(date), 'YYYY-MM-DD HH:mm:ss');
        if (!socket.handshake.session.token) return;
        const notificationList = await notificationTable.getLatestNotification(socket.handshake.session.token, date);
        console.log(notificationList);
        socket.handshake.session.notificationList = notificationList;
        socket.handshake.session.save();
        socket.emit('getLatestNotification', notificationList);
    });

    socket.on('tagRead', (idArray) => {
        if (idArray.length === 0) return;
        notificationTable.tagRead(idArray);

        let notificationList = socket.handshake.session.notificationList;
        if (notificationList) {
            idArray.forEach((id, index) => {
                notificationList[index].isRead = true;
            });
        }
    });
}

module.exports = notificationService;
