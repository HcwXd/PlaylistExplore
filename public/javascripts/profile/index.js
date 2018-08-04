let userInfoState;
let ownerInfoState;
let ownerHistoryState;
let nowPlayingIndexState;

const pageInfo = getQueryStringObject();
const [listOwnerToken, listId, songId] = [pageInfo.id, pageInfo.list, pageInfo.song];
nowPlayingIndexState = songId ? songId : 0;

let player;

socket.emit('getUserInfo');
socket.on('getUserInfo', (socketOn_userInfo) => {
    console.log({ socketOn_userInfo });
    userInfoState = socketOn_userInfo;
});

console.log(onYouTubePlayerAPIReady);

function onYouTubePlayerAPIReady() {
    socket.emit('getOwnerInfo', {
        listOwnerToken,
        listId,
    });
    socket.on('getOwnerInfo', (socketOn_ownerInfo) => {
        console.log({ socketOn_ownerInfo });
        document.querySelector('.loader').remove();

        ownerInfoState = socketOn_ownerInfo;

        renderOwnerInfo(ownerInfoState);
        renderPlayerInfo(ownerInfoState);

        player = new YT.Player('video_placeholder', {
            width: '700',
            height: '400',
            videoId: ownerInfoState.playlistInfo.songList[nowPlayingIndexState].url,
            events: {
                onStateChange: onPlayerStateChange,
            },
        });

        renderPlaylist(ownerInfoState);
        socket.emit('getOwnerHistory', listOwnerToken);
    });
}

function renderOwnerInfo(ownerInfo) {
    const owner_info_wrap_node = document.querySelector('.owner_info_wrap');
    const owner_info_wrap_html = `
        <img class="owner_avatar" src="${ownerInfo.avatar}" alt="gg">
        <div class="owner_name">${ownerInfo.userName}</div>
        <div class="owner_bio">${ownerInfo.bio ? ownerInfo.bio : ''}</div>`;
    owner_info_wrap_node.innerHTML = owner_info_wrap_html;

    if (userInfoState.token !== undefined) {
        if (userInfoState.token === listOwnerToken) {
            renderEditBioBtn();
        } else {
            socket.emit('getFollowState', userInfoState.token, listOwnerToken);
            socket.on('getFollowState', (isFollowing) => {
                renderFollowBtn(isFollowing);
            });
        }
    }
}

function renderEditBioBtn() {
    let edit_bio_wrap_node = document.createElement('div');
    edit_bio_wrap_node.innerHTML = `
        <div class="edit_bio_wrap">
            <div class="edit_bio_btn">編輯自我介紹</div>
            <div class="editing_bio_wrap">
                <input class="edit_bio_input">
                <div class="submit_bio_btn">確認</div>
                <div class="cancel_bio_btn">取消</div>
            </div>
        </div>
    `;
    document.querySelector('.owner_info_wrap').appendChild(edit_bio_wrap_node);
    document.querySelector('.edit_bio_btn').addEventListener('click', showEditingBioWrap);

    function showEditingBioWrap() {
        document.querySelector('.editing_bio_wrap').style.display = 'block';
        document.querySelector('.edit_bio_btn').style.display = 'none';
        document.querySelector('.submit_bio_btn').addEventListener('click', submitBioChange);
        document.querySelector('.cancel_bio_btn').addEventListener('click', hideEditingBioWrap);

        function submitBioChange() {
            socket.emit('changeBio', document.querySelector('.edit_bio_input').value);
            hideEditingBioWrap();
        }

        function hideEditingBioWrap() {
            document.querySelector('.editing_bio_wrap').style.display = 'none';
            document.querySelector('.edit_bio_btn').style.display = 'block';
            document.querySelector('.edit_bio_btn').addEventListener('click', showEditingBioWrap);
        }
    }
}

function renderFollowBtn(isFollowing) {
    let follow_btn_node = document.createElement('div');
    follow_btn_node.className = 'follow_btn';
    follow_btn_node.innerHTML = isFollowing ? 'Following' : 'Follow';
    follow_btn_node.addEventListener('click', changeFollowStatus);

    document.querySelector('.owner_info_wrap').appendChild(follow_btn_node);
}

function changeFollowStatus() {
    let followInfo = {
        listOwnerToken,
        userToken: userInfoState.token,
    };
    if (this.innerHTML === 'Follow') {
        this.innerHTML = 'Following';
        socket.emit('followUser', followInfo);
    } else {
        this.innerHTML = 'Follow';
        socket.emit('unfollowUser', followInfo);
    }
}

function renderPlayerInfo(ownerInfo) {
    if (ownerInfo.playlistInfo.songList.length === 0) {
        let comment_submit = document.querySelector('.comment_submit');
        comment_submit.innerHTML = '目前還沒有任何播放清單';
        comment_submit.style.justifyContent = 'space-around';
        comment_submit.style.fontSize = '24px';
        return;
    }
    renderNewSongStatsAndDes();
    let songInfo = {
        token: ownerInfo.playlistInfo.token,
        listId: ownerInfo.playlistInfo.listId,
        songIndex: nowPlayingIndexState,
    };
    socket.emit('getSongComment', songInfo);
}

