const fb_signin_btn = document.querySelector('.fb_signup_btn');

const email_input = document.querySelector('.email_input');
const password_input = document.querySelector('.password_input');

const signin_btn = document.querySelector('.signup_btn');

socket.on('accountNotExist', () => {
    alert('帳號不存在');
});
socket.on('wrongPassword', () => {
    alert('密碼錯誤');
});
socket.on('signInSuccess', () => {
    window.location = '/explore';
});

function signIn() {
    let user = {
        account: email_input.value,
        password: Crypto.SHA1(password_input.value),
    };
    socket.emit('userSignIn', user);
}

signin_btn.addEventListener('click', signIn);
password_input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        signIn();
    }
});
