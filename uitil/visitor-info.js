// 获取访问者IP地址
function getIP(json) {
    var visitorIP = json.ip;

    // 获取当前时间戳
    var currentTime = new Date().getTime();

    // 从本地存储中获取访问者信息
    var visitorInfo = JSON.parse(localStorage.getItem('visitorInfo'));

    // 如果visitorInfo不存在或者当前时间与上次记录时间相差1分钟以上，就记录访问者信息
    if (!visitorInfo || currentTime - visitorInfo.timestamp > 60 * 1000 || visitorInfo.ip !== visitorIP) {

        // 创建一个记录访问者信息的对象
        var newVisitorInfo = {
            ip: visitorIP,
            browser: window.navigator.userAgent,
            language: window.navigator.language || window.navigator.userLanguage,
            timestamp: currentTime
        };

        // 将访问者信息保存到localStorage中
        localStorage.setItem('visitorInfo', JSON.stringify(newVisitorInfo));

        // 发送POST请求将访问者信息保存到GitHub
        var repoOwner = 'FrankieeW';
        var repoName = 'FrankieeW.github.io-';
        var path = 'Data/visitor.json';
        var accessToken = '';

        var apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                var fileContent = JSON.parse(atob(data.content));
                var visitors = fileContent.visitors || [];

                // 判断是否已经记录过该IP地址
                var existingVisitor = visitors.find(visitor => visitor.ip === visitorIP);

                if (!existingVisitor) {
                    visitors.push(newVisitorInfo);
                }

                // 发送PUT请求将更新后的访问者信息保存到GitHub
                var body = {
                    message: 'Update visitors.json',
                    content: btoa(JSON.stringify({ visitors: visitors }, null, 2)),
                    sha: data.sha
                };

                fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
            });
    }
}