function renderNewSongStatsAndDes() {
    songInfo = {
        listId: ownerInfoState.playlistInfo.listId,
        songIndex: nowPlayingIndexState,
        token: userInfoState.token,
    };
    socket.emit('getLikeStatus', songInfo);
    // socket.emit('getLikeList', songInfo);

    let song_des_html = `
        <div class="song_date">${ownerInfoState.playlistInfo.date.substr(0, 10)}</div>
        <div class="song_text">${ownerInfoState.playlistInfo.songList[nowPlayingIndexState].des}</div>
    `;
    document.querySelector('.song_des').innerHTML = song_des_html;
}

socket.on('getLikeStatus', (isLiked) => {
    renderLikeStatus(isLiked);
});

// TODO
socket.on('getLikeList', (likeList) => {
    // const likeList = likeTable.getLikeList(songInfo);
});

function renderLikeStatus(isLiked) {
    let song_stats_html;

    if (isLiked) {
        song_stats_html = `
            <div class="like_btn like_btn-active">♥</div>
            <div class="like_number">${ownerInfoState.playlistInfo.songList[nowPlayingIndexState].like}</div>
        `;
    } else {
        song_stats_html = `
            <div class="like_btn">♥</div>
            <div class="like_number">${ownerInfoState.playlistInfo.songList[nowPlayingIndexState].like}</div>
        `;
    }
    document.querySelector('.song_stats').innerHTML = song_stats_html;
    document.querySelector('.like_btn').isLiked = isLiked;
    document.querySelector('.like_btn').addEventListener('click', toggleLike);
}

function toggleLike() {
    if (userInfoState.token === undefined) {
        alert('請先登入才能按愛心');
        return;
    }
    let token = userInfoState.token;
    let listId = ownerInfoState.playlistInfo.listId;
    let songIndex = nowPlayingIndexState;

    let likeInfo = {
        listOwnerToken,
        listId,
        songIndex,
        token,
    };
    console.log(this.isLiked);
    if (this.isLiked) {
        socket.emit('unlike', likeInfo);
    } else {
        socket.emit('newLike', likeInfo);
    }

    ownerInfoState.playlistInfo.songList[nowPlayingIndexState].like += this.isLiked ? -1 : 1;
    this.isLiked = !this.isLiked;

    renderNewLike(ownerInfoState, ownerInfoState.playlistInfo.songList[nowPlayingIndexState].like);
}

function renderNewLike(ownerInfo, newLikeNumber) {
    document.querySelector('.like_btn').classList.toggle('like_btn-active');
    document.querySelector('.like_number').innerHTML = ownerInfo.playlistInfo.songList[nowPlayingIndexState].like;
    // document.querySelector('.song_stats').innerHTML = song_stats_html;

    let song_list_child = document.querySelector('.song_list').childNodes;
    song_list_child[nowPlayingIndexState + 1].querySelector('.song_like').innerHTML = `♥ ${newLikeNumber}`;
}

function renderNewComment() {
    let comment_wrap_node = document.querySelector('.comment_content_wrap');
    comment_wrap_node.innerHTML = '';
    let commentInfoArray = ownerInfoState.playlistInfo.songList[nowPlayingIndexState].comments;

    for (let i = 0; i < commentInfoArray.length; i++) {
        let comment_info_node = createSingleCommentNode(commentInfoArray[i]);
        comment_wrap_node.appendChild(comment_info_node);
    }
    document.querySelector('.comment_text').value = '';
}

function createSingleCommentNode(commentInfo) {
    let comment_info_node = document.createElement('div');
    comment_info_node.className = 'comment_info';
    comment_info_node.innerHTML = `
        <img class="comment_avatar" src="${commentInfo.avatar}" alt="gg">
        <div class="comment_name">${commentInfo.userName}</div>
        <div class="comment_content">${commentInfo.commentContent}</div>
    `;

    if (userInfoState && commentInfo.commentToken === userInfoState.token) {
        let delete_comment_btn_node = document.createElement('div');
        delete_comment_btn_node.className = 'delete_comment_btn';
        delete_comment_btn_node.innerHTML = 'X';
        delete_comment_btn_node.commentInfo = commentInfo;
        delete_comment_btn_node.addEventListener('click', deleteComment);
        comment_info_node.appendChild(delete_comment_btn_node);
    }
    return comment_info_node;
}

function deleteComment() {
    this.parentNode.remove();
    socket.emit('deleteComment', this.commentInfo);
}

