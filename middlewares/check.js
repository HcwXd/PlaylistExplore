module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.token) {
            return res.redirect('/login');
        }
        next();
    },
};
