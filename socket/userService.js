const { userTable, commentTable, songTable, relationTable, songListTable } = require('./database');

/* crypt password
 * const bcrypt = require('bcrypt');
 * const saltRounds = 10;
 */

const defalutAvatar = 'https://i.imgur.com/9RXPWGu.png';

function userService(socket) {
    socket.on('getUserInfo', async () => {
        const token = socket.handshake.session.token;
        if (token) {
            let userInfo = await userTable.getUserInfo(token);
            socket.emit('getUserInfo', userInfo);
            return;
        }
        socket.emit('getUserInfo', {});
    });

    socket.on('changeBio', async (bio) => {
        bioInfo = {
            content: bio,
            token: socket.handshake.session.token,
        };
        await userTable.updateBio(bioInfo);
        socket.emit('changeBio', bio);
    });

    socket.on('userSignUp', async (user) => {
        if (await userTable.userExist(user.account)) {
            console.log('duplicateAccount');
            socket.emit('duplicateAccount');
            return;
        }

        userInfo = {
            userName: user.name,
            avatar: user.avatar || defalutAvatar,
            bio: '',
            token: user.account,
            password: user.password,
        };

        await userTable.createAccount(userInfo);
        socket.handshake.session.token = userInfo.token;
        socket.handshake.session.userName = userInfo.userName;
        socket.handshake.session.avatar = userInfo.avatar;
        socket.handshake.session.save();
        socket.emit('createAccountSuccess');

        /* For crypt password
         *
            bcrypt.hash(userInfo.password, saltRounds, async function(err, hash) {
                userInfo.password = hash;
                await userTable.createAccount(userInfo);
                socket.emit('createAccountSuccess');
            });
        */
    });

    socket.on('userSignIn', async (user) => {
        if (!(await userTable.userExist(user.account))) {
            console.log('accountNotExist');
            socket.emit('accountNotExist');
            return;
        }
        if (!(await userTable.confirmUser(user))) {
            console.log('wrongPassword');
            socket.emit('wrongPassword');
            return;
        }
        let userInfo = await userTable.getUserInfo(user.account);
        socket.handshake.session.token = userInfo.token;
        socket.handshake.session.userName = userInfo.userName;
        socket.handshake.session.avatar = userInfo.avatar;
        socket.handshake.session.save();
        socket.emit('signInSuccess');
    });

    socket.on('searchUser', async (userName) => {
        return await userTable.searchUser;
    });
}

module.exports = userService;
