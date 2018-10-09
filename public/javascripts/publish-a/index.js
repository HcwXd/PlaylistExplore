const compressionRate = 30;

const search_result_wrap_node = document.querySelector('.search_result_wrap');
const playlist_status_wrap_node = document.querySelector('.hidden_block');

let songListState = [];
let uploadCover;
let editInfo;
const queryString = getQueryStringObject();

// Get edit Info
if (window.location.pathname === '/edit') {
    socket.emit('getEditInfo', queryString.id);
}
socket.on('getEditInfo', (socketOn_ownerInfo) => {
    editInfo = socketOn_ownerInfo.playlistInfo;
    console.log(editInfo);
    songListState = editInfo.songList;
    renderEditedPlaylist(songListState);
});

function renderEditedPlaylist(songListState) {
    songListState.forEach((singleSongInfo) => {
        renderSongToPlaylistWrap(singleSongInfo.songName, singleSongInfo.url, singleSongInfo.des);
    });
    addDragHandler();
}

// Get import result
socket.on('getSearchListResults', (socketOn_singleSongInfos) => {
    socketOn_singleSongInfos.forEach(({ songName, cover, url }) => {
        addSongToSongListState(songName, cover, url);
    });
});

// Get search result
socket.on('getSearchResults', (socketOn_singleSongInfos) => {
    appendSearchResults(socketOn_singleSongInfos);
});

socket.on('publishNewPlaylist', (id) => {
    window.location = `/profile?id=${queryString.id}&list=${id}`;
});

// Bind getSearchResult to the btn and input
const search_input_node = document.querySelector('.search_input');
const search_btn_node = document.querySelector('.search_btn');
bindFunctionToInputAndBtn(search_input_node, search_btn_node, emitSearchQuery);

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
function appendSearchResults(singleSongInfos) {
    search_result_wrap_node.style.display = 'flex';
    let fancy_search_result_wrap_node = document.querySelector('.fancy_search_result_wrap');
    fancy_search_result_wrap_node.innerHTML = '<div class="wrap_label">請選擇你要加入的歌曲</div>';

    singleSongInfos.forEach((singleSongInfo) => {
        console.log(singleSongInfo);
        fancy_search_result_wrap_node.appendChild(returnResultSongInfoNode(singleSongInfo));
    });
}

// When click on the result, add target to the songListState
function addSongToSongListState(songName, cover, url) {
    for (let i = 0; i < songListState.length; i++) {
        if (songListState[i].url === url) {
            alert('同首歌只能加入歌單一次哦！');
            return;
        }
    }

    search_result_wrap_node.style.display = 'none';
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
function renderSongToPlaylistWrap(songName, songUrl, des = '') {
    let playlist_status_wrap = document.querySelector('.playlist_status_wrap');
    playlist_status_wrap.style.display = 'block';

    let song_info_node = returnSongInfoNode(songName, songUrl, des);
    document.querySelector('.song_list').appendChild(song_info_node);

    playlist_status_wrap.scrollTop = playlist_status_wrap.scrollHeight;

    document.querySelector('.publish_btn').addEventListener('click', showPublishFancyBox);
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
            <textarea cols=32 rows=30 class="playlist_des_input"></textarea>
        </div>
        <div class="field cover">
            <label>歌單封面</label>
            <input class="avatar_input" type="file" name="avatar" data-maxSize="5000">
        </div>
        <a class="publish_loader_wrap">
            <div class="real_publish_btn">發布</div>
        </a>
    </div>
  `;

    document.body.appendChild(publish_wrap_node);

    if (editInfo) {
        document.querySelector('.playlist_input_row').value = editInfo.name;
        document.querySelector('.playlist_des_input').value = editInfo.des;
        document.querySelector('.cover > label').innerHTML = '歌單封面（若不更改則不需上傳）';
    }

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

    let avatar_input_node = document.querySelector('.avatar_input');
    let files = avatar_input_node.files;
    if (!files.length) {
        redirectToProfile();
    } else {
        uploadImgurBeforePublish(files);
    }
}

async function uploadImgurBeforePublish(files) {
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

function redirectToProfile() {
    let date = new Date();
    let playlistInfo = {
        name: document.querySelector('.playlist_input_row').value,
        des: document.querySelector('.playlist_des_input').value,
        date: date,
        songList: returnSonglistAfterDragAndAddDes(),
        listId: editInfo ? editInfo.listId : -1,
        uploadCover: uploadCover,
        isEdit: editInfo ? true : false,
    };
    if (!uploadCover && editInfo) {
        playlistInfo.uploadCover = editInfo.uploadCover;
    }
    socket.emit('publishNewPlaylist', playlistInfo);
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
        console.log(readySongNames[newIndex]);
        oldSongListState.forEach((singleSongInfo) => {
            if (singleSongInfo.songName === readySongNames[newIndex]) {
                singleSongInfo.des = readySongDes[newIndex];
                newSongListState.push(singleSongInfo);
            }
        });
    }

    return newSongListState;
}
