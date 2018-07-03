cover = "https://img.youtube.com/vi/djACkCHl3JA/maxresdefault.jpg";

socket.emit('getLatestPlaylists');
socket.on('getLatestPlaylists', (_fivePlaylistInfo) => {
    __fivePlaylistInfo = _fivePlaylistInfo;
})

var fivePlaylistInfo = [{
    ownerName: "Apple",
    avatar: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
    songList: [{
        url: "https://www.youtube.com/watch?v=_PmHj0EP6I8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/djACkCHl3JA/maxresdefault.jpg",
        des: "這是一首不規則的歌",
        like: 51,
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
        songName: "既視感 - 不規則鐘擺擺",
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
}, {
    ownerName: "Apple",
    avatar: "https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg",
    songList: [{
        url: "https://www.youtube.com/watch?v=_PmHj0EP6I8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/AQWYfvgh_ws/maxresdefault.jpg",
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
}, {
    ownerName: "Apple",
    avatar: "http://junkee.com/wp-content/uploads/2017/09/Bojack-Horseman-2.jpg",
    songList: [{
        url: "https://www.youtube.com/watch?v=_PmHj0EP6I8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/UzMtXbmKZfE/maxresdefault.jpg",
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
}, {
    ownerName: "Apple",
    avatar: "https://i.pinimg.com/736x/2c/9d/07/2c9d0704ae49dfde914e2b477bf9279c--stick-figure-profile-pictures.jpg",
    songList: [{
        url: "https://www.youtube.com/watch?v=_PmHj0EP6I8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/x3bDhtuC5yk/maxresdefault.jpg",
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
}, {
    ownerName: "Apple",
    avatar: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
    songList: [{
        url: "https://www.youtube.com/watch?v=_PmHj0EP6I8",
        songName: "既視感 - 不規則鐘擺",
        cover: "https://img.youtube.com/vi/mfvHGShQO_w/maxresdefault.jpg",
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
}];

let posts_wrap = document.querySelector('.posts_wrap');
for (let i = 0; i < fivePlaylistInfo.length; i++) {
    let post = document.createElement('div');
    post.className = 'post';
    let like = 0;
    fivePlaylistInfo[i].songList.forEach(song => {
        like += song.like;
    });

    let song_list_div_element = document.createElement('div');
    song_list_div_element.className = "song_list";
    let song_list_html = `<div class="song_list_des">播放清單</div>`;
    for (let j = 0; j < fivePlaylistInfo[i].songList.length; j++) {
        if (fivePlaylistInfo[i].songList[j].songName.length > 11) {
            renderSongName = fivePlaylistInfo[i].songList[j].songName.substring(0, 11) + ' ...';
        } else {
            renderSongName = fivePlaylistInfo[i].songList[j].songName;
        }
        song_list_html += `
        <div class="song_info">
            <div class="song_name">${renderSongName}</div>
        </div>
        `
    }
    song_list_div_element.innerHTML = song_list_html;

    let post_content = document.createElement('div');
    post_content.className = 'post_content';
    post_content.innerHTML = `
        <div class="header">
            <div class="owner_info">
                <img class="owner_avatar" src="${fivePlaylistInfo[i].avatar}">
                <div class="owner_name">${fivePlaylistInfo[i].ownerName}</div>
            </div>
            <div class="more_info">=</div>
        </div>
        <img class="playlist_cover" src="${fivePlaylistInfo[i].songList[0].cover}">
        <div class="playlist_stats">
            <div class="like">♥${like}</div>
            <div class="date">${fivePlaylistInfo[i].date}</div>
        </div>
        <div class="playlist_title">${fivePlaylistInfo[i].name}</div>
        <div class="playlist_des">${fivePlaylistInfo[i].des}</div>
        </div>
        `
    post.appendChild(song_list_div_element);
    post.appendChild(post_content);
    posts_wrap.appendChild(post);
};
let more_infos = document.querySelectorAll('.more_info');
more_infos.forEach(ho => ho.addEventListener('mouseout', hideSongList))
more_infos.forEach(ho => ho.addEventListener('mouseenter', showSongList))

function showSongList() {
    const song_list = this.parentNode.parentNode.previousSibling;
    song_list.style.transform = "rotate(0)";
    song_list.style.left = "101%";
    song_list.style.opacity = "1";
}

function hideSongList() {
    const song_list = this.parentNode.parentNode.previousSibling;
    song_list.style.transform = "rotate(90deg)"
    song_list.style.left = "100%"
    song_list.style.opacity = "0";
}