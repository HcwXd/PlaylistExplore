console.log('profile');

let userId = "horseman";
let nowPlaying = 0;

socket.emit('getOwnerInfo', userId);


const ownerInfo = {
    userName: "HorseMin",
    avatar: "http://junkee.com/wp-content/uploads/2017/09/Bojack-Horseman-2.jpg",
    bio: "我是馬小明，很小的小，很明的明，這是為了要湊到換行所以才加的一堆字，想看看超過第三行的效果所以又有一些字。",
    playlistInfo: {
        songList: [{
            url: "https://www.youtube.com/watch?v=_PmHj0EP6I8",
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
            url: "https://www.youtube.com/watch?v=_PmHj0EP6I8",
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
            url: "https://www.youtube.com/watch?v=m1ple6Y_C_A",
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
            url: "https://www.youtube.com/watch?v=_PmHj0EP6I8",
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
            url: "https://www.youtube.com/watch?v=_PmHj0EP6I8",
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
    }
};

function urlToPlayer(url) {
    let final_url = urlToId(url)
    var playerHtml = `<iframe width="700" height="400" src="https://www.youtube.com/embed/${final_url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    return playerHtml;
}

function urlToId(url) {
    let sp_url = url.split('?v=');
    let em_url = sp_url[sp_url.length - 1];
    let final_url = em_url.split('&')[0];
    return final_url;
}

function generatePlayer(url) {
    let final_url = urlToId(url)
    player.loadVideoById(final_url)
}

var player;

function onYouTubePlayerAPIReady() {
    var final_url = urlToId(ownerInfo.playlistInfo.songList[0].url)
    player = new YT.Player('video_placeholder', {
        width: '700',
        height: '400',
        videoId: final_url,
        events: {
            onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === 0) {
        if (nowPlaying + 1 < ownerInfo.playlistInfo.songList.length) {
            renderNextPlayer(nowPlaying)
        }
    }
}

function renderNextPlayer() {
    let playlistInfo = ownerInfo.playlistInfo;
    nowPlaying += 1
    index = nowPlaying;

    generatePlayer(playlistInfo.songList[index].url);

    const song_stats = document.querySelector('.song_stats');
    let song_stats_html = `
    <div class="like_btn">♥</div>
    <div class="like_number">${playlistInfo.songList[index].like}</div>`
    song_stats.innerHTML = song_stats_html;

    const song_des = document.querySelector('.song_des');
    let song_des_html = `
    <div class="song_date">${playlistInfo.date}</div>
    <div class="song_text">${playlistInfo.songList[index].des}</div>`
    song_des.innerHTML = song_des_html;

    const comment_wrap = document.querySelector('.comment_wrap');
    let comment_wrap_html = "";
    for (let i = 0; i < playlistInfo.songList[index].comments.length; i++) {
        comment_wrap_html += `
        <div class="comment_info">
            <img class="comment_avatar" src="${playlistInfo.songList[index].comments[i].avatar}" alt="gg">
            <div class="comment_name">${playlistInfo.songList[index].comments[i].userName}</div>
            <div class="comment_content">${playlistInfo.songList[index].comments[i].content}</div>
        </div>`;
    }
    comment_wrap.innerHTML = comment_wrap_html;
}

function renderPlayer() {
    let playlistInfo = this.ownerInfo.playlistInfo;
    let index = this.index;
    nowPlaying = index;

    generatePlayer(playlistInfo.songList[index].url);

    const song_stats = document.querySelector('.song_stats');
    let song_stats_html = `
    <div class="like_btn">♥</div>
    <div class="like_number">${playlistInfo.songList[index].like}</div>`
    song_stats.innerHTML = song_stats_html;

    const song_des = document.querySelector('.song_des');
    let song_des_html = `
    <div class="song_date">${playlistInfo.date}</div>
    <div class="song_text">${playlistInfo.songList[index].des}</div>`
    song_des.innerHTML = song_des_html;

    const comment_wrap = document.querySelector('.comment_wrap');
    let comment_wrap_html = "";
    for (let i = 0; i < playlistInfo.songList[index].comments.length; i++) {
        comment_wrap_html += `
        <div class="comment_info">
            <img class="comment_avatar" src="${playlistInfo.songList[index].comments[i].avatar}" alt="gg">
            <div class="comment_name">${playlistInfo.songList[index].comments[i].userName}</div>
            <div class="comment_content">${playlistInfo.songList[index].comments[i].content}</div>
        </div>`;
    }
    comment_wrap.innerHTML = comment_wrap_html;
}

function renderNewPlayer(ownerInfo, index) {
    const song_stats = document.querySelector('.song_stats');
    let song_stats_html = `
    <div class="like_btn">♥</div>
    <div class="like_number">${ownerInfo.playlistInfo.songList[index].like}</div>`
    song_stats.innerHTML = song_stats_html;

    const song_des = document.querySelector('.song_des');
    let song_des_html = `
    <div class="song_date">${ownerInfo.playlistInfo.date}</div>
    <div class="song_text">${ownerInfo.playlistInfo.songList[index].des}</div>`
    song_des.innerHTML = song_des_html;

    const comment_wrap = document.querySelector('.comment_wrap');
    let comment_wrap_html = "";
    for (let i = 0; i < ownerInfo.playlistInfo.songList[index].comments.length; i++) {
        comment_wrap_html += `
        <div class="comment_info">
            <img class="comment_avatar" src="${ownerInfo.playlistInfo.songList[index].comments[i].avatar}" alt="gg">
            <div class="comment_name">${ownerInfo.playlistInfo.songList[index].comments[i].userName}</div>
            <div class="comment_content">${ownerInfo.playlistInfo.songList[index].comments[i].content}</div>
        </div>`;
    }
    comment_wrap.innerHTML = comment_wrap_html;
}

function renderOwnerInfo(ownerInfo) {
    const owner_info_wrap = document.querySelector('.owner_info_wrap');
    let owner_info_wrap_html = `
        <img class="owner_avatar" src="${ownerInfo.avatar}" alt="gg">
        <div class="owner_name">${ownerInfo.userName}</div>
        <div class="owner_bio">${ownerInfo.bio}</div>`
    owner_info_wrap.innerHTML = owner_info_wrap_html;

    renderNewPlayer(ownerInfo, 0);

    const playlist_info = document.querySelector('.playlist_info');
    let playlist_info_html = `
    <div class="playlist_name">${ownerInfo.playlistInfo.name}</div>
    <div class="playlist_des">${ownerInfo.playlistInfo.des}</div>`
    playlist_info.innerHTML = playlist_info_html;

    const song_list = document.querySelector('.song_list');
    for (let i = 0; i < ownerInfo.playlistInfo.songList.length; i++) {
        let song_info = document.createElement('div');
        song_info.className = "song_info";
        song_info.innerHTML = `
        <div class="song_name">${ownerInfo.playlistInfo.songList[i].songName}</div>
        <div class="song_like">♥ ${ownerInfo.playlistInfo.songList[i].like}</div>`;

        song_info.index = i;
        song_info.ownerInfo = ownerInfo;
        song_info.addEventListener('click', renderPlayer);
        song_list.appendChild(song_info);
    }

}

renderOwnerInfo(ownerInfo);