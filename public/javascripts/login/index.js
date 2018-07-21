const fb_signin_btn = document.querySelector('.fb_signup_btn');

const email_input = document.querySelector('.email_input');
const password_input = document.querySelector('.password_input');

const signin_btn = document.querySelector('.signup_btn');

socket.on('accountNotExist', () => {
    alert("Account doesn't exist");
});
socket.on('wrongPassword', () => {
    alert('Wrong password');
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
