// const socket = io();

console.log("publish")

const search_result_wrap = document.querySelector('.search_result_wrap');
const add_des_wrap = document.querySelector('.add_des_wrap');
const playlist_status_wrap = document.querySelector('.hidden_block');
const search_btn = document.querySelector('.search_btn');

search_result_wrap.style.display = "none";
add_des_wrap.style.display = "none";
playlist_status_wrap.style.display = "none";


function appendSearchResults(singleSongInfos, rootNode) {

    for (let i = 0; i < singleSongInfos.length; i++) {
        singleSongInfo = singleSongInfos[i];

        let song_info = document.createElement('div');
        song_info.className = "song_info"
        song_info.setAttribute("data-url", singleSongInfo.url);

        // song_info.dataset = singleSongInfo.url;

        let song_cover = document.createElement('img');
        song_cover.className = "song_cover"
        song_cover.src = singleSongInfo.cover;

        let song_name = document.createElement('div');
        song_name.className = "song_name"
        song_name.innerHTML = singleSongInfo.songName;

        song_info.appendChild(song_cover);
        song_info.appendChild(song_name);
        rootNode.appendChild(song_info);
    }
}

function getSearchResults() {
    const search_input = document.querySelector('.search_input');
    let searchQuery = search_input.value;
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