const search_result_wrap_node = document.querySelector('.search_result_wrap');
const add_des_wrap_node = document.querySelector('.add_des_wrap');
const playlist_status_wrap_node = document.querySelector('.hidden_block');

search_result_wrap_node.style.display = "none";
add_des_wrap_node.style.display = "none";
playlist_status_wrap_node.style.display = "none";

let songListState = [];

const search_input_node = document.querySelector('.search_input');
search_input_node.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        getSearchResults();
    }
});

const search_btn_node = document.querySelector('.search_btn');
search_btn_node.addEventListener('click', getSearchResults)

function getSearchResults() {
    let searchQuery = search_input_node.value;

    try {
        if (!searchQuery) {
            throw new Error("You must input song's name or url");
        }
    } catch (e) {
        alert(e);
        return;
    }

    search_input_node.value = "";

    socket.emit('getSearchResults', searchQuery);
    socket.on('getSearchResults', (socketOn_singleSongInfos) => {
        let singleSongInfos = socketOn_singleSongInfos;
        appendSearchResults(singleSongInfos, search_result_wrap_node)
    });
}

function appendSearchResults(singleSongInfos, root_node) {
    root_node.style.display = "block";
    root_node.innerHTML = '<div class="pick_des">請選擇你要加入的歌曲</div>';

    for (let i = 0; i < singleSongInfos.length; i++) {
        let singleSongInfo = singleSongInfos[i];



        let song_cover_node = document.createElement('img');
        song_cover_node.className = "song_cover"
        song_cover_node.src = `https://img.youtube.com/vi/${singleSongInfo.url}/hqdefault.jpg`

        let song_name_node = document.createElement('div');
        song_name_node.className = "song_name"
        song_name_node.innerHTML = singleSongInfo.songName;

        let result_song_info_node = document.createElement('div');
        result_song_info_node.className = "result_song_info"
        result_song_info_node.songName = singleSongInfo.songName;
        result_song_info_node.cover = singleSongInfo.cover;
        result_song_info_node.url = singleSongInfo.url;
        result_song_info_node.addEventListener('click', addDesToPickedSong);

        result_song_info_node.appendChild(song_cover_node);
        result_song_info_node.appendChild(song_name_node);
        root_node.appendChild(result_song_info_node);
    }
}

function addDesToPickedSong() {
    let result_song_info_node_collection = document.querySelectorAll('.result_song_info');
    result_song_info_node_collection.forEach(node => {
        node.style.boxShadow = "0 0"
    })

    this.style.boxShadow = "0px 0px 0px 2px yellow inset"
    add_des_wrap_node.style.display = "flex";

    let add_btn_node = document.querySelector('.add_btn');
    add_btn_node.url = this.url;
    add_btn_node.cover = this.cover;
    add_btn_node.songName = this.songName;

    add_btn_node.addEventListener('click', addSongToPlaylist);
}

function addSongToPlaylist() {
    playlist_status_wrap_node.style.display = "block";
    add_des_wrap_node.style.display = "none";

    let des_input_node = document.querySelector('.des_input');
    this.des = des_input_node.value;
    des_input_node.value = "";

    let song_cover_node = document.createElement('img');
    song_cover_node.className = "song_cover";
    song_cover_node.src = `https://img.youtube.com/vi/${this.url}/hqdefault.jpg`;

    let song_name_node = document.createElement('div');
    song_name_node.className = "song_name";
    song_name_node.innerHTML = this.songName;

    let song_edit_node = document.createElement('div');
    song_edit_node.className = "song_edit";
    song_edit_node.innerHTML = "X";
    song_edit_node.url = this.url;
    song_edit_node.addEventListener('click', deleteSongFromPlaylist);

    let song_info_node = document.createElement('div');
    song_info_node.className = "song_info";
    song_info_node.songName = this.songName;
    song_info_node.cover = `https://img.youtube.com/vi/${this.url}/hqdefault.jpg`;
    song_info_node.url = this.url;

    song_info_node.appendChild(song_cover_node);
    song_info_node.appendChild(song_name_node);
    song_info_node.appendChild(song_edit_node);

    let song_list_node = document.querySelector('.song_list');
    song_list_node.appendChild(song_info_node);

    let singleSongInfo = {
        url: this.url,
        songName: this.songName,
        cover: this.cover,
        des: this.des,
        like: 0,
        comments: [],
    };
    songListState.push(singleSongInfo);

    let publish_btn_node = document.querySelector('.publish_btn');
    publish_btn_node.addEventListener('click', readyToPublish)
}

