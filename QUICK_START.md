# 🚀 快速开始指南

## 最快的方式：直接访问在线版本

### 生产环境（推荐）
```
https://27834853-ctrl.github.io/hardware_knowledge_base/
```

**特点**:
- ✅ 无需配置
- ✅ 自动更新
- ✅ 全球 CDN 加速
- ✅ HTTPS 安全连接
- ✅ 所有功能完整可用

---

## 本地开发（可选）

### 方法 1: 使用 HTTP 服务器（推荐）

```bash
# 进入项目目录
cd "D:\App_Collection\Microsoft VS Code\hardware_knowledge_base"

# 启动服务器（需要 Node.js）
npx http-server -p 8000 -c-1

# 浏览器访问
http://localhost:8000/index.html
```

### 方法 2: VS Code Live Server

1. 安装 VS Code 扩展："Live Server"
2. 在 VS Code 中打开项目文件夹
3. 右键 `index.html` → 选择 "Open with Live Server"
4. 自动在浏览器中打开

### 方法 3: 直接打开文件（不推荐）

```
file:///D:/App_Collection/Microsoft VS Code/hardware_knowledge_base/index.html
```

**注意**: file:// 协议有限制，某些功能可能无法使用。

---

## 验证安装

### 检查 LaTeX 公式

访问测试页面：
```
https://27834853-ctrl.github.io/hardware_knowledge_base/final-test.html
```

**预期结果**:
- ✅ 显示 "成功: 5 失败: 0"
- ✅ 公式渲染为数学符号
- ✅ 无 "Math input error"

### 检查主功能

1. **导航测试**
   - 点击左侧菜单项
   - 页面平滑滚动到对应章节

2. **搜索测试**
   - 使用顶部搜索框
   - 输入关键词（如 "PCIe"）
   - 查看搜索结果

3. **公式测试**
   - 进入：高级篇 → 高速接口深度技术 → PCIe Gen 1-6 深度测试
   - 检查公式正确显示

---

## 常见问题

### Q: 公式显示为 LaTeX 源代码怎么办？

**A**: 清除浏览器缓存：
```
1. 按 Ctrl+Shift+Delete
2. 选择"缓存的图片和文件"
3. 清除缓存
4. 硬刷新: Ctrl+F5
```

### Q: 修改后内容没有更新？

**A**: 使用强制刷新：
```
Ctrl+F5 (Windows/Linux)
Cmd+Shift+R (Mac)
```

### Q: 本地 HTTP 服务器无法启动？

**A**: 检查是否安装 Node.js：
```bash
# 检查 Node.js 版本
node --version

# 如未安装，访问下载:
https://nodejs.org/
```

---

## 下一步

- 📖 阅读 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) 了解完整项目信息
- 🔧 阅读 [README-LATEX-FIX.md](README-LATEX-FIX.md) 了解 LaTeX 修复详情
- 💡 阅读 [SOLUTION.md](SOLUTION.md) 了解问题解决方案

---

## 需要帮助？

- **GitHub Issues**: https://github.com/27834853-ctrl/hardware_knowledge_base/issues
- **在线文档**: https://27834853-ctrl.github.io/hardware_knowledge_base/

---

**提示**: 建议直接使用在线版本，无需本地配置，体验最佳！
