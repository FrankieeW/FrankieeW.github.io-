// adModule.js
(function() {
    'use strict';

    // 广告模块的功能
    const AdModule = {
        // 显示广告
        showAd: function(url, options = {}) {
            // 设置默认配置
            const defaults = {
                type: 'popup', // 广告类型: popup (弹窗), banner (横幅), fullscreen (全屏)
                probability: 1 / 3, // 弹出广告的概率
                width: 600, // 弹窗宽度
                height: 400, // 弹窗高度
                timeout: 5000, // 横幅广告显示时间（毫秒）
            };

            // 合并用户传入的配置和默认配置
            const config = Object.assign({}, defaults, options);

            console.log('广告模块加载完成，广告配置：', config);  // 调试信息

            // 随机概率判断
            if (Math.random() < config.probability) {
                console.log('广告将显示！');  // 调试信息
                switch (config.type) {
                    case 'popup':
                        // 弹窗广告
                        this.showPopup(url, config.width, config.height);
                        break;
                    case 'banner':
                        // 横幅广告
                        this.showBanner(url, config.timeout);
                        break;
                    case 'fullscreen':
                        // 全屏广告
                        this.showFullscreen(url);
                        break;
                    default:
                        console.warn('Unknown ad type:', config.type);
                        break;
                }
            }
        },

        // 弹窗广告
        showPopup: function(url, width, height) {
            const popup = window.open(url, '_blank', `width=${width},height=${height}`);
            if (!popup) {
                console.error('Failed to open popup. Make sure popups are allowed.');
            }
        },

        // 横幅广告
        showBanner: function(url, timeout) {
            const banner = document.createElement('div');
            banner.style.position = 'fixed';
            banner.style.bottom = '0';
            banner.style.left = '0';
            banner.style.width = '100%';
            banner.style.backgroundColor = '#fff';
            banner.style.textAlign = 'center';
            banner.style.padding = '10px';
            banner.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
            banner.innerHTML = `<a href="${url}" target="_blank">点击这里查看广告</a>`;
            document.body.appendChild(banner);

            // 设置超时后自动移除横幅
            setTimeout(() => {
                banner.remove();
            }, timeout);
        },

        // 全屏广告
        showFullscreen: function(url) {
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.position = 'fixed';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.zIndex = '9999';
            document.body.appendChild(iframe);

            // 点击关闭全屏广告
            iframe.addEventListener('click', () => {
                iframe.remove();
            });
        }
    };

    // 暴露模块给全局
    window.AdModule = AdModule;
})();
