let userInfo;
socket.emit('getUserInfo');
socket.on('getUserInfo', (socketOn_userInfo) => {
    userInfo = socketOn_userInfo;
});

const listOwnerToken = window.location.href.split('?id=')[1];
let nowPlayingIndex = 0;
let player;
let ownerInfo;

socket.on('getSongComment', (commentArray) => {
    console.log("getSongComment");
    ownerInfo.playlistInfo.songList[nowPlayingIndex].comments = commentArray;
    renderNewComment();
})


function onYouTubePlayerAPIReady() {
    socket.emit('getOwnerInfo', listOwnerToken);
    socket.on('getOwnerInfo', (socketOn_ownerInfo) => {
        document.querySelector('.loader').remove();
        ownerInfo = socketOn_ownerInfo;
        console.log("ownerInfo:");
        console.log(ownerInfo);
        renderOwnerInfo(ownerInfo);
        renderPlayerInfo(ownerInfo);
        player = new YT.Player('video_placeholder', {
            width: '700',
            height: '400',
            videoId: ownerInfo.playlistInfo.songList[0].url,
            events: {
                onStateChange: onPlayerStateChange
            }
        });
        renderPlaylist(ownerInfo);
    })
}

function renderOwnerInfo(ownerInfo) {
    const owner_info_wrap_node = document.querySelector('.owner_info_wrap');
    const owner_info_wrap_html = `
        <img class="owner_avatar" src="${ownerInfo.avatar}" alt="gg">
        <div class="owner_name">${ownerInfo.userName}</div>
        <div class="owner_bio">${ownerInfo.bio?ownerInfo.bio:""}</div>`
    owner_info_wrap_node.innerHTML = owner_info_wrap_html;

    if (userInfo) {
        if (userInfo.token === listOwnerToken) {
            addEditBioBtn();
        } else {
            addFollowBtn();
        }
    }
}

function renderPlayerInfo(ownerInfo) {
    if (ownerInfo.playlistInfo.songList.length === 0) {
        let comment_submit = document.querySelector('.comment_submit');
        comment_submit.innerHTML = "目前還沒有任何播放清單";
        comment_submit.style.justifyContent = "space-around";
        comment_submit.style.fontSize = "24px";
    }
    renderNewSongStatsAndDes();
    let songInfo = {
        token: ownerInfo.playlistInfo.token,
        listId: ownerInfo.playlistInfo.listId,
        songIndex: nowPlayingIndex
    }
    console.log(songInfo);
    socket.emit('getSongComment', songInfo);
}

function renderPlaylist(ownerInfo) {
    const playlist_info_node = document.querySelector('.playlist_info');
    const playlist_info_html = `
    <div class="playlist_name">${ownerInfo.playlistInfo.name}</div>
    <div class="playlist_des">${ownerInfo.playlistInfo.des}</div>`
    playlist_info_node.innerHTML = playlist_info_html;
    if (userInfo && (userInfo.token === listOwnerToken)) {
        addEditPlaylistBtn();
    }

    const song_list_node = document.querySelector('.song_list');
    for (let i = 0; i < ownerInfo.playlistInfo.songList.length; i++) {
        let song_info_node = document.createElement('div');
        song_info_node.className = "song_info";
        song_info_node.innerHTML = `
        <div class="song_name">${ownerInfo.playlistInfo.songList[i].songName}</div>
        <div class="song_like">♥ ${ownerInfo.playlistInfo.songList[i].like}</div>`;

        song_info_node.index = i;
        song_info_node.ownerInfo = ownerInfo;
        song_info_node.addEventListener('click', renderClickSongPlayer);
        song_list_node.appendChild(song_info_node);
    }
}

function addEditPlaylistBtn() {
    let edit_playlist_btn_node = document.createElement('div');
    edit_playlist_btn_node.className = "edit_playlist_btn";
    edit_playlist_btn_node.innerHTML = "Edit"
    document.querySelector('.playlist_info').appendChild(edit_playlist_btn_node);
    edit_playlist_btn_node.addEventListener('click', editPlaylist)
}

function editPlaylist() {
    socket.emit('editPlaylist', ownerInfo);
}

function onPlayerStateChange(event) {
    if (event.data === 0) {
        if (nowPlayingIndex + 1 < ownerInfo.playlistInfo.songList.length) {
            renderNextSongPlayer()
        }
    }
}

function renderNextSongPlayer() {
    let playlistInfo = ownerInfo.playlistInfo;
    nowPlayingIndex += 1;

    player.loadVideoById(playlistInfo.songList[nowPlayingIndex].url)

    renderNewSongStatsAndDes();
    let songInfo = {
        token: ownerInfo.playlistInfo.token,
        listId: ownerInfo.playlistInfo.listId,
        songIndex: nowPlayingIndex
    }
    socket.emit('getSongComment', songInfo);

}

function renderClickSongPlayer() {
    let playlistInfo = this.ownerInfo.playlistInfo;
    nowPlayingIndex = this.index;

    player.loadVideoById(playlistInfo.songList[nowPlayingIndex].url)

    renderNewSongStatsAndDes();
    let songInfo = {
        token: ownerInfo.playlistInfo.token,
        listId: ownerInfo.playlistInfo.listId,
        songIndex: nowPlayingIndex
    }
    socket.emit('getSongComment', songInfo);
}

