/**
 * Analytics Component
 * Hardware Engineer Knowledge Base
 * Provides website analytics and user behavior tracking
 */

(function() {
    'use strict';

    /**
     * Analytics configuration
     */
    const analyticsConfig = {
        // Google Analytics (替换为实际的 Measurement ID)
        ga: {
            enabled: true,
            measurementId: 'G-XXXXXXXXXX', // 用户需要替换为自己的 ID
            debug: false
        },
        // 百度统计
        baidu: {
            enabled: false,
            siteId: '' // 用户需要填入百度统计站点 ID
        },
        // 自定义事件追踪
        customEvents: {
            enabled: true,
            trackClicks: true,
            trackScroll: true,
            trackSearch: true,
            trackDownloads: true
        },
        // 隐私设置
        privacy: {
            respectDNT: true, // 尊重 Do Not Track
            anonymizeIP: true,
            cookieConsent: true
        }
    };

    /**
     * Check if tracking is allowed
     */
    function isTrackingAllowed() {
        // 检查 Do Not Track
        if (analyticsConfig.privacy.respectDNT && navigator.doNotTrack === '1') {
            console.log('📊 Analytics: DNT is enabled, tracking disabled');
            return false;
        }

        // 检查 Cookie 同意
        if (analyticsConfig.privacy.cookieConsent) {
            const consent = localStorage.getItem('cookie-consent');
            if (consent !== 'accepted') {
                console.log('📊 Analytics: Cookie consent not given');
                return false;
            }
        }

        return true;
    }

    /**
     * Initialize Google Analytics
     */
    function initGoogleAnalytics() {
        if (!analyticsConfig.ga.enabled || !analyticsConfig.ga.measurementId) {
            return;
        }

        if (analyticsConfig.ga.measurementId === 'G-XXXXXXXXXX') {
            console.log('📊 Analytics: Google Analytics ID not configured');
            return;
        }

        if (!isTrackingAllowed()) {
            return;
        }

        try {
            // 加载 gtag.js
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga.measurementId}`;
            document.head.appendChild(script);

            // 初始化 gtag
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', analyticsConfig.ga.measurementId, {
                'anonymize_ip': analyticsConfig.privacy.anonymizeIP,
                'debug_mode': analyticsConfig.ga.debug
            });

            console.log('✅ Google Analytics initialized');
        } catch (error) {
            console.error('❌ Google Analytics initialization failed:', error);
        }
    }

    /**
     * Initialize Baidu Analytics
     */
    function initBaiduAnalytics() {
        if (!analyticsConfig.baidu.enabled || !analyticsConfig.baidu.siteId) {
            return;
        }

        if (!isTrackingAllowed()) {
            return;
        }

        try {
            const script = document.createElement('script');
            script.innerHTML = `
                var _hmt = _hmt || [];
                (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?${analyticsConfig.baidu.siteId}";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                })();
            `;
            document.head.appendChild(script);

            console.log('✅ Baidu Analytics initialized');
        } catch (error) {
            console.error('❌ Baidu Analytics initialization failed:', error);
        }
    }

    /**
     * Track custom event
     */
    function trackEvent(category, action, label, value) {
        if (!analyticsConfig.customEvents.enabled || !isTrackingAllowed()) {
            return;
        }

        // Google Analytics
        if (window.gtag && analyticsConfig.ga.enabled) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
            });
        }

        // Baidu Analytics
        if (window._hmt && analyticsConfig.baidu.enabled) {
            _hmt.push(['_trackEvent', category, action, label, value]);
        }

        // Console log for debugging
        if (analyticsConfig.ga.debug) {
            console.log('📊 Event:', { category, action, label, value });
        }
    }

    /**
     * Track page view
     */
    function trackPageView(path) {
        if (!isTrackingAllowed()) {
            return;
        }

        // Google Analytics
        if (window.gtag && analyticsConfig.ga.enabled) {
            gtag('config', analyticsConfig.ga.measurementId, {
                'page_path': path
            });
        }

        // Baidu Analytics
        if (window._hmt && analyticsConfig.baidu.enabled) {
            _hmt.push(['_trackPageview', path]);
        }

        if (analyticsConfig.ga.debug) {
            console.log('📊 Page view:', path);
        }
    }

    /**
     * Track clicks on important elements
     */
    function setupClickTracking() {
        if (!analyticsConfig.customEvents.trackClicks) {
            return;
        }

        // 追踪导航链接
        document.querySelectorAll('.nav-links a, .sidebar-nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                const text = this.textContent.trim();
                trackEvent('Navigation', 'Click', text);
            });
        });

        // 追踪公式卡片点击
        document.querySelectorAll('.formula-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('h4')?.textContent.trim() || 'Unknown';
                trackEvent('Formula', 'View', title);
            });
        });

        // 追踪案例卡片点击
        document.querySelectorAll('.case-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('h4')?.textContent.trim() || 'Unknown';
                trackEvent('Case', 'View', title);
            });
        });

        // 追踪下载按钮
        document.querySelectorAll('[download], .download-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const filename = this.getAttribute('download') || this.textContent.trim();
                trackEvent('Download', 'Click', filename);
            });
        });

        // 追踪外部链接
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', function() {
                const url = this.href;
                trackEvent('External Link', 'Click', url);
            });
        });

        // 追踪分享按钮
        document.addEventListener('click', function(e) {
            if (e.target.closest('.share-button')) {
                trackEvent('Social', 'Share Button', 'Click');
            } else if (e.target.closest('.platform-btn')) {
                const platform = e.target.closest('.platform-btn').querySelector('.platform-name')?.textContent;
                trackEvent('Social', 'Share', platform);
            }
        });

        // 追踪主题切换
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const theme = document.documentElement.getAttribute('data-theme') || 'light';
                trackEvent('UI', 'Theme Toggle', theme);
            });
        }

        // 追踪返回顶部
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', function() {
                trackEvent('UI', 'Back to Top', 'Click');
            });
        }
    }

    /**
     * Track scroll depth
     */
    function setupScrollTracking() {
        if (!analyticsConfig.customEvents.trackScroll) {
            return;
        }

        let maxScroll = 0;
        const thresholds = [25, 50, 75, 100];
        const tracked = {};

        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;

                thresholds.forEach(threshold => {
                    if (scrollPercent >= threshold && !tracked[threshold]) {
                        tracked[threshold] = true;
                        trackEvent('Scroll Depth', 'Scroll', `${threshold}%`, threshold);
                    }
                });
            }
        });
    }

    /**
     * Track search queries
     */
    function setupSearchTracking() {
        if (!analyticsConfig.customEvents.trackSearch) {
            return;
        }

        const searchInput = document.getElementById('searchInput');
        if (!searchInput) {
            return;
        }

        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = this.value.trim();
                if (query.length >= 2) {
                    trackEvent('Search', 'Query', query);
                }
            }, 1000);
        });

        // 追踪搜索结果点击
        document.addEventListener('click', function(e) {
            if (e.target.closest('.search-result-item')) {
                const query = searchInput.value.trim();
                const resultTitle = e.target.closest('.search-result-item').textContent.trim();
                trackEvent('Search', 'Result Click', `${query} -> ${resultTitle}`);
            }
        });
    }

    /**
     * Track time on page
     */
    function setupTimeTracking() {
        let startTime = Date.now();
        let reportSent = false;

        function sendTimeReport() {
            if (reportSent) return;
            reportSent = true;

            const timeSpent = Math.round((Date.now() - startTime) / 1000); // seconds
            trackEvent('Engagement', 'Time on Page', document.title, timeSpent);
        }

        // 页面关闭或隐藏时发送
        window.addEventListener('beforeunload', sendTimeReport);
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                sendTimeReport();
            }
        });
    }

    /**
     * Show cookie consent banner
     */
    function showCookieConsent() {
        if (!analyticsConfig.privacy.cookieConsent) {
            return;
        }

        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'accepted' || consent === 'rejected') {
            return;
        }

        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <i class="fas fa-cookie-bite"></i>
                    <p>
                        我们使用 Cookie 来改善您的浏览体验并分析网站流量。
                        <a href="#" onclick="showPrivacyPolicy(event)">了解更多</a>
                    </p>
                </div>
                <div class="cookie-consent-buttons">
                    <button class="cookie-btn cookie-btn-accept" onclick="acceptCookies()">
                        <i class="fas fa-check"></i> 接受
                    </button>
                    <button class="cookie-btn cookie-btn-reject" onclick="rejectCookies()">
                        <i class="fas fa-times"></i> 拒绝
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // 添加样式
        if (!document.getElementById('cookie-consent-styles')) {
            const styles = document.createElement('style');
            styles.id = 'cookie-consent-styles';
            styles.textContent = `
                .cookie-consent-banner {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                    z-index: 10000;
                    max-width: 600px;
                    width: calc(100% - 40px);
                    animation: slideUp 0.3s;
                }

                @keyframes slideUp {
                    from {
                        transform: translateX(-50%) translateY(100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }

                .cookie-consent-content {
                    padding: 20px;
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .cookie-consent-text {
                    flex: 1;
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }

                .cookie-consent-text i {
                    font-size: 24px;
                    color: #ff6b35;
                    margin-top: 2px;
                }

                .cookie-consent-text p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.6;
                    color: #333;
                }

                .cookie-consent-text a {
                    color: #667eea;
                    text-decoration: underline;
                }

                .cookie-consent-buttons {
                    display: flex;
                    gap: 10px;
                    flex-shrink: 0;
                }

                .cookie-btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .cookie-btn-accept {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }

                .cookie-btn-accept:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }

                .cookie-btn-reject {
                    background: #f5f5f5;
                    color: #666;
                }

                .cookie-btn-reject:hover {
                    background: #e0e0e0;
                }

                @media (max-width: 768px) {
                    .cookie-consent-content {
                        flex-direction: column;
                        padding: 16px;
                    }

                    .cookie-consent-buttons {
                        width: 100%;
                    }

                    .cookie-btn {
                        flex: 1;
                    }
                }

                [data-theme="dark"] .cookie-consent-banner {
                    background: #2a2a2a;
                }

                [data-theme="dark"] .cookie-consent-text p {
                    color: #ccc;
                }

                [data-theme="dark"] .cookie-btn-reject {
                    background: #3a3a3a;
                    color: #ccc;
                }

                [data-theme="dark"] .cookie-btn-reject:hover {
                    background: #4a4a4a;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    /**
     * Accept cookies
     */
    window.acceptCookies = function() {
        localStorage.setItem('cookie-consent', 'accepted');
        document.querySelector('.cookie-consent-banner')?.remove();

        // 初始化分析工具
        initGoogleAnalytics();
        initBaiduAnalytics();
        setupClickTracking();
        setupScrollTracking();
        setupSearchTracking();
        setupTimeTracking();

        trackEvent('Privacy', 'Cookie Consent', 'Accepted');
    };

    /**
     * Reject cookies
     */
    window.rejectCookies = function() {
        localStorage.setItem('cookie-consent', 'rejected');
        document.querySelector('.cookie-consent-banner')?.remove();
        trackEvent('Privacy', 'Cookie Consent', 'Rejected');
    };

    /**
     * Show privacy policy
     */
    window.showPrivacyPolicy = function(event) {
        event.preventDefault();
        alert('隐私政策：\n\n' +
              '我们使用 Cookie 和分析工具来：\n' +
              '1. 改善网站功能和用户体验\n' +
              '2. 分析访问统计和用户行为\n' +
              '3. 优化内容和性能\n\n' +
              '我们不会：\n' +
              '1. 收集个人身份信息\n' +
              '2. 向第三方出售数据\n' +
              '3. 追踪您的浏览历史\n\n' +
              '您可以随时在浏览器设置中清除 Cookie。');
    };

    /**
     * Public API
     */
    window.Analytics = {
        track: trackEvent,
        trackPageView: trackPageView,
        isEnabled: isTrackingAllowed
    };

    /**
     * Initialize
     */
    function init() {
        console.log('📊 Analytics module loaded');

        // 显示 Cookie 同意横幅
        showCookieConsent();

        // 如果已同意，初始化分析工具
        if (isTrackingAllowed()) {
            initGoogleAnalytics();
            initBaiduAnalytics();

            // 等待 DOM 加载完成后设置事件追踪
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    setupClickTracking();
                    setupScrollTracking();
                    setupSearchTracking();
                    setupTimeTracking();
                });
            } else {
                setupClickTracking();
                setupScrollTracking();
                setupSearchTracking();
                setupTimeTracking();
            }
        }
    }

    // Initialize
    init();

})();
