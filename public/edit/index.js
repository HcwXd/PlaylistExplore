const search_result_wrap_node = document.querySelector('.search_result_wrap');
const add_des_wrap_node = document.querySelector('.add_des_wrap');
const playlist_status_wrap_node = document.querySelector('.hidden_block');

add_des_wrap_node.style.display = 'none';

const userToken = window.location.href.split('?id=')[1];
/*
let playlistInfo = {
    name: document.querySelector('.playlist_input_row').value,
    des: document.querySelector('.playlist_des_input').value,
    date: date,
    songList: playlistInfo.songList,
    listId: 1,
    uploadCover: uploadCover
};
*/
let playlistInfo;
let uploadCover;

socket.emit('getEditInfo', userToken);
socket.on('getEditInfo', (socketOn_ownerInfo) => {
    playlistInfo = socketOn_ownerInfo.playlistInfo;
    console.log(socketOn_ownerInfo);
    console.log(playlistInfo);
    renderOldPlaylist(playlistInfo);
});

function renderOldPlaylist(playlistInfo) {
    for (let songIndex = 0; songIndex < playlistInfo.songList.length; songIndex++) {
        appendToPlaylist(playlistInfo.songList[songIndex].songName, playlistInfo.songList[songIndex].url);
    }
    addDragHandler();
    let publish_btn_node = document.querySelector('.publish_btn');
    publish_btn_node.addEventListener('click', readyToPublish);
}

const search_input_node = document.querySelector('.search_input');
search_input_node.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        getSearchResults();
    }
});

const search_btn_node = document.querySelector('.search_btn');
search_btn_node.addEventListener('click', getSearchResults);

function getSearchResults() {
    let searchQuery = search_input_node.value;

    try {
        if (!searchQuery) {
            throw new Error('請輸入歌曲名稱或網址');
        }
    } catch (e) {
        alert(e);
        return;
    }

    search_input_node.value = '';

    socket.emit('getSearchResults', searchQuery);
    socket.on('getSearchResults', (socketOn_singleSongInfos) => {
        let singleSongInfos = socketOn_singleSongInfos;
        appendSearchResults(singleSongInfos, search_result_wrap_node);
    });
}

function appendSearchResults(singleSongInfos, root_node) {
    root_node.style.display = 'block';
    root_node.innerHTML = '<div class="pick_des">請選擇你要加入的歌曲</div>';

    for (let i = 0; i < singleSongInfos.length; i++) {
        let singleSongInfo = singleSongInfos[i];

        let song_cover_node = document.createElement('img');
        song_cover_node.className = 'song_cover';
        song_cover_node.src = `https://img.youtube.com/vi/${singleSongInfo.url}/hqdefault.jpg`;

        let song_name_node = document.createElement('div');
        song_name_node.className = 'song_name';
        song_name_node.innerHTML = singleSongInfo.songName;

        let result_song_info_node = document.createElement('div');
        result_song_info_node.className = 'result_song_info';

        result_song_info_node.songName = singleSongInfo.songName;
        result_song_info_node.cover = singleSongInfo.cover;
        result_song_info_node.url = singleSongInfo.url;
        result_song_info_node.addEventListener('click', addSongToPlaylist);

        result_song_info_node.appendChild(song_cover_node);
        result_song_info_node.appendChild(song_name_node);
        root_node.appendChild(result_song_info_node);
    }
}

function showDesAddingWrap() {
    add_des_wrap_node.style.display = 'flex';
    let add_btn_node = document.querySelector('.add_btn');
    let des_input_node = document.querySelector('.des_input');

    playlistInfo.songList.some((item) => {
        if (item.url === this.dataset.url) {
            if (item.des) {
                des_input_node.value = item.des;
            } else {
                des_input_node.value = '';
            }
            return;
        }
    });
    add_btn_node.url = this.dataset.url;
    add_btn_node.addEventListener('click', addDesToSong);
}

function addDesToSong() {
    let songUrl = this.url;
    let des_input_node = document.querySelector('.des_input');

    playlistInfo.songList.some((item) => {
        if (item.url === songUrl) {
            item.des = des_input_node.value;
            return;
        }
    });
    console.log('Update playlistInfo.songList');

    console.log(playlistInfo.songList);
    add_des_wrap_node.style.display = 'none';
    des_input_node.value = '';
}

function addSongToPlaylist() {
    let result_song_info_node_collection = document.querySelectorAll('.result_song_info');
    result_song_info_node_collection.forEach((node) => {
        node.style.boxShadow = '0 0';
    });
    this.style.boxShadow = '0px 0px 0px 2px yellow inset';
    playlist_status_wrap_node.style.display = 'block';
    add_des_wrap_node.style.display = 'none';

    appendToPlaylist(this.songName, this.url);

    addDragHandler();

    let singleSongInfo = {
        url: this.url,
        songName: this.songName,
        cover: this.cover,
        des: this.des,
        like: 0,
        comments: [],
    };
    playlistInfo.songList.push(singleSongInfo);

    let playlist_status_wrap = document.querySelector('.playlist_status_wrap');
    playlist_status_wrap.scrollTop = playlist_status_wrap.scrollHeight;

    let publish_btn_node = document.querySelector('.publish_btn');
    publish_btn_node.addEventListener('click', readyToPublish);
}

