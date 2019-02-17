// Return a node for search result song
function returnResultSongInfoNode(singleSongInfo) {
    let song_cover_node = document.createElement('img');
    song_cover_node.className = 'song_cover';
    song_cover_node.src = `https://img.youtube.com/vi/${singleSongInfo.url}/hqdefault.jpg`;

    let song_name_node = document.createElement('div');
    song_name_node.className = 'song_name';
    song_name_node.innerHTML = singleSongInfo.songName;

    let result_song_info_node = document.createElement('div');
    result_song_info_node.className = 'result_song_info';
    result_song_info_node.addEventListener(
        'click',
        (function({ songName, cover, url }) {
            return function() {
                addSongToSongListState(songName, cover, url);
            };
        })(singleSongInfo)
    );

    result_song_info_node.appendChild(song_cover_node);
    result_song_info_node.appendChild(song_name_node);
    console.log(result_song_info_node);

    return result_song_info_node;
}

function returnSongInfoNode(songName, songUrl, des) {
    let song_cover_node = document.createElement('img');
    song_cover_node.className = 'song_cover';
    song_cover_node.src = `https://img.youtube.com/vi/${songUrl}/hqdefault.jpg`;

    let song_name_node = document.createElement('div');
    song_name_node.className = 'song_name';
    song_name_node.innerHTML = songName;

    let song_delete_node = document.createElement('div');
    song_delete_node.className = 'song_delete';
    song_delete_node.innerHTML = 'X';
    song_delete_node.url = songUrl;
    song_delete_node.dataset.url = songUrl;
    song_delete_node.addEventListener('click', deleteSongFromPlaylist);

    let song_des_wrap_node = document.createElement('textarea');
    song_des_wrap_node.className = 'song_des_wrap';
    song_des_wrap_node.placeholder = '請輸入歌曲描述';
    song_des_wrap_node.innerHTML = des;
    song_des_wrap_node.url = songUrl;
    song_des_wrap_node.dataset.url = songUrl;

    let des_connect_line_node = document.createElement('div');
    des_connect_line_node.className = 'des_connect_line';

    let song_info_node = document.createElement('div');
    song_info_node.className = 'song_info';
    song_info_node.songName = songName;
    song_info_node.cover = `https://img.youtube.com/vi/${songUrl}/hqdefault.jpg`;
    song_info_node.url = songUrl;
    song_info_node.draggable = true;

    song_info_node.appendChild(song_delete_node);
    song_info_node.appendChild(song_cover_node);
    song_info_node.appendChild(song_name_node);
    song_info_node.appendChild(song_des_wrap_node);

    return song_info_node;
}

function deleteSongFromPlaylist() {
    console.log('deleteSongFromPlaylist');

    let deleteUrlIndex = songListState.filter(function(el) {
        return el.url == this.url;
    });
    songListState.splice(deleteUrlIndex, 1);
    this.parentNode.remove();
}
