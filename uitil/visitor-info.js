// 获取当前时间戳
var currentTime = new Date().getTime();

// 从本地存储中获取访问者信息
var visitorInfo = JSON.parse(localStorage.getItem('../Data/visitorInfo'));

// 如果visitorInfo不存在或者当前时间与上次记录时间相差1分钟以上，就记录访问者信息
if (!visitorInfo || currentTime - visitorInfo.timestamp > 60 * 1000 || visitorInfo.ip !== visitorIP) {

    // 创建一个记录访问者信息的对象
    var visitorInfo = {
        ip: null,
        browser: null,
        language: null,
        timestamp: null
    };

    // 获取访问者IP地址
    function getIP(json) {
        visitorInfo.ip = json.ip;
    }

    // 获取访问者浏览器信息
    visitorInfo.browser = window.navigator.userAgent;

    // 获取访问者语言设置
    visitorInfo.language = window.navigator.language || window.navigator.userLanguage;

    // 记录访问时间戳
    visitorInfo.timestamp = currentTime;

    // 将访问者信息保存到localStorage中
    localStorage.setItem('../Data/visitorInfo', JSON.stringify(visitorInfo));
}
