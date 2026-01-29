# 硬件工程师知识库网站

一个免费、开放访问的硬件工程师专业知识库，适合电子设计初学者和硬件爱好者学习。

## 📚 内容结构

### 基础篇 (30%)
- 电子元件基础（电阻、电容、电感、二极管、三极管）
- 基本电路定律和分析方法
- 简单电路设计入门
- 常用工具和仪器使用
- 元器件识别和选型基础

### 中级篇 (40%)
- PCB设计流程和规范
- 信号完整性基础
- 电源管理电路设计
- 常用通信协议（I2C、SPI、UART）
- EMC设计基础
- 热设计基础

### 高级篇 (30%)
- 高速电路设计
- 电源完整性分析
- FPGA/DSP硬件设计
- RF电路设计
- 复杂系统设计方法论
- 可靠性设计

## ✨ 核心特性

### 1. 树形导航结构
- 可折叠的章节导航
- 流畅的锚点跳转
- 侧边栏目录（TOC）
- 顶部返回按钮

### 2. LaTeX 公式渲染
- 使用 MathJax 渲染数学公式
- 专业的工程公式展示
- 公式框样式美化

示例：
```
欧姆定律: V = I × R
时间常数: τ = R × C
```

### 3. SVG 电路图
- 矢量图形，支持任意缩放
- 清晰的电路示意图
- 元件标注和说明

### 4. 在线计算器工具
- RC 充放电计算器
- 阻抗计算器（微带线、带状线、差分对）
- 走线宽度计算器（载流能力）
- 滤波器设计工具
- 功耗计算器

### 5. 知识图谱可视化
- 概念关联关系图
- 可交互的节点
- 知识体系全貌展示

### 6. IEEE 标准参考
- 链接到相关的 IEEE 标准
- 厂商数据手册引用
- 设计指南参考

### 7. 工程案例分析
- 真实项目案例
- 可下载的 KiCad 工程文件
- 设计思路讲解
- 常见问题解决方案

### 8. FAQ 问答区
- 折叠式问答结构
- 常见问题快速查找
- 实用技巧分享

## 🚀 技术栈

- **HTML5**: 语义化标签，结构清晰
- **CSS3**:
  - CSS Variables（自定义属性）
  - Flexbox 和 Grid 布局
  - 响应式设计（Mobile-first）
  - 自定义滚动条
  - 流畅动画和过渡效果
- **JavaScript ES6+**:
  - 模块化代码结构
  - 事件委托
  - 平滑滚动
  - 动态内容加载
- **MathJax 3.x**: LaTeX 公式渲染
- **Font Awesome 6**: 图标库

## 📱 响应式设计

完全适配不同设备：
- 桌面端（>1024px）：双栏布局，侧边栏固定
- 平板端（768-1024px）：可折叠侧边栏
- 手机端（<768px）：单列布局，汉堡菜单

## 🎨 设计特色

### 配色方案
- 主色调：`#2196F3`（专业蓝）
- 强调色：`#FF5722`（活力橙）
- 成功色：`#4CAF50`（绿色）
- 背景色：`#f5f7fa`（浅灰）

### 交互体验
- 平滑滚动动画
- 悬停状态反馈
- 折叠展开过渡
- 加载动画效果

### 可访问性
- 语义化 HTML 标签
- 键盘快捷键支持
- 适当的对比度
- Alt 文本说明

## 🛠️ 本地开发

### 1. 克隆项目
```bash
git clone https://github.com/YOUR_USERNAME/hardware_knowledge_base.git
cd hardware_knowledge_base
```

### 2. 启动本地服务器

使用 Python:
```bash
python -m http.server 8080
```

使用 Node.js:
```bash
npx http-server -p 8080
```

使用 VS Code:
- 安装 Live Server 扩展
- 右键点击 index.html → "Open with Live Server"

### 3. 打开浏览器
访问 http://localhost:8080

## 📦 部署

### GitHub Pages
1. 推送代码到 GitHub
2. 进入仓库 Settings → Pages
3. Source 选择 "main" 分支
4. 保存后等待部署完成

### Vercel
1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库
3. Framework: Other
4. 点击 Deploy

### Netlify
1. 访问 https://app.netlify.com/drop
2. 拖拽项目文件夹
3. 自动部署完成

## 📝 文件结构

```
hardware_knowledge_base/
├── index.html          # 主页面（47KB）
├── styles.css          # 样式表（43KB）
├── script.js           # 交互脚本（28KB）
├── README.md           # 项目说明
└── assets/             # 资源文件（待添加）
    ├── images/         # 图片
    ├── diagrams/       # SVG 电路图
    └── downloads/      # 可下载文件（KiCad 工程等）
```

## 🔧 自定义计算器

### RC 时间常数计算器
```javascript
function calculateRC() {
    const C = parseFloat(document.getElementById('capValue').value); // μF
    const R = parseFloat(document.getElementById('resValue').value); // kΩ
    const tau = R * C; // ms
    // 5τ = 99.3% 充电时间
    const chargeTime = tau * 5;
}
```

### 阻抗计算器
- 微带线阻抗
- 带状线阻抗
- 差分对阻抗

### 走线宽度计算器
- 基于 IPC-2221 标准
- 输入：电流、温升、铜厚
- 输出：最小走线宽度

## 📊 知识图谱

使用 SVG 实现的交互式知识图谱，展示硬件设计各个领域之间的关联关系：

- **核心节点**：硬件设计
- **基础层**：电路原理、元器件、工具仪器
- **应用层**：PCB 设计、信号完整性、电源管理、EMC、热设计
- **高级层**：高速设计、FPGA/DSP、RF 电路

## 🔗 外部资源链接

### IEEE 标准
- IEEE 1149.1 (JTAG)
- IEEE 802.3 (以太网)
- IEEE 1394 (火线)

### 厂商工具
- TI Power Designer
- Analog Devices ADIsimPower
- Keysight ADS
- Altium Designer

### 参考资料
- 《模拟电子技术基础》
- 《数字电子技术基础》
- 《High-Speed Digital Design》
- 《Signal and Power Integrity》

## ⚡ 性能优化

- CSS 压缩和合并
- JavaScript 延迟加载
- 图片懒加载
- CDN 加速（MathJax、Font Awesome）
- 浏览器缓存策略

## 🤝 贡献指南

欢迎贡献内容和改进建议！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 📮 联系方式

- GitHub Issues: 报告问题和建议
- Email: your-email@example.com

## 🎯 未来计划

- [ ] 完善中级篇内容
- [ ] 完善高级篇内容
- [ ] 添加更多交互式计算器
- [ ] 创建可下载的 KiCad 工程案例
- [ ] 实现知识图谱交互功能
- [ ] 添加视频教程链接
- [ ] 增加中英文双语支持
- [ ] 添加深色模式
- [ ] 实现全文搜索功能
- [ ] 添加用户笔记功能

## 🙏 致谢

感谢所有为硬件工程领域知识普及做出贡献的前辈和同行！

---

**让硬件设计知识触手可及！**

🌟 如果这个项目对你有帮助，请给一个 Star！