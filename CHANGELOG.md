# 更新日志 / Changelog

所有重要的项目更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/)。

---

## [2.2.3] - 2026-01-30

### 新增 (Added)
- ✨ 专业的 404 错误页面，包含动画效果和热门页面推荐
- ✨ PWA 支持 (manifest.json)，可安装到桌面
- ✨ 应用快捷方式（案例库、快速参考、计算器）
- ✨ 更新日志文件 (CHANGELOG.md)

### 修复 (Fixed)
- 🐛 移除失效的 polyfill.io CDN 引用
- 🐛 修复 GitHub 链接为正确的仓库地址
- 🐛 修复许可证信息从 CC BY-SA 4.0 到 MIT
- 🐛 更新版权年份从 2024 到 2026

### 改进 (Changed)
- 💄 优化页脚链接显示，添加 GitHub 图标

---

## [2.2.2] - 2026-01-30

### 新增 (Added)
- ✨ 快速参考卡片系统 (quick-reference.html)
  - 6 大分类标签页
  - 30+ 专业参考卡片
  - 实时搜索功能
  - 打印优化支持
- ✨ 案例详情页模板 (case-detail-template.html)
  - 完整的 7 步设计流程
  - 技术规格展示
  - 电路设计详解
  - 测试验证指南
- ✨ 专业打印样式表 (print.css, 420 行)
  - A4 纸张优化
  - 智能分页控制
  - 黑白打印优化
- ✨ GitHub Pages 部署指南 (DEPLOYMENT.md, 680 行)
  - 零基础友好教程
  - 故障排除方案
  - 性能优化建议
- ✨ 案例库扩展，新增 10 个详细案例
  - SPI Flash 存储器接口
  - LDO 稳压电路设计
  - USB 2.0 差分信号
  - 千兆以太网 PHY
  - DHT22 温湿度传感器
  - 12 位 ADC 数据采集
  - UART 转 RS485
  - LoRa 无线模块
  - ESP32 开发板
  - 锂电池充电管理
- ✨ SEO 优化文件
  - sitemap.xml (21 个 URL)
  - robots.txt (搜索引擎配置)

### 改进 (Changed)
- 💄 主页添加"快速参考"导航链接
- 💄 案例库添加"快速参考"导航链接
- 💄 所有 HTML 页面引入 print.css

### 技术债务 (Technical)
- 📝 代码量增长 30% (9,242 → 12,000 行)
- 📝 案例数量增长 167% (6 → 16 个)

---

## [2.2.1] - 2026-01-30

### 新增 (Added)
- ✨ 独立的案例库页面 (cases.html)
- ✨ 案例库交互脚本 (cases.js)
  - 分类筛选功能
  - 难度等级过滤
  - 排序功能
- ✨ 6 个初始硬件设计案例
  - STM32 最小系统
  - Buck 降压电路
  - DDR4 内存接口
  - USB 3.0 高速信号
  - 2.4GHz RF 收发电路
  - FPGA 电源设计
- ✨ GitHub Pages 配置文件 (.nojekyll)

### 改进 (Changed)
- 📝 完全重写 README.md
  - 添加专业 badges
  - 详细的功能列表
  - 完整的使用指南
  - 版本历史记录

---

## [2.2.0] - 2026-01-30

### 新增 (Added)
- ✨ 学习路径指引系统
  - 🌱 完全新手路径 (1-2 周)
  - 🍃 有基础进阶路径 (2-3 周)
  - 🌳 高级工程师路径 (1-2 月)
  - 6 条学习建议卡片
- ✨ 计算器导出功能
  - 📥 导出到文件 (.txt)
  - 📋 复制到剪贴板
  - 🔗 生成分享链接
  - 通知反馈系统
- ✨ SEO 完整优化
  - 详细的 Meta 描述
  - Open Graph 标签 (Facebook/LinkedIn)
  - Twitter Card 标签
  - Canonical URL
  - SVG Favicon
