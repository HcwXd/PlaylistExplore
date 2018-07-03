const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const config = require('./config');
const {google} = require('googleapis');

// initialize the Youtube API library
const youtube = google.youtube({
    version: 'v3',
    auth: config.key // specify your API key here
});

function urlToId(url) {
    let sp_url = url.split('?v=');
    let em_url = sp_url[sp_url.length - 1];
    let final_url = em_url.split('&')[0];
    return final_url;
}

function getCoverImage(id){
    let url = 'https://img.youtube.com/vi/' + id + '/sddefault.jpg';
    return url;
}

URL = 'https://www.youtube.com/watch?v=djACkCHl3JA'

async function getSingleURLInfo(URL){
    let videoId = urlToId(URL);
    console.log(videoId);
    const body = await youtube.videos.list({
        id: videoId,
        part: 'snippet'
    });

    let songInfoArray = [{
        songName: body.data.items[0].snippet.title,
        url: videoId,
        cover: getCoverImage(videoId),
        des: '',
        like: 0,
        comments: []
    }];
    return songInfoArray;
}

// a very simple example of searching for youtube videos
async function getSingleSongInfoArray (URL) {
    if(/^[https]/.test(URL)){
        console.log("simple url");
        return await getSingleURLInfo(URL);
    }
    const res = await youtube.search.list({
        part: 'id,snippet',
        q: URL,
        maxResults: 5,
    });
    let songInfoArray = [];
    res.data.items.map((element) => {
        songInfoArray.push({
            songName: element.snippet.title,
            url: element.id.videoId,
            cover: (getCoverImage(element.id.videoId)),
            des: '',
            like: 0,
            comments: []
        })
    })
    return songInfoArray;
}

/*

async function test(){
    body = await getSingleSongInfoArray(URL);
    console.log(body);
}

test();

*/
