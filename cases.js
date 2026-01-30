/**
 * Cases Page JavaScript
 * Hardware Engineer Knowledge Base - Cases Library
 */

document.addEventListener('DOMContentLoaded', function() {
    initCasesPage();
});

/**
 * Initialize cases page
 */
function initCasesPage() {
    initCategoryFilter();
    initDifficultyFilter();
    initSortBy();
    initCaseCards();
    initTheme();
}

/**
 * Initialize category filter
 */
function initCategoryFilter() {
    const categoryCards = document.querySelectorAll('.category-card');
    const caseCards = document.querySelectorAll('.case-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;

            // Update active state
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // Filter cases
            caseCards.forEach(caseCard => {
                if (category === 'all' || caseCard.dataset.category === category) {
                    caseCard.style.display = 'block';
                    setTimeout(() => {
                        caseCard.style.opacity = '1';
                        caseCard.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    caseCard.style.opacity = '0';
                    caseCard.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        caseCard.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Initialize difficulty filter
 */
function initDifficultyFilter() {
    const difficultyFilter = document.getElementById('difficultyFilter');
    if (!difficultyFilter) return;

    difficultyFilter.addEventListener('change', function() {
        const difficulty = this.value;
        const caseCards = document.querySelectorAll('.case-card:not(.coming-soon)');

        caseCards.forEach(card => {
            if (difficulty === 'all' || card.dataset.difficulty === difficulty) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/**
 * Initialize sort by
 */
function initSortBy() {
    const sortBy = document.getElementById('sortBy');
    if (!sortBy) return;

    sortBy.addEventListener('change', function() {
        const sortType = this.value;
        const casesGrid = document.getElementById('casesGrid');
        const caseCards = Array.from(document.querySelectorAll('.case-card:not(.coming-soon)'));

        // Sort cases
        if (sortType === 'difficulty') {
            caseCards.sort((a, b) => {
                const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
                return difficultyOrder[a.dataset.difficulty] - difficultyOrder[b.dataset.difficulty];
            });
        } else if (sortType === 'popular') {
            // Sort by views (extracted from user count)
            caseCards.sort((a, b) => {
                const viewsA = parseInt(a.querySelector('.fa-user').parentElement.textContent.replace('k', '000'));
                const viewsB = parseInt(b.querySelector('.fa-user').parentElement.textContent.replace('k', '000'));
                return viewsB - viewsA;
            });
        }
        // newest would need date data

        // Re-append in sorted order
        caseCards.forEach(card => {
            casesGrid.appendChild(card);
        });

        // Keep coming-soon card at the end
        const comingSoon = document.querySelector('.case-card.coming-soon');
        if (comingSoon) {
            casesGrid.appendChild(comingSoon);
        }
    });
}

/**
 * Initialize case cards hover effects
 */
function initCaseCards() {
    const caseCards = document.querySelectorAll('.case-card');

    caseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * View case details
 */
function viewCase(caseId) {
    // Show case detail modal or navigate to detail page
    alert('案例详情功能开发中...\n案例ID: ' + caseId + '\n\n即将展示：\n- 完整的设计流程\n- 原理图和PCB截图\n- 关键参数计算\n- 测试验证结果\n- 设计要点总结');

    // In production, this would navigate to a detail page or open a modal
    // window.location.href = 'case-detail.html?id=' + caseId;
}

/**
 * Initialize theme (reuse from main script)
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }
}

// Back to top button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}
