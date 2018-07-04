var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var getSingleSongInfoArray = require('./routes/songSearch');
var songListTable = require('./database/songListTable');
var userTable = require('./database/userTable');
var commentTable = require('./database/commentTable');

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000);

useSession = session({
  secret: 'handsome',
  resave: true,
  saveUninitialized: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(useSession);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.token = req.session.token;
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.use(function (socket, next) {
  useSession(socket.handshake, {}, next);
});

io.on('connect', async (socket) => {
  socket.on('getSearchResults', async (URL) => {
    let singleSongInfos = await getSingleSongInfoArray(URL);
    console.log(singleSongInfos);
    socket.emit('getSearchResults', singleSongInfos);
  });

  socket.on('publishNewPlaylist', (playListInfo) => {
    console.log(playListInfo);
    playListInfo['token'] = socket.handshake.session.token;
    songListTable.modifyPlayList(playListInfo);
  });

  socket.on('getUserInfo', async () => {
    console.log(socket.handshake.session.token);
    let userInfo = await userTable.getUserInfo(socket.handshake.session.token);
    socket.emit('getUserInfo', userInfo);
  });

  socket.on('getLatestPlaylists', async () => {
    let latestPlayListInfo = await songListTable.getLatestPlaylists();
    console.log("/////////////////////////");

    console.log(latestPlayListInfo);
    socket.emit('getLatestPlaylists', latestPlayListInfo);
  })

  socket.on('getOwnerInfo', async (pageToken) => {
      let playListInfo = {
        token: pageToken,
        listId: '',
      }
      let ownerInfo = await songListTable.getCompletePlayListInfo(playListInfo);
      socket.emit('getOwnerInfo', ownerInfo)
  })

  socket.on('addComment', async (comment) => {
      commentTable.modifyComment(comment);
      io.emit(comment);
  });

  socket.on('addLike', async(playlistInfo)=> {
      songListTable.updateLike(playlistInfo);
  });

})




module.exports = app;
