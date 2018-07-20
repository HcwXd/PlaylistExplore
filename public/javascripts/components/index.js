let userList;
socket.emit('getUserList');
socket.on('getUserList', (socketOn_userList) => {
    userList = [...socketOn_userList];
    console.log(userList);
});
let isShowing = false;
const nav_search_btn_node = document.querySelector('.nav_search_btn');
nav_search_btn_node.addEventListener('mouseenter', showNavSearchWrap);
nav_search_btn_node.addEventListener('mouseout', () => (isShowing = false));

nav_search_btn_node.addEventListener('transitionend', (e) => isShowing && showNavSearchInput(e));

function showNavSearchWrap() {
    isShowing = true;
    nav_search_btn_node.classList.add('nav_search_btn-hover');
    document.querySelector('svg').classList.add('svg-hover');
}

function showNavSearchInput(e) {
    if (e.propertyName.includes('width')) {
        let nav_search_input_node = document.querySelector('.nav_search_input');
        nav_search_input_node.classList.add('nav_search_input-hover');
        nav_search_input_node.placeholder = '請輸入欲搜尋的用戶名';
        nav_search_input_node.addEventListener('change', displayMatches);
        nav_search_input_node.addEventListener('keyup', displayMatches);
        isShowing = false;
    }
}

function hideNavSearchInput() {
    document.querySelector('svg').classList.remove('svg-hover');
    document.querySelector('.nav_search_input').classList.remove('nav_search_input-hover');
    document.querySelector('.nav_search_input').value = '';
    document.querySelector('.nav_search_input').placeholder = '';
    nav_search_btn_node.classList.remove('nav_search_btn-hover');
    document.querySelector('.suggestion_wrap').innerHTML = '';
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
        <a href="/profile?id=${user.token}&list=-1">
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

document.addEventListener('click', (evt) => {
    let targetElement = evt.target;
    do {
        if (targetElement == nav_search_btn_node) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    hideNavSearchInput();
});

let clean = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
let press_record = [];
window.addEventListener('keyup', (e) => {
    console.log(e.key);
    press_record.push(e.key);
    press_record.splice(-11, press_record.length - 10);
    if (press_record.join('').includes(clean)) {
        alert('Konami');
        alert('Bye Bye!');
        document.body.innerHTML = '';
    }
});
