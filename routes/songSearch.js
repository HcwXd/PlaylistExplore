const config = require('./config');
const { google } = require('googleapis');

// initialize the Youtube API library
const youtube = google.youtube({
    version: 'v3',
    auth: config.key, // specify your API key here
});

function urlToId(url) {
    let sp_url = url.split('?v=');
    let em_url = sp_url[sp_url.length - 1];
    let final_url = em_url.split('&')[0];
    return final_url;
}

function getCoverImage(id) {
    let url = 'https://img.youtube.com/vi/' + id + '/sddefault.jpg';
    return url;
}

async function getPlaylistInfo(playlistId) {
    const body = await youtube.playlistItems.list({
        playlistId: playlistId,
        part: 'snippet, contentDetails',
        maxResults: 50,
    });
    const songlist = body.data.items;
    let songlistInfo = [];
    songlist.map((song) => {
        songlistInfo.push({
            songName: song.snippet.tittle,
            url: song.contentDetails.videoId,
            cover: getCoverImage(song.contentDetails.videoId),
        });
    });
    return songlistInfo;
}

async function getSingleURLInfo(URL) {
    let videoId = urlToId(URL);
    const body = await youtube.videos.list({
        id: videoId,
        part: 'snippet',
    });

    let songInfoArray = [
        {
            songName: body.data.items[0].snippet.title,
            url: videoId,
            cover: getCoverImage(videoId),
        },
    ];
    return songInfoArray;
}

const listReg = new RegExp('^https://www.youtube.com/playlist\\?list=(\\w+)');
const songReg = new RegExp('^https://www.youtube.com/watch\\?');

// a very simple example of searching for youtube videos
async function emitURLInfoArray(URL, socket) {
    if ((result = URL.match(listReg))) {
        console.log('it is a song list');
        const listId = result[1];
        const playlistArray = await getPlaylistInfo(listId);
        socket.emit('getSearchListResults', playlistArray);
        return;
    }

    if (songReg.test(URL)) {
        console.log('single song url');
        const singleSongInfo = await getSingleURLInfo(URL);
        socket.emit('getSearchResults', singleSongInfo);
        return;
    }

    console.log('query');
    const res = await youtube.search.list({
        part: 'id,snippet',
        q: URL,
        maxResults: 5,
        type: 'video',
    });

    let songInfoArray = [];
    res.data.items.map((element) => {
        songInfoArray.push({
            songName: element.snippet.title,
            url: element.id.videoId,
            cover: getCoverImage(element.id.videoId),
        });
    });
    socket.emit('getSearchResults', songInfoArray);
}

module.exports = emitURLInfoArray;
