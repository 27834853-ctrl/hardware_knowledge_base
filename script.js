/* ============================================================================
   Hardware Knowledge Base - script.js
   Professional JavaScript with modern ES6+ features
   ============================================================================ */

'use strict';

/* ============================================================================
   GLOBAL STATE & CONFIGURATION
   ============================================================================ */
const AppState = {
    isNavOpen: false,
    isSidebarOpen: true,
    currentSection: 'home',
    scrollPosition: 0,
    lastScrollPosition: 0,
    isScrollingUp: false
};

const CONFIG = {
    scrollOffset: 90,           // Offset for sticky header
    scrollThrottle: 100,        // Throttle delay for scroll events
    backToTopThreshold: 300,    // Show back-to-top button after this scroll
    headerHideThreshold: 100    // Hide header when scrolling down past this
};

/* ============================================================================
   INITIALIZATION
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hardware Knowledge Base - Initializing...');

    // Initialize all components
    initNavigation();
    initSidebar();
    initSmoothScroll();
    initScrollEffects();
    initBackToTop();
    initFAQ();
    initTOC();
    initToolButtons();
    initInteractiveExamples();
    initSearch();        // NEW: Search functionality
    initTheme();         // NEW: Dark mode support
    initKnowledgeGraph(); // NEW: Interactive knowledge graph

    // Set initial active section
    updateActiveNavLink();

    console.log('Hardware Knowledge Base - Initialized successfully!');
});

/* ============================================================================
   NAVIGATION FUNCTIONS
   ============================================================================ */

/**
 * Initialize main navigation functionality
 * Handles mobile menu toggle and navigation interactions
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) {
        console.warn('Navigation elements not found');
        return;
    }

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        AppState.isNavOpen = !AppState.isNavOpen;
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = AppState.isNavOpen ? 'hidden' : '';
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                AppState.isNavOpen = false;
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (AppState.isNavOpen &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            AppState.isNavOpen = false;
            document.body.style.overflow = '';
        }
    });

    console.log('Navigation initialized');
}

/**
 * Update active state of navigation links based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.content-section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= (sectionTop - CONFIG.scrollOffset - 100)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });

    // Update sidebar TOC links
    const tocLinks = document.querySelectorAll('.toc-items a');
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================================================
   SIDEBAR FUNCTIONS
   ============================================================================ */

/**
 * Initialize sidebar functionality
 * Handles sticky positioning and responsive behavior
 */
function initSidebar() {
    const sidebar = document.getElementById('sidebar');

    if (!sidebar) {
        console.warn('Sidebar not found');
        return;
    }

    // Make sidebar sticky on scroll (CSS handles this, JS for enhancements)
    window.addEventListener('scroll', throttle(() => {
        // Additional sidebar scroll behavior can be added here
    }, CONFIG.scrollThrottle));

    console.log('Sidebar initialized');
}

/**
 * Toggle TOC section expand/collapse
 * @param {HTMLElement} header - The TOC header element clicked
 */
function toggleTocSection(header) {
    const section = header.parentElement;
    const items = section.querySelector('.toc-items');
    const isActive = section.classList.contains('active');

    // Close all other sections (optional - remove if you want multiple open)
    // const allSections = document.querySelectorAll('.toc-section');
    // allSections.forEach(s => {
    //     if (s !== section) {
    //         s.classList.remove('active');
    //         s.querySelector('.toc-items').classList.remove('active');
    //     }
    // });

    // Toggle current section
    section.classList.toggle('active');
    items.classList.toggle('active');

    // Animate the expansion
    if (!isActive) {
        items.style.maxHeight = items.scrollHeight + 'px';
    } else {
        items.style.maxHeight = '0';
    }
}

/**
 * Initialize Table of Contents functionality
 */
function initTOC() {
    const tocHeaders = document.querySelectorAll('.toc-header');

    tocHeaders.forEach(header => {
        // Event listener added via onclick in HTML
        // This is a fallback/enhancement
        const section = header.parentElement;
        const items = section.querySelector('.toc-items');

        // Set initial max-height for active sections
        if (items.classList.contains('active')) {
            items.style.maxHeight = items.scrollHeight + 'px';
        }
    });

    console.log('TOC initialized');
}

/* ============================================================================
   SMOOTH SCROLL FUNCTIONS
   ============================================================================ */

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                scrollToElement(targetElement);
            }
        });
    });

    console.log('Smooth scroll initialized');
}

/**
 * Scroll to a specific element with offset
 * @param {HTMLElement} element - The element to scroll to
 * @param {number} offset - Optional offset from top (default: CONFIG.scrollOffset)
 */
function scrollToElement(element, offset = CONFIG.scrollOffset) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Scroll to section by ID (used by onclick in HTML)
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        scrollToElement(element);
    }
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* ============================================================================
   SCROLL EFFECTS
   ============================================================================ */

/**
 * Initialize scroll-based effects
 * Handles header hide/show, back-to-top visibility, and active link updates
 */
function initScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        AppState.lastScrollPosition = AppState.scrollPosition;
        AppState.scrollPosition = window.scrollY;
        AppState.isScrollingUp = AppState.scrollPosition < AppState.lastScrollPosition;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });

    console.log('Scroll effects initialized');
}

/**
 * Handle all scroll-based UI updates
 */
function handleScrollEffects() {
    // Update active navigation links
    updateActiveNavLink();

    // Show/hide back to top button
    updateBackToTopVisibility();

    // Optional: Hide header on scroll down
    // updateHeaderVisibility();
}

/**
 * Update header visibility based on scroll direction
 */
function updateHeaderVisibility() {
    const header = document.querySelector('.main-header');

    if (!header) return;

    if (AppState.scrollPosition > CONFIG.headerHideThreshold) {
        if (AppState.isScrollingUp) {
            header.classList.remove('hidden');
        } else {
            header.classList.add('hidden');
        }
    } else {
        header.classList.remove('hidden');
    }
}

/* ============================================================================
   BACK TO TOP BUTTON
   ============================================================================ */

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) {
        console.warn('Back to top button not found');
        return;
    }

    // Event listener added via onclick in HTML
    // This is just for initialization

    console.log('Back to top button initialized');
}

/**
 * Update back to top button visibility based on scroll position
 */
