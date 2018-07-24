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

const compressionRate = 5;

function compress(source_img_obj, quality, output_format) {
    let mime_type;
    if (output_format === 'png') {
        mime_type = 'image/png';
    } else if (output_format === 'webp') {
        mime_type = 'image/webp';
    } else {
        mime_type = 'image/jpeg';
    }

    let cvs = document.createElement('canvas');
    cvs.width = source_img_obj.naturalWidth;
    cvs.height = source_img_obj.naturalHeight;
    cvs.getContext('2d').drawImage(source_img_obj, 0, 0);
    let newImageData = cvs.toDataURL(mime_type, quality / 100);
    let result_image_obj = new Image();
    result_image_obj.src = newImageData;
    return result_image_obj;
}

async function fileToImage(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = ({ target }) => {
            const { result } = target;
            let img = new Image();
            img.src = result;
            resolve(img);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            reject();
        }
    });
}

function imageToFile(image) {
    let base64data = image.src.replace('data:image/jpeg;base64,', '');
    let bs = atob(base64data);
    let buffer = new ArrayBuffer(bs.length);
    let ba = new Uint8Array(buffer);
    for (let i = 0; i < bs.length; i++) {
        ba[i] = bs.charCodeAt(i);
    }
    let blob = new Blob([ba], { type: 'image/jpeg' });
    return blob;
}

async function imageCompression(file) {
    let imageData = await fileToImage(file);
    let compressImage = compress(imageData, compressionRate, 'jpeg');
    return imageToFile(compressImage);
}

function signUp() {
    let reg = new RegExp('^\\w+$');
    let avatar;
    try {
        if (!(username_input.value.length >= 1 && username_input.value.length <= 20)) {
            throw new Error('姓名必須大於 1 個字，少於 20 個字');
        }
        if (!(email_input.value.length >= 1)) {
            throw new Error('請輸入有效 Email 地址');
        }
        if (!email_input.value.includes('@')) {
            throw new Error('請輸入有效 Email 地址');
        }
        if (!reg.test(password_input.value)) {
            throw new Error('密碼只能包含數字、英文字母以及底線');
        }
        if (password_input.value.length < 6) {
            throw new Error('密碼長度須大於 6 個字');
        }
        if (password_input.value !== repassword_input.value) {
            throw new Error('密碼確認不一致');
        }
    } catch (e) {
        alert(e);
        return;
    }
    let user = {
        name: username_input.value,
        account: email_input.value,
        password: Crypto.SHA1(password_input.value),
        avatar: avatar,
    };

    if (avatar_input.files[0]) {
        uploadImgur(user);
    } else {
        avatar = false;
        sentUserSignUpRequest(user);
    }
}

function sentUserSignUpRequest(user) {
    socket.emit('userSignUp', user);
}

// avatar_input.addEventListener('change', uploadImgur);

async function uploadImgur(user) {
    let avatar_input_node = document.querySelector('.avatar_input');

    let files = avatar_input_node.files;

    if (!files.length) {
        sentUserSignUpRequest(user);
    } else {
        if (files[0].size > avatar_input_node.dataset.maxSize * 1024) {
            alert('Please select a smaller file');
            return false;
        }

        console.log('Uploading file to Imgur..');
        console.log(files[0]);

        let apiUrl = 'https://api.imgur.com/3/image';
        let apiKey = '50db29122a23727';

        async function getData3() {
            var defer = $.Deferred();

            let formData = new FormData();
            const file = await imageCompression(files[0]);
            console.log(file);
            formData.append('image', file);

            $.ajax({
                // async: false,
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
                data: formData,
                success: function(response) {
                    defer.resolve(response);
                },
            });

            return defer.promise();
        }
        document.querySelector('.loader').classList.remove('loader_hide');

        $.when(getData3()).done(function(response) {
            responseData = JSON.parse(response);
            user.avatar = responseData.data.link;
            console.log(uploadCover);
            console.log('Remove');
            document.querySelector('.loader').classList.add('loader_hide');
            sentUserSignUpRequest(user);
        });
    }
}

signup_btn.addEventListener('click', signUp);
