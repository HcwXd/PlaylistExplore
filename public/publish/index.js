const compressionRate = 30;

const search_result_wrap_node = document.querySelector('.search_result_wrap');
const playlist_status_wrap_node = document.querySelector('.hidden_block');

let songListState = [];
let uploadCover;

// Get import result
socket.on('getSearchListResults', (socketOn_singleSongInfos) => {
    socketOn_singleSongInfos.forEach(({ songName, cover, url }) => {
        addSongToSongListState(songName, cover, url);
    });
});

// Get search result
socket.on('getSearchResults', (socketOn_singleSongInfos) => {
    appendSearchResults(socketOn_singleSongInfos, search_result_wrap_node);
});

// Bind getSearchResult to the btn and input
const search_input_node = document.querySelector('.search_input');
search_input_node.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        emitSearchQuery();
    }
});
const search_btn_node = document.querySelector('.search_btn');
search_btn_node.addEventListener('click', emitSearchQuery);

// Emit search query
function emitSearchQuery() {
    try {
        if (!search_input_node.value) {
            throw new Error('請輸入歌曲名稱或網址');
        }
    } catch (e) {
        alert(e);
        return;
    }
    socket.emit('getSearchResults', search_input_node.value);
    search_input_node.value = '';
}

// Append search results to node
function appendSearchResults(singleSongInfos, root_node) {
    root_node.style.display = 'block';
    root_node.innerHTML = '<div class="wrap_label">請選擇你要加入的歌曲</div>';

    for (let i = 0; i < singleSongInfos.length; i++) {
        let result_song_info_node = returnResultSongInfoNode(singleSongInfos[i]);
        root_node.appendChild(result_song_info_node);
    }
}

// Return a node for search result song
function returnResultSongInfoNode(singleSongInfo) {
    let song_cover_node = document.createElement('img');
    song_cover_node.className = 'song_cover';
    song_cover_node.src = `https://img.youtube.com/vi/${singleSongInfo.url}/hqdefault.jpg`;

    let song_name_node = document.createElement('div');
    song_name_node.className = 'song_name';
    song_name_node.innerHTML = singleSongInfo.songName;

    let result_song_info_node = document.createElement('div');
    result_song_info_node.className = 'result_song_info';
    result_song_info_node.addEventListener(
        'click',
        (function({ songName, cover, url }) {
            return function() {
                addSongToSongListState(songName, cover, url);
            };
        })(singleSongInfo)
    );

    result_song_info_node.appendChild(song_cover_node);
    result_song_info_node.appendChild(song_name_node);

    return result_song_info_node;
}

// When click on the result, add target to the songListState
function addSongToSongListState(songName, cover, url) {
    renderSongToPlaylistWrap(songName, url);
    addDragHandler();

    let singleSongInfo = {
        url,
        songName,
        cover,
        des: '',
        like: 0,
        comments: [],
    };
    console.log(singleSongInfo);

    songListState.push(singleSongInfo);
}

// Render click target to playlist wrap
function renderSongToPlaylistWrap(songName, songUrl) {
    document.querySelector('.playlist_status_wrap').style.display = 'block';

    let song_info_node = returnSongInfoNode(songName, songUrl);
    document.querySelector('.song_list').appendChild(song_info_node);

    let playlist_status_wrap = document.querySelector('.playlist_status_wrap');
    playlist_status_wrap.scrollTop = playlist_status_wrap.scrollHeight;

    let publish_btn_node = document.querySelector('.publish_btn');
    publish_btn_node.addEventListener('click', showPublishFancyBox);
}

function returnSongInfoNode(songName, songUrl) {
    let song_cover_node = document.createElement('img');
    song_cover_node.className = 'song_cover';
    song_cover_node.src = `https://img.youtube.com/vi/${songUrl}/hqdefault.jpg`;

    let song_name_node = document.createElement('div');
    song_name_node.className = 'song_name';
    song_name_node.innerHTML = songName;

    let song_delete_node = document.createElement('div');
    song_delete_node.className = 'song_delete';
    song_delete_node.innerHTML = 'X';
    song_delete_node.url = songUrl;
    song_delete_node.dataset.url = songUrl;
    song_delete_node.addEventListener('click', deleteSongFromPlaylist);

    let song_des_wrap_node = document.createElement('textarea');
    song_des_wrap_node.className = 'song_des_wrap';
    song_des_wrap_node.placeholder = '請輸入歌曲描述';
    song_des_wrap_node.url = songUrl;
    song_des_wrap_node.dataset.url = songUrl;

    let des_connect_line_node = document.createElement('div');
    des_connect_line_node.className = 'des_connect_line';

    let song_info_node = document.createElement('div');
    song_info_node.className = 'song_info';
    song_info_node.songName = songName;
    song_info_node.cover = `https://img.youtube.com/vi/${songUrl}/hqdefault.jpg`;
    song_info_node.url = songUrl;
    song_info_node.draggable = true;

    song_info_node.appendChild(song_des_wrap_node);
    song_info_node.appendChild(des_connect_line_node);
    song_info_node.appendChild(song_cover_node);
    song_info_node.appendChild(song_name_node);
    song_info_node.appendChild(song_delete_node);

    return song_info_node;
}