function updateBackToTopVisibility() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    if (AppState.scrollPosition > CONFIG.backToTopThreshold) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

/* ============================================================================
   FAQ ACCORDION
   ============================================================================ */

/**
 * Initialize FAQ accordion functionality
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        // Event listener added via onclick in HTML
        // This is a fallback/enhancement
    });

    console.log('FAQ accordion initialized');
}

/**
 * Toggle FAQ item open/closed
 * @param {HTMLElement} question - The FAQ question element clicked
 */
function toggleFaq(question) {
    const faqItem = question.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');

    // Optional: Close other FAQs (accordion style)
    // const allFaqs = document.querySelectorAll('.faq-item');
    // allFaqs.forEach(item => {
    //     if (item !== faqItem) {
    //         item.classList.remove('active');
    //         item.querySelector('.faq-answer').style.maxHeight = '0';
    //     }
    // });

    // Toggle current FAQ
    faqItem.classList.toggle('active');

    if (!isActive) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        answer.style.maxHeight = '0';
    }
}

/* ============================================================================
   CALCULATOR FUNCTIONS
   ============================================================================ */

/**
 * Calculate RC time constant and charging times
 * Used by the RC Calculator widget
 */
function calculateRC() {
    // Get input values
    const capacitance = parseFloat(document.getElementById('capValue').value); // μF
    const resistance = parseFloat(document.getElementById('resValue').value);   // kΩ
    const voltage = parseFloat(document.getElementById('voltage').value);       // V

    // Validate inputs
    if (isNaN(capacitance) || isNaN(resistance) || isNaN(voltage) ||
        capacitance <= 0 || resistance <= 0 || voltage <= 0) {
        alert('请输入有效的正数值！');
        return;
    }

    // Convert to standard units (seconds)
    const C = capacitance * 1e-6;  // Convert μF to F
    const R = resistance * 1e3;     // Convert kΩ to Ω

    // Calculate time constant (τ = RC)
    const tau = R * C;              // in seconds
    const tauMs = tau * 1000;       // in milliseconds

    // Calculate charging times
    const chargeTime63 = tau;                    // Time to 63.2% (1τ)
    const chargeTime99 = 5 * tau;                // Time to 99% (5τ)

    // Display results
    const resultDiv = document.getElementById('rcResult');
    const tauSpan = document.getElementById('tau');
    const chargeTimeSpan = document.getElementById('chargeTime');
    const fullChargeSpan = document.getElementById('fullCharge');

    if (resultDiv && tauSpan && chargeTimeSpan && fullChargeSpan) {
        tauSpan.textContent = tauMs.toFixed(3);
        chargeTimeSpan.textContent = (chargeTime63 * 1000).toFixed(3);
        fullChargeSpan.textContent = (chargeTime99 * 1000).toFixed(3);

        resultDiv.style.display = 'block';

        // Smooth scroll to results
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Log calculation for debugging
    console.log('RC Calculation:', {
        capacitance: capacitance + 'μF',
        resistance: resistance + 'kΩ',
        voltage: voltage + 'V',
        tau: tauMs.toFixed(3) + 'ms',
        time63: (chargeTime63 * 1000).toFixed(3) + 'ms',
        time99: (chargeTime99 * 1000).toFixed(3) + 'ms'
    });
}

/**
 * Calculate microstrip impedance
 * Formula based on IPC-2141 standard
 */
function calculateMicrostrip() {
    const width = parseFloat(document.getElementById('traceWidth').value);  // mm
    const height = parseFloat(document.getElementById('dielectricHeight').value); // mm
    const er = parseFloat(document.getElementById('dielectricConstant').value);

    if (isNaN(width) || isNaN(height) || isNaN(er) || width <= 0 || height <= 0 || er <= 1) {
        alert('请输入有效的参数！');
        return;
    }

    // Calculate W/H ratio
    const wh = width / height;

    // Calculate effective dielectric constant
    const erEff = (er + 1) / 2 + (er - 1) / 2 * (1 / Math.sqrt(1 + 12 / wh));

    // Calculate impedance
    let z0;
    if (wh <= 1) {
        z0 = 60 / Math.sqrt(erEff) * Math.log((8 / wh) + (wh / 4));
    } else {
        z0 = 120 * Math.PI / Math.sqrt(erEff) / (wh + 1.393 + 0.667 * Math.log(wh + 1.444));
    }

    // Display results
    document.getElementById('impedanceResult').innerHTML = `
        <h5>计算结果：</h5>
        <p><strong>特征阻抗 Z₀：</strong>${z0.toFixed(2)} Ω</p>
        <p><strong>有效介电常数 εᵣᵉᶠᶠ：</strong>${erEff.toFixed(3)}</p>
        <p><strong>W/H比值：</strong>${wh.toFixed(3)}</p>
    `;

    // Add export/copy/share buttons
    const params = {
        '走线宽度': width + ' mm',
        '介质厚度': height + ' mm',
        '介电常数': er
    };
    const results = {
        '特征阻抗 Z₀': z0.toFixed(2) + ' Ω',
        '有效介电常数 εᵣᵉᶠᶠ': erEff.toFixed(3),
        'W/H比值': wh.toFixed(3)
    };
    addResultActions('impedanceResult', '微带线阻抗计算器', params, results);
    document.getElementById('impedanceResult').style.display = 'block';
}

/**
 * Calculate stripline impedance
 */
function calculateStripline() {
    const width = parseFloat(document.getElementById('traceWidth').value);
    const height = parseFloat(document.getElementById('dielectricHeight').value);
    const er = parseFloat(document.getElementById('dielectricConstant').value);

    if (isNaN(width) || isNaN(height) || isNaN(er) || width <= 0 || height <= 0 || er <= 1) {
        alert('请输入有效的参数！');
        return;
    }

    const wh = width / height;
    const z0 = 60 / Math.sqrt(er) * Math.log(4 * height / (0.67 * Math.PI * width * (0.8 + (width / height))));

    document.getElementById('impedanceResult').innerHTML = `
        <h5>计算结果：</h5>
        <p><strong>特征阻抗 Z₀：</strong>${z0.toFixed(2)} Ω</p>
        <p><strong>介电常数 εᵣ：</strong>${er.toFixed(2)}</p>
        <p class="note">注：带状线被完全包裹在介电材料中</p>
    `;
    document.getElementById('impedanceResult').style.display = 'block';
}

/**
 * Calculate differential pair impedance
 */
function calculateDiffPair() {
    const width = parseFloat(document.getElementById('traceWidth').value);
    const spacing = parseFloat(document.getElementById('traceSpacing').value);
    const height = parseFloat(document.getElementById('dielectricHeight').value);
    const er = parseFloat(document.getElementById('dielectricConstant').value);

    if (isNaN(width) || isNaN(spacing) || isNaN(height) || isNaN(er) ||
        width <= 0 || spacing <= 0 || height <= 0 || er <= 1) {
        alert('请输入有效的参数！');
        return;
    }

    // Calculate single-ended impedance first
    const wh = width / height;
    const erEff = (er + 1) / 2 + (er - 1) / 2 * (1 / Math.sqrt(1 + 12 / wh));
    let z0;
    if (wh <= 1) {
        z0 = 60 / Math.sqrt(erEff) * Math.log((8 / wh) + (wh / 4));
    } else {
        z0 = 120 * Math.PI / Math.sqrt(erEff) / (wh + 1.393 + 0.667 * Math.log(wh + 1.444));
    }

    // Calculate coupling coefficient
    const sh = spacing / height;
    const k = Math.exp(-Math.PI * sh);

    // Differential impedance
    const zDiff = 2 * z0 * (1 - k);

    document.getElementById('impedanceResult').innerHTML = `
        <h5>计算结果：</h5>
        <p><strong>单端阻抗 Z₀：</strong>${z0.toFixed(2)} Ω</p>
        <p><strong>差分阻抗 Zdiff：</strong>${zDiff.toFixed(2)} Ω</p>
        <p><strong>耦合系数 k：</strong>${k.toFixed(4)}</p>
        <p class="note">注：差分阻抗 = 2 × Z₀ × (1 - k)</p>
    `;
    document.getElementById('impedanceResult').style.display = 'block';
}

/**
 * Calculate trace width based on IPC-2221 current carrying capacity
 */
function calculateTraceWidth() {
    const current = parseFloat(document.getElementById('traceCurrent').value);  // A
    const tempRise = parseFloat(document.getElementById('tempRise').value);    // °C
    const copperWeight = parseFloat(document.getElementById('copperWeight').value); // oz
    const isInternal = document.getElementById('layerType').value === 'internal';

    if (isNaN(current) || isNaN(tempRise) || isNaN(copperWeight) ||
        current <= 0 || tempRise <= 0 || copperWeight <= 0) {
        alert('请输入有效的参数！');
        return;
    }

    // IPC-2221 formula: A = (I / (k * ΔT^b))^(1/c)
    // where A is cross-sectional area in mil²
    const k = isInternal ? 0.024 : 0.048;
    const b = 0.44;
    const c = 0.725;

    // Calculate cross-sectional area in mil²
    const area = Math.pow(current / (k * Math.pow(tempRise, b)), 1 / c);

    // Convert copper weight to thickness (1 oz = 1.4 mil)
    const thickness = copperWeight * 1.4; // mil

    // Calculate width in mil
    const widthMil = area / thickness;

    // Convert to mm
    const widthMm = widthMil * 0.0254;

    // Calculate voltage drop (approximate)
    const resistivity = 1.724e-8; // Ω·m for copper at 20°C
    const length = 100; // Assume 100mm trace for voltage drop calculation
    const crossSectionM2 = widthMm * 1e-3 * (thickness * 0.0254 * 1e-3);
    const resistance = resistivity * (length * 1e-3) / crossSectionM2;
    const voltageDrop = current * resistance;

    document.getElementById('traceWidthResult').innerHTML = `
        <h5>计算结果：</h5>
        <p><strong>最小走线宽度：</strong>${widthMm.toFixed(3)} mm (${widthMil.toFixed(1)} mil)</p>
        <p><strong>铜箔厚度：</strong>${thickness.toFixed(2)} mil (${(thickness * 0.0254).toFixed(2)} mm)</p>
        <p><strong>横截面积：</strong>${area.toFixed(2)} mil²</p>
        <p><strong>压降（100mm）：</strong>${(voltageDrop * 1000).toFixed(2)} mV</p>
        <p><strong>功耗（100mm）：</strong>${(voltageDrop * current * 1000).toFixed(2)} mW</p>
        <p class="note">注：建议预留20-30%余量，实际宽度应大于计算值</p>
    `;
    document.getElementById('traceWidthResult').style.display = 'block';

    // Add export/copy/share buttons
    const params = {
        '电流': current + ' A',
        '温升': tempRise + ' °C',
        '铜箔厚度': copperWeight + ' oz',
        '层类型': isInternal ? '内层' : '外层'
    };
    const results = {
        '最小走线宽度': widthMm.toFixed(3) + ' mm (' + widthMil.toFixed(1) + ' mil)',
        '铜箔厚度': thickness.toFixed(2) + ' mil',
        '横截面积': area.toFixed(2) + ' mil²',
        '压降(100mm)': (voltageDrop * 1000).toFixed(2) + ' mV',
        '功耗(100mm)': (voltageDrop * current * 1000).toFixed(2) + ' mW'
    };
    addResultActions('traceWidthResult', '走线宽度计算器', params, results);
}

/**
 * Design LC low-pass filter
 */
function designLCFilter() {
    const cutoffFreq = parseFloat(document.getElementById('cutoffFreq').value) * 1e3; // Convert kHz to Hz
    const impedance = parseFloat(document.getElementById('filterImpedance').value);
    const filterType = document.getElementById('filterType').value;

    if (isNaN(cutoffFreq) || isNaN(impedance) || cutoffFreq <= 0 || impedance <= 0) {
        alert('请输入有效的参数！');
        return;
    }

    const omega = 2 * Math.PI * cutoffFreq;

    let L, C, resultHTML;

    switch(filterType) {
        case 'lowpass':
            // L-C low-pass filter (Π型)
            L = impedance / omega;
            C = 1 / (omega * impedance);
            resultHTML = `
                <h5>LC低通滤波器设计结果：</h5>
                <p><strong>拓扑：</strong>Π型 (C-L-C)</p>
                <p><strong>电感值 L：</strong>${(L * 1e6).toFixed(2)} μH</p>
                <p><strong>电容值 C：</strong>${(C * 1e6).toFixed(2)} μF (每个)</p>
                <p><strong>截止频率：</strong>${(cutoffFreq / 1e3).toFixed(2)} kHz</p>
                <p><strong>阻抗：</strong>${impedance} Ω</p>
                <p><strong>衰减：</strong>-40 dB/decade (二阶滤波器)</p>
                <p class="note">实际应用：选择标准值 L=${selectStandardValue(L * 1e6, 'inductor')} μH, C=${selectStandardValue(C * 1e6, 'capacitor')} μF</p>
            `;
            break;

        case 'highpass':
            // C-L high-pass filter
            C = 1 / (omega * impedance);
            L = impedance / omega;
            resultHTML = `
                <h5>LC高通滤波器设计结果：</h5>
                <p><strong>拓扑：</strong>T型 (L-C-L)</p>
                <p><strong>电容值 C：</strong>${(C * 1e9).toFixed(2)} nF</p>
                <p><strong>电感值 L：</strong>${(L * 1e6).toFixed(2)} μH (每个)</p>
                <p><strong>截止频率：</strong>${(cutoffFreq / 1e3).toFixed(2)} kHz</p>
                <p><strong>衰减：</strong>-40 dB/decade (二阶滤波器)</p>
            `;
            break;

        case 'bandpass':
            // Series resonant band-pass
            const bandwidth = cutoffFreq * 0.1; // Assume 10% bandwidth
            const Q = cutoffFreq / bandwidth;
            L = impedance * Q / omega;
            C = 1 / (omega * omega * L);
            resultHTML = `
                <h5>LC带通滤波器设计结果：</h5>
                <p><strong>拓扑：</strong>串联谐振型</p>
                <p><strong>电感值 L：</strong>${(L * 1e6).toFixed(2)} μH</p>
                <p><strong>电容值 C：</strong>${(C * 1e9).toFixed(2)} nF</p>
                <p><strong>中心频率：</strong>${(cutoffFreq / 1e3).toFixed(2)} kHz</p>
                <p><strong>品质因数 Q：</strong>${Q.toFixed(1)}</p>
                <p><strong>带宽（-3dB）：</strong>${(bandwidth / 1e3).toFixed(2)} kHz</p>
            `;
            break;
    }

    document.getElementById('filterResult').innerHTML = resultHTML;
    document.getElementById('filterResult').style.display = 'block';

    // Add export/copy/share buttons
    const params = {
        '截止频率': (cutoffFreq / 1e3).toFixed(2) + ' kHz',
        '系统阻抗': impedance + ' Ω',
        '滤波器类型': filterType === 'lowpass' ? '低通' : filterType === 'highpass' ? '高通' : '带通'
    };
    let results = {};
    if (filterType === 'lowpass') {
        results = {
            '电感值 L': (L * 1e6).toFixed(2) + ' μH',
            '电容值 C': (C * 1e6).toFixed(2) + ' μF',
            '标准电感': selectStandardValue(L * 1e6, 'inductor') + ' μH',
            '标准电容': selectStandardValue(C * 1e6, 'capacitor') + ' μF'
        };
    } else if (filterType === 'highpass') {
        results = {
            '电容值 C': (C * 1e9).toFixed(2) + ' nF',
            '电感值 L': (L * 1e6).toFixed(2) + ' μH'
        };
    } else {
        const bandwidth = cutoffFreq * 0.1;
        const Q = cutoffFreq / bandwidth;
        results = {
            '电感值 L': (L * 1e6).toFixed(2) + ' μH',
            '电容值 C': (C * 1e9).toFixed(2) + ' nF',
            '品质因数 Q': Q.toFixed(1),
            '带宽(-3dB)': (bandwidth / 1e3).toFixed(2) + ' kHz'
        };
    }
    addResultActions('filterResult', 'LC滤波器设计工具', params, results);
}

/**
 * Select nearest standard component value
 */
function selectStandardValue(value, type) {
    const e12Series = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
    const e24Series = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
                       3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];

    const series = type === 'capacitor' ? e24Series : e12Series;

    // Find order of magnitude
    let magnitude = 0;
    let normalizedValue = value;

    while (normalizedValue >= 10) {
        normalizedValue /= 10;
        magnitude++;
    }
    while (normalizedValue < 1) {
        normalizedValue *= 10;
        magnitude--;
    }

    // Find closest standard value
    let closest = series[0];
    let minDiff = Math.abs(normalizedValue - closest);

    for (let i = 1; i < series.length; i++) {
        const diff = Math.abs(normalizedValue - series[i]);
        if (diff < minDiff) {
            minDiff = diff;
            closest = series[i];
        }
    }

    return (closest * Math.pow(10, magnitude)).toFixed(2);
}

