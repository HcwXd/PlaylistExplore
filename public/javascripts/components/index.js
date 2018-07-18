const userList = [
    {
        userName: '胡程維',
        userId: 123,
        avatar: 123,
    },
    {
        userName: '胡程啊',
        userId: 123,
        avatar: 123,
    },
    {
        userName: '阿程維',
        userId: 123,
        avatar: 123,
    },
    {
        userName: '胡阿維',
        userId: 123,
        avatar: 123,
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
    let suggestion_wrap_node = document.querySelector('.suggestion_wrap');
    suggestion_wrap_node.className = 'suggestion_wrap';
    const matchArray = findMatches(this.value, userList);
    const html = matchArray
        .map((user) => {
            const regex = new RegExp(this.value, 'gi');
            const userList = user.userName.replace(regex, `<span class="hl">${this.value}</span>`);
            return `
        <li>
            <span class="avatar"></span>
            <span class="name">${userList}</span>
        </li>
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
