const fb_signin_btn = document.querySelector('.fb_signup_btn');

const username_input = document.querySelector('.username_input');
const password_input = document.querySelector('.password_input');

const signin_btn = document.querySelector('.signup_btn');

socket.on('accountNotExist', () => {
    alert("Account doesn't exist");
});
socket.on('wrongPassword', () => {
    alert("Wrong password");
});
socket.on('signInSuccess', () => {
    window.location = "/explore";
});

function signIn() {
    var reg = new RegExp('^\\w+$');
    try {
        if (!(username_input.value.length >= 1 && username_input.value.length <= 10)) {
            throw new Error('Username must shorter than 10')
        }
        if (!reg.test(username_input.value)) {
            throw new Error('Username must only contain numbers, words and _')
        }
        if (!reg.test(password_input.value)) {
            throw new Error('Password must only contain numbers, words and _')
        }
        if (password_input.value.length < 6) {
            throw new Error('Password must longer than 6')
        }
    } catch (e) {
        alert(e);
        return;
    }
    let user = {
        account: username_input.value,
        password: Crypto.SHA1(password_input.value),
    }
    socket.emit("userSignIn", user);

}

signin_btn.addEventListener('click', signIn)
