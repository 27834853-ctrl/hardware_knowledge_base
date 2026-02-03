/**
 * Performance Monitor
 * Hardware Engineer Knowledge Base
 * Real-time performance monitoring and reporting
 */

(function() {
    'use strict';

    /**
     * Configuration
     */
    const config = {
        enabled: true,
        showPanel: false, // Set to true to show floating panel
        logToConsole: true,
        trackMetrics: {
            FCP: true,  // First Contentful Paint
            LCP: true,  // Largest Contentful Paint
            FID: true,  // First Input Delay
            CLS: true,  // Cumulative Layout Shift
            TTFB: true, // Time to First Byte
            TTI: true   // Time to Interactive
        },
        thresholds: {
            FCP: 1800,   // Good: < 1.8s
            LCP: 2500,   // Good: < 2.5s
            FID: 100,    // Good: < 100ms
            CLS: 0.1,    // Good: < 0.1
            TTFB: 600,   // Good: < 600ms
            TTI: 3800    // Good: < 3.8s
        }
    };

    /**
     * Performance metrics storage
     */
    const metrics = {
        navigation: {},
        paint: {},
        resources: [],
        marks: {},
        measures: {},
        vitals: {}
    };

    /**
     * Initialize performance monitoring
     */
    function init() {
        if (!config.enabled || !('performance' in window)) {
            console.warn('Performance API not available');
            return;
        }

        // Collect navigation timing
        collectNavigationTiming();

        // Collect paint timing
        collectPaintTiming();

        // Collect resource timing
        collectResourceTiming();

        // Track Core Web Vitals
        trackCoreWebVitals();

        // Monitor long tasks
        monitorLongTasks();

        // Monitor memory usage
        monitorMemoryUsage();

        // Create performance panel if enabled
        if (config.showPanel) {
            createPerformancePanel();
        }

        // Log performance data
        if (config.logToConsole) {
            logPerformanceData();
        }

        console.log('📊 Performance Monitor initialized');
    }

    /**
     * Collect navigation timing
     */
    function collectNavigationTiming() {
        if (!performance.timing) return;

        const timing = performance.timing;
        const navigation = {
            // DNS lookup
            dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,

            // TCP connection
            tcpConnection: timing.connectEnd - timing.connectStart,

            // SSL negotiation (if HTTPS)
            sslNegotiation: timing.secureConnectionStart > 0 ?
                timing.connectEnd - timing.secureConnectionStart : 0,

            // Server response time (TTFB)
            ttfb: timing.responseStart - timing.requestStart,

            // Download time
            downloadTime: timing.responseEnd - timing.responseStart,

            // DOM processing - 修复：检查 domComplete 是否有效
            domProcessing: timing.domComplete > 0 ?
                timing.domComplete - timing.domLoading : -1,

            // DOM Content Loaded - 修复：检查 domContentLoadedEventEnd 是否有效
            domContentLoaded: timing.domContentLoadedEventEnd > 0 ?
                timing.domContentLoadedEventEnd - timing.navigationStart : -1,

            // Page load complete - 修复：检查 loadEventEnd 是否有效
            loadComplete: timing.loadEventEnd > 0 ?
                timing.loadEventEnd - timing.navigationStart : -1,

            // Total page load time - 修复：检查 loadEventEnd 是否有效
            totalTime: timing.loadEventEnd > 0 ?
                timing.loadEventEnd - timing.fetchStart : -1
        };

        metrics.navigation = navigation;

        // Check TTFB threshold
        if (navigation.ttfb > config.thresholds.TTFB) {
            console.warn(`⚠️  Slow TTFB: ${navigation.ttfb}ms (threshold: ${config.thresholds.TTFB}ms)`);
        }
    }

    /**
     * Collect paint timing
     */
    function collectPaintTiming() {
        if (!performance.getEntriesByType) return;

        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
            metrics.paint[entry.name] = entry.startTime;

            // Check FCP threshold
            if (entry.name === 'first-contentful-paint' &&
                entry.startTime > config.thresholds.FCP) {
                console.warn(`⚠️  Slow FCP: ${entry.startTime.toFixed(2)}ms (threshold: ${config.thresholds.FCP}ms)`);
            }
        });
    }

    /**
     * Collect resource timing
     */
    function collectResourceTiming() {
        if (!performance.getEntriesByType) return;

        const resources = performance.getEntriesByType('resource');

        resources.forEach(resource => {
            metrics.resources.push({
                name: resource.name,
                type: resource.initiatorType,
                duration: resource.duration,
                size: resource.transferSize || 0,
                cached: resource.transferSize === 0 && resource.decodedBodySize > 0
            });
        });

        // Analyze slow resources
        const slowResources = metrics.resources.filter(r => r.duration > 1000);
        if (slowResources.length > 0) {
            console.warn('⚠️  Slow resources detected:', slowResources);
        }
    }

    /**
     * Track Core Web Vitals
     */
    function trackCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window && config.trackMetrics.LCP) {
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    metrics.vitals.LCP = lastEntry.renderTime || lastEntry.loadTime;

                    if (metrics.vitals.LCP > config.thresholds.LCP) {
                        console.warn(`⚠️  Poor LCP: ${metrics.vitals.LCP.toFixed(2)}ms (threshold: ${config.thresholds.LCP}ms)`);
                    }
                });
                lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            } catch (e) {
                console.warn('LCP observer not supported');
            }
        }

        // First Input Delay (FID)
        if ('PerformanceObserver' in window && config.trackMetrics.FID) {
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        metrics.vitals.FID = entry.processingStart - entry.startTime;

                        if (metrics.vitals.FID > config.thresholds.FID) {
                            console.warn(`⚠️  Poor FID: ${metrics.vitals.FID.toFixed(2)}ms (threshold: ${config.thresholds.FID}ms)`);
                        }
                    });
                });
                fidObserver.observe({ type: 'first-input', buffered: true });
            } catch (e) {
                console.warn('FID observer not supported');
            }
        }

        // Cumulative Layout Shift (CLS)
        if ('PerformanceObserver' in window && config.trackMetrics.CLS) {
            try {
                let clsScore = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsScore += entry.value;
                            metrics.vitals.CLS = clsScore;

                            if (clsScore > config.thresholds.CLS) {
                                console.warn(`⚠️  Poor CLS: ${clsScore.toFixed(4)} (threshold: ${config.thresholds.CLS})`);
                            }
                        }
                    });
                });
                clsObserver.observe({ type: 'layout-shift', buffered: true });
            } catch (e) {
                console.warn('CLS observer not supported');
            }
        }
    }

    /**
     * Monitor long tasks
     */
    function monitorLongTasks() {
        if (!('PerformanceObserver' in window)) return;

        try {
            const longTaskObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    console.warn('⚠️  Long task detected:', {
                        duration: entry.duration.toFixed(2) + 'ms',
                        startTime: entry.startTime.toFixed(2) + 'ms'
                    });
                });
            });
            longTaskObserver.observe({ type: 'longtask', buffered: true });
        } catch (e) {
            console.warn('Long task observer not supported');
        }
    }

    /**
     * Monitor memory usage
     */
    function monitorMemoryUsage() {
        if (!performance.memory) return;

        setInterval(() => {
            const memory = performance.memory;
            metrics.memory = {
                usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
                totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
                jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
                percentage: ((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2) + '%'
            };

            // Warn if memory usage is high
            const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
            if (usagePercent > 90) {
                console.warn(`⚠️  High memory usage: ${usagePercent.toFixed(2)}%`);
            }
        }, 5000); // Check every 5 seconds
    }

    /**
     * Create performance panel
     */
    function createPerformancePanel() {
        const panel = document.createElement('div');
        panel.id = 'performance-panel';
        panel.innerHTML = `
            <div class="perf-panel-header">
                <h3>⚡ Performance</h3>
                <button class="perf-panel-close" onclick="document.getElementById('performance-panel').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="perf-panel-content">
                <div class="perf-metric">
                    <span class="perf-label">FCP:</span>
                    <span class="perf-value" id="perf-fcp">-</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">LCP:</span>
                    <span class="perf-value" id="perf-lcp">-</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">FID:</span>
                    <span class="perf-value" id="perf-fid">-</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">CLS:</span>
                    <span class="perf-value" id="perf-cls">-</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">TTFB:</span>
                    <span class="perf-value" id="perf-ttfb">-</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">Load:</span>
                    <span class="perf-value" id="perf-load">-</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">Memory:</span>
                    <span class="perf-value" id="perf-memory">-</span>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        addPanelStyles();
        updatePanel();

        // Update panel every second
        setInterval(updatePanel, 1000);
    }

    /**
     * Add panel styles
     */
    function addPanelStyles() {
        if (document.getElementById('perf-panel-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'perf-panel-styles';
        styles.textContent = `
            #performance-panel {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                z-index: 9999;
                min-width: 280px;
                font-family: monospace;
                font-size: 13px;
            }

            .perf-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 12px 12px 0 0;
            }

            .perf-panel-header h3 {
                margin: 0;
                font-size: 14px;
                font-weight: 700;
            }

            .perf-panel-close {
                background: transparent;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 16px;
                padding: 4px;
            }

            .perf-panel-content {
                padding: 16px;
            }

            .perf-metric {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #f0f0f0;
            }

            .perf-metric:last-child {
                border-bottom: none;
            }

            .perf-label {
                font-weight: 600;
                color: #666;
            }

            .perf-value {
                color: #333;
                font-weight: 700;
            }

            .perf-value.good {
                color: #4caf50;
            }

            .perf-value.needs-improvement {
                color: #ff9800;
            }

            .perf-value.poor {
                color: #f44336;
            }

            [data-theme="dark"] #performance-panel {
                background: #2a2a2a;
            }

            [data-theme="dark"] .perf-label {
                color: #999;
            }

            [data-theme="dark"] .perf-value {
                color: #ccc;
            }

            [data-theme="dark"] .perf-metric {
                border-bottom-color: #3a3a3a;
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Update performance panel
     */
    function updatePanel() {
        // FCP
        const fcpEl = document.getElementById('perf-fcp');
        if (fcpEl && metrics.paint['first-contentful-paint']) {
            const fcp = metrics.paint['first-contentful-paint'];
            fcpEl.textContent = fcp.toFixed(0) + 'ms';
            fcpEl.className = 'perf-value ' + getRating(fcp, config.thresholds.FCP);
        }

        // LCP
        const lcpEl = document.getElementById('perf-lcp');
        if (lcpEl && metrics.vitals.LCP) {
            lcpEl.textContent = metrics.vitals.LCP.toFixed(0) + 'ms';
            lcpEl.className = 'perf-value ' + getRating(metrics.vitals.LCP, config.thresholds.LCP);
        }

        // FID
        const fidEl = document.getElementById('perf-fid');
        if (fidEl && metrics.vitals.FID) {
            fidEl.textContent = metrics.vitals.FID.toFixed(0) + 'ms';
            fidEl.className = 'perf-value ' + getRating(metrics.vitals.FID, config.thresholds.FID);
        }

        // CLS
        const clsEl = document.getElementById('perf-cls');
        if (clsEl && metrics.vitals.CLS !== undefined) {
            clsEl.textContent = metrics.vitals.CLS.toFixed(4);
            clsEl.className = 'perf-value ' + getRating(metrics.vitals.CLS, config.thresholds.CLS);
        }

        // TTFB
        const ttfbEl = document.getElementById('perf-ttfb');
        if (ttfbEl && metrics.navigation.ttfb) {
            ttfbEl.textContent = metrics.navigation.ttfb.toFixed(0) + 'ms';
            ttfbEl.className = 'perf-value ' + getRating(metrics.navigation.ttfb, config.thresholds.TTFB);
        }

        // Load time
        const loadEl = document.getElementById('perf-load');
        if (loadEl && metrics.navigation.totalTime) {
            loadEl.textContent = (metrics.navigation.totalTime / 1000).toFixed(2) + 's';
            loadEl.className = 'perf-value';
        }

        // Memory
        const memEl = document.getElementById('perf-memory');
        if (memEl && metrics.memory) {
            memEl.textContent = metrics.memory.usedJSHeapSize;
            memEl.className = 'perf-value';
        }
    }

    /**
     * Get rating based on threshold
     */
    function getRating(value, threshold) {
        if (value <= threshold) return 'good';
        if (value <= threshold * 2) return 'needs-improvement';
        return 'poor';
    }

    /**
     * Log performance data to console
     */
    function logPerformanceData() {
        // Wait for page load to complete
        window.addEventListener('load', () => {
            setTimeout(() => {
                console.group('📊 Performance Report');

                // Navigation Timing
                if (Object.keys(metrics.navigation).length > 0) {
                    console.group('⏱️  Navigation Timing');

                    // 清理负数值，替换为友好提示
                    const cleanedNavigation = {};
                    for (const [key, value] of Object.entries(metrics.navigation)) {
                        if (value < 0) {
                            cleanedNavigation[key] = '等待中...';
                        } else {
                            cleanedNavigation[key] = value;
                        }
                    }

                    console.table(cleanedNavigation);
                    console.groupEnd();
                }

                // Paint Timing
                if (Object.keys(metrics.paint).length > 0) {
                    console.group('🎨 Paint Timing');
                    console.table(metrics.paint);
                    console.groupEnd();
                }

                // Core Web Vitals
                if (Object.keys(metrics.vitals).length > 0) {
                    console.group('💚 Core Web Vitals');
                    console.table(metrics.vitals);
                    console.groupEnd();
                }

                // Resource Timing Summary
                if (metrics.resources.length > 0) {
                    const summary = {
                        totalResources: metrics.resources.length,
                        cached: metrics.resources.filter(r => r.cached).length,
                        totalSize: (metrics.resources.reduce((sum, r) => sum + r.size, 0) / 1024).toFixed(2) + ' KB',
                        averageLoad: (metrics.resources.reduce((sum, r) => sum + r.duration, 0) / metrics.resources.length).toFixed(2) + 'ms'
                    };
                    console.group('📦 Resources');
                    console.table(summary);
                    console.groupEnd();
                }

                // Memory
                if (metrics.memory) {
                    console.group('💾 Memory Usage');
                    console.table(metrics.memory);
                    console.groupEnd();
                }

                console.groupEnd();
            }, 2000);
        });
    }

    /**
     * Public API
     */
    window.PerformanceMonitor = {
        getMetrics: () => metrics,
        showPanel: () => {
            config.showPanel = true;
            createPerformancePanel();
        },
        hidePanel: () => {
            document.getElementById('performance-panel')?.remove();
        },
        exportReport: () => {
            const report = {
                url: window.location.href,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                metrics: metrics
            };
            return JSON.stringify(report, null, 2);
        },
        mark: (name) => {
            performance.mark(name);
            metrics.marks[name] = performance.now();
        },
        measure: (name, startMark, endMark) => {
            performance.measure(name, startMark, endMark);
            const measure = performance.getEntriesByName(name)[0];
            metrics.measures[name] = measure.duration;
            return measure.duration;
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