/**
 * Calculate via inductance
 */
function calculateViaInductance() {
    const viaDiameter = parseFloat(document.getElementById('viaDiameter').value); // mm
    const viaLength = parseFloat(document.getElementById('viaLength').value);     // mm
    const padDiameter = parseFloat(document.getElementById('padDiameter').value); // mm

    if (isNaN(viaDiameter) || isNaN(viaLength) || isNaN(padDiameter) ||
        viaDiameter <= 0 || viaLength <= 0 || padDiameter <= viaDiameter) {
        alert('请输入有效的参数！(焊盘直径必须大于过孔直径)');
        return;
    }

    // Convert mm to inches for formula
    const d = viaDiameter * 0.03937; // inches
    const h = viaLength * 0.03937;   // inches

    // Howard Johnson's formula for via inductance
    const L = 5.08 * h * (Math.log(4 * h / d) + 1); // nH

    // Calculate impedance at different frequencies
    const freq1 = 100e6;  // 100 MHz
    const freq2 = 1e9;    // 1 GHz
    const freq3 = 10e9;   // 10 GHz

    const z1 = 2 * Math.PI * freq1 * L * 1e-9;
    const z2 = 2 * Math.PI * freq2 * L * 1e-9;
    const z3 = 2 * Math.PI * freq3 * L * 1e-9;

    document.getElementById('viaResult').innerHTML = `
        <h5>计算结果：</h5>
        <p><strong>过孔电感：</strong>${L.toFixed(3)} nH</p>
        <p><strong>阻抗 @ 100MHz：</strong>${z1.toFixed(3)} Ω</p>
        <p><strong>阻抗 @ 1GHz：</strong>${z2.toFixed(3)} Ω</p>
        <p><strong>阻抗 @ 10GHz：</strong>${z3.toFixed(3)} Ω</p>
        <p class="note">公式：L = 5.08 × h × (ln(4h/d) + 1) [nH]</p>
        <p class="recommendation"><i class="fas fa-lightbulb"></i> 建议：高速信号尽量减少过孔数量，必要时使用盲孔或埋孔</p>
    `;
    document.getElementById('viaResult').style.display = 'block';

    // Add export/copy/share buttons
    const params = {
        '过孔直径': viaDiameter + ' mm',
        '过孔长度': viaLength + ' mm',
        '焊盘直径': padDiameter + ' mm'
    };
    const results = {
        '过孔电感': L.toFixed(3) + ' nH',
        '阻抗 @ 100MHz': z1.toFixed(3) + ' Ω',
        '阻抗 @ 1GHz': z2.toFixed(3) + ' Ω',
        '阻抗 @ 10GHz': z3.toFixed(3) + ' Ω'
    };
    addResultActions('viaResult', 'Via电感计算器', params, results);
}

