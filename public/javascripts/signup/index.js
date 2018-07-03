const fb_signup_btn = document.querySelector('.fb_signup_btn');

const username_input = document.querySelector('.username_input');
const password_input = document.querySelector('.password_input');
const repassword_input = document.querySelector('.repassword_input');
const avatar_input = document.querySelector('.avatar_input');

const signup_btn = document.querySelector('.signup_btn');


function signUp() {
    var reg = new RegExp('^\\w+$');
    var avatar;
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
        if (password_input.value !== repassword_input.value) {
            throw new Error('Password confirmed is inconsistent')
        }
    } catch (e) {
        alert(e);
        return;
    }
    if (avatar_input.files[0]) {
        avatar = avatar_input.files[0];
    } else {
        avatar = false;
    }
    let user = {
        name: username_input.value,
        password: Crypto.SHA1(password_input.value),
        avatar: avatar
    }
    socket.emit("userSignUp", user);
}

signup_btn.addEventListener('click', signUp)