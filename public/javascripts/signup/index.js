const fb_signup_btn = document.querySelector('.fb_signup_btn');

const username_input = document.querySelector('.username_input');
const password_input = document.querySelector('.password_input');
const repassword_input = document.querySelector('.repassword_input');
const avatar_input = document.querySelector('.avatar_input');
const email_input = document.querySelector('.email_input');

const signup_btn = document.querySelector('.signup_btn');
let uploadCover;

socket.on('duplicateAccount', () => {
    alert('Account have been signed up');
});
socket.on('createAccountSuccess', () => {
    window.location = '/explore';
});

function signUp() {
    var reg = new RegExp('^\\w+$');
    var avatar;
    try {
        if (!(username_input.value.length >= 1 && username_input.value.length <= 10)) {
            throw new Error('Username must shorter than 10');
        }
        if (!(email_input.value.length >= 1)) {
            throw new Error('You have to input your email address');
        }
        if (!reg.test(username_input.value)) {
            throw new Error('Username must only contain numbers, words and _');
        }
        if (!reg.test(password_input.value)) {
            throw new Error('Password must only contain numbers, words and _');
        }
        if (password_input.value.length < 6) {
            throw new Error('Password must longer than 6');
        }
        if (password_input.value !== repassword_input.value) {
            throw new Error('Password confirmed is inconsistent');
        }
    } catch (e) {
        alert(e);
        return;
    }
    if (avatar_input.files[0]) {
        avatar = uploadCover;
    } else {
        avatar = false;
    }
    let user = {
        name: username_input.value,
        account: email_input.value,
        password: Crypto.SHA1(password_input.value),
        avatar: avatar,
    };
    socket.emit('userSignUp', user);
}

avatar_input.addEventListener('change', uploadImgur);

function uploadImgur() {
    let files = avatar_input.files;

    if (files.length) {
        if (files[0].size > this.dataset.maxSize * 1024) {
            alert('Please select a smaller file');
            return false;
        }

        console.log('Uploading file to Imgur..');

        let apiUrl = 'https://api.imgur.com/3/image';
        let apiKey = '50db29122a23727';

        let settings = {
            async: false,
            crossDomain: true,
            processData: false,
            contentType: false,
            type: 'POST',
            url: apiUrl,
            headers: {
                Authorization: 'Client-ID ' + apiKey,
                Accept: 'application/json',
            },
            mimeType: 'multipart/form-data',
        };

        let formData = new FormData();
        formData.append('image', files[0]);
        settings.data = formData;

        // Response contains stringified JSON
        // Image URL available at response.data.link

        $.ajax(settings).done(function(response) {
            responseData = JSON.parse(response);
            uploadCover = responseData.data.link;
        });
    }
}

signup_btn.addEventListener('click', signUp);
// fb_signup_btn.addEventListener('click', fbSignUp)
