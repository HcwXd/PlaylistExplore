let latestPlaylistInfoState = [];
let lastPlaylistDateState = new Date();
let isRenderingPlaylistState = true;
let isRenderFirstTime = true;

socket.emit('getLatestPlaylists', lastPlaylistDateState);

socket.on('getLatestPlaylists', (socketOn_latestPlaylistInfo) => {
    document.querySelector('.loader').style.display = 'none';

    if (socketOn_latestPlaylistInfo.length === 0) {
        alert('沒有其他歌單囉！');
        return;
    }
    let fiveLatestPlaylistInfo = socketOn_latestPlaylistInfo;
    latestPlaylistInfoState.push(...fiveLatestPlaylistInfo);

    console.log(latestPlaylistInfoState);
    isRenderFirstTime && changeBackground();
    isRenderFirstTime = false;

    renderLatestPlaylist(fiveLatestPlaylistInfo);
    lastPlaylistDateState = fiveLatestPlaylistInfo[fiveLatestPlaylistInfo.length - 1].playlistInfo.date;
    document.querySelector('.toggle_background_wrap').style.display = 'block';
    document.querySelector('.toggle_background_switch').addEventListener('click', changeBackground);
});

function changeBackground() {
    let content_wrap_node = document.querySelector('.content_wrap');
    if (document.querySelector('.toggle_background_switch-on')) {
        document.querySelector('.idle_background').remove();
        document.querySelector('.toggle_background_switch-on').classList.remove('toggle_background_switch-on');
        content_wrap_node.style.display = 'flex';
    } else {
        document.querySelector('.toggle_background_switch').classList.add('toggle_background_switch-on');
        let idle_background_node = createRandomBackgroundNode();
        idle_background_node.className = 'idle_background';

        content_wrap_node.parentNode.appendChild(idle_background_node);
        content_wrap_node.style.display = 'none';
    }
}

function createRandomBackgroundNode() {
    let idle_background_node = document.createElement('div');

    for (let i = 0; i < latestPlaylistInfoState.length; i++) {
        let currentPlaylist = latestPlaylistInfoState[i];
        for (let j = 0; j < currentPlaylist.playlistInfo.songList.length; j++) {
            let album_node = document.createElement('A');
            album_node.className = 'album';
            album_node.style.top = `calc(${random(0, 100)}% - 200px)`;
            album_node.style.right = `calc(${random(0, 100)}% - 200px)`;
            album_node.style.animationDelay = random(-6, 0) + 's';
            album_node.href = `/profile?id=${currentPlaylist.playlistInfo.token}&list=${currentPlaylist.playlistInfo.listId}&song=${currentPlaylist.playlistInfo.songList[j].songIndex}`;
            let bg_url = `https://img.youtube.com/vi/${currentPlaylist.playlistInfo.songList[j].url}/hqdefault.jpg`;
            album_node.style.backgroundImage = `url(${bg_url})`;

            let album_info_node = document.createElement('div');
            album_info_node.className = 'album_info';
            album_info_node.innerHTML = currentPlaylist.playlistInfo.name;
            album_node.appendChild(album_info_node);

            idle_background_node.appendChild(album_node);
        }
    }
    return idle_background_node;
}

function renderLatestPlaylist(fiveLatestPlaylistInfo) {
    let posts_wrap_node = document.querySelector('.posts_wrap');

    for (let playlistIndex = 0; playlistIndex < fiveLatestPlaylistInfo.length; playlistIndex++) {
        let currentPlaylist = fiveLatestPlaylistInfo[playlistIndex];

        let song_list_node = createSonglistNode(currentPlaylist);
        let post_content_node = createPostContentNode(currentPlaylist);

        let post_node = document.createElement('div');
        post_node.className = 'post';

        post_node.appendChild(song_list_node);
        post_node.appendChild(post_content_node);
        posts_wrap_node.appendChild(post_node);

        // Trim songlist if songlist is too long
        if (song_list_node.offsetHeight > post_node.offsetHeight) {
            song_list_node.style.height = `${Math.max(post_node.offsetHeight, 400)}px`;
            song_list_node.style.overflowY = 'scroll';
        }
    }

    let more_infos_node = document.querySelectorAll('.more_info');
    more_infos_node.forEach((node) => node.addEventListener('mouseenter', showSongList));
    isRenderingPlaylistState = false;
}

