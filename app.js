var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bcrypt = require('bcrypt');
var sharedsession = require("express-socket.io-session");
const saltRounds = 10;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var getSingleSongInfoArray = require('./routes/songSearch');
var songListTable = require('./database/songListTable');
var userTable = require('./database/userTable');
var commentTable = require('./database/commentTable');
var songTable = require('./database/songTable');

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;
server.listen(port);

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
  console.log(req.session);
  res.locals.token = req.session.token;
  res.locals.userName = req.session.userName;
  res.locals.avatar = req.session.avatar;
  next();
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

io.use(sharedsession(useSession, {
    autoSave:true
}));


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

  socket.on('getUserInfo', async (token) => {
    console.log(token);
    console.log(socket.handshake.session.token);
    let userInfo = await userTable.getUserInfo(socket.handshake.session.token);
    socket.emit('getUserInfo', userInfo);
  });

  socket.on('getLatestPlaylists', async () => {
    let latestPlayListInfo = await songListTable.getLatestPlaylists(5);
    console.log("/////////////////////////");

    console.log(latestPlayListInfo);
    socket.emit('getLatestPlaylists', latestPlayListInfo);
    console.log(latestPlayListInfo);
  })

  socket.on('getOwnerInfo', async (pageToken) => {
    let playListInfo = {
      token: pageToken,
      listId: 1,
    }
    let ownerInfo = await songListTable.getCompletePlayListInfo(playListInfo, true);
    socket.emit('getOwnerInfo', ownerInfo)
  })

  socket.on('newComment', async (commentInfo) => {
    if(commentInfo.commentContent){
        commentInfo['commentToken'] = socket.handshake.session.token;
        console.log("comment");
        console.log(commentInfo);
        await commentTable.createComment(commentInfo);
    }
    songInfo = {
      token: commentInfo.listOwnerToken,
      songIndex: commentInfo.songIndex,
      listId: commentInfo.listId
    }
    comments = await songTable.getCommentInfo(songInfo);
    console.log("comments");
    console.log(comments);
    socket.emit('newComment', comments);

    /* commentToken commentIndex */
  });

  socket.on('newLike', async (songInfo) => {
    console.log(songInfo);
    songTable.updateLike(songInfo);
  });

  socket.on('changeBio', async (bio) => {
    bioInfo = {
      content: bio,
      token: socket.handshake.session.token
    }
    await userTable.updateBio(bioInfo);
    socket.emit('changeBio', bio);
  })

  socket.on('userSignUp', async (user) => {

    console.log(user);

    if (await userTable.userExist(user.account)) {
      console.log('duplicateAccount');
      socket.emit('duplicateAccount');
      return;
    }

    userInfo = {
      userName: user.name,
      avatar: user.avatar || 'https://i.imgur.com/9RXPWGu.png',
      bio: '',
      token: user.account,
      password: user.password
    }

    await userTable.createAccount(userInfo);
    socket.handshake.session.token = userInfo.token;
    socket.handshake.session.userName = userInfo.userName;
    socket.handshake.session.avatar = userInfo.avatar;
    socket.handshake.session.save();
    socket.emit('createAccountSuccess');

    /*
          bcrypt.hash(userInfo.password, saltRounds, async function(err, hash) {
              userInfo.password = hash;
              await userTable.createAccount(userInfo);
              socket.emit('createAccountSuccess');
          });
    */
  })

  socket.on('userSignIn', async (user) => {
    console.log(socket.handshake.session);
    if (!(ret = await userTable.userExist(user.account))) {
      console.log("accountNotExist");
      socket.emit('accountNotExist');
      return;
    }
    if (!(ret = await userTable.confirmUser(user))) {
      console.log("wrongPassword");
      socket.emit('wrongPassword');
      return;
    }
    let userInfo = await userTable.getUserInfo(user.account);
    console.log(userInfo);
    socket.handshake.session.token = userInfo.token;
    socket.handshake.session.userName = userInfo.userName;
    socket.handshake.session.avatar = userInfo.avatar;
    socket.handshake.session.save();
    console.log(socket.handshake.session);
    socket.emit('signInSuccess');

  });

  socket.on('getSongComment', async (songInfo) => {
    console.log(songInfo);
    comments = await songTable.getCommentInfo(songInfo);
    console.log("comments");
    console.log(comments);
    socket.emit('getSongComment', comments);
  });

  socket.on('editPlaylist', (ownerInfo) => {
    console.log(ownerInfo);
    socket.emit('editPlaylist', ownerInfo);
  })

})




module.exports = app;
