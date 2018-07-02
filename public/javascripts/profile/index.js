console.log('profile');

let userId = "horseman"

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
        }],
        name: 'HMM Playlist',
        des: "這是一個讓人頭昏腦脹的歌單",
        date: "2012/12/12"
    }
};

function urlToPlayer(url) {
    var sp_url = url.split('?v=');
    var em_url = sp_url[sp_url.length - 1];
    var final_url = em_url.split('&')[0];
    console.log(final_url);
    var playerHtml = `<iframe width="700" height="400" src="https://www.youtube.com/embed/${final_url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    return playerHtml;
}

function renderOwnerInfo(ownerInfo) {
    const owner_info_wrap = document.querySelector('.owner_info_wrap');
    let owner_info_wrap_html = `<img class="owner_avatar" src="${ownerInfo.avatar}" alt="gg">
        <div class="owner_name">${ownerInfo.userName}</div>
        <div class="owner_bio">${ownerInfo.bio}</div>`
    owner_info_wrap.innerHTML = owner_info_wrap_html;

    const youtube_player = document.querySelector('.youtube_player');
    let playerHtml = urlToPlayer(ownerInfo.playlistInfo.songList[0].url);
    youtube_player.innerHTML = playerHtml;

    const song_stats = document.querySelector('.song_stats');
    let song_stats_html = `<div class="like_btn">♥</div>
    <div class="like_number">${ownerInfo.playlistInfo.songList[0].like}</div>`
    song_stats.innerHTML = song_stats_html;

    const song_des = document.querySelector('.song_des');
    let song_des_html = `<div class="song_date">${ownerInfo.playlistInfo.date}</div>
    <div class="song_text">${ownerInfo.playlistInfo.songList[0].des}</div>`
    song_des.innerHTML = song_des_html;

    const comment_wrap = document.querySelector('.comment_wrap');
    let comment_wrap_html = "";
    for (let i = 0; i < ownerInfo.playlistInfo.songList[0].comments.length; i++) {
        comment_wrap_html += `<div class="comment_info">
        <img class="comment_avatar" src="${ownerInfo.playlistInfo.songList[0].comments[i].avatar}"
          alt="gg">
        <div class="comment_name">${ownerInfo.playlistInfo.songList[0].comments[i].userName}</div>
        <div class="comment_content">${ownerInfo.playlistInfo.songList[0].comments[i].content}</div>
      </div>`;
    }
    comment_wrap.innerHTML = comment_wrap_html;

    const playlist_info = document.querySelector('.playlist_info');
    let playlist_info_html = `<div class="playlist_name">${ownerInfo.playlistInfo.name}</div>
    <div class="playlist_des">${ownerInfo.playlistInfo.des}</div>`
    playlist_info.innerHTML = playlist_info_html;

    const song_list = document.querySelector('.song_list');
    let song_list_html = "";
    for (let i = 0; i < ownerInfo.playlistInfo.songList.length; i++) {
        song_list_html += `<div class="song_info">
        <div class="song_name">${ownerInfo.playlistInfo.songList[i].songName}</div>
        <div class="song_like">♥ ${ownerInfo.playlistInfo.songList[i].like}</div>
      </div>`
    }
    song_list.innerHTML = song_list_html;
}

renderOwnerInfo(ownerInfo);