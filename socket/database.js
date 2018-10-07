var userTable = require('../database/userTable');
var commentTable = require('../database/commentTable');
var songTable = require('../database/songTable');
var relationTable = require('../database/relationTable');
var songListTable = require('../database/songListTable');
var likeTable = require('../database/likeTable');
var notificationTable = require('../database/notificationTable');
var formatTime = require('../database/formatTime');

module.exports = {
    userTable,
    commentTable,
    songTable,
    relationTable,
    songListTable,
    likeTable,
    notificationTable,
    formatTime,
};
