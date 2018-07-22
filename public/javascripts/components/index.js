// Nav Notification
let notificationState = [];

socket.emit('getLatestNotification', new Date());
socket.on('getLatestNotification', (socketOn_notificationList) => {
    console.log(socketOn_notificationList);
    let formatNoti = socketOn_notificationList.map((rawNotiData) => {
        return transformRawNotiToRenderFormat(rawNotiData);
    });

    notificationState.push(...formatNoti);

    renderNotiMessage(notificationState);
    console.log(notificationState);
});

function transformRawNotiToRenderFormat(rawNotiData) {
    switch (rawNotiData.type) {
        case 'like':
            return createLikeNoti(rawNotiData);
            break;
        case 'follow':
            return createFollowNoti(rawNotiData);

            break;
        case 'comment':
            return createCommentNoti(rawNotiData);
            break;
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

    return singleNotification;
}

function renderNotiMessage(notificationState) {
    let noti_wrap_node = document.querySelector('.noti_wrap');
    noti_wrap_node.style.display = 'block';
    notificationState.map((notiState) => {
        noti_wrap_node.appendChild(createSingleNotiNode(notiState));
    });
    // console.log(noti_node_collection);
    // noti_wrap_node.appendChild(...noti_node_collection);
}

function createSingleNotiNode(notiState) {
    let singleNotiNode = document.createElement('li');
    singleNotiNode.innerHTML = `
                        <a href="${notiState.url}">
                            <img class="avatar" src="${notiState.avatar}">
                            <span class="noti_message">${notiState.message}</span>
                        </a>
                    `;
    return singleNotiNode;
}

socket.on('newNotification', (socketOn_notification) => {});
// Nav Search

let userListState;
socket.emit('getUserList');
socket.on('getUserList', (socketOn_userList) => {
    userListState = [...socketOn_userList];
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
    const matchArray = findMatches(this.value, userListState);
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

// Hide Nav Wrap

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

// Egg

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
