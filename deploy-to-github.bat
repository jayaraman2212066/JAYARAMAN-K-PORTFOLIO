@echo off
REM 🚀 GitHub Deployment Script for JAYARAMAN K Portfolio
REM This script helps you deploy your enhanced portfolio to GitHub

echo 🔍 JAYARAMAN K Portfolio - GitHub Deployment Script
echo ==================================================

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed. Please install Git first.
    pause
    exit /b 1
)

REM Check if we're in a Git repository
if not exist ".git" (
    echo [STEP] Initializing Git repository...
    git init
    echo [INFO] Git repository initialized
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [WARNING] No remote origin found. You'll need to add your GitHub repository URL.
    echo Run: git remote add origin https://github.com/jayaraman2212066/JAYARAMAN-K-PORTFOLIO.git
    echo Then run this script again.
    pause
    exit /b 1
)

REM Display current status
echo [STEP] Checking current Git status...
git status

REM Add all files
echo [STEP] Adding all files to Git...
git add .

REM Check if there are changes to commit
git diff --cached --quiet
if errorlevel 1 (
    echo [STEP] Changes detected, proceeding with commit...
) else (
    echo [WARNING] No changes to commit. Repository is up to date.
    pause
    exit /b 0
)

REM Create commit message
echo [STEP] Committing changes...
git commit -m "feat: enhance portfolio with comprehensive visitor tracking system

- Add automatic comprehensive visitor tracking (no consent required)
- Implement cookie collection and browser fingerprinting
- Add social media profile detection (12+ platforms)
- Create personal information collection modal
- Enhance form submission tracking with behavioral analysis
- Add location tracking and device information collection
- Implement email notifications for all visitor data
- Create testing dashboard for tracking verification
- Add comprehensive documentation and deployment guides
- Optimize for maximum data collection and professional networking

Features:
✅ Automatic data collection on page load
✅ Complete cookie and storage data extraction
✅ Advanced browser fingerprinting
✅ Social media profile detection
✅ Personal information collection modal
✅ Behavioral tracking and analytics
✅ Email notifications with detailed visitor data
✅ Professional networking and lead generation capabilities"

if errorlevel 1 (
    echo [ERROR] Failed to commit changes
    pause
    exit /b 1
) else (
    echo [INFO] Changes committed successfully
)

REM Push to GitHub
echo [STEP] Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo [WARNING] Failed to push to main branch. Trying master branch...
    git push origin master
    if errorlevel 1 (
        echo [ERROR] Failed to push to GitHub. Please check your remote URL and permissions.
        pause
        exit /b 1
    ) else (
        echo [INFO] Successfully pushed to GitHub (master branch)!
    )
) else (
    echo [INFO] Successfully pushed to GitHub!
)

REM Display repository information
echo [STEP] Repository Information:
echo Repository URL: 
git remote get-url origin
echo Current branch: 
git branch --show-current
echo Last commit: 
git log -1 --oneline

REM Display next steps
echo [STEP] Next Steps:
echo 1. 🌐 Visit your GitHub repository
echo 2. 🚀 Deploy using one of these methods:
echo    - Firebase Hosting: firebase deploy
echo    - Netlify: Connect GitHub repository
echo    - Vercel: vercel --prod
echo    - Heroku: git push heroku main
echo 3. 🧪 Test your deployed portfolio
echo 4. 📧 Verify email notifications are working
echo 5. 📊 Monitor visitor tracking data

REM Display tracking features
echo [STEP] Enhanced Tracking Features Active:
echo ✅ Automatic comprehensive data collection
echo ✅ Cookie and storage data extraction
echo ✅ Browser fingerprinting and device info
echo ✅ Social media profile detection
echo ✅ Personal information collection
echo ✅ Behavioral tracking and analytics
echo ✅ Email notifications with visitor data
echo ✅ Professional networking capabilities

echo [INFO] Portfolio deployment to GitHub completed successfully! 🎉

REM Optional: Open GitHub repository in browser
set /p choice="Would you like to open your GitHub repository in the browser? (y/n): "
if /i "%choice%"=="y" (
    for /f "tokens=*" %%i in ('git remote get-url origin') do set REPO_URL=%%i
    set REPO_URL=%REPO_URL:.git=%
    start "" "%REPO_URL%"
)

echo 🎯 Your enhanced portfolio with comprehensive visitor tracking is now on GitHub!
echo 🔍 Start collecting detailed visitor data for professional networking and business opportunities!
pause
