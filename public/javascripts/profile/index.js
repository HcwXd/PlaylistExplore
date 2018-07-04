console.log('profile');
let userInfo;
socket.emit('getUserInfo');
socket.on('getUserInfo', (_userInfo) => {
    userInfo = _userInfo;
    console.log(userInfo);
});

let userId = "horseman";
let nowPlayingIndex = 0;

let ownerInfo;
socket.emit('getOwnerInfo');
socket.on('getOwnerInfo', (_ownerInfo) => {
    ownerInfo = _ownerInfo;
    console.log(ownerInfo);
    renderOwnerInfo(ownerInfo);
})

const _ownerInfo = {
    userName: "HorseMin",
    avatar: "http://junkee.com/wp-content/uploads/2017/09/Bojack-Horseman-2.jpg",
    bio: "我是馬小明，很小的小，很明的明，這是為了要湊到換行所以才加的一堆字，想看看超過第三行的效果所以又有一些字。",
    playlistInfo: {
        songList: []
    }
}
const __ownerInfo = {
    userName: "HorseMin",
    avatar: "http://junkee.com/wp-content/uploads/2017/09/Bojack-Horseman-2.jpg",
    bio: "我是馬小明，很小的小，很明的明，這是為了要湊到換行所以才加的一堆字，想看看超過第三行的效果所以又有一些字。",
    playlistInfo: {
        songList: [{
            url: "x3bDhtuC5yk",
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
            url: "x3bDhtuC5yk",
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
    }
};

function urlToPlayer(url) {
    let final_url = url;
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
    // let final_url = urlToId(url)
    player.loadVideoById(url)
}

var player;

function onYouTubePlayerAPIReady() {
    // var final_url = ownerInfo.playlistInfo.songList[0].url;
    var final_url = 'x3bDhtuC5yk';
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
        if (nowPlayingIndex + 1 < ownerInfo.playlistInfo.songList.length) {
            renderNextPlayer(nowPlayingIndex)
        }
    }
}

function renderNextPlayer() {
    let playlistInfo = ownerInfo.playlistInfo;
    nowPlayingIndex += 1
    index = nowPlayingIndex;

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
    let like_btn = document.querySelector('.like_btn');
    like_btn.addEventListener('click', addLike);
}

function renderPlayer() {
    let playlistInfo = this.ownerInfo.playlistInfo;
    let index = this.index;
    nowPlayingIndex = index;

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
    let like_btn = document.querySelector('.like_btn');
    like_btn.addEventListener('click', addLike);
}

function renderNewPlayer(ownerInfo, index) {

    if (ownerInfo.playlistInfo.songList.length === 0) {
        let comment_submit = document.querySelector('.comment_submit');
        comment_submit.innerHTML = "目前還沒有任何播放清單";
        comment_submit.style.justifyContent = "space-around";
        comment_submit.style.fontSize = "24px";

    }

    let song_stats = document.querySelector('.song_stats');
    let song_stats_html = `
    <div class="like_btn">♥</div>
    <div class="like_number">${ownerInfo.playlistInfo.songList[index].like}</div>`
    song_stats.innerHTML = song_stats_html;

    const song_des = document.querySelector('.song_des');
    let song_des_html = `
    <div class="song_date">${ownerInfo.playlistInfo.date}</div>
    <div class="song_text">${ownerInfo.playlistInfo.songList[index].des}</div>`
    song_des.innerHTML = song_des_html;

    let comment_wrap = document.querySelector('.comment_wrap');
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
    let like_btn = document.querySelector('.like_btn');
    like_btn.addEventListener('click', addLike);
}

function renderOwnerInfo(ownerInfo) {
    let owner_info_wrap = document.querySelector('.owner_info_wrap');
    let owner_info_wrap_html = `
        <img class="owner_avatar" src="${ownerInfo.avatar}" alt="gg">
        <div class="owner_name">${ownerInfo.userName}</div>
        <div class="owner_bio">${ownerInfo.bio}</div>`
    owner_info_wrap.innerHTML = owner_info_wrap_html;
    addEditBioBtn();

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


function renderNewComment(ownerInfo) {
    let comment_wrap = document.querySelector('.comment_wrap');
    let comment_wrap_html = "";
    for (let i = 0; i < ownerInfo.playlistInfo.songList[nowPlayingIndex].comments.length; i++) {
        comment_wrap_html += `
        <div class="comment_info">
            <img class="comment_avatar" src="${ownerInfo.playlistInfo.songList[nowPlayingIndex].comments[i].avatar}" alt="gg">
            <div class="comment_name">${ownerInfo.playlistInfo.songList[nowPlayingIndex].comments[i].userName}</div>
            <div class="comment_content">${ownerInfo.playlistInfo.songList[nowPlayingIndex].comments[i].content}</div>
        </div>`;
    }
    comment_wrap.innerHTML = comment_wrap_html;
}

function addComment() {
    let commentId = userInfo[0].token;
    // Haven't define
    let listOwnerId = ownerInfo.name;

    let listId = 1;
    let songIndex = nowPlayingIndex;
    let comment_content = document.querySelector('.comment_text').value;
    let commentInfo = {
        listOwnerToken: listOwnerId,
        listId: listId,
        songIndex: songIndex,
        commentId: commentId,
        commentContent: comment_content,
    }
    socket.emit("newComment", commentInfo);
    socket.on("newComment", (_ownerInfo) => {
        ownerInfo = _ownerInfo;
        renderNewComment(ownerInfo);
    });
}

function renderNewLike(ownerInfo) {
    let song_stats = document.querySelector('.song_stats');
    let song_stats_html = `
    <div class="like_btn">♥</div>
    <div class="like_number">${ownerInfo.playlistInfo.songList[nowPlayingIndex].like}</div>`
    song_stats.innerHTML = song_stats_html;
}

function addLike() {
    let likeId = userInfo[0].token;
    // Haven't define
    let listOwnerId = ownerInfo.name;

    let listId = 1;
    let songIndex = nowPlayingIndex;
    let likeInfo = {
        listOwnerToken: listOwnerId,
        listId: listId,
        songIndex: songIndex,
        likeId: likeId,
    }
    socket.emit("newLike", likeInfo);
    socket.on("newLike", (_ownerInfo) => {
        ownerInfo = _ownerInfo;
        renderNewLike(ownerInfo);
    });

}

function addEditBioBtn() {
    let addEditBio_btn = document.createElement('div');
    addEditBio_btn.className = 'bio_btn';
    addEditBio_btn.innerHTML = "add/edit your bio"
    addEditBio_btn.addEventListener('click', addEditBio)

    let addEditBio_wrap = document.createElement('div');
    addEditBio_wrap.appendChild(addEditBio_btn);

    let owner_info_wrap = document.querySelector('.owner_info_wrap');
    owner_info_wrap.appendChild(addEditBio_wrap);

    function addEditBio() {
        let addEditBio_input = document.createElement('input');

        let changeBio_btn = document.createElement('div');
        changeBio_btn.innerHTML = "add/edit";
        changeBio_btn.className = 'bio_btn small_btn';

        let changeBio_cancel = document.createElement('div');
        changeBio_cancel.innerHTML = "cancel";
        changeBio_cancel.className = 'bio_btn small_btn';

        addEditBio_wrap.appendChild(addEditBio_input);
        addEditBio_wrap.appendChild(changeBio_btn);
        addEditBio_wrap.appendChild(changeBio_cancel);

        let addEditBio_btn = document.querySelector('.bio_btn');
        addEditBio_btn.remove();

        changeBio_btn.addEventListener('click', changeBio);
        changeBio_cancel.addEventListener('click', cancelBio);

        function changeBio() {
            socket.emit("changeBio", addEditBio_input.value);
            socket.on("changeBio", (newBio) => {
                let owner_bio = document.querySelector('.owner_bio');
                owner_bio.innerHTML = newBio;
            })
            addEditBio_input.remove();
            changeBio_btn.remove();
            changeBio_cancel.remove();
            let addEditBio_btn = document.createElement('div');
            addEditBio_btn.className = 'bio_btn';
            addEditBio_btn.innerHTML = "add/edit your bio";
            addEditBio_wrap.appendChild(addEditBio_btn);

            addEditBio_btn.addEventListener('click', addEditBio)
        }

        function cancelBio() {
            addEditBio_input.remove();
            changeBio_btn.remove();
            changeBio_cancel.remove();
            let addEditBio_btn = document.createElement('div');
            addEditBio_btn.className = 'bio_btn';
            addEditBio_btn.innerHTML = "add/edit your bio";
            addEditBio_wrap.appendChild(addEditBio_btn);

            addEditBio_btn.addEventListener('click', addEditBio)
        }
    }
}

let submit_btn = document.querySelector('.submit_btn');
submit_btn.addEventListener('click', addComment);