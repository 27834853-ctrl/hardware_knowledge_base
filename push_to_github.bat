@echo off
chcp 65001 >nul
echo ========================================
echo Hardware Knowledge Base - GitHub Setup
echo ========================================
echo.

cd /d "D:\App_Collection\Microsoft VS Code\hardware_knowledge_base"

echo Step 1: Create GitHub Repository
echo ---------------------------------
echo Please create a new repository on GitHub:
echo.
echo 1. Visit: https://github.com/new
echo 2. Repository name: hardware_knowledge_base
echo 3. Description: Free and open hardware engineering knowledge base for beginners
echo 4. Public repository
echo 5. DO NOT initialize with README (we already have one)
echo 6. Click "Create repository"
echo.
pause

echo.
echo Step 2: Push to GitHub
echo ---------------------------------
echo.

REM Add remote
git remote add origin https://github.com/27834853-ctrl/hardware_knowledge_base.git

REM Rename branch to main
git branch -M main

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Success! Code pushed to GitHub
    echo ========================================
    echo.
    echo Your repository: https://github.com/27834853-ctrl/hardware_knowledge_base
    echo.
    echo Step 3: Deploy to Vercel (Optional)
    echo ---------------------------------
    echo 1. Visit: https://vercel.com/new
    echo 2. Login with GitHub
    echo 3. Import: hardware_knowledge_base
    echo 4. Framework: Other
    echo 5. Click Deploy
    echo.
    echo Step 4: Or Deploy to GitHub Pages
    echo ---------------------------------
    echo 1. Go to: https://github.com/27834853-ctrl/hardware_knowledge_base/settings/pages
    echo 2. Source: Deploy from a branch
    echo 3. Branch: main
    echo 4. Folder: / (root)
    echo 5. Click Save
    echo.
    echo Your site will be available at:
    echo https://27834853-ctrl.github.io/hardware_knowledge_base/
    echo.
) else (
    echo.
    echo ========================================
    echo Push failed!
    echo ========================================
    echo.
    echo Please check:
    echo 1. Did you create the GitHub repository?
    echo 2. Is the repository name correct?
    echo 3. Do you have permission to push?
    echo.
    echo You can manually add the remote:
    echo git remote add origin https://github.com/YOUR_USERNAME/hardware_knowledge_base.git
    echo git branch -M main
    echo git push -u origin main
    echo.
)

pause