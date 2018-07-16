socket.emit('getLatestPlaylists');

let fivePlaylistInfo;
socket.on('getLatestPlaylists', (socketOn_fivePlaylistInfo) => {
    document.querySelector('.loader').remove();
    fivePlaylistInfo = socketOn_fivePlaylistInfo;
    console.log(fivePlaylistInfo);
    renderLatestPlaylist();

    document.querySelector('.toggle_background_wrap').style.display = 'block';
    document.querySelector('.toggle_background_switch').addEventListener('click', changeBackground);
});

function renderLatestPlaylist() {
    let posts_wrap_node = document.querySelector('.posts_wrap');
    posts_wrap_node.innerHTML = '';

    for (let playlistIndex = 0; playlistIndex < fivePlaylistInfo.length; playlistIndex++) {
        let currentPlaylist = fivePlaylistInfo[playlistIndex];

        let post_node = document.createElement('div');
        post_node.className = 'post';

        let totalLike = 0;
        currentPlaylist.playlistInfo.songList.forEach((song) => {
            totalLike += song.like;
        });

        let song_list_node = document.createElement('div');
        song_list_node.className = 'song_list';

        let song_list_html = `<div class="song_list_des">播放清單</div>`;
        for (let songIndex = 0; songIndex < currentPlaylist.playlistInfo.songList.length; songIndex++) {
            renderSongName = currentPlaylist.playlistInfo.songList[songIndex].songName;

            song_list_html += `
            <div class="song_info">
                <div class="song_name">${renderSongName}</div>
            </div>
            `;
        }
        song_list_node.innerHTML = song_list_html;

        let post_content_node = document.createElement('div');
        post_content_node.className = 'post_content';

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
                    <div class="owner_name">${currentPlaylist.userName}</div>
                </div>
                <div class="more_info">=</div>
            </div>
            <img class="playlist_cover" data-token="${currentPlaylist.playlistInfo.token}" data-listid="${currentPlaylist.playlistInfo.listId}"
            src="${coverPhoto}">
            <div class="playlist_stats">
                <div class="like">♥${totalLike}</div>
                <div class="date">${currentPlaylist.playlistInfo.date.substr(0, 10)}</div>
            </div>
            <div class="playlist_title">${currentPlaylist.playlistInfo.name}</div>
            <div class="playlist_des">${currentPlaylist.playlistInfo.des}</div>
            </div>
            `;

        post_node.appendChild(song_list_node);
        post_node.appendChild(post_content_node);
        posts_wrap_node.appendChild(post_node);
    }

    let more_infos_node = document.querySelectorAll('.more_info');
    more_infos_node.forEach((node) => node.addEventListener('mouseenter', showSongList));
    // more_infos_node.forEach((node) => node.addEventListener('mouseout', hideSongList));

    let playlist_covers_node = document.querySelectorAll('.playlist_cover');
    playlist_covers_node.forEach((node) => node.addEventListener('click', goToTargetPlaylist));
}

function goToTargetPlaylist() {
    window.location = `/profile?id=${this.dataset.token}&list=${this.dataset.listid}`;
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

function countInactivityTime() {
    let idleTime;
    window.onload = resetTimer;
    // DOM Events
    document.onload = resetTimer;
    document.onmousemove = resetTimer;
    // document.onmousedown = resetTimer; // touchscreen presses
    document.ontouchstart = resetTimer;
    // document.onclick = resetTimer; // touchpad clicks
    document.onscroll = resetTimer; // scrolling with arrow keys
    document.onkeypress = resetTimer;

    function idleRender() {
        let idle_background_node = document.createElement('div');
        idle_background_node.className = 'idle_background idle_background-idling';
        idle_background_node.style.zIndex = '100';

        let content_wrap_node = document.querySelector('.content_wrap');
        content_wrap_node.parentNode.appendChild(idle_background_node);

        function random(min, max) {
            let num = Math.floor(Math.random() * (max - min)) + min;
            return num;
        }
        for (let i = 0; i < fivePlaylistInfo.length; i++) {
            for (let j = 0; j < fivePlaylistInfo[i].playlistInfo.songList.length; j++) {
                let album_node = document.createElement('A');
                album_node.className = 'album';

                album_node.style.top = random(0, 80) + '%';
                album_node.style.right = random(0, 80) + '%';
                album_node.href = `/profile?id=${fivePlaylistInfo[i].playlistInfo.token}`;
                album_node.style.animationDelay = random(-6, 0) + 's';

                let bg_url = `https://img.youtube.com/vi/${fivePlaylistInfo[i].playlistInfo.songList[j].url}/hqdefault.jpg`;
                album_node.style.backgroundImage = `url(${bg_url})`;

                idle_background_node.appendChild(album_node);
            }
        }
    }

    function resetTimer() {
        if (document.querySelector('.idle_background-idling')) {
            document.querySelector('.idle_background-idling').remove();
        }
        clearTimeout(idleTime);
        idleTime = setTimeout(idleRender, 10000);
    }
}

function changeBackground() {
    if (document.querySelector('.toggle_background_switch-on')) {
        document.querySelector('.idle_background').remove();
        document.querySelector('.toggle_background_switch-on').classList.remove('toggle_background_switch-on');
    } else {
        document.querySelector('.toggle_background_switch').classList.add('toggle_background_switch-on');
        let idle_background_node = document.createElement('div');
        idle_background_node.className = 'idle_background';

        let content_wrap_node = document.querySelector('.content_wrap');
        content_wrap_node.parentNode.appendChild(idle_background_node);

        function random(min, max) {
            let num = Math.floor(Math.random() * (max - min)) + min;
            return num;
        }
        for (let i = 0; i < fivePlaylistInfo.length; i++) {
            for (let j = 0; j < fivePlaylistInfo[i].playlistInfo.songList.length; j++) {
                let album_node = document.createElement('A');
                album_node.className = 'album';

                album_node.style.top = random(0, 80) + '%';
                album_node.style.right = random(0, 80) + '%';
                album_node.href = `/profile?id=${fivePlaylistInfo[i].playlistInfo.token}`;
                album_node.style.animationDelay = random(-6, 0) + 's';

                let bg_url = `https://img.youtube.com/vi/${fivePlaylistInfo[i].playlistInfo.songList[j].url}/hqdefault.jpg`;
                album_node.style.backgroundImage = `url(${bg_url})`;

                idle_background_node.appendChild(album_node);
            }
        }
    }
}

countInactivityTime();
