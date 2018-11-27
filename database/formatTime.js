function formatDigit(num) {
    if (num >= 10) return num;
    return '0' + num;
}
function getUTCString(time) {
    if (typeof time == 'string') return time;
    const year = time.getUTCFullYear();
    const month = formatDigit(time.getUTCMonth() + 1);
    const date = formatDigit(time.getUTCDate());
    const hours = formatDigit(time.getUTCHours());
    const min = formatDigit(time.getUTCMinutes());
    const sec = formatDigit(time.getUTCSeconds());
    return `${year}-${month}-${date} ${hours}:${min}:${sec}`;
}

module.exports = {
    getUTCString,
};
