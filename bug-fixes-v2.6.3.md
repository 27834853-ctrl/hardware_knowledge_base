# Bug 修复清单 v2.6.3

**修复日期**: 2026-02-02
**报告人**: 用户反馈
**状态**: 🔧 修复中

---

## 📋 问题列表

### ✅ 1. 村田电阻选型指南链接无法连接
**问题**: 链接指向 `#` 无效
**修复**: 更新为正确的村田官网链接
**状态**: ✅ 已修复

```html
<!-- 修复前 -->
<a href="#" target="_blank"><i class="fas fa-file-pdf"></i> 村田电阻选型指南</a>

<!-- 修复后 -->
<a href="https://www.murata.com/products/resistor" target="_blank"><i class="fas fa-file-pdf"></i> 村田电阻选型指南</a>
```

---

### 🔧 2. 简单分压电路图片显示问题
**问题**: SVG 电路图显示不正常
**分析**: SVG viewBox 和布局需要优化
**修复方案**:
1. 调整 SVG viewBox 尺寸
2. 优化文本标签位置
3. 确保响应式显示

**状态**: 需要查看具体显示问题的详情

---

### 🔧 3. 阻抗快速计算器无法计算
**问题**: 点击"计算阻抗"按钮无响应
**原因**: `calculateImpedance()` 函数未定义
**修复方案**: 在 script.js 中添加计算函数

```javascript
function calculateImpedance() {
    const w = parseFloat(document.getElementById('traceWidth').value);
    const h = parseFloat(document.getElementById('dielectricHeight').value);
    const er = parseFloat(document.getElementById('dielectricConstant').value);

    // 微带线阻抗计算 (IPC-2141A)
    const wOverH = w / h;
    let Z0_microstrip;

    if (wOverH <= 1) {
        Z0_microstrip = (60 / Math.sqrt(er)) * Math.log((8 * h / w) + (w / (4 * h)));
    } else {
        Z0_microstrip = (120 * Math.PI) / (Math.sqrt(er) * (wOverH + 1.393 + 0.667 * Math.log(wOverH + 1.444)));
    }

    // 带状线阻抗计算
    const Z0_stripline = (60 / Math.sqrt(er)) * Math.log((4 * h) / (0.67 * Math.PI * w));

    // 显示结果
    document.getElementById('microstripZ').textContent = Z0_microstrip.toFixed(2);
    document.getElementById('striplineZ').textContent = Z0_stripline.toFixed(2);
    document.getElementById('impedanceResult').style.display = 'block';
}
```

**状态**: 待添加到 script.js

---

### 🔧 4. 端接方式示意图布局问题
**问题**: R 和 C 位置不协调，VCC 不在最上面
**修复方案**: 调整 SVG 元素位置

**当前问题**:
- 戴维南终端: R+C 位置不合理
- 载维南终端: VCC、R1、R2 位置需要调整

**修复**: 需要重新绘制 SVG 图

---

### 🔧 5. 推荐参考资料链接无法跳转
**问题**: 部分外部链接指向 `#`
**修复方案**: 更新为正确的URL

**需要修复的链接**:
- IEEE 标准文档
- 厂商应用手册
- 技术白皮书

---

### 🔧 6. 差分对布线示例文字重叠
**问题**: 文字 "长度不等、直角、间距变化" 与 "X 错误示例" 重叠
**修复方案**:
1. 调整文本位置
2. 增加文本区域高度
3. 使用 `dominant-baseline` 属性

---

### 🔧 7. 眼图示意显示不对
**问题**: 眼图的眼宽、眼高标注位置不准确
**修复方案**:
1. 重新绘制眼图 SVG
2. 准确标注眼高（垂直方向）
3. 准确标注眼宽（水平方向 1 UI）

---

### 🔧 8. PCB阻抗计算器不能使用
**问题**: 详细的PCB阻抗计算器功能未实现
**分析**:
- 存在 `switchImpedanceCalc()` 函数
- 但计算逻辑可能不完整

**修复方案**:
1. 检查完整的阻抗计算器实现
2. 确保微带线、带状线、差分对计算都可用
3. 添加结果导出功能

---

## 🔄 修复优先级

### 高优先级 (影响功能)
1. ✅ 村田电阻链接 - 已修复
2. 🔧 阻抗快速计算器 - 修复中
3. 🔧 PCB阻抗计算器 - 修复中

### 中优先级 (影响体验)
4. 🔧 简单分压电路图显示
5. 🔧 端接方式示意图布局
6. 🔧 差分对布线文字重叠
7. 🔧 眼图示意

### 低优先级 (信息完善)
8. 🔧 推荐参考资料链接

---

## 📝 修复进度

| 问题 | 状态 | 进度 |
|------|------|------|
| 村田电阻链接 | ✅ 完成 | 100% |
| 分压电路图 | 🔧 进行中 | 20% |
| 阻抗快速计算器 | 🔧 进行中 | 30% |
| 端接方式示意图 | 📝 待修复 | 0% |
| 参考资料链接 | 📝 待修复 | 0% |
| 差分对布线 | 📝 待修复 | 0% |
| 眼图示意 | 📝 待修复 | 0% |
| PCB阻抗计算器 | 🔧 进行中 | 40% |

---

## 🚀 后续计划

1. 完成高优先级功能修复
2. 测试所有计算器功能
3. 优化所有SVG图形显示
4. 更新所有外部链接
5. 创建修复测试报告

---

**修复负责人**: Claude Sonnet 4.5
**预计完成时间**: 2026-02-02