function createSonglistNode(currentPlaylist) {
    let song_list_node = document.createElement('div');
    song_list_node.className = 'song_list';

    let song_list_html = `<div class="song_list_des">播放清單</div>`;
    for (let songIndex = 0; songIndex < currentPlaylist.playlistInfo.songList.length; songIndex++) {
        renderSongName = currentPlaylist.playlistInfo.songList[songIndex].songName;

        song_list_html += `
        <div class="song_info">
            <a href="/profile?id=${currentPlaylist.playlistInfo.token}&list=${currentPlaylist.playlistInfo.listId}&song=${songIndex}">
            <div class="song_name" data-songid="${songIndex}">${renderSongName}</div>
            </a>
        </div>
        `;
    }
    song_list_node.innerHTML = song_list_html;
    return song_list_node;
}

function createPostContentNode(currentPlaylist) {
    let post_content_node = document.createElement('div');
    post_content_node.className = 'post_content';

    let totalLike = currentPlaylist.playlistInfo.songList.reduce((total, song) => {
        return total + song.like;
    }, 0);

    let coverPhoto;
    if (currentPlaylist.playlistInfo.uploadCover === null) {
        coverPhoto = `https://img.youtube.com/vi/${currentPlaylist.playlistInfo.songList[0].url}/hqdefault.jpg`;
    } else {
        coverPhoto = currentPlaylist.playlistInfo.uploadCover;
    }

    post_content_node.innerHTML = `
            <div class="header">
                <div class="owner_info">
                    <img class="owner_avatar" src="${currentPlaylist.avatar}">
                    <a href="/profile?id=${currentPlaylist.playlistInfo.token}&list=${currentPlaylist.playlistInfo.listId}">
                        <img class="playlist_cover" src="${coverPhoto}">
                    </a>
                </div>
                <div class="more_info">=</div>
            </div>
            <a href="/profile?id=${currentPlaylist.playlistInfo.token}&list=${currentPlaylist.playlistInfo.listId}">
                <img class="playlist_cover" src="${coverPhoto}">
            </a>
            <div class="playlist_stats">
                <div class="like">♥${totalLike}</div>
                <div class="date">${currentPlaylist.playlistInfo.date.substr(0, 10)}</div>
            </div>
            <div class="playlist_title">${currentPlaylist.playlistInfo.name}</div>
            <div class="playlist_des">${currentPlaylist.playlistInfo.des}</div>
            </div>
            `;
    return post_content_node;
}

function showSongList() {
    let song_list_node = this.parentNode.parentNode.previousSibling;
    song_list_node.style.transform = 'rotate(0)';
    song_list_node.style.left = '101%';
    song_list_node.style.opacity = '1';
    song_list_node.addEventListener('mouseout', hideSongListAfterTwoSeconds);
}

function hideSongListAfterTwoSeconds() {
    let leftSonglistTime;
    this.addEventListener('mouseover', () => {
        clearTimeout(leftSonglistTime);
    });
    leftSonglistTime = setTimeout(() => {
        this.style.transform = 'rotate(90deg)';
        this.style.left = '100%';
        this.style.opacity = '0';
    }, 2000);
}

function countIdleTimeToRenderRandomBackground() {
    let idleTime;
    window.onload = resetTimer;
    document.onload = resetTimer;
    document.onmousemove = resetTimer;
    // document.onmousedown = resetTimer; // touchscreen presses
    document.ontouchstart = resetTimer;
    // document.onclick = resetTimer; // touchpad clicks
    document.onscroll = resetTimer; // scrolling with arrow keys
    document.onkeypress = resetTimer;

    function resetTimer() {
        if (document.querySelector('.idle_background-idling')) {
            document.querySelector('.idle_background-idling').remove();
        }
        clearTimeout(idleTime);
        idleTime = setTimeout(renderRandomBackground, 10000);
    }

    function renderRandomBackground() {
        let idle_background_node = createRandomBackgroundNode();

        idle_background_node.className = 'idle_background idle_background-idling';
        idle_background_node.style.zIndex = '100';

        let content_wrap_node = document.querySelector('.content_wrap');
        content_wrap_node.parentNode.appendChild(idle_background_node);
    }
}

function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// countIdleTimeToRenderRandomBackground();
window.onscroll = function(ev) {
    if (!isRenderingPlaylistState) {
        if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 2) {
            isRenderingPlaylistState = true;
            socket.emit('getLatestPlaylists', lastPlaylistDateState);
        }
    }
};