function appendToPlaylist(songName, songUrl) {
    let song_cover_node = document.createElement('img');
    song_cover_node.className = 'song_cover';
    song_cover_node.src = `https://img.youtube.com/vi/${songUrl}/hqdefault.jpg`;

    let song_name_node = document.createElement('div');
    song_name_node.className = 'song_name';
    song_name_node.innerHTML = songName;

    let song_edit_node = document.createElement('div');
    song_edit_node.className = 'song_edit';
    song_edit_node.innerHTML = 'X';
    song_edit_node.url = songUrl;
    song_edit_node.dataset.url = songUrl;
    song_edit_node.addEventListener('click', deleteSongFromPlaylist);

    let song_add_des_node = document.createElement('div');
    song_add_des_node.className = 'song_add_des';
    song_add_des_node.innerHTML = '+';
    song_add_des_node.url = songUrl;
    song_add_des_node.dataset.url = songUrl;
    song_add_des_node.addEventListener('click', showDesAddingWrap);

    let song_info_node = document.createElement('div');
    song_info_node.className = 'song_info';
    song_info_node.songName = songName;
    song_info_node.cover = `https://img.youtube.com/vi/${songUrl}/hqdefault.jpg`;
    song_info_node.url = songUrl;
    song_info_node.draggable = true;

    song_info_node.appendChild(song_add_des_node);
    song_info_node.appendChild(song_cover_node);
    song_info_node.appendChild(song_name_node);
    song_info_node.appendChild(song_edit_node);

    let song_list_node = document.querySelector('.song_list');
    song_list_node.appendChild(song_info_node);
}

function deleteSongFromPlaylist() {
    let deleteUrlIndex = playlistInfo.songList.filter(function(el) {
        return el.url == this.url;
    });
    playlistInfo.songList.splice(deleteUrlIndex, 1);
    this.parentNode.parentNode.removeChild(this.parentNode);
}

function readyToPublish() {
    try {
        if (playlistInfo.songList.length < 1) {
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
            <textarea rows="15" cols="20" class="playlist_des_input" placeholder="Write something about the playlist..."></textarea>
        </div>
        <div class="field">
            <label>歌單封面照片（若不更改則不需上傳）</label>
            <input class="avatar_input" type="file" name="avatar" data-maxSize="5000">
        </div>
        <a class="publish_loader_wrap">
            <div class="real_publish_btn">發布</div>
        </a>
    </div>
  `;

    let content_wrap_node = document.querySelector('.content_wrap');
    content_wrap_node.appendChild(publish_wrap_node);

    document.querySelector('.playlist_input_row').value = playlistInfo.name;
    document.querySelector('.playlist_des_input').value = playlistInfo.des;
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
    uploadImgur();
}

function uploadImgur() {
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

        let apiUrl = 'https://api.imgur.com/3/image';
        let apiKey = '50db29122a23727';

        function getData3() {
            var defer = $.Deferred();

            let formData = new FormData();
            formData.append('image', files[0]);

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
    let editPlaylistInfo = {
        name: document.querySelector('.playlist_input_row').value,
        des: document.querySelector('.playlist_des_input').value,
        date: playlistInfo.date,
        songList: returnChangeDragOrderSonglist(),
        listId: playlistInfo.listId,
        uploadCover: uploadCover || playlistInfo.uploadCover,
    };
    console.log(editPlaylistInfo);

    socket.emit('publishNewPlaylist', editPlaylistInfo);
}

socket.on('publishNewPlaylist', (socketOn_listId) => {
    const userToken = window.location.href.split('?id=')[1];
    window.location = `/profile?id=${userToken}&list=${socketOn_listId}`;
});

function returnChangeDragOrderSonglist() {
    let song_name_node_collection = document.querySelectorAll('.song_info > .song_name');
    let readySongNames = [];
    song_name_node_collection.forEach((node) => {
        readySongNames.push(node.innerText);
    });

    let newSongListState = [];
    let oldSongListState = [...playlistInfo.songList];

    for (let newIndex = 0; newIndex < readySongNames.length; newIndex++) {
        let popIndex;
        oldSongListState = oldSongListState.map((item) => {
            if (item.songName === readySongNames[newIndex]) {
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

let dragItem = null;

function addDragHandler() {
    let song_info_node_collection = document.querySelectorAll('.song_info');
    song_info_node_collection.forEach((item) => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
        item.lastChild.addEventListener('click', deleteSongFromPlaylist);
        item.firstChild.addEventListener('click', showDesAddingWrap);
    });
}

function handleDragStart(e) {
    dragItem = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
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
    console.log('handleDrop', this);

    if (dragItem != this) {
        this.parentNode.removeChild(dragItem);
        let dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        let dropElem = this.previousSibling;
        addDragHandler(dropElem);
    }
    this.style.borderTop = '0px solid yellow';
    return false;
}

function handleDragEnd(e) {
    this.style.borderTop = '0px solid yellow';
}
