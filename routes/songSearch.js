const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

async function getSingleSongInfoArray(URL) {
    let url = 'https://www.youtube.com/results?search_query=' + URL.replace(/ /g, "+");
    console.log(url);
    const body = await axios.get(url);
    const $ = cheerio.load(body.data);
    let songInfoArray = [];

    $('a.yt-uix-tile-link').slice(0, 5).map(function (i, element){
        songInfoArray.push({
            songName: $(this).text(),
            url: $(this).attr('href'),
            cover: '',
            des: '',
            like: 0,
            comments: []
        })
    });

    $('span.yt-thumb-simple').slice(0, 5).map(function (index, element){
        songInfoArray[index].cover = $(this).children('img').attr('src');
    });
    return songInfoArray;
}

module.exports = getSingleSongInfoArray;
