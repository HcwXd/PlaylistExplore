// const socket = io();

console.log("publish")

const search_result_wrap = document.querySelector('.search_result_wrap');
const add_des_wrap = document.querySelector('.add_des_wrap');
const playlist_status_wrap = document.querySelector('.hidden_block');
const search_btn = document.querySelector('.search_btn');

search_result_wrap.style.display = "none";
add_des_wrap.style.display = "none";
playlist_status_wrap.style.display = "none";

var songList = [];
let singleSongInfos;


function publish() {
    try {
        if (this.songList.length < 1) {
            throw new Error('Playlist must contain at least one song')
        }
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
    let YYYYMMDD = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDay()+1}/${date.getTime()}`;
    let playlistInfo = {
        name: document.querySelector('.playlist_input_row').value,
        des: document.querySelector('.playlist_des_input').value,
        date: date,
        songList: this.songList,
        listId: 1
    };
    console.log(playlistInfo);

    socket.emit('publishNewPlaylist', playlistInfo);
    // window.location = "/profile";
}

function readyToPublish() {
    let publish_wrap = document.createElement('div');
    publish_wrap.className = "publish_wrap";
    publish_wrap.innerHTML = `
    <div class="container">
        <div class="cancel">X</div>
        <div class="field">
            <label>Playlist Name</label>
            <input class="playlist_input_row"  type="text">
        </div>
        <div class="field">
            <label>Playlist Description</label>
            <textarea rows="20" cols="20" class="playlist_des_input" placeholder="Write something about the playlist..."></textarea>
        </div>
        <a data="/profile">
            <div class="real_publish_btn">Publish</div>
        </a>
    </div>
  `;
    let content_wrap = document.querySelector('.content_wrap');
    content_wrap.appendChild(publish_wrap);
    let cancel = document.querySelector('.cancel');
    cancel.addEventListener('click', () => {
        cancel.parentNode.parentNode.parentNode.removeChild(cancel.parentNode.parentNode);
    })
    let real_publish_btn = document.querySelector('.real_publish_btn');
    real_publish_btn.songList = songList;

    real_publish_btn.addEventListener('click', publish);
}

function deleteSongFromPlaylist() {
    let deleteUrlIndex = songList.filter(function (el) {
        return el.url == this.url;
    });
    songList.splice(deleteUrlIndex, 1);
    this.parentNode.parentNode.removeChild(this.parentNode);
}

function addSongToPlaylist() {
    playlist_status_wrap.style.display = "block";

    let des_input = document.querySelector('.des_input');
    this.des = des_input.value;
    des_input.value = "";

    let song_info = document.createElement('div');
    song_info.className = "song_info";

    let song_cover = document.createElement('img');
    song_cover.className = "song_cover";
    song_cover.src = this.cover;

    let song_name = document.createElement('div');
    song_name.className = "song_name";
    song_name.innerHTML = this.songName;

    let song_edit = document.createElement('div');
    song_edit.className = "song_edit";
    song_edit.innerHTML = "X";
    song_edit.url = this.url;

    song_edit.addEventListener('click', deleteSongFromPlaylist);

    song_info.songName = this.songName;
    song_info.cover = this.cover;
    song_info.url = this.url;

    song_info.appendChild(song_cover);
    song_info.appendChild(song_name);
    song_info.appendChild(song_edit);

    let song_list = document.querySelector('.song_list');
    song_list.appendChild(song_info);

    let singleSongInfo = {
        url: this.url,
        songName: this.songName,
        cover: this.cover,
        des: this.des,
        like: 0,
        comments: [],
    };
    songList.push(singleSongInfo);
    add_des_wrap.style.display = "none";
    let publish_btn = document.querySelector('.publish_btn');
    publish_btn.addEventListener('click', readyToPublish)
}


function addDesToSongs() {
    let song_info_collection = document.querySelectorAll('.song_info');
    song_info_collection.forEach(song_info => {
        song_info.style.boxShadow = "0 0"
    })

    this.style.boxShadow = "0px 0px 0px 2px yellow inset"
    add_des_wrap.style.display = "flex";

    let des_input = document.querySelector('.des_input');
    let add_btn = document.querySelector('.add_btn');

    add_btn.url = this.url;
    add_btn.cover = this.cover;
    add_btn.songName = this.songName;

    add_btn.addEventListener('click', addSongToPlaylist);

}

function appendSearchResults(singleSongInfos, rootNode) {
    rootNode.innerHTML = '<div class="pick_des">請選擇你要加入的歌曲</div>';

    for (let i = 0; i < singleSongInfos.length; i++) {
        singleSongInfo = singleSongInfos[i];

        let song_info = document.createElement('div');
        song_info.className = "song_info"
        // song_info.setAttribute("data-url", singleSongInfo.url);

        let song_cover = document.createElement('img');
        song_cover.className = "song_cover"
        song_cover.src = singleSongInfo.cover;

        let song_name = document.createElement('div');
        song_name.className = "song_name"
        song_name.innerHTML = singleSongInfo.songName;

        song_info.songName = singleSongInfo.songName;
        song_info.cover = singleSongInfo.cover;
        song_info.url = singleSongInfo.url;

        song_info.addEventListener('click', addDesToSongs);

        song_info.appendChild(song_cover);
        song_info.appendChild(song_name);
        rootNode.appendChild(song_info);
    }
}

function getSearchResults() {
    const search_input = document.querySelector('.search_input');
    let searchQuery = search_input.value;
    try {
        if (!searchQuery) {
            throw new Error("You must input song's name or url");
        }
    } catch (e) {
        alert(e);
        return;
    }
    search_input.value = "";

    socket.emit('getSearchResults', searchQuery);
    socket.on('getSearchResults', (_singleSongInfos) => {
        singleSongInfos = _singleSongInfos;
        // console.log(singleSongInfos);
        appendSearchResults(singleSongInfos, search_result_wrap)
        search_result_wrap.style.display = "block";
    });

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



}



search_btn.addEventListener('click', getSearchResults)
