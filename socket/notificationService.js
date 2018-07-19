const { notificationTable } = require('./database');

/*
id
| type
| isRead
| receiverToken
| triggerToken
| referenceIndex
| date
*/

function notificationService(socket) {
    socket.on('getNotification', (info) => {
        const notificationList = await notificationTable.getLatestNotification(info.token, info.date);
        socket.emit('getNotification', notificationList);
    })
}
