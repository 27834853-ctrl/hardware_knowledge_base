/**
 * 性能优化模块 - Performance Optimization Module
 * 版本：1.0.0
 * 提供图片懒加载、代码分割、缓存优化等功能
 */

// ==================== 1. 图片懒加载 ====================

class LazyLoadImages {
    constructor() {
        this.images = [];
        this.observer = null;
        this.init();
    }

    init() {
        // 检查浏览器是否支持 IntersectionObserver
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    root: null,
                    rootMargin: '50px', // 提前50px开始加载
                    threshold: 0.01
                }
            );

            this.observeImages();
        } else {
            // 降级方案：直接加载所有图片
            this.loadAllImages();
        }
    }

    observeImages() {
        // 查找所有带 data-src 属性的图片
        this.images = document.querySelectorAll('img[data-src], img[data-srcset]');

        this.images.forEach(img => {
            this.observer.observe(img);
        });

        console.log(`🖼️ 找到 ${this.images.length} 张待懒加载的图片`);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }

        if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
        }

        img.classList.add('lazy-loaded');

        // 添加加载动画
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';

        img.onload = () => {
            img.style.opacity = '1';
        };
    }

    loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    }
}

// ==================== 2. 资源预加载管理 ====================

class ResourcePreloader {
    constructor() {
        this.init();
    }

    init() {
        // DNS 预解析
        this.dnsPrefetch();

        // 预连接关键域名
        this.preconnect();

        // 预加载关键资源
        this.preloadCriticalResources();

        // 预取下一页资源
        this.prefetchNextPage();
    }

    dnsPrefetch() {
        const domains = [
            'https://cdn.jsdelivr.net',
            'https://cdnjs.cloudflare.com',
            'https://fonts.googleapis.com',
            'https://www.google-analytics.com'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    preconnect() {
        const domains = [
            'https://cdn.jsdelivr.net',
            'https://cdnjs.cloudflare.com'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    preloadCriticalResources() {
        const resources = [
            { href: 'styles.css', as: 'style' },
            { href: 'script.js', as: 'script' }
        ];

        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }

    prefetchNextPage() {
        // 检测用户可能访问的下一个页面
        const links = document.querySelectorAll('a[href^="cases.html"], a[href^="quick-reference.html"]');

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.prefetchPage(link.href);
            }, { once: true });
        });
    }

    prefetchPage(url) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }
}

// ==================== 3. 代码分割与动态加载 ====================

class DynamicLoader {
    constructor() {
        this.loadedModules = new Set();
    }

    async loadModule(moduleName) {
        if (this.loadedModules.has(moduleName)) {
            console.log(`✅ 模块 ${moduleName} 已加载`);
            return true;
        }

        try {
            const module = await import(`./${moduleName}.js`);
            this.loadedModules.add(moduleName);
            console.log(`✅ 成功加载模块: ${moduleName}`);
            return module;
        } catch (error) {
            console.error(`❌ 加载模块失败: ${moduleName}`, error);
            return null;
        }
    }

    async loadModuleOnDemand(moduleName, triggerElement) {
        if (!triggerElement) return;

        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting) {
                    await this.loadModule(moduleName);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
        );

        observer.observe(triggerElement);
    }
}

// ==================== 4. 本地存储缓存管理 ====================

class CacheManager {
    constructor() {
        this.cacheVersion = '2.5.0';
        this.cachePrefix = 'hw_kb_cache_';
    }

    set(key, value, expiryMinutes = 60) {
        const item = {
            value: value,
            expiry: Date.now() + expiryMinutes * 60 * 1000,
            version: this.cacheVersion
        };

        try {
            localStorage.setItem(this.cachePrefix + key, JSON.stringify(item));
            return true;
        } catch (e) {
            console.warn('LocalStorage 已满，清理旧缓存');
            this.clearExpired();
            try {
                localStorage.setItem(this.cachePrefix + key, JSON.stringify(item));
                return true;
            } catch (e) {
                console.error('无法保存到 LocalStorage', e);
                return false;
            }
        }
    }

    get(key) {
        try {
            const itemStr = localStorage.getItem(this.cachePrefix + key);
            if (!itemStr) return null;

            const item = JSON.parse(itemStr);

            // 检查版本
            if (item.version !== this.cacheVersion) {
                localStorage.removeItem(this.cachePrefix + key);
                return null;
            }

            // 检查过期
            if (Date.now() > item.expiry) {
                localStorage.removeItem(this.cachePrefix + key);
                return null;
            }

            return item.value;
        } catch (e) {
            console.error('读取缓存失败', e);
            return null;
        }
    }

    clearExpired() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.cachePrefix)) {
                try {
                    const itemStr = localStorage.getItem(key);
                    const item = JSON.parse(itemStr);
                    if (Date.now() > item.expiry || item.version !== this.cacheVersion) {
                        localStorage.removeItem(key);
                    }
                } catch (e) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    clearAll() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.cachePrefix)) {
                localStorage.removeItem(key);
            }
        });
    }

    getStorageSize() {
        let total = 0;
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.cachePrefix)) {
                total += localStorage.getItem(key).length;
            }
        });
        return (total / 1024).toFixed(2) + ' KB';
    }
}

// ==================== 5. 性能监控增强 ====================

class PerformanceTracker {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        if ('performance' in window && 'PerformanceObserver' in window) {
            this.observeLCP();
            this.observeFID();
            this.observeCLS();
            this.observeFCP();
            this.observeTTFB();
        }

