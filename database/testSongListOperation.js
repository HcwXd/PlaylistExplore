const songListTable = require('./songListTable');

playlistInfo = {
    songList: [{
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
        songName: "既視感酷喔",
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
    des: "這是一個讓人頭昏腦脹的歌單哈哈哈",
    date: "2012/12/12",
    token: '1813929758691464',
    listId: 1
}

    songListTable.modifyPlayList(playlistInfo);
