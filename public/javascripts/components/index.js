// Nav Notification
let notificationState = [];

socket.emit('getLatestNotification', new Date());
socket.on('getLatestNotification', (socketOn_notificationList) => {
    let unreadNotiArray = [];
    let formatNoti = socketOn_notificationList.map((rawNotiData) => {
        if (!rawNotiData.isRead) {
            unreadNotiArray.push(rawNotiData.id);
        }
        return transformRawNotiToRenderFormat(rawNotiData);
    });
    if (unreadNotiArray.length > 0) {
        updateNotiBtn(unreadNotiArray.length);
    }
    notificationState.push(...formatNoti);

    document.querySelector('.nav_noti_btn').addEventListener('click', () => {
        document.querySelector('.noti_wrap').classList.add('noti_wrap-active');
        socket.emit('tagRead', unreadNotiArray);
    });
    renderNotiMessage(notificationState);
});

function updateNotiBtn(unreadNotiCount) {
    document.querySelector('.nav_noti_btn').classList.add('nav_noti_btn-active');
    let unread_noti_count_node = document.createElement('div');
    unread_noti_count_node.innerHTML = unreadNotiCount;
    unread_noti_count_node.className = 'unread_noti_count';
    document.querySelector('.nav_noti_btn').appendChild(unread_noti_count_node);
    document.querySelector('.nav_noti_btn > svg').style.display = 'none';
}

function transformRawNotiToRenderFormat(rawNotiData) {
    switch (rawNotiData.type) {
        case 'like':
            return createLikeNoti(rawNotiData);
        case 'follow':
            return createFollowNoti(rawNotiData);
        case 'comment':
            return createCommentNoti(rawNotiData);
        default:
            break;
    }

    function createLikeNoti(rawNotiData) {
        let url = `/profile?id=${rawNotiData.listOwnerToken}&list=${rawNotiData.listId}&song=${rawNotiData.songIndex}`;
        let message = `${rawNotiData.triggerName} 對你的貼文按心`;
        return {
            avatar: rawNotiData.triggerAvatar,
            url,
            message,
            isRead: rawNotiData.isRead,
        };
    }
    function createFollowNoti(rawNotiData) {
        let url = `/profile?id=${rawNotiData.triggerToken}&list=-1`;
        let message = `${rawNotiData.triggerName} 已經開始追蹤你`;
        return {
            avatar: rawNotiData.triggerAvatar,
            url,
            message,
            isRead: rawNotiData.isRead,
        };
    }
    function createCommentNoti(rawNotiData) {
        let url = `/profile?id=${rawNotiData.listOwnerToken}&list=${rawNotiData.listId}&song=${rawNotiData.songIndex}`;
        let message = `${rawNotiData.triggerName} 對你的貼文留言`;
        return {
            avatar: rawNotiData.triggerAvatar,
            url,
            message,
            isRead: rawNotiData.isRead,
        };
    }
}

function renderNotiMessage(notificationState) {
    let noti_wrap_node = document.querySelector('.noti_wrap');
    notificationState.map((notiState) => {
        noti_wrap_node.appendChild(createSingleNotiNode(notiState));
    });
}

function createSingleNotiNode(notiState) {
    let singleNotiNode = document.createElement('li');
    singleNotiNode.className = notiState.isRead ? 'noti' : 'noti noti-unread';

    singleNotiNode.innerHTML = `
                        <a href="${notiState.url}">
                            <img class="noti_avatar" src="${notiState.avatar}">
                            <span class="noti_message">${notiState.message}</span>
                        </a>
                    `;
    return singleNotiNode;
}

// TODO
socket.on('newNotification', (socketOn_notification) => {});

// Nav Search

let userListState;
socket.emit('getUserList');
socket.on('getUserList', (socketOn_userList) => {
    userListState = [...socketOn_userList];
});

const nav_search_btn_node = document.querySelector('.nav_search_btn');
const nav_search_svg_node = document.querySelector('svg');
const nav_search_input_node = document.querySelector('.nav_search_input');
const nav_search_suggestion_node = document.querySelector('.suggestion_wrap');
nav_search_btn_node.addEventListener('mouseenter', showNavSearchWrap);

function showNavSearchWrap() {
    nav_search_btn_node.classList.add('nav_search_btn-hover');
    nav_search_svg_node.classList.add('svg-hover');
    setTimeout(() => nav_search_btn_node.classList.contains('nav_search_btn-hover') && showNavSearchInput(), 300);
}

function showNavSearchInput(e) {
    nav_search_input_node.classList.add('nav_search_input-hover');
    nav_search_input_node.placeholder = '請輸入欲搜尋的用戶名';
    nav_search_input_node.addEventListener('change', displayMatches);
    nav_search_input_node.addEventListener('keyup', displayMatches);
}

function hideNavSearchWrap() {
    nav_search_svg_node.classList.remove('svg-hover');

    nav_search_input_node.classList.remove('nav_search_input-hover');
    nav_search_input_node.value = '';
    nav_search_input_node.placeholder = '';

    nav_search_btn_node.classList.remove('nav_search_btn-hover');
    nav_search_suggestion_node.innerHTML = '';
}

function displayMatches() {
    if (this.value === '') {
        nav_search_suggestion_node.innerHTML = '';
        return;
    }
    nav_search_suggestion_node.className = 'suggestion_wrap';
    const matchArray = findMatches(this.value, userListState);
    const html = matchArray
        .map((user) => {
            const regex = new RegExp(this.value, 'gi');
            const userList = user.userName.replace(regex, `<span class="highlight">${this.value}</span>`);
            return `
                <a href="/profile?id=${user.token}&list=-1">
                    <li>
                        <img class="search_avatar" src="${user.avatar}">
                        <span class="search_name">${userList}</span>
                    </li>
                </a>
            `;
        })
        .join('');
    nav_search_suggestion_node.innerHTML = html;
}

function findMatches(wordToMatch, userList) {
    return userList.filter((user) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return user.userName.match(regex);
    });
}

// Hide nav wrap when click outside the wrap

document.addEventListener('click', (evt) => {
    let targetElement = evt.target;
    do {
        if (targetElement === nav_search_btn_node) {
            if (document.querySelector('.nav_search_btn-hover')) {
                return;
            }
        }
        if (targetElement === document.querySelector('.noti_wrap') || targetElement === document.querySelector('.nav_noti_btn')) {
            if (document.querySelector('.noti_wrap-active')) {
                return;
            }
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);
    if (document.querySelector('.nav_search_btn-hover')) {
        hideNavSearchWrap();
    }
    if (document.querySelector('.noti_wrap-active')) {
        document.querySelector('.noti_wrap').classList.remove('noti_wrap-active');
    }
});

// Egg

let clean = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
let press_record = [];
window.addEventListener('keyup', (e) => {
    press_record.push(e.key);
    press_record.splice(-11, press_record.length - 10);
    if (press_record.join('').includes(clean)) {
        alert('Konami');
        alert('Bye Bye!');
        document.body.innerHTML = '';
    }
});
