# 贡献指南 Contributing Guide

感谢您对硬件工程师知识库项目的关注！我们欢迎任何形式的贡献。

## 🤝 如何贡献

### 报告问题 (Issues)

如果您发现了问题，请通过 GitHub Issues 提交：

1. **技术错误**：公式错误、计算器bug、代码问题
2. **内容问题**：错别字、表述不清、知识点遗漏
3. **功能建议**：新功能需求、改进建议
4. **文档问题**：文档不完整、说明不清楚

**提交Issue时请包含**：
- 清晰的标题
- 详细的描述
- 截图或错误信息（如适用）
- 您的浏览器和操作系统信息

### 提交代码 (Pull Requests)

我们欢迎以下类型的贡献：

#### 1. 内容贡献
- ✅ 添加新的知识章节
- ✅ 补充实际案例
- ✅ 改进现有内容
- ✅ 添加技术图表
- ✅ 完善FAQ问答

#### 2. 功能贡献
- ✅ 新增计算器
- ✅ 改进现有计算器
- ✅ 优化搜索功能
- ✅ 添加交互功能
- ✅ 性能优化

#### 3. 设计贡献
- ✅ UI/UX改进
- ✅ 响应式优化
- ✅ 无障碍访问
- ✅ 深色模式完善

#### 4. 文档贡献
- ✅ 改进README
- ✅ 添加教程
- ✅ 翻译文档
- ✅ API文档

### Pull Request 流程

1. **Fork 项目**
   ```bash
   # 在GitHub上点击Fork按钮
   ```

2. **克隆到本地**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hardware_knowledge_base.git
   cd hardware_knowledge_base
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **进行修改**
   - 遵循项目代码风格
   - 添加必要的注释
   - 测试您的更改

5. **提交更改**
   ```bash
   git add .
   git commit -m "描述: 简要说明您的更改"
   ```

   **提交信息格式**：
   - `feat: 添加新功能`
   - `fix: 修复bug`
   - `docs: 更新文档`
   - `style: 代码格式调整`
   - `refactor: 重构代码`
   - `perf: 性能优化`
   - `test: 添加测试`
   - `chore: 构建工具或辅助工具的变动`

6. **推送到远程**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建Pull Request**
   - 在GitHub上打开Pull Request
   - 填写详细的PR描述
   - 等待代码审查

### PR描述模板

```markdown
## 变更类型
- [ ] 新功能 (Feature)
- [ ] Bug修复 (Fix)
- [ ] 文档更新 (Documentation)
- [ ] 性能优化 (Performance)
- [ ] 代码重构 (Refactor)

## 变更说明
<!-- 详细描述您的更改 -->

## 相关Issue
<!-- 如果有相关的Issue，请在此关联 -->
Closes #(issue编号)

## 测试
<!-- 描述您如何测试了这些更改 -->
- [ ] 在Chrome浏览器测试
- [ ] 在Firefox浏览器测试
- [ ] 在移动设备测试
- [ ] 计算器功能测试
- [ ] 响应式布局测试

## 截图（如适用）
<!-- 添加截图展示变更效果 -->

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 已添加必要的注释
- [ ] 文档已更新
- [ ] 所有测试通过
- [ ] 无破坏性更改
```

## 📝 代码规范

### HTML
- 使用语义化标签
- 保持缩进一致（4空格）
- 添加必要的ARIA标签
- 注释复杂的结构

### CSS
- 使用CSS变量
- 遵循BEM命名规范
- 移动优先的响应式设计
- 避免!important
- 按功能模块组织代码

```css
/* 推荐 */
.calculator-section { }
.calculator-section__input { }
.calculator-section--active { }

/* 不推荐 */
.calcSection { }
.calc_input { }
```

### JavaScript
- 使用ES6+语法
- 函数命名使用驼峰命名法
- 添加JSDoc注释
- 避免全局变量
- 处理边界情况

```javascript
/**
 * 计算微带线阻抗
 * @param {number} width - 走线宽度 (mm)
 * @param {number} height - 介质厚度 (mm)
 * @param {number} er - 相对介电常数
 * @returns {number} 特征阻抗 (Ω)
 */
function calculateMicrostrip(width, height, er) {
    // 输入验证
    if (width <= 0 || height <= 0 || er < 1) {
        throw new Error('Invalid input parameters');
    }

    // 计算逻辑
    const ratio = width / height;
    // ...
    return impedance;
}
```

### 内容规范
- 使用标准的中文技术术语
- LaTeX公式格式正确
- 案例包含真实器件型号
- 参考国际标准（IEEE、IPC、JEDEC）
- 提供详细的设计步骤

## 🧪 测试

在提交PR前，请确保：

### 功能测试
- [ ] 所有链接正常工作
- [ ] 导航菜单功能正常
- [ ] 搜索功能正常
- [ ] 计算器输出正确
- [ ] 深色模式切换正常

### 浏览器兼容性
- [ ] Chrome/Edge (最新版本)
- [ ] Firefox (最新版本)
- [ ] Safari (最新版本)
- [ ] 移动浏览器

### 响应式测试
- [ ] 桌面端 (>1024px)
- [ ] 平板端 (768-1024px)
- [ ] 手机端 (<768px)

### 性能测试
- [ ] 页面加载时间 <3秒
- [ ] 无JavaScript错误
- [ ] 无CSS警告

## 📚 参考资源

### 技术标准
- [IEEE Standards](https://www.ieee.org/)
- [IPC Standards](https://www.ipc.org/)
- [JEDEC Standards](https://www.jedec.org/)

### 开发工具
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)
- [MathJax Documentation](https://docs.mathjax.org/)

### 设计资源
- [Font Awesome Icons](https://fontawesome.com/)
- [SVG Specification](https://www.w3.org/TR/SVG2/)

## ❓ 获取帮助

如果您有任何问题：

1. **查看文档**：首先查看README和现有文档
2. **搜索Issues**：查看是否有人遇到过类似问题
3. **提问**：在Issues中提问，我们会尽快回复
4. **讨论**：使用GitHub Discussions进行技术讨论

## 🎯 优先级

我们特别欢迎以下贡献：

### 高优先级 ⭐⭐⭐
- 修复技术错误
- 改进计算器精度
- 添加缺失的重要知识点
- 优化移动端体验

### 中优先级 ⭐⭐
- 添加新的计算器
- 补充实际案例
- 改进文档
- UI/UX优化

### 低优先级 ⭐
- 代码重构
- 性能微优化
- 样式调整

## 🌟 贡献者

感谢所有为本项目做出贡献的开发者！

<!-- 贡献者列表将自动生成 -->

## 📜 许可证

通过向本项目提交代码，您同意您的贡献将在 [MIT License](LICENSE) 下授权。

---

**再次感谢您的贡献！** 🙏

如有任何问题，请随时联系项目维护者。

**项目维护者**: [@27834853-ctrl](https://github.com/27834853-ctrl)
**项目地址**: https://github.com/27834853-ctrl/hardware_knowledge_base
