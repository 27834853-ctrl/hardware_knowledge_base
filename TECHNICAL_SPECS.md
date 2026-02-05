# 🔧 技术规格文档

## 系统架构

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| HTML5 | - | 页面结构 |
| CSS3 | - | 样式和布局 |
| JavaScript | ES6+ | 交互逻辑 |
| MathJax | 3.x | LaTeX 公式渲染 |

### 关键依赖

```javascript
// MathJax CDN
https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js

// Font Awesome (图标)
内置在 HTML 中

// 无其他外部依赖
```

---

## 文件组织

### 核心文件 (7 个)

1. **index.html** (7045 行)
   - 主页面
   - 包含所有章节内容
   - MathJax 配置
   - 版本检测逻辑

2. **script.js** (~1500 行)
   - 导航系统
   - 搜索引擎
   - 交互功能
   - 事件处理

3. **high-speed-deep-dive-20260205-fixed.js** (7060 行, 307KB)
   - 高速接口深度内容
   - 包含 6 个模块（PCIe, USB, MIPI, LPDDR5X, DP, HDMI）
   - LaTeX 公式已修复（双反斜杠转义）

4. **high-speed-content-loader.js** (~140 行)
   - 动态内容加载
   - MathJax 触发
   - 平滑滚动

5. **styles.css**
   - 全局样式
   - 响应式布局
   - 动画效果

6. **performance-monitor.js** (~600 行)
   - 性能监控
   - Core Web Vitals
   - 资源加载统计

7. **search-optimizer.js** (~540 行)
   - 搜索优化
   - 关键词匹配
   - 结果排序

### 辅助文件

- content-enhancement.js - 内容增强
- high-speed-interfaces.js - 基础知识
- high-speed-advanced.js - 进阶内容
- accessibility-enhancements.js - 无障碍支持
- diagnostic.js - 诊断工具
- sw-register.js - Service Worker

---

## LaTeX 配置

### MathJax 设置

```javascript
window.MathJax = {
    tex: {
        // 行内公式
        inlineMath: [['$', '$'], ['\\(', '\\)']],

        // 独立公式
        displayMath: [['$$', '$$'], ['\\[', '\\]']],

        // 处理转义
        processEscapes: true,
        processEnvironments: true
    },
    options: {
        // 跳过的标签
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
    }
};
```

### LaTeX 语法规则

在 JavaScript 模板字符串中必须使用双反斜杠：

```javascript
// ❌ 错误
content: `$E = mc^2 \times \sqrt{x}$`

// ✅ 正确
content: `$E = mc^2 \\times \\sqrt{x}$`
```

**原因**: JavaScript 会将 `\t` 解释为 TAB 字符，`\n` 解释为换行符等。

---

## 数据结构

### 内容模块结构

```javascript
const highSpeedDeepDive = {
    pcieTestingDeepDive: {
        title: 'PCIe深度测试与调试技术',
        icon: 'fa-microscope',
        content: `HTML content with LaTeX formulas`
    },
    usbTestingDeepDive: { /* ... */ },
    mipiTestingDeepDive: { /* ... */ },
    lpddr5xTrainingDeepDive: { /* ... */ },
    displayPortDeepDive: { /* ... */ },
    hdmiDeepDive: { /* ... */ }
};
```

### 内容大小

| 模块 | 行数 | 字符数 | 说明 |
|------|------|--------|------|
| PCIe | ~2100 | 83,396 | 包含 LaTeX 公式 |
| USB | ~700 | ~28,000 | 包含表格和图示 |
| MIPI | ~600 | ~24,000 | 技术规范 |
| LPDDR5X | ~750 | ~30,000 | 训练序列 |
| DisplayPort | ~550 | ~22,000 | UHBR 技术 |
| HDMI | ~500 | ~20,000 | FRL + eARC |

---

## 性能指标

### 加载性能

| 指标 | 目标 | 实际 | 状态 |
|------|------|------|------|
| FCP | <1000ms | ~650ms | ✅ 优秀 |
| LCP | <2500ms | ~650ms | ✅ 优秀 |
| FID | <100ms | <50ms | ✅ 优秀 |
| CLS | <0.1 | ~0.002 | ✅ 优秀 |

