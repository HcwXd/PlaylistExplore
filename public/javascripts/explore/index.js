socket.emit('getLatestPlaylists');

let fivePlaylistInfo;
socket.on('getLatestPlaylists', (socketOn_fivePlaylistInfo) => {

    fivePlaylistInfo = socketOn_fivePlaylistInfo;
    console.log(fivePlaylistInfo);
    renderLatestPlaylist();
})

function renderLatestPlaylist() {
    let posts_wrap_node = document.querySelector('.posts_wrap');
    posts_wrap_node.innerHTML = "";

    for (let playlistIndex = 0; playlistIndex < fivePlaylistInfo.length; playlistIndex++) {
        let currentPlaylist = fivePlaylistInfo[playlistIndex];

        let post_node = document.createElement('div');
        post_node.className = 'post';

        let totalLike = 0;
        currentPlaylist.playlistInfo.songList.forEach(song => {
            totalLike += song.like;
        });

        let song_list_node = document.createElement('div');
        song_list_node.className = "song_list";

        let song_list_html = `<div class="song_list_des">播放清單</div>`;
        for (let songIndex = 0; songIndex < currentPlaylist.playlistInfo.songList.length; songIndex++) {

            if (currentPlaylist.playlistInfo.songList[songIndex].songName.length > 11) {
                renderSongName = currentPlaylist.playlistInfo.songList[songIndex].songName.substring(0, 11) + ' ...';
            } else {
                renderSongName = currentPlaylist.playlistInfo.songList[songIndex].songName;
            }

            song_list_html += `
            <div class="song_info">
                <div class="song_name">${renderSongName}</div>
            </div>
            `
        }
        song_list_node.innerHTML = song_list_html;

        let post_content_node = document.createElement('div');
        post_content_node.className = 'post_content'

        post_content_node.innerHTML = `
            <div class="header">
                <div class="owner_info">
                    <img class="owner_avatar" src="${currentPlaylist.avatar}">
                    <div class="owner_name">${currentPlaylist.userName}</div>
                </div>
                <div class="more_info">=</div>
            </div>
            <img class="playlist_cover" data-token="${currentPlaylist.playlistInfo.token}" 
            src="https://img.youtube.com/vi/${currentPlaylist.playlistInfo.songList[0].url}/hqdefault.jpg">
            <div class="playlist_stats">
                <div class="like">♥${totalLike}</div>
                <div class="date">${currentPlaylist.playlistInfo.date.substr(0,10)}</div>
            </div>
            <div class="playlist_title">${currentPlaylist.playlistInfo.name}</div>
            <div class="playlist_des">${currentPlaylist.playlistInfo.des}</div>
            </div>
            `

        post_node.appendChild(song_list_node);
        post_node.appendChild(post_content_node);
        posts_wrap_node.appendChild(post_node);
    };

    let more_infos_node = document.querySelectorAll('.more_info');
    more_infos_node.forEach(node => node.addEventListener('mouseout', hideSongList))
    more_infos_node.forEach(node => node.addEventListener('mouseenter', showSongList))

    let playlist_covers_node = document.querySelectorAll('.playlist_cover');
    playlist_covers_node.forEach(node => node.addEventListener('click', goToTargetPlaylist))
}

function goToTargetPlaylist() {
    window.location = `/profile?${this.dataset.token}`;
}

function showSongList() {
    let song_list_node = this.parentNode.parentNode.previousSibling;
    song_list_node.style.transform = "rotate(0)";
    song_list_node.style.left = "101%";
    song_list_node.style.opacity = "1";
}