/* ============================================================================
   TOOL FUNCTIONS
   ============================================================================ */

/**
 * Switch between different impedance calculator types
 */
function switchImpedanceCalc(type) {
    // Update tab states
    const tabs = document.querySelectorAll('.calc-tab');
    tabs.forEach((tab, index) => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show/hide spacing input for differential pairs
    const spacingInput = document.getElementById('spacingInput');
    const calcButton = document.getElementById('calcImpedanceBtn');

    if (type === 'diff') {
        spacingInput.style.display = 'block';
        calcButton.setAttribute('onclick', 'calculateDiffPair()');
        calcButton.innerHTML = '<i class="fas fa-calculator"></i> 计算差分阻抗';
    } else {
        spacingInput.style.display = 'none';
        if (type === 'microstrip') {
            calcButton.setAttribute('onclick', 'calculateMicrostrip()');
            calcButton.innerHTML = '<i class="fas fa-calculator"></i> 计算微带线阻抗';
        } else if (type === 'stripline') {
            calcButton.setAttribute('onclick', 'calculateStripline()');
            calcButton.innerHTML = '<i class="fas fa-calculator"></i> 计算带状线阻抗';
        }
    }

    // Clear previous results
    const resultDiv = document.getElementById('impedanceResult');
    if (resultDiv) {
        resultDiv.style.display = 'none';
    }
}

/**
 * Initialize tool button functionality
 */
function initToolButtons() {
    const toolButtons = document.querySelectorAll('.tool-card button');

    toolButtons.forEach(button => {
        // Event listeners added via onclick in HTML
        // This is for initialization
    });

    console.log('Tool buttons initialized');
}

/**
 * Open a specific tool (placeholder - implement actual tool modals/pages)
 * @param {string} toolName - The name of the tool to open
 */
function openTool(toolName) {
    console.log(`Opening tool: ${toolName}`);

    // Placeholder implementation
    // In a real application, this would open a modal or navigate to a tool page

    switch(toolName) {
        case 'impedance':
            alert('阻抗计算器即将推出！\nImpedance Calculator coming soon!');
            break;
        case 'trace-width':
            alert('走线宽度计算器即将推出！\nTrace Width Calculator coming soon!');
            break;
        case 'filter':
            alert('滤波器设计工具即将推出！\nFilter Design Tool coming soon!');
            break;
        case 'power':
            alert('功率损耗计算器即将推出！\nPower Loss Calculator coming soon!');
            break;
        default:
            alert('工具开发中...\nTool under development...');
    }
}

/* ============================================================================
   INTERACTIVE EXAMPLES
   ============================================================================ */

/**
 * Initialize interactive examples and demonstrations
 */
function initInteractiveExamples() {
    // Circuit simulator interactions
    initCircuitSimulator();

    // Knowledge graph interactions
    initKnowledgeGraph();

    console.log('Interactive examples initialized');
}

/**
 * Initialize circuit simulator interactions
 */
function initCircuitSimulator() {
    const circuitDiagrams = document.querySelectorAll('.circuit-diagram, .circuit-simulator');

    circuitDiagrams.forEach(diagram => {
        // Add hover effects or click interactions
        const components = diagram.querySelectorAll('rect, circle, line, path');

        components.forEach(component => {
            component.style.cursor = 'pointer';

            component.addEventListener('mouseenter', (e) => {
                e.target.style.opacity = '0.7';
            });

            component.addEventListener('mouseleave', (e) => {
                e.target.style.opacity = '1';
            });

            component.addEventListener('click', (e) => {
                // Could show component information
                console.log('Component clicked:', e.target);
            });
        });
    });
}

/**
 * Initialize knowledge graph interactions
 */
function initKnowledgeGraph() {
    const graphNodes = document.querySelectorAll('.graph-node');

    graphNodes.forEach(node => {
        node.style.cursor = 'pointer';

        node.addEventListener('click', (e) => {
            const text = node.querySelector('text');
            if (text) {
                const nodeName = text.textContent;
                console.log('Knowledge node clicked:', nodeName);

                // Could navigate to relevant section or show info popup
                // For now, just log it
                alert(`知识节点: ${nodeName}\nKnowledge Node: ${nodeName}`);
            }
        });

        // Add pulse animation on hover
        node.addEventListener('mouseenter', (e) => {
            const circle = node.querySelector('circle');
            if (circle) {
                circle.style.animation = 'pulse 1s ease-in-out infinite';
            }
        });

        node.addEventListener('mouseleave', (e) => {
            const circle = node.querySelector('circle');
            if (circle) {
                circle.style.animation = '';
            }
        });
    });
}

/* ============================================================================
   UTILITY FUNCTIONS
   ============================================================================ */

/**
 * Throttle function to limit execution rate
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

/**
 * Debounce function to delay execution until after calls have stopped
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Format number with specified decimal places
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
function formatNumber(num, decimals = 2) {
    return num.toFixed(decimals).replace(/\.?0+$/, '');
}

/**
 * Get element's offset from top of document
 * @param {HTMLElement} element - Element to get offset for
 * @returns {number} Offset in pixels
 */
function getElementOffset(element) {
    let top = 0;
    while (element) {
        top += element.offsetTop || 0;
        element = element.offsetParent;
    }
    return top;
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ============================================================================
   DARK MODE SUPPORT (Optional)
   ============================================================================ */

/**
 * Initialize dark mode functionality
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (!darkModeToggle) return;

    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        const isCurrentlyDark = document.documentElement.classList.contains('dark-mode');

        if (isCurrentlyDark) {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        } else {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        }
    });
}

/* ============================================================================
   KEYBOARD SHORTCUTS (Optional Enhancement)
   ============================================================================ */

/**
 * Initialize keyboard shortcuts
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Focus search (if search exists)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) searchInput.focus();
        }

        // Escape: Close mobile menu
        if (e.key === 'Escape') {
            if (AppState.isNavOpen) {
                const navToggle = document.getElementById('navToggle');
                const navMenu = document.getElementById('navMenu');
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    AppState.isNavOpen = false;
                    document.body.style.overflow = '';
                }
            }
        }

        // Arrow keys: Navigate sections
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            navigateSection(-1);
        }
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            navigateSection(1);
        }
    });
}

/**
 * Navigate between sections using keyboard
 * @param {number} direction - Direction to navigate (-1 for up, 1 for down)
 */
function navigateSection(direction) {
    const sections = Array.from(document.querySelectorAll('.content-section, .hero'));
    const currentIndex = sections.findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
    });

    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < sections.length) {
        scrollToElement(sections[nextIndex]);
    }
}

