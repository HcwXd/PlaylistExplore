const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

let app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
server.listen(port);

useSession = session({
    secret: 'handsome',
    resave: true,
    saveUninitialized: true,
});

const io = require('./socket/socket')(server, useSession);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(useSession);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    console.log(req.session);
    res.locals.token = req.session.token;
    res.locals.userName = req.session.userName;
    res.locals.avatar = req.session.avatar;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