        // 页面加载完成后收集指标
        window.addEventListener('load', () => {
            this.collectLoadMetrics();
        });
    }

    observeLCP() {
        // Largest Contentful Paint
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
            console.log(`📊 LCP: ${this.metrics.lcp.toFixed(2)}ms`);
        });

        try {
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.warn('LCP monitoring not supported');
        }
    }

    observeFID() {
        // First Input Delay
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                this.metrics.fid = entry.processingStart - entry.startTime;
                console.log(`📊 FID: ${this.metrics.fid.toFixed(2)}ms`);
            });
        });

        try {
            observer.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.warn('FID monitoring not supported');
        }
    }

    observeCLS() {
        // Cumulative Layout Shift
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.cls = clsValue;
            console.log(`📊 CLS: ${this.metrics.cls.toFixed(4)}`);
        });

        try {
            observer.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            console.warn('CLS monitoring not supported');
        }
    }

    observeFCP() {
        // First Contentful Paint
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                    this.metrics.fcp = entry.startTime;
                    console.log(`📊 FCP: ${this.metrics.fcp.toFixed(2)}ms`);
                }
            });
        });

        try {
            observer.observe({ entryTypes: ['paint'] });
        } catch (e) {
            console.warn('FCP monitoring not supported');
        }
    }

    observeTTFB() {
        // Time to First Byte
        const navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry) {
            this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
            console.log(`📊 TTFB: ${this.metrics.ttfb.toFixed(2)}ms`);
        }
    }

    collectLoadMetrics() {
        const perfData = performance.timing;

        this.metrics.domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;

        // 修复：检查 loadEventEnd 是否有效
        if (perfData.loadEventEnd > 0) {
            this.metrics.loadComplete = perfData.loadEventEnd - perfData.navigationStart;
        } else {
            this.metrics.loadComplete = -1; // 表示尚未完成加载
        }

        this.metrics.domReady = perfData.domInteractive - perfData.navigationStart;

        console.log('📊 页面性能指标：');
        console.log(`  - DOM 就绪: ${this.metrics.domReady}ms`);
        console.log(`  - DOM 内容加载: ${this.metrics.domContentLoaded}ms`);

        // 只在有效时才显示页面完全加载时间
        if (this.metrics.loadComplete > 0) {
            console.log(`  - 页面完全加载: ${this.metrics.loadComplete}ms`);
        } else {
            console.log('  - 页面完全加载: 等待中...');
        }

        // 发送到分析服务（如果需要）
        this.sendMetrics();
    }

    sendMetrics() {
        // 可以发送到 Google Analytics 或自定义分析服务
        if (typeof gtag !== 'undefined') {
            Object.entries(this.metrics).forEach(([metric, value]) => {
                gtag('event', 'performance', {
                    event_category: 'Web Vitals',
                    event_label: metric.toUpperCase(),
                    value: Math.round(value),
                    non_interaction: true
                });
            });
        }
    }

    getMetrics() {
        return this.metrics;
    }

    displayMetrics() {
        const panel = document.createElement('div');
        panel.id = 'performancePanel';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 300px;
        `;

        let html = '<strong>性能指标</strong><br>';
        Object.entries(this.metrics).forEach(([key, value]) => {
            const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
            html += `${key.toUpperCase()}: ${displayValue}${typeof value === 'number' ? 'ms' : ''}<br>`;
        });

        panel.innerHTML = html;

        // 添加关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: transparent;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
        `;
        closeBtn.onclick = () => panel.remove();
        panel.appendChild(closeBtn);

        document.body.appendChild(panel);
    }
}

// ==================== 6. 节流和防抖工具 ====================

class PerformanceUtils {
    // 防抖函数
    static debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 节流函数
    static throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // RAF 节流（使用 requestAnimationFrame）
    static rafThrottle(callback) {
        let rafId = null;
        return function(...args) {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                callback.apply(this, args);
                rafId = null;
            });
        };
    }
}

// ==================== 7. 初始化性能优化 ====================

let perfTracker, cacheManager;

document.addEventListener('DOMContentLoaded', function() {
    // 初始化懒加载
    new LazyLoadImages();

    // 初始化资源预加载
    new ResourcePreloader();

    // 初始化缓存管理
    cacheManager = new CacheManager();

    // 初始化性能追踪
    perfTracker = new PerformanceTracker();

    // 清理过期缓存
    cacheManager.clearExpired();

    console.log(`💾 缓存大小: ${cacheManager.getStorageSize()}`);

    // 添加性能调试面板（开发模式）
    if (window.location.search.includes('debug=performance')) {
        setTimeout(() => {
            perfTracker.displayMetrics();
        }, 2000);
    }

    // 优化滚动性能
    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(el => {
        el.addEventListener('scroll', PerformanceUtils.rafThrottle(() => {
            // 处理滚动事件
        }));
    });

    // 优化窗口 resize 性能
    window.addEventListener('resize', PerformanceUtils.debounce(() => {
        // 处理 resize 事件
        console.log('Window resized');
    }, 250));

    console.log('✅ 性能优化模块已加载');
});

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LazyLoadImages,
        ResourcePreloader,
        DynamicLoader,
        CacheManager,
        PerformanceTracker,
        PerformanceUtils
    };
}

// 全局工具函数
window.perfUtils = PerformanceUtils;