/* ============================================================================
   PERFORMANCE MONITORING (Optional)
   ============================================================================ */

/**
 * Log performance metrics
 */
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

        console.log('Performance Metrics:', {
            pageLoadTime: pageLoadTime + 'ms',
            domReadyTime: domReadyTime + 'ms'
        });
    }
}

// Log performance after page load
window.addEventListener('load', () => {
    setTimeout(logPerformance, 0);
});

/* ============================================================================
   ERROR HANDLING
   ============================================================================ */

/**
 * Global error handler
 */
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Could send error to logging service
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error to logging service
});

/* ============================================================================
   EXPORT FUNCTIONS TO GLOBAL SCOPE (for onclick handlers)
   ============================================================================ */
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.toggleTocSection = toggleTocSection;
window.toggleFaq = toggleFaq;
window.calculateRC = calculateRC;
window.openTool = openTool;

/* ============================================================================
   SERVICE WORKER REGISTRATION (Optional - for PWA)
   ============================================================================ */

/**
 * Register service worker for offline functionality
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('Service Worker registered:', registration);
        //     })
        //     .catch(error => {
        //         console.log('Service Worker registration failed:', error);
        //     });
    });
}

/* ============================================================================
   SEARCH FUNCTIONALITY
   ============================================================================ */

let searchIndex = [];