- ✨ 专业文档
  - CONTRIBUTING.md (贡献指南, 370 行)
  - LICENSE (MIT 许可证)
  - CODE_OF_CONDUCT.md (行为准则, 120 行)

### 改进 (Changed)
- 💄 所有计算器添加导出按钮
- 📝 扩展关键词从 8 个到 15 个
- 📝 Meta 描述从 40 字扩展到 100 字

---

## [2.1.0] - 2026-01-30

### 新增 (Added)
- ✨ 全文搜索功能
  - Ctrl+K 快捷键
  - 智能排序（标题、关键词、内容）
  - 覆盖 100+ 知识文章
  - 键盘导航支持
- ✨ 深色模式
  - 一键切换
  - 自动保存偏好
  - 全站组件适配
- ✨ 交互式知识图谱
  - 可点击节点跳转
  - 悬停放大效果
  - 平滑动画过渡
- ✨ 键盘快捷键系统
  - Ctrl+K 搜索
  - ESC 关闭弹窗
  - 方向键导航

### 改进 (Changed)
- 💄 优化搜索 UI/UX
- 💄 添加搜索防抖 (300ms)
- 🚀 搜索响应时间 <10ms

---

## [2.0.0] - 2026-01-29

### 新增 (Added)
- ✨ 完整的知识体系
  - 📚 基础篇（电子元件、电路分析、常用仪器）
  - 📐 中级篇（PCB 设计、信号完整性、电源管理、通信接口）
  - 🚀 高级篇（DDR/高速设计、FPGA/DSP 系统、RF 电路）
- ✨ 4 个完整的专业计算器
  - 阻抗计算器（微带线/带状线/差分对）
  - 走线宽度计算器（IPC-2221 标准）
  - LC 滤波器设计工具
  - Via 电感计算器
- ✨ 60+ 工程公式（LaTeX 渲染）
- ✨ 20+ 技术图表
- ✨ 25+ 实战案例

### 技术实现 (Technical)
- 📝 7,621 行代码
- 🎨 响应式设计（移动端/平板/桌面）
- ⚡ CDN 加速（MathJax、Font Awesome）

---

## [1.0.0] - 2026-01-29

### 新增 (Added)
- ✨ 项目初始化
- ✨ 基础框架搭建
  - HTML5 语义化标签
  - CSS3 变量系统
  - JavaScript ES6+ 模块化
- ✨ 导航栏和页脚
- ✨ 响应式布局
- 📚 基础篇内容
  - 电阻器、电容器、电感器
  - 二极管、三极管
  - 电路分析基础

### 技术实现 (Technical)
- 📝 3,144 行代码
- 🎨 响应式设计
- 💻 原生 JavaScript（无框架依赖）

---

## 符号说明 / Legend

- ✨ `Added` - 新增功能
- 🐛 `Fixed` - 修复 Bug
- 💄 `Changed` - 改进/变更
- 🗑️ `Removed` - 移除功能
- 🚀 `Performance` - 性能优化
- 📝 `Documentation` - 文档更新
- 🔒 `Security` - 安全修复
- ⚠️ `Deprecated` - 即将废弃

---

## 版本发布周期 / Release Cycle

- **主版本 (Major)**: 重大架构变更或不兼容更新
- **次版本 (Minor)**: 新功能添加，向后兼容
- **修订版本 (Patch)**: Bug 修复和小改进

---

## 未来规划 / Roadmap

### V3.0 (计划中)
- [ ] 进度追踪系统（学习进度记录）
- [ ] 笔记功能（章节笔记、高亮）
- [ ] 视频教程集成
- [ ] 案例详情页面（基于模板）
- [ ] 多语言支持（中/英）
- [ ] PWA 离线访问
- [ ] 后端 API 接口
- [ ] 用户系统

---

## 贡献 / Contributing

查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何为项目做出贡献。

---

## 许可证 / License

本项目采用 [MIT License](LICENSE)。

---

© 2026 硬件工程师知识库 | [GitHub](https://github.com/27834853-ctrl/hardware_knowledge_base)
