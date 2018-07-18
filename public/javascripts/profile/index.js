const userInfoState;
let ownerInfoState;
let ownerHistoryState;
let nowPlayingIndexState;

const pageInfo = getQueryStringObject();
const [listOwnerToken, listId, songId] = [pageInfo.id, pageInfo.list, pageInfo.song];
nowPlayingIndexState = songId ? songId : 0;

let player;

socket.emit('getUserInfo');
socket.on('getUserInfo', (socketOn_userInfo) => {
    userInfoState = socketOn_userInfo;
});

function onYouTubePlayerAPIReady() {
    socket.emit('getOwnerInfo', {
        listOwnerToken,
        listId,
    });
    socket.on('getOwnerInfo', (socketOn_ownerInfo) => {
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
    });
    socket.emit('getOwnerHistory', listOwnerToken);
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
        <div class="record_name">${ownerHistoryState[recordIndex].name}</div>`;
        record_wrap_node.listId = ownerHistoryState[recordIndex].listId;

        record_wrap_node.addEventListener('click', redirectToClickList);
        document.querySelector('.history_wrap').appendChild(record_wrap_node);
    }
}

function redirectToClickList() {
    window.location = `/profile?id=${listOwnerToken}&list=${this.listId}`;
}

function renderOwnerInfo(ownerInfo) {
    const owner_info_wrap_node = document.querySelector('.owner_info_wrap');
    const owner_info_wrap_html = `
        <img class="owner_avatar" src="${ownerInfo.avatar}" alt="gg">
        <div class="owner_name">${ownerInfo.userName}</div>
        <div class="owner_bio">${ownerInfo.bio ? ownerInfo.bio : ''}</div>`;
    owner_info_wrap_node.innerHTML = owner_info_wrap_html;

    if (userInfoState) {
        if (userInfoState.token === listOwnerToken) {
            addEditBioBtn();
        } else {
            addFollowBtn();
        }
    }
}

function renderPlayerInfo(ownerInfo) {
    if (ownerInfo.playlistInfo.songList.length === 0) {
        let comment_submit = document.querySelector('.comment_submit');
        comment_submit.innerHTML = '目前還沒有任何播放清單';
        comment_submit.style.justifyContent = 'space-around';
        comment_submit.style.fontSize = '24px';
    }
    renderNewSongStatsAndDes();
    let songInfo = {
        token: ownerInfo.playlistInfo.token,
        listId: ownerInfo.playlistInfo.listId,
        songIndex: nowPlayingIndexState,
    };
    socket.emit('getSongComment', songInfo);
}

function renderPlaylist(ownerInfo) {
    const playlist_info_node = document.querySelector('.playlist_info');
    const playlist_info_html = `
    <div class="playlist_name">${ownerInfo.playlistInfo.name}</div>
    <div class="playlist_des">${ownerInfo.playlistInfo.des}</div>`;
    playlist_info_node.innerHTML = playlist_info_html;
    if (userInfoState && userInfoState.token === listOwnerToken) {
        addEditPlaylistBtn();
    }

    const song_list_node = document.querySelector('.song_list');
    for (let i = 0; i < ownerInfo.playlistInfo.songList.length; i++) {
        let song_info_node = document.createElement('div');
        song_info_node.className = 'song_info';
        song_info_node.innerHTML = `
        <div class="song_name">${ownerInfo.playlistInfo.songList[i].songName}</div>
        <div class="song_like">♥ ${ownerInfo.playlistInfo.songList[i].like}</div>`;

        song_info_node.index = i;
        song_info_node.ownerInfo = ownerInfo;
        song_info_node.addEventListener('click', renderClickSongPlayer);
        song_list_node.appendChild(song_info_node);
    }
    showNowPlayingSong();
}

function addEditPlaylistBtn() {
    let edit_playlist_btn_node = document.createElement('div');
    edit_playlist_btn_node.className = 'edit_playlist_btn';
    edit_playlist_btn_node.innerHTML = 'Edit';
    document.querySelector('.playlist_info').appendChild(edit_playlist_btn_node);
    edit_playlist_btn_node.addEventListener('click', editPlaylist);
}

function editPlaylist() {
    socket.emit('editPlaylist', ownerInfoState);
}

function onPlayerStateChange(event) {
    if (event.data === 0) {
        if (nowPlayingIndexState + 1 < ownerInfoState.playlistInfo.songList.length) {
            renderNextSongPlayer();
        }
    }
}

function renderNextSongPlayer() {
    let playlistInfo = ownerInfoState.playlistInfo;
    nowPlayingIndexState += 1;

    player.loadVideoById(playlistInfo.songList[nowPlayingIndexState].url);
    showNowPlayingSong();
    renderNewSongStatsAndDes();
    let songInfo = {
        token: ownerInfoState.playlistInfo.token,
        listId: ownerInfoState.playlistInfo.listId,
        songIndex: nowPlayingIndexState,
    };
    socket.emit('getSongComment', songInfo);
}

function renderClickSongPlayer() {
    let playlistInfo = this.ownerInfo.playlistInfo;
    nowPlayingIndexState = this.index;

    player.loadVideoById(playlistInfo.songList[nowPlayingIndexState].url);
    showNowPlayingSong();
    renderNewSongStatsAndDes();
    let songInfo = {
        token: ownerInfoState.playlistInfo.token,
        listId: ownerInfoState.playlistInfo.listId,
        songIndex: nowPlayingIndexState,
    };
    socket.emit('getSongComment', songInfo);
}

function renderNewSongStatsAndDes() {
    let song_stats_node = document.querySelector('.song_stats');
    let song_stats_html = `
    <div class="like_btn">♥</div>
    <div class="like_number">${ownerInfoState.playlistInfo.songList[nowPlayingIndexState].like}</div>`;
    song_stats_node.innerHTML = song_stats_html;

    let like_btn_node = document.querySelector('.like_btn');
    like_btn_node.addEventListener('click', addLike);

    let song_des_node = document.querySelector('.song_des');
    let song_des_html = `
    <div class="song_date">${ownerInfoState.playlistInfo.date.substr(0, 10)}</div>
    <div class="song_text">${ownerInfoState.playlistInfo.songList[nowPlayingIndexState].des}</div>`;
    song_des_node.innerHTML = song_des_html;
}

function renderNewComment() {
    let comment_wrap_node = document.querySelector('.comment_content_wrap');
    comment_wrap_node.innerHTML = '';

    for (let i = 0; i < ownerInfoState.playlistInfo.songList[nowPlayingIndexState].comments.length; i++) {
        commentInfo = ownerInfoState.playlistInfo.songList[nowPlayingIndexState].comments[i];
        let comment_info_wrap_node = renderSingleComment(commentInfo);

        comment_wrap_node.appendChild(comment_info_wrap_node);
    }

    document.querySelector('.comment_text').value = '';
}

function renderSingleComment(commentInfo) {
    let comment_info_wrap_node = document.createElement('div');
    comment_info_wrap_node.className = 'comment_info';
    comment_info_wrap_node.innerHTML = `
            <img class="comment_avatar" src="${commentInfo.avatar}" alt="gg">
            <div class="comment_name">${commentInfo.userName}</div>
            <div class="comment_content">${commentInfo.commentContent}</div>`;

    if (userInfoState && commentInfo.commentToken === userInfoState.token) {
        let delete_comment_btn_node = document.createElement('div');
        delete_comment_btn_node.className = 'delete_comment_btn';
        delete_comment_btn_node.innerHTML = 'X';
        delete_comment_btn_node.commentInfo = commentInfo;
        delete_comment_btn_node.addEventListener('click', deleteComment);
        comment_info_wrap_node.appendChild(delete_comment_btn_node);
    }
    return comment_info_wrap_node;
}

function deleteComment() {
    this.parentNode.remove();
    socket.emit('deleteComment', this.commentInfo);
}

function addComment() {
    if (!userInfoState) {
        alert('Please log in to add your comment');
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
    let newCommentNode = renderSingleComment({
        commentContent,
        avatar: userInfoState.avatar,
        userName: userInfoState.userName,
    });
    document.querySelector('.comment_content_wrap').appendChild(newCommentNode);
    socket.emit('newComment', commentInfo);
}

function renderNewLike(ownerInfo, newLikeNumber) {
    let song_stats = document.querySelector('.song_stats');
    let song_stats_html = `
    <div class="like_btn">♥</div>
    <div class="like_number">${ownerInfo.playlistInfo.songList[nowPlayingIndexState].like}</div>`;
    song_stats.innerHTML = song_stats_html;

    let song_list_child = document.querySelector('.song_list').childNodes;
    song_list_child[nowPlayingIndexState + 1].lastChild.innerHTML = `♥ ${newLikeNumber}`;
}

function addLike() {
    if (!userInfoState) {
        alert('Please log in to express your love');
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
    socket.emit('newLike', likeInfo);

    ownerInfoState.playlistInfo.songList[nowPlayingIndexState].like += 1;
    let newLikeNumber = ownerInfoState.playlistInfo.songList[nowPlayingIndexState].like;
    renderNewLike(ownerInfoState, newLikeNumber);
}

function addEditBioBtn() {
    let addEditBio_btn_node = document.createElement('div');
    addEditBio_btn_node.className = 'bio_btn';
    addEditBio_btn_node.innerHTML = 'add/edit your bio';
    addEditBio_btn_node.addEventListener('click', addEditBio);

    let addEditBio_wrap_node = document.createElement('div');
    addEditBio_wrap_node.className = 'addEditBio_wrap';
    addEditBio_wrap_node.appendChild(addEditBio_btn_node);

    let owner_info_wrap = document.querySelector('.owner_info_wrap');
    owner_info_wrap.appendChild(addEditBio_wrap_node);

    function addEditBio() {
        let addEditBio_input = document.createElement('input');
        addEditBio_input.className = 'addEditBio_input';

        let changeBio_btn = document.createElement('div');
        changeBio_btn.innerHTML = 'add/edit';
        changeBio_btn.className = 'bio_btn small_btn';
        changeBio_btn.addEventListener('click', changeBio);

        let changeBio_cancel = document.createElement('div');
        changeBio_cancel.innerHTML = 'cancel';
        changeBio_cancel.className = 'bio_btn small_btn';
        changeBio_cancel.addEventListener('click', cancelBio);

        addEditBio_wrap_node.appendChild(addEditBio_input);
        addEditBio_wrap_node.appendChild(changeBio_btn);
        addEditBio_wrap_node.appendChild(changeBio_cancel);

        let addEditBio_btn_node = document.querySelector('.bio_btn');
        addEditBio_btn_node.remove();

        function changeBio() {
            socket.emit('changeBio', addEditBio_input.value);
            socket.on('changeBio', (newBio) => {
                let owner_bio = document.querySelector('.owner_bio');
                owner_bio.innerHTML = newBio;
            });
            addEditBio_input.remove();
            changeBio_btn.remove();
            changeBio_cancel.remove();

            let addEditBio_btn_node = document.createElement('div');
            addEditBio_btn_node.className = 'bio_btn';
            addEditBio_btn_node.innerHTML = 'add/edit your bio';
            addEditBio_wrap_node.appendChild(addEditBio_btn_node);

            addEditBio_btn_node.addEventListener('click', addEditBio);
        }

        function cancelBio() {
            addEditBio_input.remove();
            changeBio_btn.remove();
            changeBio_cancel.remove();

            let addEditBio_btn_node = document.createElement('div');
            addEditBio_btn_node.className = 'bio_btn';
            addEditBio_btn_node.innerHTML = 'add/edit your bio';
            addEditBio_wrap_node.appendChild(addEditBio_btn_node);

            addEditBio_btn_node.addEventListener('click', addEditBio);
        }
    }
}

function addFollowBtn() {
    let follow_btn_node = document.createElement('div');
    follow_btn_node.className = 'follow_btn';
    follow_btn_node.innerHTML = 'Follow';
    follow_btn_node.addEventListener('click', changeFollowStatus);
    let owner_info_wrap = document.querySelector('.owner_info_wrap');
    owner_info_wrap.appendChild(follow_btn_node);
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

function showNowPlayingSong() {
    let song_name_node_collection = document.querySelectorAll('.song_name');
    song_name_node_collection.forEach((node) => {
        node.style.color = '#bebebe';
    });
    song_name_node_collection[nowPlayingIndexState].style.color = 'rgba(204,204,0,0.7)';
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

let submit_btn = document.querySelector('.submit_btn');
submit_btn.addEventListener('click', addComment);

socket.on('redirect', (url) => {
    window.location = url;
});

socket.on('getSongComment', (commentArray) => {
    ownerInfoState.playlistInfo.songList[nowPlayingIndexState].comments = commentArray;
    renderNewComment();
});