function renderNewSongStatsAndDes() {
    let song_stats_node = document.querySelector('.song_stats');
    let song_stats_html = `
    <div class="like_btn">♥</div>
    <div class="like_number">${ownerInfo.playlistInfo.songList[nowPlayingIndex].like}</div>`
    song_stats_node.innerHTML = song_stats_html;

    let like_btn_node = document.querySelector('.like_btn');
    like_btn_node.addEventListener('click', addLike);

    let song_des_node = document.querySelector('.song_des');
    let song_des_html = `
    <div class="song_date">${ownerInfo.playlistInfo.date.substr(0,10)}</div>
    <div class="song_text">${ownerInfo.playlistInfo.songList[nowPlayingIndex].des}</div>`
    song_des_node.innerHTML = song_des_html;
}


function renderNewComment() {
    let comment_wrap = document.querySelector('.comment_content_wrap');
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
    document.querySelector('.comment_text').value = "";
}

function addComment() {
    if (!userInfo) {
        alert("Please log in to add your comment");
        return
    }

    let listId = 1;
    let songIndex = nowPlayingIndex;

    let commentInfo = {
        listOwnerToken,
        listId,
        songIndex,
        commentContent: document.querySelector('.comment_text').value,
    }

    socket.emit("newComment", commentInfo);
}

function renderNewLike(ownerInfo, newLikeNumber) {
    let song_stats = document.querySelector('.song_stats');
    let song_stats_html = `
    <div class="like_btn">♥</div>
    <div class="like_number">${ownerInfo.playlistInfo.songList[nowPlayingIndex].like}</div>`
    song_stats.innerHTML = song_stats_html;

    let song_list_child = document.querySelector('.song_list').childNodes;
    song_list_child[nowPlayingIndex + 1].lastChild.innerHTML = `♥ ${newLikeNumber}`;
}

function addLike() {
    if (!userInfo) {
        alert("Please log in to express your love");
        return
    }
    let likeId = userInfo.token;
    let listId = 1;
    let songIndex = nowPlayingIndex;

    let likeInfo = {
        listOwnerToken,
        listId,
        songIndex,
        likeId,
    }
    socket.emit("newLike", likeInfo);

    ownerInfo.playlistInfo.songList[nowPlayingIndex].like += 1;
    let newLikeNumber = ownerInfo.playlistInfo.songList[nowPlayingIndex].like;
    renderNewLike(ownerInfo, newLikeNumber);
}

function addEditBioBtn() {
    let addEditBio_btn_node = document.createElement('div');
    addEditBio_btn_node.className = 'bio_btn';
    addEditBio_btn_node.innerHTML = "add/edit your bio"
    addEditBio_btn_node.addEventListener('click', addEditBio)

    let addEditBio_wrap_node = document.createElement('div');
    addEditBio_wrap_node.className = 'addEditBio_wrap';
    addEditBio_wrap_node.appendChild(addEditBio_btn_node);

    let owner_info_wrap = document.querySelector('.owner_info_wrap');
    owner_info_wrap.appendChild(addEditBio_wrap_node);

    function addEditBio() {
        let addEditBio_input = document.createElement('input');
        addEditBio_input.className = 'addEditBio_input';

        let changeBio_btn = document.createElement('div');
        changeBio_btn.innerHTML = "add/edit";
        changeBio_btn.className = 'bio_btn small_btn';
        changeBio_btn.addEventListener('click', changeBio);

        let changeBio_cancel = document.createElement('div');
        changeBio_cancel.innerHTML = "cancel";
        changeBio_cancel.className = 'bio_btn small_btn';
        changeBio_cancel.addEventListener('click', cancelBio);

        addEditBio_wrap_node.appendChild(addEditBio_input);
        addEditBio_wrap_node.appendChild(changeBio_btn);
        addEditBio_wrap_node.appendChild(changeBio_cancel);

        let addEditBio_btn_node = document.querySelector('.bio_btn');
        addEditBio_btn_node.remove();

        function changeBio() {
            socket.emit("changeBio", addEditBio_input.value);
            socket.on("changeBio", (newBio) => {
                let owner_bio = document.querySelector('.owner_bio');
                owner_bio.innerHTML = newBio;
            })
            addEditBio_input.remove();
            changeBio_btn.remove();
            changeBio_cancel.remove();

            let addEditBio_btn_node = document.createElement('div');
            addEditBio_btn_node.className = 'bio_btn';
            addEditBio_btn_node.innerHTML = "add/edit your bio";
            addEditBio_wrap_node.appendChild(addEditBio_btn_node);

            addEditBio_btn_node.addEventListener('click', addEditBio)
        }

        function cancelBio() {
            addEditBio_input.remove();
            changeBio_btn.remove();
            changeBio_cancel.remove();

            let addEditBio_btn_node = document.createElement('div');
            addEditBio_btn_node.className = 'bio_btn';
            addEditBio_btn_node.innerHTML = "add/edit your bio";
            addEditBio_wrap_node.appendChild(addEditBio_btn_node);

            addEditBio_btn_node.addEventListener('click', addEditBio)
        }
    }
}

function addFollowBtn() {
    let follow_btn_node = document.createElement('div');
    follow_btn_node.className = 'follow_btn';
    follow_btn_node.innerHTML = "Follow";
    follow_btn_node.addEventListener('click', changeFollowStatus)
    let owner_info_wrap = document.querySelector('.owner_info_wrap');
    owner_info_wrap.appendChild(follow_btn_node);
}

function changeFollowStatus() {
    if (this.innerHTML === "Follow") {
        this.innerHTML = "Following";
    } else {
        this.innerHTML = "Follow";
    }
}

let submit_btn = document.querySelector('.submit_btn');
submit_btn.addEventListener('click', addComment);







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