function initSearchIndex() {
    const articles = document.querySelectorAll('.knowledge-article, .calculator-section');
    articles.forEach(article => {
        const id = article.id || '';
        const title = article.querySelector('h3, h4')?.textContent || '';
        const content = article.textContent || '';
        const keywords = new Set();
        title.split(/\s+/).forEach(word => {
            if (word.length > 1) keywords.add(word.toLowerCase());
        });
        content.match(/[\u4e00-\u9fa5a-zA-Z0-9]+/g)?.forEach(word => {
            if (word.length > 2) keywords.add(word.toLowerCase());
        });
        searchIndex.push({
            id, title,
            content: content.substring(0, 200),
            keywords: Array.from(keywords),
            element: article
        });
    });
}

function performSearch(query) {
    if (!query || query.trim().length === 0) {
        showEmptyState();
        return;
    }
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = query;
    const normalizedQuery = query.toLowerCase().trim();
    const results = [];
    searchIndex.forEach(item => {
        let score = 0;
        if (item.title.toLowerCase().includes(normalizedQuery)) score += 100;
        item.keywords.forEach(keyword => {
            if (keyword.includes(normalizedQuery) || normalizedQuery.includes(keyword)) score += 10;
        });
        if (item.content.toLowerCase().includes(normalizedQuery)) score += 5;
        if (score > 0) results.push({ ...item, score });
    });
    results.sort((a, b) => b.score - a.score);
    displaySearchResults(results, normalizedQuery);
}

function displaySearchResults(results, query) {
    const resultsContainer = document.getElementById('searchResults');
    if (results.length === 0) {
        resultsContainer.innerHTML = `<div class="search-no-results"><i class="fas fa-search-minus"></i><p>未找到包含 "${query}" 的内容</p></div>`;
        return;
    }
    let html = `<div class="search-results-list"><div class="search-count">找到 ${results.length} 个相关结果</div>`;
    results.slice(0, 10).forEach((result, index) => {
        const snippet = result.content.replace(/<[^>]*>/g, '');
        html += `<div class="search-result-item" data-index="${index}" onclick="navigateToResult('${result.id}')">
            <div class="result-icon"><i class="fas fa-file-alt"></i></div>
            <div class="result-content">
                <div class="result-title">${result.title}</div>
                <div class="result-snippet">${snippet}...</div>
            </div>
            <div class="result-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>`;
    });
    html += `</div>`;
    resultsContainer.innerHTML = html;
}

function navigateToResult(id) {
    closeSearchModal();
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            element.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
            setTimeout(() => { element.style.backgroundColor = ''; }, 2000);
        }
    }, 300);
}

function showEmptyState() {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = `<div class="search-empty"><i class="fas fa-lightbulb"></i><p>输入关键词开始搜索</p>
        <div class="search-suggestions"><h5>热门搜索：</h5><div class="suggestion-tags">
            <span class="suggestion-tag" onclick="performSearch('阻抗计算')">阻抗计算</span>
            <span class="suggestion-tag" onclick="performSearch('PCB设计')">PCB设计</span>
            <span class="suggestion-tag" onclick="performSearch('DDR4')">DDR4</span>
        </div></div></div>`;
}

function openSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { document.getElementById('searchInput')?.focus(); }, 100);
    }
}

function closeSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        const input = document.getElementById('searchInput');
        if (input) { input.value = ''; showEmptyState(); }
    }
}

function initSearch() {
    document.getElementById('searchToggle')?.addEventListener('click', openSearchModal);
    document.getElementById('searchClose')?.addEventListener('click', closeSearchModal);
    document.getElementById('searchModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'searchModal') closeSearchModal();
    });
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            const clearBtn = document.getElementById('searchClear');
            if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => performSearch(query), 300);
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearchModal();
        });
    }
    document.getElementById('searchClear')?.addEventListener('click', () => {
        const input = document.getElementById('searchInput');
        if (input) { input.value = ''; input.focus(); showEmptyState(); }
    });
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearchModal();
        }
    });
    initSearchIndex();
}

function toggleTheme() {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ============================================================================
   MATHJAX CONFIGURATION (for LaTeX rendering)
   ============================================================================ */
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true
    },
    svg: {
        fontCache: 'global'
    }
};

/* ============================================================================
   CONSOLE WELCOME MESSAGE
   ============================================================================ */
console.log(
    '%c欢迎来到硬件工程师知识库！ Welcome to Hardware Engineer Knowledge Base!',
    'color: #2196F3; font-size: 16px; font-weight: bold;'
);
console.log(
    '%c这是一个完全免费开放的硬件学习平台\nThis is a completely free and open hardware learning platform',
    'color: #4CAF50; font-size: 12px;'
);
console.log(
    '%cGitHub: https://github.com/27834853-ctrl/hardware_knowledge_base\nLicense: MIT',
    'color: #757575; font-size: 11px;'
);

/* ============================================================================
   END OF SCRIPT
   ============================================================================ */
/* ============================================================================
   INTERACTIVE KNOWLEDGE GRAPH
   ============================================================================ */

