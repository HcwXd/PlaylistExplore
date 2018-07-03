cover = "https://img.youtube.com/vi/djACkCHl3JA/maxresdefault.jpg";

socket.emit('getLatestPlaylists');
socket.on('getLatestPlaylists', (_fivePlaylistInfo) => {
    __fivePlaylistInfo = _fivePlaylistInfo;
})

var fivePlaylistInfo = [{
    ownerName: "Apple",
    avatar: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
    songList: [{
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "m1ple6Y_C_A",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "m1ple6Y_C_A",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "m1ple6Y_C_A",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "m1ple6Y_C_A",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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
        url: "m1ple6Y_C_A",
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
        url: "_PmHj0EP6I8",
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
        url: "_PmHj0EP6I8",
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

var inactivityTime = function () {
    var t;
    window.onload = resetTimer;
    // DOM Events
    document.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onmousedown = resetTimer; // touchscreen presses
    document.ontouchstart = resetTimer;
    document.onclick = resetTimer; // touchpad clicks
    document.onscroll = resetTimer; // scrolling with arrow keys
    document.onkeypress = resetTimer;

    function idleRender() {
        let content_wrap = document.querySelector('.content_wrap');
        let idle_background = document.createElement('div');
        idle_background.className = "idle_background";
        content_wrap.parentNode.appendChild(idle_background);

        function random(min, max) {
            var num = Math.floor(Math.random() * (max - min)) + min;
            return num;
        }
        for (let i = 0; i < fivePlaylistInfo.length; i++) {
            for (let j = 0; j < fivePlaylistInfo[i].songList.length; j++) {
                let album = document.createElement("A");
                album.className = "album";
                let css_top = random(0, 80);
                let css_right = random(0, 80);
                album.style.top = css_top + "%";
                album.style.right = css_right + "%";
                let bg_url = `https://img.youtube.com/vi/${fivePlaylistInfo[i].songList[j].url}/maxresdefault.jpg`
                album.style.backgroundImage = `url(${bg_url})`
                // album.setAttribute("href", "#playlist");
                let delay = random(-6, 0)
                album.style.animationDelay = delay + "s";
                idle_background.appendChild(album);
                // album.addEventListener("click", () => {
                //     socket.emit("getPlaylistUrl", albumCollection[i].url);
                // })

            }

        }
    }

    function resetTimer() {
        if (document.querySelector('.idle_background')) {
            document.querySelector('.idle_background').remove();
        }
        clearTimeout(t);
        t = setTimeout(idleRender, 3000)

    }
};

inactivityTime();