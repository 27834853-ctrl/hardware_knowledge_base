/**
 * 高速接口内容加载器
 * 独立的内容加载函数，确保功能可用
 */

// 确保函数在全局作用域
window.showHighSpeedContent = function(contentKey) {
    console.log('[showHighSpeedContent] 调用，contentKey:', contentKey);

    // 检查highSpeedDeepDive对象是否已加载
    if (typeof highSpeedDeepDive === 'undefined') {
        console.error('[showHighSpeedContent] highSpeedDeepDive模块未加载');
        alert('内容加载失败，请刷新页面重试');
        return;
    }
    console.log('[showHighSpeedContent] highSpeedDeepDive 对象已加载');

    // 获取内容
    const content = highSpeedDeepDive[contentKey];
    if (!content) {
        console.error('[showHighSpeedContent] 未找到内容:', contentKey);
        console.log('[showHighSpeedContent] 可用的键:', Object.keys(highSpeedDeepDive));
        alert('未找到对应内容: ' + contentKey);
        return;
    }
    console.log('[showHighSpeedContent] 内容已找到:', content.title);

    // 获取显示区域
    const contentArea = document.getElementById('highSpeedDeepDiveContent');
    if (!contentArea) {
        console.error('[showHighSpeedContent] 未找到内容显示区域 #highSpeedDeepDiveContent');
        alert('内容显示区域未找到');
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
        MathJax.typesetPromise([contentArea]).catch(function(err) {
            console.warn('MathJax渲染失败:', err);
        });
    }

    // 添加fade-in动画
    contentArea.style.animation = 'none';
    setTimeout(function() {
        contentArea.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);

    // 显示成功消息
    console.log('[showHighSpeedContent] 内容加载成功:', content.title);

    // 创建简单的通知
    showSimpleNotification('已加载: ' + content.title, 'success');
};

// 简单的通知函数
function showSimpleNotification(message, type) {
    // 如果页面有 showNotification 函数，使用它
    if (typeof showNotification === 'function') {
        showNotification(message, type);
        return;
    }

    // 否则创建简单通知
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-size: 14px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(function() {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 添加CSS动画
if (!document.getElementById('notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

console.log('[high-speed-content-loader.js] 加载完成，showHighSpeedContent 已定义');
