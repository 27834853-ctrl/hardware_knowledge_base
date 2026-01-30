/**
 * Share Component
 * Hardware Engineer Knowledge Base
 * Provides social sharing functionality
 */

(function() {
    'use strict';

    /**
     * Share configuration
     */
    const shareConfig = {
        title: '硬件工程师知识库',
        text: '免费开放的硬件工程师知识库 - 完整的硬件知识体系，包含60+工程公式、4个专业计算器、30+实战案例',
        url: window.location.href
    };

    /**
     * Social media platforms
     */
    const platforms = {
        weibo: {
            name: '微博',
            icon: 'fab fa-weibo',
            color: '#e6162d',
            shareUrl: (url, title) => `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        },
        wechat: {
            name: '微信',
            icon: 'fab fa-weixin',
            color: '#09b83e',
            action: 'qrcode' // Special handling for WeChat
        },
        qq: {
            name: 'QQ空间',
            icon: 'fab fa-qq',
            color: '#12b7f5',
            shareUrl: (url, title) => `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        },
        twitter: {
            name: 'Twitter',
            icon: 'fab fa-twitter',
            color: '#1da1f2',
            shareUrl: (url, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        },
        facebook: {
            name: 'Facebook',
            icon: 'fab fa-facebook',
            color: '#1877f2',
            shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        },
        linkedin: {
            name: 'LinkedIn',
            icon: 'fab fa-linkedin',
            color: '#0077b5',
            shareUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        },
        telegram: {
            name: 'Telegram',
            icon: 'fab fa-telegram',
            color: '#0088cc',
            shareUrl: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        },
        email: {
            name: '邮件',
            icon: 'fas fa-envelope',
            color: '#ea4335',
            shareUrl: (url, title, text) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
        },
        copy: {
            name: '复制链接',
            icon: 'fas fa-link',
            color: '#666',
            action: 'copy'
        }
    };

    /**
     * Create share button
     */
    function createShareButton() {
        const button = document.createElement('button');
        button.className = 'share-button';
        button.innerHTML = '<i class="fas fa-share-alt"></i>';
        button.setAttribute('aria-label', '分享');
        button.setAttribute('title', '分享到社交媒体');

        // Add styles
        addShareStyles();

        // Add click event
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            showShareModal();
        });

        return button;
    }

    /**
     * Add share styles
     */
    function addShareStyles() {
        if (document.getElementById('share-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'share-styles';
        styles.textContent = `
            .share-button {
                position: fixed;
                right: 20px;
                bottom: 80px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 50%;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                cursor: pointer;
                z-index: 999;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
            }

            .share-button:hover {
                transform: translateY(-3px) scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }

            .share-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeIn 0.3s;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .share-content {
                background: white;
                border-radius: 16px;
                padding: 30px;
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: slideUp 0.3s;
            }

            @keyframes slideUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .share-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }

            .share-title {
                font-size: 20px;
                font-weight: 700;
                color: #333;
                margin: 0;
            }

            .share-close {
                width: 32px;
                height: 32px;
                border: none;
                background: #f5f5f5;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .share-close:hover {
                background: #e0e0e0;
            }

            .share-platforms {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
                margin-bottom: 20px;
            }

            .platform-btn {
                padding: 16px 12px;
                border: 1px solid #e0e0e0;
                border-radius: 12px;
                background: white;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                text-decoration: none;
                color: inherit;
            }

            .platform-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                border-color: transparent;
            }

            .platform-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: white;
            }

            .platform-name {
                font-size: 12px;
                color: #666;
                font-weight: 500;
            }

            .share-native {
                width: 100%;
                padding: 14px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }

            .share-native:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }

            .share-url {
                margin-top: 20px;
                padding: 12px;
                background: #f5f5f5;
                border-radius: 8px;
                font-size: 13px;
                color: #666;
                word-break: break-all;
                user-select: all;
            }

            .qrcode-container {
                text-align: center;
                padding: 20px;
            }

            .qrcode-canvas {
                margin: 20px auto;
                display: block;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
            }

            .qrcode-hint {
                font-size: 14px;
                color: #666;
                margin-top: 12px;
            }

            @media (max-width: 768px) {
                .share-button {
                    bottom: 70px;
                    right: 15px;
                }

                .share-platforms {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            [data-theme="dark"] .share-content {
                background: #1e1e1e;
            }

            [data-theme="dark"] .share-title {
                color: #fff;
            }

            [data-theme="dark"] .platform-btn {
                background: #2a2a2a;
                border-color: #3a3a3a;
                color: #ccc;
            }

            [data-theme="dark"] .platform-name {
                color: #999;
            }

            [data-theme="dark"] .share-url {
                background: #2a2a2a;
                color: #999;
            }

            [data-theme="dark"] .share-close {
                background: #2a2a2a;
                color: #ccc;
            }

            [data-theme="dark"] .share-close:hover {
                background: #3a3a3a;
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Show share modal
     */
    function showShareModal() {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-content">
                <div class="share-header">
                    <h3 class="share-title">分享到</h3>
                    <button class="share-close" onclick="this.closest('.share-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                ${navigator.share ? '<button class="share-native" onclick="handleNativeShare()"><i class="fas fa-share"></i> 使用系统分享</button>' : ''}

                <div class="share-platforms">
                    ${Object.entries(platforms).map(([key, platform]) => `
                        <button class="platform-btn" onclick="handleShare('${key}')">
                            <div class="platform-icon" style="background: ${platform.color}">
                                <i class="${platform.icon}"></i>
                            </div>
                            <span class="platform-name">${platform.name}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="share-url">${shareConfig.url}</div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    /**
     * Handle native share
     */
    window.handleNativeShare = async function() {
        if (!navigator.share) {
            return;
        }

        try {
            await navigator.share({
                title: shareConfig.title,
                text: shareConfig.text,
                url: shareConfig.url
            });
            console.log('✅ Share successful');
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('❌ Share failed:', error);
            }
        }
    };

    /**
     * Handle platform share
     */
    window.handleShare = function(platform) {
        const config = platforms[platform];
        if (!config) {
            return;
        }

        if (config.action === 'copy') {
            copyToClipboard(shareConfig.url);
            return;
        }

        if (config.action === 'qrcode') {
            showQRCode(shareConfig.url);
            return;
        }

        if (config.shareUrl) {
            const url = config.shareUrl(shareConfig.url, shareConfig.title, shareConfig.text);
            window.open(url, '_blank', 'width=600,height=500');
        }
    };

    /**
     * Copy to clipboard
     */
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('链接已复制到剪贴板');
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    /**
     * Fallback copy method
     */
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            showNotification('链接已复制到剪贴板');
        } catch (error) {
            console.error('复制失败:', error);
            showNotification('复制失败，请手动复制');
        }

        document.body.removeChild(textarea);
    }

    /**
     * Show notification
     */
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #4caf50;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10002;
            animation: slideInDown 0.3s;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInDown 0.3s reverse';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    /**
     * Show QR Code
     */
    function showQRCode(url) {
        // Simple QR code generation (using a text representation)
        const modal = document.querySelector('.share-modal');
        const content = modal.querySelector('.share-content');

        content.innerHTML = `
            <div class="share-header">
                <h3 class="share-title">微信扫码分享</h3>
                <button class="share-close" onclick="this.closest('.share-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="qrcode-container">
                <div style="font-size: 100px; line-height: 1;">📱</div>
                <p class="qrcode-hint">请使用微信扫描二维码分享</p>
                <p style="font-size: 12px; color: #999; margin-top: 12px;">
                    或复制链接在微信中打开：<br>
                    <span style="word-break: break-all; user-select: all; background: #f5f5f5; padding: 8px; border-radius: 4px; display: inline-block; margin-top: 8px;">${url}</span>
                </p>
                <button class="platform-btn" onclick="handleShare('copy')" style="margin: 20px auto 0; width: auto; padding: 10px 20px; flex-direction: row;">
                    <i class="fas fa-copy"></i>
                    复制链接
                </button>
            </div>
        `;
    }

    /**
     * Initialize
     */
    function init() {
        // Wait for DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addShareButton);
        } else {
            addShareButton();
        }
    }

    /**
     * Add share button to page
     */
    function addShareButton() {
        const button = createShareButton();
        document.body.appendChild(button);
    }

    // Initialize
    init();

})();
