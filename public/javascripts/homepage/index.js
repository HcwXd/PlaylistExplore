window.onscroll = function(ev) {
    if (window.scrollY > 0) {
        document.querySelector('.nav_wrap').style.background = 'rgba(0, 0, 0, 0.8)';
        // if (window.scrollY > 200 && window.scrollY < 600) {
        //     document.querySelector('.left_wrap').style.transform = `translateX(${-600 + window.scrollY}px)`;
        //     document.querySelector('.left_wrap').style.opacity = `${(window.scrollY - 200) / 400}`;
        // }
    } else {
        document.querySelector('.nav_wrap').style.background = 'rgba(0, 0, 0, 0)';
    }
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
});

const email_btn_node = document.querySelector('.email_btn');
email_btn_node.addEventListener('click', () => {
    if (document.querySelector('.email_input').value.length === 0) {
        alert('請輸入 Email');
        return;
    }
    socket.emit('getEmail', document.querySelector('.email_input').value);
    alert('訂閱成功');
    document.querySelector('.email_input').value = '';
});
