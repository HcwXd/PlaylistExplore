window.onscroll = function(ev) {
    if (window.scrollY > 0) {
        document.querySelector('.nav_wrap').style.background = 'rgba(0, 0, 0, 0.8)';
        if (window.scrollY > 200 && window.scrollY < 600) {
            document.querySelector('.left_wrap').style.transform = `translateX(${-600 + window.scrollY}px)`;
            document.querySelector('.left_wrap').style.opacity = `${(window.scrollY - 200) / 400}`;
        }
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
