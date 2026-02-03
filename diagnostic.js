/**
 * 高速接口内容加载诊断脚本
 * 用于诊断 highSpeedDeepDive 对象和 showHighSpeedContent 函数的问题
 */

(function() {
    console.log('=== 高速接口内容加载诊断开始 ===');

    // 延迟执行，确保所有脚本都已加载
    window.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            runDiagnostics();
        }, 500);
    });

    function runDiagnostics() {
        const results = [];

        // 1. 检查 highSpeedDeepDive 对象
        if (typeof highSpeedDeepDive === 'undefined') {
            results.push('❌ highSpeedDeepDive 对象未定义');
            console.error('高速接口模块未加载！检查 high-speed-deep-dive.js 是否正确引入');
        } else {
            results.push('✅ highSpeedDeepDive 对象已定义');

            // 检查对象类型
            results.push(`   类型: ${typeof highSpeedDeepDive}`);

            // 检查所有必需的键
            const requiredKeys = [
                'pcieTestingDeepDive',
                'usbTestingDeepDive',
                'mipiTestingDeepDive',
                'lpddr5xTestingDeepDive',
                'displayPortTestingDeepDive',
                'hdmiTestingDeepDive'
            ];

            results.push('   检查内容键:');
            requiredKeys.forEach(function(key) {
                const exists = key in highSpeedDeepDive;
                const obj = highSpeedDeepDive[key];
                const hasContent = obj && obj.content;
                const contentLength = hasContent ? obj.content.length : 0;

                if (exists && hasContent) {
                    results.push(`   ✅ ${key}: ${contentLength} 字符`);
                } else if (exists) {
                    results.push(`   ⚠️  ${key}: 存在但内容为空`);
                } else {
                    results.push(`   ❌ ${key}: 不存在`);
                }
            });
        }

        // 2. 检查 showHighSpeedContent 函数
        if (typeof showHighSpeedContent === 'undefined') {
            results.push('❌ showHighSpeedContent 函数未定义');
            console.error('showHighSpeedContent 函数未找到！检查 script.js 是否正确引入');
        } else {
            results.push('✅ showHighSpeedContent 函数已定义');
        }

        // 3. 检查内容显示区域
        const contentArea = document.getElementById('highSpeedDeepDiveContent');
        if (!contentArea) {
            results.push('❌ 内容显示区域 #highSpeedDeepDiveContent 不存在');
            console.error('未找到 id="highSpeedDeepDiveContent" 的元素');
        } else {
            results.push('✅ 内容显示区域已找到');
            results.push(`   当前内容长度: ${contentArea.innerHTML.length} 字符`);
        }

        // 4. 检查导航卡片
        const cards = document.querySelectorAll('.hs-nav-card');
        if (cards.length === 0) {
            results.push('⚠️  未找到任何 .hs-nav-card 导航卡片');
        } else {
            results.push(`✅ 找到 ${cards.length} 个导航卡片`);

            // 检查每个卡片的 onclick 属性
            let hasOnclick = 0;
            cards.forEach(function(card, index) {
                if (card.onclick) {
                    hasOnclick++;
                }
            });

            if (hasOnclick === cards.length) {
                results.push(`   ✅ 所有卡片都有 onclick 事件`);
            } else {
                results.push(`   ⚠️  只有 ${hasOnclick}/${cards.length} 个卡片有 onclick 事件`);
            }
        }

        // 5. 输出诊断结果
        console.log('\n' + results.join('\n'));
        console.log('\n=== 高速接口内容加载诊断完成 ===\n');

        // 6. 如果有问题，在页面上显示警告
        const hasErrors = results.some(function(r) { return r.startsWith('❌'); });
        if (hasErrors) {
            showDiagnosticWarning(results);
        }
    }

    function showDiagnosticWarning(results) {
        // 创建诊断面板
        const panel = document.createElement('div');
        panel.id = 'diagnosticPanel';
        panel.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            max-width: 400px;
            background: #fff3cd;
            border: 2px solid #ffc107;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            font-family: monospace;
            font-size: 12px;
        `;

        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <strong style="color: #856404;">⚠️ 诊断警告</strong>
                <button onclick="document.getElementById('diagnosticPanel').remove()"
                        style="border: none; background: transparent; cursor: pointer; font-size: 18px;">×</button>
            </div>
            <div style="max-height: 300px; overflow-y: auto; color: #856404;">
                ${results.map(r => `<div style="margin: 4px 0;">${r}</div>`).join('')}
            </div>
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #ffc107;">
                <small>打开浏览器控制台 (F12) 查看详细信息</small>
            </div>
        `;

        document.body.appendChild(panel);

        // 10秒后自动关闭
        setTimeout(function() {
            const p = document.getElementById('diagnosticPanel');
            if (p) p.remove();
        }, 10000);
    }
})();
