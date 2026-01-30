/**
 * Feedback Component
 * Hardware Engineer Knowledge Base
 * Provides user feedback and bug reporting functionality
 */

(function() {
    'use strict';

    /**
     * Feedback configuration
     */
    const feedbackConfig = {
        githubRepo: '27834853-ctrl/hardware_knowledge_base',
        feedbackTypes: {
            bug: {
                name: '错误报告',
                icon: 'fas fa-bug',
                color: '#f44336',
                template: 'bug_report'
            },
            feature: {
                name: '功能建议',
                icon: 'fas fa-lightbulb',
                color: '#ff9800',
                template: 'feature_request'
            },
            content: {
                name: '内容建议',
                icon: 'fas fa-book',
                color: '#2196f3',
                template: 'content_suggestion'
            },
            other: {
                name: '其他反馈',
                icon: 'fas fa-comment',
                color: '#9c27b0',
                template: null
            }
        }
    };

    /**
     * Create feedback button
     */
    function createFeedbackButton() {
        const button = document.createElement('button');
        button.className = 'feedback-button';
        button.innerHTML = '<i class="fas fa-comment-dots"></i>';
        button.setAttribute('aria-label', '反馈');
        button.setAttribute('title', '提供反馈');

        // Add styles
        addFeedbackStyles();

        // Add click event
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            showFeedbackModal();
        });

        return button;
    }

    /**
     * Add feedback styles
     */
    function addFeedbackStyles() {
        if (document.getElementById('feedback-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'feedback-styles';
        styles.textContent = `
            .feedback-button {
                position: fixed;
                right: 20px;
                bottom: 140px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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

            .feedback-button:hover {
                transform: translateY(-3px) scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }

            .feedback-modal {
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

            .feedback-content {
                background: white;
                border-radius: 16px;
                padding: 30px;
                max-width: 600px;
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

            .feedback-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
            }

            .feedback-title {
                font-size: 24px;
                font-weight: 700;
                color: #333;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .feedback-title i {
                font-size: 28px;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .feedback-close {
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

            .feedback-close:hover {
                background: #e0e0e0;
            }

            .feedback-types {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
                margin-bottom: 24px;
            }

            .feedback-type-btn {
                padding: 20px;
                border: 2px solid #e0e0e0;
                border-radius: 12px;
                background: white;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                text-align: center;
            }

            .feedback-type-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                border-color: transparent;
            }

            .feedback-type-btn.active {
                border-color: #667eea;
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            }

            .feedback-type-icon {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
            }

            .feedback-type-name {
                font-size: 14px;
                color: #333;
                font-weight: 600;
            }

            .feedback-form {
                display: none;
            }

            .feedback-form.active {
                display: block;
            }

            .feedback-form-group {
                margin-bottom: 20px;
            }

            .feedback-form-label {
                display: block;
                font-size: 14px;
                font-weight: 600;
                color: #333;
                margin-bottom: 8px;
            }

            .feedback-form-label .required {
                color: #f44336;
            }

            .feedback-form-input,
            .feedback-form-textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                font-size: 14px;
                font-family: inherit;
                transition: all 0.2s;
            }

            .feedback-form-input:focus,
            .feedback-form-textarea:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .feedback-form-textarea {
                min-height: 120px;
                resize: vertical;
            }

            .feedback-form-hint {
                font-size: 12px;
                color: #999;
                margin-top: 4px;
            }

            .feedback-form-actions {
                display: flex;
                gap: 12px;
                margin-top: 24px;
            }

            .feedback-btn {
                flex: 1;
                padding: 14px;
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

            .feedback-btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }

            .feedback-btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }

            .feedback-btn-secondary {
                background: #f5f5f5;
                color: #666;
            }

            .feedback-btn-secondary:hover {
                background: #e0e0e0;
            }

            .feedback-success {
                text-align: center;
                padding: 40px 20px;
            }

            .feedback-success-icon {
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                color: white;
            }

            .feedback-success-title {
                font-size: 20px;
                font-weight: 700;
                color: #333;
                margin-bottom: 12px;
            }

            .feedback-success-text {
                font-size: 14px;
                color: #666;
                line-height: 1.6;
                margin-bottom: 24px;
            }

            .feedback-github-link {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 12px 24px;
                background: #24292e;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.2s;
            }

            .feedback-github-link:hover {
                background: #1b1f23;
                transform: translateY(-1px);
            }

            @media (max-width: 768px) {
                .feedback-button {
                    bottom: 130px;
                    right: 15px;
                }

                .feedback-types {
                    grid-template-columns: 1fr;
                }

                .feedback-form-actions {
                    flex-direction: column;
                }
            }

            [data-theme="dark"] .feedback-content {
                background: #1e1e1e;
            }

            [data-theme="dark"] .feedback-title,
            [data-theme="dark"] .feedback-type-name,
            [data-theme="dark"] .feedback-form-label,
            [data-theme="dark"] .feedback-success-title {
                color: #fff;
            }

            [data-theme="dark"] .feedback-type-btn {
                background: #2a2a2a;
                border-color: #3a3a3a;
            }

            [data-theme="dark"] .feedback-type-btn.active {
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
            }

            [data-theme="dark"] .feedback-form-input,
            [data-theme="dark"] .feedback-form-textarea {
                background: #2a2a2a;
                border-color: #3a3a3a;
                color: #ccc;
            }

            [data-theme="dark"] .feedback-form-hint,
            [data-theme="dark"] .feedback-success-text {
                color: #999;
            }

            [data-theme="dark"] .feedback-close {
                background: #2a2a2a;
                color: #ccc;
            }

            [data-theme="dark"] .feedback-close:hover {
                background: #3a3a3a;
            }

            [data-theme="dark"] .feedback-btn-secondary {
                background: #2a2a2a;
                color: #ccc;
            }

            [data-theme="dark"] .feedback-btn-secondary:hover {
                background: #3a3a3a;
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Show feedback modal
     */
    function showFeedbackModal() {
        const modal = document.createElement('div');
        modal.className = 'feedback-modal';
        modal.innerHTML = `
            <div class="feedback-content">
                <div class="feedback-header">
                    <h3 class="feedback-title">
                        <i class="fas fa-comment-dots"></i>
                        提供反馈
                    </h3>
                    <button class="feedback-close" onclick="this.closest('.feedback-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="feedback-types">
                    ${Object.entries(feedbackConfig.feedbackTypes).map(([key, type]) => `
                        <button class="feedback-type-btn" onclick="selectFeedbackType('${key}')">
                            <div class="feedback-type-icon" style="background: ${type.color}">
                                <i class="${type.icon}"></i>
                            </div>
                            <span class="feedback-type-name">${type.name}</span>
                        </button>
                    `).join('')}
                </div>

                <div id="feedbackFormContainer"></div>
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
     * Select feedback type
     */
    window.selectFeedbackType = function(type) {
        const config = feedbackConfig.feedbackTypes[type];
        if (!config) return;

        // Update active state
        document.querySelectorAll('.feedback-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.closest('.feedback-type-btn').classList.add('active');

        // Show form
        const container = document.getElementById('feedbackFormContainer');
        container.innerHTML = `
            <div class="feedback-form active">
                <div class="feedback-form-group">
                    <label class="feedback-form-label">
                        标题 <span class="required">*</span>
                    </label>
                    <input
                        type="text"
                        class="feedback-form-input"
                        id="feedbackTitle"
                        placeholder="简要描述您的${config.name}"
                        required
                    >
                </div>

                <div class="feedback-form-group">
                    <label class="feedback-form-label">
                        详细描述 <span class="required">*</span>
                    </label>
                    <textarea
                        class="feedback-form-textarea"
                        id="feedbackDescription"
                        placeholder="${getPlaceholder(type)}"
                        required
                    ></textarea>
                    <div class="feedback-form-hint">
                        ${getHint(type)}
                    </div>
                </div>

                ${type === 'bug' ? `
                    <div class="feedback-form-group">
                        <label class="feedback-form-label">浏览器信息</label>
                        <input
                            type="text"
                            class="feedback-form-input"
                            id="feedbackBrowser"
                            value="${navigator.userAgent}"
                            readonly
                        >
                    </div>

                    <div class="feedback-form-group">
                        <label class="feedback-form-label">页面 URL</label>
                        <input
                            type="text"
                            class="feedback-form-input"
                            id="feedbackUrl"
                            value="${window.location.href}"
                            readonly
                        >
                    </div>
                ` : ''}

                <div class="feedback-form-actions">
                    <button class="feedback-btn feedback-btn-secondary" onclick="document.getElementById('feedbackFormContainer').innerHTML = ''">
                        <i class="fas fa-arrow-left"></i> 返回
                    </button>
                    <button class="feedback-btn feedback-btn-primary" onclick="submitFeedback('${type}')">
                        <i class="fab fa-github"></i> 在 GitHub 上提交
                    </button>
                </div>
            </div>
        `;
    };

    /**
     * Get placeholder text
     */
    function getPlaceholder(type) {
        const placeholders = {
            bug: '请详细描述您遇到的问题：\n1. 您在做什么？\n2. 期望发生什么？\n3. 实际发生了什么？',
            feature: '请描述您想要的功能：\n1. 这个功能解决什么问题？\n2. 您期望如何使用它？\n3. 有什么参考案例吗？',
            content: '请描述您的内容建议：\n1. 建议添加什么内容？\n2. 应该归属到哪个章节？\n3. 为什么这个内容重要？',
            other: '请描述您的反馈...'
        };
        return placeholders[type] || placeholders.other;
    }

    /**
     * Get hint text
     */
    function getHint(type) {
        const hints = {
            bug: '请提供尽可能详细的信息，包括截图（如适用）',
            feature: '描述功能的具体使用场景会帮助我们更好地理解您的需求',
            content: '如果有参考资料，请一并提供',
            other: '我们重视您的每一条反馈'
        };
        return hints[type] || hints.other;
    }

    /**
     * Submit feedback
     */
    window.submitFeedback = function(type) {
        const title = document.getElementById('feedbackTitle')?.value.trim();
        const description = document.getElementById('feedbackDescription')?.value.trim();

        if (!title || !description) {
            alert('请填写标题和描述');
            return;
        }

        const config = feedbackConfig.feedbackTypes[type];
        let issueBody = description;

        // Add browser info for bug reports
        if (type === 'bug') {
            const browser = document.getElementById('feedbackBrowser')?.value;
            const url = document.getElementById('feedbackUrl')?.value;
            issueBody += `\n\n## 环境信息\n\n**浏览器**: ${browser}\n**页面 URL**: ${url}`;
        }

        // Create GitHub issue URL
        const template = config.template ? `&template=${config.template}.md` : '';
        const labels = type === 'bug' ? '&labels=bug' :
                      type === 'feature' ? '&labels=enhancement' :
                      type === 'content' ? '&labels=content,documentation' : '';

        const githubUrl = `https://github.com/${feedbackConfig.githubRepo}/issues/new?` +
                         `title=${encodeURIComponent('[' + config.name.toUpperCase() + '] ' + title)}` +
                         `&body=${encodeURIComponent(issueBody)}` +
                         template + labels;

        // Show success message
        const container = document.querySelector('.feedback-content');
        container.innerHTML = `
            <div class="feedback-success">
                <div class="feedback-success-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h3 class="feedback-success-title">感谢您的反馈！</h3>
                <p class="feedback-success-text">
                    我们将在 GitHub Issues 中跟踪您的反馈。<br>
                    点击下方按钮前往 GitHub 提交 Issue。
                </p>
                <a href="${githubUrl}" target="_blank" class="feedback-github-link">
                    <i class="fab fa-github"></i>
                    在 GitHub 上提交
                </a>
            </div>
        `;

        // Track event
        if (window.Analytics) {
            window.Analytics.track('Feedback', 'Submit', type);
        }
    };

    /**
     * Add feedback button to page
     */
    function addFeedbackButton() {
        const button = createFeedbackButton();
        document.body.appendChild(button);
    }

    /**
     * Initialize
     */
    function init() {
        // Wait for DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addFeedbackButton);
        } else {
            addFeedbackButton();
        }

        console.log('💬 Feedback module loaded');
    }

    // Initialize
    init();

})();
