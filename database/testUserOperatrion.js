const userTable = require('./userTable');

let token = '181392975869164';
async function test(){
    userInfo = await userTable.getUserInfo(token);
    console.log(userInfo);
};

userTable.userExist(token).then(result => console.log(result));