function initKnowledgeGraph() {
    const graphNodes = document.querySelectorAll('.graph-node, .graph-subnode');
    graphNodes.forEach(node => {
        node.style.cursor = 'pointer';
        node.addEventListener('click', function() {
            const text = this.querySelector('text')?.textContent;
            const sectionMap = {
                '基础篇': 'basic',
                '中级篇': 'intermediate',
                '高级篇': 'advanced',
                '元件': 'basic-components',
                'PCB': 'pcb-design',
                '信号完整性': 'signal-integrity',
                'DDR': 'high-speed-design',
                'FPGA': 'fpga-design',
                'RF': 'rf-design'
            };
            const targetId = sectionMap[text];
            if (targetId) {
                document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s';
        });
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/* ============================================================================
   EXPORT, COPY AND SHARE FUNCTIONALITY
   ============================================================================ */

/**
 * Export calculation results to text file
 */
function exportResults(calculatorName, params, results) {
    const timestamp = new Date().toLocaleString('zh-CN');
    const lines = [
        '硬件工程师知识库 - ' + calculatorName,
        '计算时间：' + timestamp,
        '源地址：https://27834853-ctrl.github.io/hardware_knowledge_base/',
        '',
        '='.repeat(60),
        '',
        '输入参数：'
    ];

    for (const key in params) {
        lines.push('  ' + key + ': ' + params[key]);
    }

    lines.push('');
    lines.push('计算结果：');

    for (const key in results) {
        lines.push('  ' + key + ': ' + results[key]);
    }

    lines.push('');
    lines.push('='.repeat(60));
    lines.push('');
    lines.push('本计算结果仅供参考，实际设计请遵循相关标准规范。');
    lines.push('参考标准：IEEE、IPC-2221、IPC-2141等');

    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = calculatorName + '_' + Date.now() + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    showNotification('导出成功！文件已保存到下载目录。', 'success');
}

/**
 * Copy results to clipboard
 */
function copyResults(calculatorName, params, results) {
    const lines = [calculatorName, '', '输入参数：'];

    for (const key in params) {
        lines.push(key + ': ' + params[key]);
    }

    lines.push('');
    lines.push('计算结果：');

    for (const key in results) {
        lines.push(key + ': ' + results[key]);
    }

    const content = lines.join('\n');

    navigator.clipboard.writeText(content).then(function() {
        showNotification('已复制到剪贴板！', 'success');
    }).catch(function() {
        showNotification('复制失败，请手动复制。', 'error');
    });
}

/**
 * Share calculation results
 */
function shareResults(calculatorType, params) {
    const baseUrl = window.location.origin + window.location.pathname;
    const urlParams = new URLSearchParams();
    urlParams.set('calc', calculatorType);

    for (const key in params) {
        urlParams.set(key, params[key]);
    }

    const shareUrl = baseUrl + '?' + urlParams.toString();

    navigator.clipboard.writeText(shareUrl).then(function() {
        showNotification('分享链接已复制到剪贴板！', 'success');
    }).catch(function() {
        prompt('分享链接：', shareUrl);
    });
}

/**
 * Show notification message
 */
function showNotification(message, type) {
    type = type || 'info';

    let container = document.getElementById('notificationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 10000; max-width: 350px;';
        document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;

    const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';
    notification.style.cssText = 'background: white; padding: 15px 20px; margin-bottom: 10px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px; animation: slideIn 0.3s ease; border-left: 4px solid ' + bgColor + ';';

    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    const iconColor = bgColor;

    notification.innerHTML = '<span style="font-size: 1.2rem; font-weight: bold; color: ' + iconColor + ';">' + icon + '</span><span style="flex: 1; color: #333;">' + message + '</span>';

    container.appendChild(notification);

    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Add action buttons to result area
 */
function addResultActions(resultElementId, calculatorName, params, results) {
    const resultElement = document.getElementById(resultElementId);
    if (!resultElement) return;

    let actionsDiv = resultElement.querySelector('.result-actions');
    if (!actionsDiv) {
        actionsDiv = document.createElement('div');
        actionsDiv.className = 'result-actions';
        actionsDiv.style.cssText = 'display: flex; gap: 10px; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0; flex-wrap: wrap;';
        resultElement.appendChild(actionsDiv);
    }

    actionsDiv.innerHTML = '';

    // Export button
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn-action';
    exportBtn.innerHTML = '<i class="fas fa-download"></i> 导出';
    exportBtn.style.cssText = 'padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; transition: background 0.3s; display: flex; align-items: center; gap: 6px;';
    exportBtn.onmouseover = function() { this.style.background = '#45a049'; };
    exportBtn.onmouseout = function() { this.style.background = '#4CAF50'; };
    exportBtn.onclick = function() { exportResults(calculatorName, params, results); };
    actionsDiv.appendChild(exportBtn);

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-action';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> 复制';
    copyBtn.style.cssText = 'padding: 8px 16px; background: #2196F3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; transition: background 0.3s; display: flex; align-items: center; gap: 6px;';
    copyBtn.onmouseover = function() { this.style.background = '#1976D2'; };
    copyBtn.onmouseout = function() { this.style.background = '#2196F3'; };
    copyBtn.onclick = function() { copyResults(calculatorName, params, results); };
    actionsDiv.appendChild(copyBtn);

    // Share button
    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn-action';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> 分享';
    shareBtn.style.cssText = 'padding: 8px 16px; background: #FF9800; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; transition: background 0.3s; display: flex; align-items: center; gap: 6px;';
    shareBtn.onmouseover = function() { this.style.background = '#F57C00'; };
    shareBtn.onmouseout = function() { this.style.background = '#FF9800'; };
    shareBtn.onclick = function() { shareResults('impedance', params); };
    actionsDiv.appendChild(shareBtn);
}

// Add animation styles
if (!document.getElementById('notificationStyles')) {
    const style = document.createElement('style');
    style.id = 'notificationStyles';
    style.textContent = '@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }';
    document.head.appendChild(style);
}

// ==================== 高速接口深度内容显示函数 (v2.5.2) ====================

/**
 * 显示高速接口深度内容
 * @param {string} contentKey - 内容key (对应highSpeedDeepDive中的属性名)
 */
function showHighSpeedContent(contentKey) {
    console.log('[showHighSpeedContent] 调用，contentKey:', contentKey);

    // 检查highSpeedDeepDive对象是否已加载
    if (typeof highSpeedDeepDive === 'undefined') {
        console.error('[showHighSpeedContent] highSpeedDeepDive模块未加载');
        showNotification('内容加载失败，请刷新页面重试', 'error');
        return;
    }
    console.log('[showHighSpeedContent] highSpeedDeepDive 对象已加载');

    // 获取内容
    const content = highSpeedDeepDive[contentKey];
    if (!content) {
        console.error('[showHighSpeedContent] 未找到内容:', contentKey);
        console.log('[showHighSpeedContent] 可用的键:', Object.keys(highSpeedDeepDive));
        showNotification('未找到对应内容', 'error');
        return;
    }
    console.log('[showHighSpeedContent] 内容已找到:', content.title);

    // 获取显示区域
    const contentArea = document.getElementById('highSpeedDeepDiveContent');
    if (!contentArea) {
        console.error('[showHighSpeedContent] 未找到内容显示区域 #highSpeedDeepDiveContent');
        return;
    }
    console.log('[showHighSpeedContent] 显示区域已找到');

    // 显示内容
    console.log('[showHighSpeedContent] 开始显示内容，长度:', content.content ? content.content.length : 0);
    contentArea.innerHTML = content.content;

    // 平滑滚动到内容区域
    contentArea.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });

    // 重新渲染MathJax公式
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
        MathJax.typesetPromise([contentArea]).catch((err) => {
            console.warn('MathJax渲染失败:', err);
        });
    }

    // 添加fade-in动画
    contentArea.style.animation = 'none';
    setTimeout(() => {
        contentArea.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);

    // 显示通知
    showNotification(`已加载: ${content.title}`, 'success');

    // 记录学习进度（如果学习追踪系统已启用）
    if (typeof updateLearningProgress === 'function') {
        updateLearningProgress('high-speed-deep-dive', contentKey);
    }

    // Google Analytics事件追踪（如果已配置）
    if (typeof gtag === 'function') {
        gtag('event', 'view_high_speed_content', {
            'content_type': contentKey,
            'content_title': content.title
        });
    }
}

/**
 * 显示通知消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 (success/error/info/warning)
 */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 16px 24px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
    `;

    // 根据类型设置颜色
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    notification.style.borderLeft = `4px solid ${colors[type] || colors.info}`;

    // 添加图标和消息
    notification.innerHTML = `
        <i class="fas ${icons[type] || icons.info}" style="color: ${colors[type] || colors.info}; font-size: 20px;"></i>
        <span style="color: #333; font-size: 14px;">${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; color: #999; font-size: 18px; padding: 0; margin-left: auto;">
            <i class="fas fa-times"></i>
        </button>
    `;

    // 添加到页面
    document.body.appendChild(notification);

    // 3秒后自动消失
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== 阻抗快速计算器 ====================
function calculateImpedance() {
    try {
        const w = parseFloat(document.getElementById('traceWidth').value);
        const h = parseFloat(document.getElementById('dielectricHeight').value);
        const er = parseFloat(document.getElementById('dielectricConstant').value);

        // 输入验证
        if (isNaN(w) || isNaN(h) || isNaN(er) || w <= 0 || h <= 0 || er <= 0) {
            showNotification('请输入有效的正数值', 'error');
            return;
        }

        // 微带线阻抗计算 (IPC-2141A公式)
        const wOverH = w / h;
        let Z0_microstrip;

        if (wOverH <= 1) {
            Z0_microstrip = (60 / Math.sqrt(er)) * Math.log((8 * h / w) + (w / (4 * h)));
        } else {
            Z0_microstrip = (120 * Math.PI) / (Math.sqrt(er) * (wOverH + 1.393 + 0.667 * Math.log(wOverH + 1.444)));
        }

        // 带状线阻抗计算 (对称带状线)
        const Z0_stripline = (60 / Math.sqrt(er)) * Math.log((4 * h) / (0.67 * Math.PI * w));

        // 显示结果
        document.getElementById('microstripZ').textContent = Z0_microstrip.toFixed(2);
        document.getElementById('striplineZ').textContent = Z0_stripline.toFixed(2);
        document.getElementById('impedanceResult').style.display = 'block';

        showNotification('阻抗计算完成！', 'success');
    } catch (error) {
        console.error('阻抗计算错误:', error);
        showNotification('计算过程出现错误，请检查输入值', 'error');
    }
}

