const userList = [
    {
        userName: '胡程維',
        userId: 1819883341429439,
        avatar: 'http://graph.facebook.com/1819883341429439/picture?type=large',
    },
    {
        userName: '胡程啊',
        userId: 1819883341429439,
        avatar: 'http://graph.facebook.com/564885960573962/picture?type=large',
    },
    {
        userName: '阿程維',
        userId: 1819883341429439,
        avatar: 'http://graph.facebook.com/564885960573962/picture?type=large',
    },
    {
        userName: '胡阿維',
        userId: 1819883341429439,
        avatar: 'https://i.imgur.com/9RXPWGu.png',
    },
];

// socket.emit('getUserList');
// socket.on('getUserList', (socketOn_userList) => {
//     userList = [...socketOn_userList];
// });

const nav_search_btn_node = document.querySelector('.nav_search_btn');
nav_search_btn_node.addEventListener('mouseenter', showNavSearchWrap);
nav_search_btn_node.addEventListener('transitionend', showNavSearchInput);

function showNavSearchWrap() {
    nav_search_btn_node.classList.add('nav_search_btn-hover');
    document.querySelector('svg').classList.add('svg-hover');
}

function showNavSearchInput(e) {
    console.log(e.propertyName);
    if (e.propertyName.includes('width')) {
        let nav_search_input_node = document.querySelector('.nav_search_input');
        nav_search_input_node.classList.add('nav_search_input-hover');
        nav_search_input_node.placeholder = '請輸入欲搜尋的用戶名';

        nav_search_input_node.addEventListener('change', displayMatches);
        nav_search_input_node.addEventListener('keyup', displayMatches);
    }
}

function displayMatches() {
    if (this.value === '') {
        document.querySelector('.suggestion_wrap').innerHTML = '';
        return;
    }
    let suggestion_wrap_node = document.querySelector('.suggestion_wrap');
    suggestion_wrap_node.className = 'suggestion_wrap';
    const matchArray = findMatches(this.value, userList);
    const html = matchArray
        .map((user) => {
            const regex = new RegExp(this.value, 'gi');
            const userList = user.userName.replace(regex, `<span class="highlight">${this.value}</span>`);
            return `
        <a href="/profile?id=${user.userId}&list=-1">
            <li>
                <img class="avatar" src="${user.avatar}">
                <span class="name">${userList}</span>
            </li>
        </a>
      `;
        })
        .join('');
    suggestion_wrap_node.innerHTML = html;
}

function findMatches(wordToMatch, userList) {
    return userList.filter((user) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return user.userName.match(regex);
    });
}
