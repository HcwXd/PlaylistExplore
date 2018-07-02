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

function publish() {
    socket.emit('publishNewPlaylist', songList);
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
    publish_btn.addEventListener('click', publish)
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

    add_btn.des = des_input.value;
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
    search_input.value = "";
    console.log(searchQuery);
    socket.emit('getSearchResults', searchQuery);

    let singleSongInfos = [{
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

    appendSearchResults(singleSongInfos, search_result_wrap)
    search_result_wrap.style.display = "block";


}



search_btn.addEventListener('click', getSearchResults)