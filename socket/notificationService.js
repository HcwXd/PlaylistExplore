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

function notificationService(notificationInfo, socketMap) {
    if (socketMap.hasOwnProperty(notificationInfo.receiverToken)) {
        emitNotification(notificationInfo, socketMap);
    }

    notificationTable.insertNotification(notificationInfo);
}