function hideSongList() {
    let song_list_node = this.parentNode.parentNode.previousSibling;
    song_list_node.style.transform = "rotate(90deg)"
    song_list_node.style.left = "100%"
    song_list_node.style.opacity = "0";
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
        idle_background_node.className = "idle_background";

        let content_wrap_node = document.querySelector('.content_wrap');
        content_wrap_node.parentNode.appendChild(idle_background_node);

        function random(min, max) {
            let num = Math.floor(Math.random() * (max - min)) + min;
            return num;
        }
        for (let i = 0; i < fivePlaylistInfo.length; i++) {
            for (let j = 0; j < fivePlaylistInfo[i].playlistInfo.songList.length; j++) {

                let album_node = document.createElement("A");
                album_node.className = "album";

                album_node.style.top = random(0, 80) + "%";
                album_node.style.right = random(0, 80) + "%";
                album_node.href = `/profile?${fivePlaylistInfo[i].playlistInfo.token}`
                album_node.style.animationDelay = random(-6, 0) + "s";

                let bg_url = `https://img.youtube.com/vi/${fivePlaylistInfo[i].playlistInfo.songList[j].url}/hqdefault.jpg`
                album_node.style.backgroundImage = `url(${bg_url})`

                idle_background_node.appendChild(album_node);
            }

        }
    }

    function resetTimer() {
        if (document.querySelector('.idle_background')) {
            document.querySelector('.idle_background').remove();
        }
        clearTimeout(idleTime);
        idleTime = setTimeout(idleRender, 2000)

    }
};

countInactivityTime();
















var __fivePlaylistInfo = [{
    userName: "Apple",
    avatar: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
    songList: [{
        url: "_PmHj0EP6I8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/djACkCHl3JA/maxresdefault.jpg",
        des: "這是一首不規則的歌",
        like: 51,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "59exS8nTE-k",
        songName: "既視感 - 不規則鐘擺擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "T8jZJt_vFPA",
        songName: "Soft Lipa 蛋堡-回到過去",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 71,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "H5iAG56dUwE",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "x3bDhtuC5yk",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真規則的一首歌'
            }
        ],
    }],
    name: 'HMM Playlist',
    des: "這是一個讓人頭昏腦脹的歌單",
    date: "2012/12/12"
}, {
    userName: "Apple",
    avatar: "https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg",
    songList: [{
        url: "Q0Nn4TUXH5Y",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/AQWYfvgh_ws/maxresdefault.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "AQWYfvgh_ws",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "8vobf7pjLlA",
        songName: "Soft Lipa 蛋堡-回到過去",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 71,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "BlblBvpVgjE",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "4z9o8GwxBz8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真規則的一首歌'
            }
        ],
    }],
    name: 'HMM Playlist',
    des: "這是一個讓人頭昏腦脹的歌單",
    date: "2012/12/12"
}, {
    userName: "Apple",
    avatar: "http://junkee.com/wp-content/uploads/2017/09/Bojack-Horseman-2.jpg",
    songList: [{
        url: "NxngOIdRdqE",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/UzMtXbmKZfE/maxresdefault.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "_PmHj0EP6I8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "p2OImxGvfSA",
        songName: "Soft Lipa 蛋堡-回到過去",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 71,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "jZzzwd_CDQM",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "c9PEYJdwdwI",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真規則的一首歌'
            }
        ],
    }],
    name: 'HMM Playlist',
    des: "這是一個讓人頭昏腦脹的歌單",
    date: "2012/12/12"
}, {
    userName: "Apple",
    avatar: "https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg",
    songList: [{
        url: "_PmHj0EP6I8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/x3bDhtuC5yk/maxresdefault.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "LXS-LbbqfCw",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "Q0W--O7aWBg",
        songName: "Soft Lipa 蛋堡-回到過去",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 71,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "IOc4P4AnNiU",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "FiJHoPrS4Y4",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真規則的一首歌'
            }
        ],
    }],
    name: 'HMM Playlist',
    des: "這是一個讓人頭昏腦脹的歌單",
    date: "2012/12/12"
}, {
    userName: "Apple",
    avatar: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
    songList: [{
        url: "AK6pJmeqR6M",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/mfvHGShQO_w/maxresdefault.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "hSTMT9dmQM8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "sOome7baXD0",
        songName: "Soft Lipa 蛋堡-回到過去",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 71,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "D8Pn_h5XgGc",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首不規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真不規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真不規則的一首歌'
            }
        ],
    }, {
        url: "Mgfs3qRSwLw",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg",
        des: "這是一首規則的歌",
        like: 81,
        comments: [{
                userName: 'Penguin',
                avatar: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',
                content: '這首歌真規則'
            },
            {
                userName: 'Apple',
                avatar: 'https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg',
                content: '真規則的一首歌'
            }
        ],
    }],
    name: 'HMM Playlist',
    des: "這是一個讓人頭昏腦脹的歌單",
    date: "2012/12/12"
}];