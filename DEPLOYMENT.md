# GitHub Pages 部署指南

完整的部署流程文档，帮助您将硬件知识库部署到 GitHub Pages。

---

## 📋 目录

- [前提条件](#前提条件)
- [快速部署](#快速部署)
- [详细步骤](#详细步骤)
- [自定义域名](#自定义域名)
- [故障排除](#故障排除)
- [性能优化](#性能优化)
- [更新内容](#更新内容)

---

## 前提条件

在开始部署之前，请确保您已经：

- ✅ 拥有 GitHub 账号
- ✅ 安装了 Git（版本 ≥ 2.0）
- ✅ 完成了代码的本地测试
- ✅ 准备好要部署的内容

### 检查 Git 安装

```bash
git --version
# 应该输出: git version 2.x.x
```

---

## 快速部署

最快 3 步完成部署：

### 方法一：通过 GitHub Web 界面

1. **创建仓库**
   - 访问 [GitHub](https://github.com)
   - 点击 `New repository`
   - 仓库名填写：`hardware_knowledge_base`
   - 设置为 `Public`
   - 点击 `Create repository`

2. **上传代码**
   - 在仓库页面点击 `uploading an existing file`
   - 拖拽所有项目文件到页面
   - 填写 commit 信息：`Initial commit`
   - 点击 `Commit changes`

3. **启用 GitHub Pages**
   - 进入仓库 `Settings` → `Pages`
   - Source 选择：`Deploy from a branch`
   - Branch 选择：`main` 和 `/ (root)`
   - 点击 `Save`
   - 等待 2-3 分钟即可访问

访问地址：`https://[你的用户名].github.io/hardware_knowledge_base/`

---

### 方法二：通过 Git 命令行（推荐）

```bash
# 1. 初始化本地仓库
cd /path/to/hardware_knowledge_base
git init

# 2. 添加所有文件
git add .

# 3. 提交到本地
git commit -m "Initial commit"

# 4. 连接远程仓库
git remote add origin https://github.com/[你的用户名]/hardware_knowledge_base.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main

# 6. 启用 GitHub Pages（通过 Web 界面，见方法一步骤3）
```

---

## 详细步骤

### 步骤 1：创建 GitHub 仓库

#### 1.1 登录 GitHub

访问 [github.com](https://github.com) 并登录您的账号。

#### 1.2 创建新仓库

点击右上角的 `+` 号，选择 `New repository`。

填写以下信息：

| 字段 | 内容 |
|------|------|
| Repository name | `hardware_knowledge_base` |
| Description | 硬件工程师知识库 - Hardware Engineer Knowledge Base |
| Visibility | **Public** ⚠️ 必须是 Public 才能使用免费的 GitHub Pages |
| Initialize | 不要勾选任何选项（如果已有本地代码） |

点击 `Create repository`。

---

### 步骤 2：准备本地代码

#### 2.1 确认项目文件结构

```
hardware_knowledge_base/
├── index.html          # 主页面
├── cases.html          # 案例库页面
├── quick-reference.html # 快速参考页面
├── case-detail-template.html # 案例详情模板
├── script.js           # 主脚本
├── cases.js            # 案例脚本
├── styles.css          # 样式表
├── print.css           # 打印样式
├── README.md           # 项目文档
├── CONTRIBUTING.md     # 贡献指南
├── CODE_OF_CONDUCT.md  # 行为准则
├── LICENSE             # MIT 许可证
├── .nojekyll          # 禁用 Jekyll
├── robots.txt         # SEO 爬虫配置
└── sitemap.xml        # 站点地图
```

#### 2.2 检查 .nojekyll 文件

⚠️ **重要**：确保项目根目录有 `.nojekyll` 文件。

这个文件告诉 GitHub Pages 不要用 Jekyll 处理站点。

创建方式：

```bash
# Windows
type nul > .nojekyll

# macOS/Linux
touch .nojekyll
```

#### 2.3 验证 index.html

确保 `index.html` 在项目根目录，这是 GitHub Pages 的入口文件。

---

### 步骤 3：推送代码到 GitHub

#### 3.1 初始化 Git 仓库

```bash
cd /path/to/hardware_knowledge_base
git init
```

#### 3.2 配置 Git 用户信息（首次使用）

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 3.3 添加所有文件

```bash
git add .
```

检查暂存的文件：

```bash
git status
```

应该看到所有文件都是绿色的 "new file"。

#### 3.4 创建首次提交

```bash
git commit -m "Initial commit: Hardware Knowledge Base V2.2

- Complete knowledge system (Basic/Intermediate/Advanced)
- 4 professional calculators with export functionality
- 30+ hardware design cases
- Search functionality (Ctrl+K)
- Dark mode support
- Learning path guide
- SEO optimization
- Professional documentation

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

#### 3.5 连接远程仓库

```bash
git remote add origin https://github.com/[你的用户名]/hardware_knowledge_base.git
```

将 `[你的用户名]` 替换为您的 GitHub 用户名。

#### 3.6 推送到 GitHub

```bash
git branch -M main
git push -u origin main
```

如果是第一次推送，可能需要输入 GitHub 用户名和密码（或 Personal Access Token）。

---

### 步骤 4：启用 GitHub Pages

#### 4.1 进入仓库设置

1. 在 GitHub 仓库页面，点击 `Settings`
2. 在左侧菜单找到 `Pages`

#### 4.2 配置 GitHub Pages

**Source 设置：**

- Build and deployment
  - Source: **Deploy from a branch**
  - Branch: **main**
  - Folder: **/ (root)**

点击 `Save`。

#### 4.3 等待部署完成

GitHub Pages 会自动构建和部署，通常需要 **2-5 分钟**。

刷新页面后，会看到：

```
✅ Your site is live at https://[你的用户名].github.io/hardware_knowledge_base/
```

#### 4.4 访问网站

点击链接或直接在浏览器访问：

```
https://[你的用户名].github.io/hardware_knowledge_base/
```

---

## 自定义域名

如果您拥有自己的域名，可以配置自定义域名。

### 步骤 1：在 DNS 提供商配置

添加以下 DNS 记录：

#### CNAME 记录（推荐）

| 类型 | 主机名 | 值 |
|------|--------|-----|
| CNAME | www | [你的用户名].github.io |

#### A 记录（备选）

| 类型 | 主机名 | 值 |
|------|--------|-----|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

### 步骤 2：在 GitHub Pages 设置

1. 进入仓库 `Settings` → `Pages`
2. 在 `Custom domain` 输入框填入域名
3. 点击 `Save`
4. 勾选 `Enforce HTTPS`（等待 SSL 证书颁发）

### 步骤 3：等待生效

DNS 传播通常需要 **24-48 小时**。

---

## 故障排除

### 问题 1：404 错误

**症状**：访问网站显示 404 Not Found

**解决方案**：

1. 检查 `index.html` 是否在根目录
2. 确认 GitHub Pages 已启用
3. 检查 Branch 设置是否正确（main 分支，root 文件夹）
4. 清除浏览器缓存后重试

### 问题 2：样式丢失

**症状**：页面显示但没有样式

**解决方案**：

1. 确认 `.nojekyll` 文件存在
2. 检查 CSS 文件路径是否正确
3. 使用相对路径而不是绝对路径：
   ```html
   <!-- 正确 -->
   <link rel="stylesheet" href="styles.css">

   <!-- 错误 -->
   <link rel="stylesheet" href="/styles.css">
   ```

### 问题 3：推送失败

**症状**：`git push` 报错

**常见原因和解决方案**：

#### 认证失败

```bash
# 使用 Personal Access Token
# 1. GitHub → Settings → Developer settings → Personal access tokens
# 2. Generate new token (classic)
# 3. 勾选 repo 权限
# 4. 使用 token 作为密码
```

#### 仓库已存在

```bash
# 先拉取远程代码
git pull origin main --allow-unrelated-histories

# 然后推送
git push origin main
```

### 问题 4：部署很慢

**症状**：等待超过 10 分钟

**解决方案**：

1. 检查 GitHub Status：[githubstatus.com](https://www.githubstatus.com/)
2. 查看 Actions 标签页，确认构建状态
3. 如果失败，检查错误日志

### 问题 5：资源加载失败

**症状**：CDN 资源（Font Awesome, MathJax）加载失败

**解决方案**：

检查 HTML 中的 CDN 链接是否使用 HTTPS：

```html
<!-- 正确 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- 错误 -->
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

---

## 性能优化

### 1. 启用 CDN 加速

GitHub Pages 默认使用 Fastly CDN，全球加速。

### 2. 压缩图片

如果添加了图片资源，使用工具压缩：

- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

### 3. 缓存策略

GitHub Pages 自动设置缓存头，无需手动配置。

### 4. 减少文件大小

```bash
# 压缩 HTML
# 使用在线工具：https://www.willpeavy.com/tools/minifier/

# 压缩 CSS
# 使用在线工具：https://cssminifier.com/

# 压缩 JS
# 使用在线工具：https://javascript-minifier.com/
```

### 5. 启用 HTTPS

在 GitHub Pages 设置中勾选 `Enforce HTTPS`。

---

## 更新内容

### 更新已部署的网站

#### 方法 1：通过 Git（推荐）

```bash
# 1. 修改文件
# 编辑你的代码...

# 2. 查看更改
git status
git diff

# 3. 添加更改
git add .

# 4. 提交
git commit -m "feat: Add new features

- 描述你的更改...
"

# 5. 推送
git push origin main

# 6. 等待自动部署（2-3分钟）
```

#### 方法 2：通过 GitHub Web 界面

1. 进入仓库
2. 找到要编辑的文件
3. 点击 `Edit` （铅笔图标）
4. 修改内容
5. 填写 commit 信息
6. 点击 `Commit changes`

### 查看部署状态

1. 进入仓库 `Actions` 标签页
2. 查看最新的 workflow run
3. 绿色勾号 = 部署成功
4. 红色叉号 = 部署失败（点击查看日志）

---

## 高级配置

### 1. 自定义 404 页面

创建 `404.html` 文件：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - 页面未找到</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        h1 { font-size: 72px; margin: 0; color: #673ab7; }
        p { font-size: 24px; color: #666; }
        a { color: #673ab7; text-decoration: none; }
    </style>
</head>
<body>
    <h1>404</h1>
    <p>抱歉，页面未找到</p>
    <a href="/">返回首页</a>
</body>
</html>
```

### 2. 添加 Google Analytics

在 `index.html` 的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. 添加搜索引擎验证

#### Google Search Console

在 `<head>` 添加：

```html
<meta name="google-site-verification" content="your-verification-code" />
```

#### Bing Webmaster Tools

在 `<head>` 添加：

```html
<meta name="msvalidate.01" content="your-verification-code" />
```

---

## 监控和维护

### 1. 监控访问统计

使用 Google Analytics 或其他工具：

- 访问量（PV/UV）
- 用户来源
- 页面停留时间
- 跳出率

### 2. SEO 检查

定期使用工具检查：

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

### 3. 性能测试

使用以下工具测试性能：

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 4. 可访问性检查

- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 备份策略

### 自动备份（通过 Git）

Git 本身就是备份系统，每次 commit 都是一个备份点。

查看历史版本：

```bash
# 查看提交历史
git log --oneline

# 恢复到某个版本
git checkout <commit-hash>

# 创建新分支保存当前状态
git checkout -b backup-2026-01-30
```

### 导出代码

定期导出代码到本地：

```bash
# 克隆整个仓库
git clone https://github.com/[你的用户名]/hardware_knowledge_base.git

# 或下载 ZIP
# GitHub仓库页面 → Code → Download ZIP
```

---

## 安全建议

### 1. 不要提交敏感信息

- ❌ API 密钥
- ❌ 数据库密码
- ❌ 个人信息

### 2. 使用 .gitignore

创建 `.gitignore` 文件：

```gitignore
# 环境变量
.env
.env.local

# 临时文件
*.tmp
*.temp

# 系统文件
.DS_Store
Thumbs.db

# 编辑器
.vscode/
.idea/
```

### 3. 定期更新依赖

检查并更新 CDN 链接到最新版本。

---

## 常用命令速查

```bash
# 查看状态
git status

# 查看差异
git diff

# 添加文件
git add <file>
git add .

# 提交
git commit -m "message"

# 推送
git push origin main

# 拉取
git pull origin main

# 查看日志
git log --oneline

# 创建分支
git checkout -b <branch-name>

# 切换分支
git checkout <branch-name>

# 合并分支
git merge <branch-name>

# 删除分支
git branch -d <branch-name>

# 撤销更改
git checkout -- <file>

# 撤销暂存
git reset HEAD <file>

# 查看远程仓库
git remote -v
```

---

## 获取帮助

### 官方文档

- [GitHub Pages 文档](https://docs.github.com/pages)
- [Git 文档](https://git-scm.com/doc)

### 社区支持

- [GitHub Community](https://github.community/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/github-pages)

### 本项目支持

- [GitHub Issues](https://github.com/27834853-ctrl/hardware_knowledge_base/issues)
- [Discussions](https://github.com/27834853-ctrl/hardware_knowledge_base/discussions)

---

## 总结

部署到 GitHub Pages 的核心步骤：

1. ✅ 创建 GitHub 仓库
2. ✅ 推送代码
3. ✅ 启用 GitHub Pages
4. ✅ 等待部署完成
5. ✅ 访问网站

**预计时间**：首次部署 15-30 分钟，后续更新 2-5 分钟

**完成后访问**：`https://[你的用户名].github.io/hardware_knowledge_base/`

---

© 2026 硬件工程师知识库 | [GitHub 仓库](https://github.com/27834853-ctrl/hardware_knowledge_base)