function deleteSongFromPlaylist() {
    let deleteUrlIndex = songListState.filter(function(el) {
        return el.url == this.url;
    });
    songListState.splice(deleteUrlIndex, 1);
    this.parentNode.parentNode.removeChild(this.parentNode);
}

function showPublishFancyBox() {
    try {
        if (songListState.length < 1) {
            throw new Error('歌單至少要包含一首歌以上');
        }
    } catch (e) {
        alert(e);
        return;
    }

    let publish_wrap_node = document.createElement('div');
    publish_wrap_node.className = 'publish_wrap';
    publish_wrap_node.innerHTML = `
    <div class="container">
        <div class="cancel">X</div>
        <div class="field">
            <label>歌單名稱*</label>
            <input class="playlist_input_row"  type="text">
        </div>
        <div class="field">
            <label>歌單描述*</label>
            <textarea rows="15" cols="20" class="playlist_des_input"></textarea>
        </div>
        <div class="field">
            <label>歌單封面</label>
            <input class="avatar_input" type="file" name="avatar" data-maxSize="5000">
        </div>
        <a class="publish_loader_wrap">
            <div class="real_publish_btn">發布</div>
        </a>
    </div>
  `;

    let content_wrap_node = document.querySelector('.content_wrap');
    content_wrap_node.appendChild(publish_wrap_node);

    let cancel_node = document.querySelector('.cancel');
    cancel_node.addEventListener('click', () => {
        publish_wrap_node.remove();
    });

    let real_publish_btn_node = document.querySelector('.real_publish_btn');
    real_publish_btn_node.addEventListener('click', publish);
}

function publish() {
    try {
        if (!document.querySelector('.playlist_input_row').value) {
            throw new Error('請輸入歌單名稱');
        }
        if (!document.querySelector('.playlist_des_input').value) {
            throw new Error('請輸入歌單敘述');
        }
    } catch (e) {
        alert(e);
        return;
    }
    uploadImgurBeforePublish();
}

async function uploadImgurBeforePublish() {
    let avatar_input_node = document.querySelector('.avatar_input');

    let files = avatar_input_node.files;

    if (!files.length) {
        redirectToProfile();
    } else {
        if (files[0].size > avatar_input_node.dataset.maxSize * 1024) {
            alert('請選擇一個較小的檔案');
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
            uploadCover = responseData.data.link;
            console.log(uploadCover);
            console.log('Remove');
            document.querySelector('.loader').classList.add('loader_hide');
            redirectToProfile();
        });
    }
}

function redirectToProfile() {
    let date = new Date().toUTCString();
    let playlistInfo = {
        name: document.querySelector('.playlist_input_row').value,
        des: document.querySelector('.playlist_des_input').value,
        date: date,
        songList: returnSonglistAfterDragAndAddDes(),
        listId: -1,
        uploadCover: uploadCover,
    };

    socket.emit('publishNewPlaylist', playlistInfo);

    const userToken = window.location.href.split('?id=')[1];
    window.location = `/profile?id=${userToken}&list=-1`;
}

function returnSonglistAfterDragAndAddDes() {
    let song_name_node_collection = document.querySelectorAll('.song_info > .song_name');
    let song_des_node_collection = document.querySelectorAll('.song_info > .song_des_wrap');

    let readySongNames = [];
    song_name_node_collection.forEach((node) => {
        readySongNames.push(node.innerText);
    });

    let readySongDes = [];
    song_des_node_collection.forEach((node) => {
        readySongDes.push(node.value);
    });

    let newSongListState = [];
    let oldSongListState = [...songListState];

    for (let newIndex = 0; newIndex < readySongNames.length; newIndex++) {
        let popIndex;
        oldSongListState = oldSongListState.map((item) => {
            if (item.songName === readySongNames[newIndex]) {
                item.des = readySongDes[newIndex];
                newSongListState.push(item);
                popIndex = oldSongListState.indexOf(item);
            } else {
                return item;
            }
        });
        if (popIndex > -1) {
            oldSongListState.splice(popIndex, 1);
        }
    }

    return newSongListState;
}

// Handle drag to change the song order of the playlist

function addDragHandler() {
    let song_info_node_collection = document.querySelectorAll('.song_info');
    song_info_node_collection.forEach((item) => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
        item.lastChild.addEventListener('click', deleteSongFromPlaylist);
    });
}

let dragItem = null;

function handleDragStart(e) {
    dragItem = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    // Handle when drop the element, outerHTML won't carry the input value
    e.dataTransfer.setData('text/plain', this.querySelector('.song_des_wrap').value);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('overTop');
    this.style.borderTop = '2px solid yellow';

    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragLeave(e) {
    this.style.borderTop = '0px solid yellow';
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragItem != this) {
        this.parentNode.removeChild(dragItem);
        let dropHTML = e.dataTransfer.getData('text/html');
        let inputValue = e.dataTransfer.getData('text/plain');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        this.previousSibling.querySelector('.song_des_wrap').value = inputValue;

        let dropElem = this.previousSibling;
        addDragHandler(dropElem);
    }
    this.style.borderTop = '0px solid yellow';
    return false;
}

function handleDragEnd(e) {
    this.style.borderTop = '0px solid yellow';
}

// Compression of image

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