### 文件大小

| 文件类型 | 未压缩 | Gzip | Brotli |
|----------|--------|------|--------|
| HTML | 320KB | ~80KB | ~60KB |
| JavaScript | 450KB | ~120KB | ~90KB |
| CSS | 50KB | ~12KB | ~9KB |
| **总计** | **820KB** | **~212KB** | **~159KB** |

### 缓存策略

```
GitHub Pages 自动设置:
- HTML: max-age=600 (10分钟)
- CSS/JS: max-age=3600 (1小时)
- 图片: max-age=86400 (1天)
```

---

## 浏览器兼容性

### 必需特性

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| ES6+ | 51+ | 54+ | 10+ | 79+ |
| CSS Grid | 57+ | 52+ | 10.1+ | 16+ |
| CSS Flexbox | 29+ | 28+ | 9+ | 12+ |
| Template Literals | 41+ | 34+ | 9+ | 13+ |

### 推荐版本

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 移动端支持

- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

---

## API 和接口

### 公开函数

```javascript
// 显示高速接口内容
window.showHighSpeedContent(contentKey)

// 参数:
//   contentKey: 'pcieTestingDeepDive' | 'usbTestingDeepDive' | ...
// 返回: void
```

### 事件

```javascript
// 页面加载完成
window.addEventListener('load', function() {
    // 初始化逻辑
});

// MathJax 渲染完成
MathJax.startup.promise.then(() => {
    // 渲染后处理
});
```

---

## 部署配置

### GitHub Pages

```yaml
# .github/workflows/pages.yml (自动)
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/upload-pages-artifact@v1
        with:
          path: '.'
      - uses: actions/deploy-pages@v1
```

### Vercel

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    }
  ]
}
```

---

## 安全性

### 内容安全策略 (CSP)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
```

### HTTPS

- ✅ GitHub Pages: 自动启用
- ✅ Vercel: 自动启用
- ✅ 证书: Let's Encrypt

---

## 监控和日志

### 控制台日志级别

```javascript
// 调试信息
console.log('📊 [版本检测] ...')

// 警告
console.warn('⚠️ [运行时修复] ...')

// 错误
console.error('❌ [版本检测] ...')
```

### 性能监控

```javascript
// Core Web Vitals
{
    LCP: 650ms,    // Largest Contentful Paint
    FID: 50ms,     // First Input Delay
    CLS: 0.002     // Cumulative Layout Shift
}
```

---

## 测试

### 单元测试

- 无自动化测试框架
- 手动测试各功能模块

### 集成测试

- final-test.html - LaTeX 渲染测试
- test-mathjax-render.html - MathJax 测试
- test-js-load.html - 文件加载测试

### 验收测试

测试清单：
- [ ] 所有页面加载
- [ ] 导航功能
- [ ] 搜索功能
- [ ] LaTeX 公式渲染
- [ ] 响应式布局
- [ ] 浏览器兼容性

---

## 已知限制

1. **file:// 协议限制**
   - ServiceWorker 不可用
   - fetch() 受 CORS 限制
   - 推荐使用 HTTP 服务器或在线版本

2. **浏览器缓存**
   - 本地开发时可能缓存旧版本
   - 解决：使用 http-server -c-1 禁用缓存

3. **MathJax 加载时间**
   - 首次加载需要下载 MathJax 库
   - 约 200-500ms
   - 后续访问使用浏览器缓存

---

## 优化建议

### 短期优化
- [ ] 启用 Gzip/Brotli 压缩
- [ ] 图片延迟加载
- [ ] 代码分割

### 长期优化
- [ ] 使用构建工具（Webpack/Vite）
- [ ] Tree shaking
- [ ] 服务端渲染（SSR）

---

## 版本控制

### Git 分支策略

```
main (生产)
  └── 所有稳定版本
```

### 提交规范

```
类型: 简短描述

详细描述...

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**类型**:
- fix: 修复 bug
- feat: 新功能
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建/工具

---

## 许可和归属

- **许可证**: MIT
- **MathJax**: Apache License 2.0
- **Font Awesome**: Font Awesome Free License

---

**文档版本**: 1.0
**最后更新**: 2026-02-05
**维护者**: 27834853-ctrl