function renderPlaylist(ownerInfo) {
    const playlist_info_node = document.querySelector('.playlist_info');
    const playlist_info_html = `
        <div class="playlist_name">${ownerInfo.playlistInfo.name}</div>
        <div class="playlist_des">${ownerInfo.playlistInfo.des}</div>
    `;
    playlist_info_node.innerHTML = playlist_info_html;

    if (userInfoState && userInfoState.token === listOwnerToken) {
        renderEditPlaylistBtn();
    }

    const song_list_node = document.querySelector('.song_list');
    for (let i = 0; i < ownerInfo.playlistInfo.songList.length; i++) {
        let song_info_node = document.createElement('div');
        song_info_node.className = 'song_info';
        song_info_node.innerHTML = `
            <div class="song_name">${ownerInfo.playlistInfo.songList[i].songName}</div>
            <div class="song_like">♥ ${ownerInfo.playlistInfo.songList[i].like}</div>
        `;

        song_info_node.index = i;
        song_info_node.ownerInfo = ownerInfo;
        song_info_node.addEventListener('click', renderClickSongPlayer);
        song_list_node.appendChild(song_info_node);
    }
    showNowPlayingSong();
}

function renderEditPlaylistBtn() {
    let edit_playlist_btn_node = document.createElement('div');
    edit_playlist_btn_node.className = 'edit_playlist_btn';
    edit_playlist_btn_node.innerHTML = '編輯歌單';
    document.querySelector('.playlist_info').appendChild(edit_playlist_btn_node);
    edit_playlist_btn_node.addEventListener('click', editPlaylist);
}

function editPlaylist() {
    socket.emit('editPlaylist', ownerInfoState);
}

function renderNextSongPlayer() {
    let playlistInfo = ownerInfoState.playlistInfo;
    nowPlayingIndexState += 1;

    renderPlayerAndCommentByUrl(playlistInfo.songList[nowPlayingIndexState].url);
}

function renderClickSongPlayer() {
    let playlistInfo = this.ownerInfo.playlistInfo;
    nowPlayingIndexState = this.index;

    renderPlayerAndCommentByUrl(playlistInfo.songList[nowPlayingIndexState].url);
}

function renderPlayerAndCommentByUrl(url) {
    player.loadVideoById(url);
    showNowPlayingSong();
    renderNewSongStatsAndDes();
    let songInfo = {
        token: ownerInfoState.playlistInfo.token,
        listId: ownerInfoState.playlistInfo.listId,
        songIndex: nowPlayingIndexState,
    };
    socket.emit('getSongComment', songInfo);
}

function showNowPlayingSong() {
    let song_name_node_collection = document.querySelectorAll('.song_name');
    song_name_node_collection.forEach((node) => {
        node.style.color = '#bebebe';
    });
    song_name_node_collection[nowPlayingIndexState].style.color = 'rgba(204,204,0,0.7)';
}

socket.on('getOwnerHistory', (socketOn_ownerHistory) => {
    ownerHistoryState = socketOn_ownerHistory;
    renderOwnerHistory();
});

function renderOwnerHistory() {
    for (let recordIndex = 0; recordIndex < ownerHistoryState.length; recordIndex++) {
        let record_wrap_node = document.createElement('div');
        record_wrap_node.className = 'record_wrap';
        record_wrap_node.innerHTML = `
            <img src="${ownerHistoryState[recordIndex].cover}" alt="cover" class="record_cover">
            <div class="record_name">${ownerHistoryState[recordIndex].name}</div>
        `;
        record_wrap_node.listId = ownerHistoryState[recordIndex].listId;

        record_wrap_node.addEventListener('click', redirectToClickList);
        document.querySelector('.history_wrap').appendChild(record_wrap_node);
    }
}

function redirectToClickList() {
    window.location = `/profile?id=${listOwnerToken}&list=${this.listId}`;
}

function onPlayerStateChange(event) {
    if (event.data === 0) {
        if (nowPlayingIndexState + 1 < ownerInfoState.playlistInfo.songList.length) {
            renderNextSongPlayer();
        }
    }
}

function addComment() {
    if (!userInfoState.token) {
        alert('請先登入才能留言');
        return;
    }

    let listId = ownerInfoState.playlistInfo.listId;
    let songIndex = nowPlayingIndexState;
    let commentContent = document.querySelector('.comment_text').value;

    let commentInfo = {
        listOwnerToken,
        listId,
        songIndex,
        commentContent,
    };
    let newCommentNode = createSingleCommentNode({
        commentContent,
        avatar: userInfoState.avatar,
        userName: userInfoState.userName,
    });
    document.querySelector('.comment_content_wrap').appendChild(newCommentNode);
    socket.emit('newComment', commentInfo);
}

function getQueryStringObject() {
    let queryString = window.location.search;
    let getPara;
    let ParaVal;
    let queryStringArray = [];

    if (queryString.indexOf('?') != -1) {
        let getSearch = queryString.split('?');
        getPara = getSearch[1].split('&');
        for (i = 0; i < getPara.length; i++) {
            ParaVal = getPara[i].split('=');
            queryStringArray[ParaVal[0]] = ParaVal[1];
        }
    }
    return queryStringArray;
}

document.querySelector('.submit_btn').addEventListener('click', addComment);
document.querySelector('.comment_text').addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        addComment();
    }
});

socket.on('redirect', (url) => {
    window.location = url;
});

socket.on('getSongComment', (commentArray) => {
    ownerInfoState.playlistInfo.songList[nowPlayingIndexState].comments = commentArray;
    renderNewComment();
});

socket.on('changeBio', (newBio) => {
    document.querySelector('.owner_bio').innerHTML = newBio;
});
