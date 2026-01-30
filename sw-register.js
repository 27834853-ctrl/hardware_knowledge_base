/**
 * Service Worker Registration
 * Hardware Engineer Knowledge Base
 */

(function() {
    'use strict';

    // Check if Service Worker is supported
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker is not supported in this browser');
        return;
    }

    // Configuration
    const SW_URL = '/hardware_knowledge_base/sw.js';
    const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // Check every hour

    /**
     * Register Service Worker
     */
    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register(SW_URL, {
                scope: '/hardware_knowledge_base/'
            });

            console.log('✅ Service Worker registered successfully!');
            console.log('Scope:', registration.scope);

            // Check for updates
            setupUpdateChecker(registration);

            // Handle controller change
            setupControllerChangeHandler();

            // Show install prompt if not installed
            setupInstallPrompt();

            return registration;
        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
        }
    }

    /**
     * Setup update checker
     */
    function setupUpdateChecker(registration) {
        // Check for updates on page load
        registration.update();

        // Periodic update check
        setInterval(() => {
            console.log('🔄 Checking for Service Worker updates...');
            registration.update();
        }, UPDATE_CHECK_INTERVAL);

        // Listen for update found event
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('🆕 New Service Worker found!');

            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New Service Worker is ready
                    showUpdateNotification(newWorker);
                }
            });
        });
    }

    /**
     * Setup controller change handler
     */
    function setupControllerChangeHandler() {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('🔄 Service Worker controller changed, reloading...');
            window.location.reload();
        });
    }

    /**
     * Show update notification
     */
    function showUpdateNotification(newWorker) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'sw-update-notification';
        notification.innerHTML = `
            <div class="sw-update-content">
                <div class="sw-update-icon">🚀</div>
                <div class="sw-update-text">
                    <strong>新版本可用！</strong>
                    <p>知识库已更新，点击刷新以获取最新内容。</p>
                </div>
                <div class="sw-update-actions">
                    <button class="sw-update-btn sw-update-btn-primary" id="swUpdateBtn">
                        <i class="fas fa-sync-alt"></i> 立即更新
                    </button>
                    <button class="sw-update-btn sw-update-btn-secondary" id="swDismissBtn">
                        <i class="fas fa-times"></i> 稍后
                    </button>
                </div>
            </div>
        `;

        // Add styles
        if (!document.getElementById('sw-update-styles')) {
            const styles = document.createElement('style');
            styles.id = 'sw-update-styles';
            styles.textContent = `
                .sw-update-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    padding: 20px;
                    max-width: 400px;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .sw-update-content {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .sw-update-icon {
                    font-size: 32px;
                    text-align: center;
                }

                .sw-update-text strong {
                    display: block;
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 5px;
                }

                .sw-update-text p {
                    font-size: 14px;
                    color: #666;
                    margin: 0;
                }

                .sw-update-actions {
                    display: flex;
                    gap: 10px;
                }

                .sw-update-btn {
                    flex: 1;
                    padding: 10px 16px;
                    border: none;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .sw-update-btn-primary {
                    background: #673ab7;
                    color: white;
                }

                .sw-update-btn-primary:hover {
                    background: #5e35b1;
                    transform: translateY(-1px);
                }

                .sw-update-btn-secondary {
                    background: #f5f5f5;
                    color: #666;
                }

                .sw-update-btn-secondary:hover {
                    background: #e0e0e0;
                }

                @media (max-width: 768px) {
                    .sw-update-notification {
                        left: 10px;
                        right: 10px;
                        max-width: none;
                    }

                    .sw-update-actions {
                        flex-direction: column;
                    }
                }

                [data-theme="dark"] .sw-update-notification {
                    background: #1e1e1e;
                }

                [data-theme="dark"] .sw-update-text strong {
                    color: #fff;
                }

                [data-theme="dark"] .sw-update-text p {
                    color: #bbb;
                }

                [data-theme="dark"] .sw-update-btn-secondary {
                    background: #2a2a2a;
                    color: #bbb;
                }

                [data-theme="dark"] .sw-update-btn-secondary:hover {
                    background: #3a3a3a;
                }
            `;
            document.head.appendChild(styles);
        }

        // Append to body
        document.body.appendChild(notification);

        // Handle update button
        document.getElementById('swUpdateBtn').addEventListener('click', () => {
            // Tell the new Service Worker to skip waiting
            newWorker.postMessage({ type: 'SKIP_WAITING' });
            notification.remove();
        });

        // Handle dismiss button
        document.getElementById('swDismissBtn').addEventListener('click', () => {
            notification.remove();
        });

        // Auto dismiss after 30 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 30000);
    }

    /**
     * Setup PWA install prompt
     */
    function setupInstallPrompt() {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('💾 PWA install prompt available');

            // Prevent the mini-infobar from appearing
            e.preventDefault();

            // Stash the event so it can be triggered later
            deferredPrompt = e;

            // Show custom install button
            showInstallBanner(deferredPrompt);
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('✅ PWA installed successfully!');
            deferredPrompt = null;

            // Hide install banner if visible
            const banner = document.querySelector('.pwa-install-banner');
            if (banner) {
                banner.remove();
            }

            // Show thank you message
            showInstallThankYou();
        });
    }

    /**
     * Show PWA install banner
     */
    function showInstallBanner(deferredPrompt) {
        // Check if already dismissed
        if (localStorage.getItem('pwa-install-dismissed') === 'true') {
            return;
        }

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        }

        const banner = document.createElement('div');
        banner.className = 'pwa-install-banner';
        banner.innerHTML = `
            <div class="pwa-install-content">
                <div class="pwa-install-icon">📱</div>
                <div class="pwa-install-text">
                    <strong>安装到主屏幕</strong>
                    <p>快速访问硬件知识库，支持离线使用</p>
                </div>
                <div class="pwa-install-actions">
                    <button class="pwa-install-btn" id="pwaInstallBtn">
                        <i class="fas fa-download"></i> 安装
                    </button>
                    <button class="pwa-dismiss-btn" id="pwaDismissBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        // Add styles
        if (!document.getElementById('pwa-install-styles')) {
            const styles = document.createElement('style');
            styles.id = 'pwa-install-styles';
            styles.textContent = `
                .pwa-install-banner {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    padding: 16px 20px;
                    max-width: 500px;
                    width: calc(100% - 40px);
                    z-index: 10000;
                    animation: slideInUp 0.4s ease-out;
                }

                @keyframes slideInUp {
                    from {
                        transform: translateX(-50%) translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }

                .pwa-install-content {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .pwa-install-icon {
                    font-size: 32px;
                }

                .pwa-install-text {
                    flex: 1;
                }

                .pwa-install-text strong {
                    display: block;
                    font-size: 15px;
                    margin-bottom: 4px;
                }

                .pwa-install-text p {
                    font-size: 13px;
                    margin: 0;
                    opacity: 0.9;
                }

                .pwa-install-actions {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }

                .pwa-install-btn {
                    padding: 8px 16px;
                    background: white;
                    color: #673ab7;
                    border: none;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    white-space: nowrap;
                }

                .pwa-install-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }

                .pwa-dismiss-btn {
                    padding: 8px;
                    background: rgba(255,255,255,0.2);
                    border: none;
                    border-radius: 6px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                }

                .pwa-dismiss-btn:hover {
                    background: rgba(255,255,255,0.3);
                }

                @media (max-width: 768px) {
                    .pwa-install-banner {
                        bottom: 10px;
                        width: calc(100% - 20px);
                    }

                    .pwa-install-content {
                        flex-wrap: wrap;
                    }

                    .pwa-install-text {
                        flex: 1 1 100%;
                    }

                    .pwa-install-actions {
                        flex: 1 1 100%;
                        justify-content: flex-end;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(banner);

        // Handle install button
        document.getElementById('pwaInstallBtn').addEventListener('click', async () => {
            if (!deferredPrompt) {
                return;
            }

            // Show the install prompt
            deferredPrompt.prompt();

            // Wait for the user's response
            const { outcome } = await deferredPrompt.userChoice;
            console.log('User response:', outcome);

            // Clear the prompt
            deferredPrompt = null;

            // Remove banner
            banner.remove();
        });

        // Handle dismiss button
        document.getElementById('pwaDismissBtn').addEventListener('click', () => {
            localStorage.setItem('pwa-install-dismissed', 'true');
            banner.remove();
        });
    }

    /**
     * Show install thank you message
     */
    function showInstallThankYou() {
        const message = document.createElement('div');
        message.className = 'pwa-thank-you';
        message.innerHTML = `
            <div class="pwa-thank-you-content">
                <div class="pwa-thank-you-icon">🎉</div>
                <strong>安装成功！</strong>
                <p>现在可以从主屏幕快速访问知识库了</p>
            </div>
        `;

        const styles = document.createElement('style');
        styles.textContent = `
            .pwa-thank-you {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #4caf50;
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10001;
                animation: slideInDown 0.3s ease-out;
            }

            @keyframes slideInDown {
                from {
                    transform: translateX(-50%) translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }

            .pwa-thank-you-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .pwa-thank-you-icon {
                font-size: 24px;
            }

            .pwa-thank-you strong {
                display: block;
                font-size: 15px;
                margin-bottom: 4px;
            }

            .pwa-thank-you p {
                margin: 0;
                font-size: 13px;
                opacity: 0.9;
            }
        `;
        document.head.appendChild(styles);
        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideInDown 0.3s ease-out reverse';
            setTimeout(() => message.remove(), 300);
        }, 5000);
    }

    /**
     * Get Service Worker version
     */
    async function getServiceWorkerVersion() {
        if (!navigator.serviceWorker.controller) {
            return null;
        }

        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
                resolve(event.data.version);
            };

            navigator.serviceWorker.controller.postMessage(
                { type: 'GET_VERSION' },
                [messageChannel.port2]
            );
        });
    }

    /**
     * Initialize
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerServiceWorker);
    } else {
        registerServiceWorker();
    }

    // Log version on load
    window.addEventListener('load', async () => {
        const version = await getServiceWorkerVersion();
        if (version) {
            console.log('📦 Service Worker version:', version);
        }
    });

    // Expose API for debugging
    window.swAPI = {
        getVersion: getServiceWorkerVersion,
        unregister: async () => {
            const registration = await navigator.serviceWorker.ready;
            return registration.unregister();
        },
        clearCache: async () => {
            const registration = await navigator.serviceWorker.ready;
            return new Promise((resolve) => {
                const messageChannel = new MessageChannel();
                messageChannel.port1.onmessage = (event) => {
                    resolve(event.data);
                };

                registration.active.postMessage(
                    { type: 'CLEAR_CACHE' },
                    [messageChannel.port2]
                );
            });
        }
    };

})();