function deleteSongFromPlaylist() {
    let deleteUrlIndex = songListState.filter(function (el) {
        return el.url == this.url;
    });
    songListState.splice(deleteUrlIndex, 1);
    this.parentNode.parentNode.removeChild(this.parentNode);
}

function readyToPublish() {
    try {
        if (songListState.length < 1) {
            throw new Error('Playlist must contain at least one song')
        }
    } catch (e) {
        alert(e);
        return;
    }

    let publish_wrap_node = document.createElement('div');
    publish_wrap_node.className = "publish_wrap";
    publish_wrap_node.innerHTML = `
    <div class="container">
        <div class="cancel">X</div>
        <div class="field">
            <label>Playlist Name</label>
            <input class="playlist_input_row"  type="text">
        </div>
        <div class="field">
            <label>Playlist Description</label>
            <textarea rows="15" cols="20" class="playlist_des_input" placeholder="Write something about the playlist..."></textarea>
        </div>
        <div class="field">
            <label>Cover</label>
            <input class="avatar_input" type="file" name="avatar">
        </div>
        <a data="/profile">
            <div class="real_publish_btn">Publish</div>
        </a>
    </div>
  `;

    let content_wrap_node = document.querySelector('.content_wrap');
    content_wrap_node.appendChild(publish_wrap_node);

    let cancel_node = document.querySelector('.cancel');
    cancel_node.addEventListener('click', () => {
        publish_wrap_node.remove()
    })

    let real_publish_btn_node = document.querySelector('.real_publish_btn');
    real_publish_btn_node.addEventListener('click', publish);
}










function publish() {
    try {
        if (!document.querySelector('.playlist_input_row').value) {
            throw new Error('Playlist must have name')
        }
        if (!document.querySelector('.playlist_des_input').value) {
            throw new Error('Playlist must have description')
        }
    } catch (e) {
        alert(e);
        return;
    }

    let date = new Date();
    let uploadCover = document.querySelector('.avatar_input').files[0];
    let playlistInfo = {
        name: document.querySelector('.playlist_input_row').value,
        des: document.querySelector('.playlist_des_input').value,
        date: date,
        songList: songListState,
        listId: 1,
        uploadCover: uploadCover
    };
    socket.emit('publishNewPlaylist', playlistInfo);

    const userToken = window.location.href.split('?')[1];
    window.location = `/profile?${userToken}`;
}


























let __singleSongInfos = [{
    url: 'https://www.youtube.com/watch?v=YisGZ_Yl-A8',
    songName: 'SmashRegz/違法 - 搭便車 ft. Triple T / 三小湯 (Music Video)',
    cover: 'https://i.ytimg.com/vi/_PmHj0EP6I8/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDnEUnGLF16aSZnbx2bzSZRxSa6mQ',
    des: '',
    like: 0,
    comments: []
}, {
    url: 'https://www.youtube.com/watch?v=YisGZ_Yl-A8',
    songName: 'SmashRegz/違法 - 搭便車 ft. Triple T / 三小湯 (Music Video)',
    cover: 'https://i.ytimg.com/vi/_PmHj0EP6I8/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDnEUnGLF16aSZnbx2bzSZRxSa6mQ',
    des: '',
    like: 0,
    comments: []
}, {
    url: 'https://www.youtube.com/watch?v=YisGZ_Yl-A8',
    songName: 'SmashRegz/違法 - 搭便車 ft. Triple T / 三小湯 (Music Video)',
    cover: 'https://i.ytimg.com/vi/_PmHj0EP6I8/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDnEUnGLF16aSZnbx2bzSZRxSa6mQ',
    des: '',
    like: 0,
    comments: []
}, {
    url: 'https://www.youtube.com/watch?v=YisGZ_Yl-A8',
    songName: 'SmashRegz/違法 - 搭便車 ft. Triple T / 三小湯 (Music Video)',
    cover: 'https://i.ytimg.com/vi/_PmHj0EP6I8/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDnEUnGLF16aSZnbx2bzSZRxSa6mQ',
    des: '',
    like: 0,
    comments: []
}];