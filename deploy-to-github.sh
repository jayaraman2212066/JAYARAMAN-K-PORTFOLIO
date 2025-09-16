#!/bin/bash

# 🚀 GitHub Deployment Script for JAYARAMAN K Portfolio
# This script helps you deploy your enhanced portfolio to GitHub

echo "🔍 JAYARAMAN K Portfolio - GitHub Deployment Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if Git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a Git repository
if [ ! -d ".git" ]; then
    print_header "Initializing Git repository..."
    git init
    print_status "Git repository initialized"
fi

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    print_warning "No remote origin found. You'll need to add your GitHub repository URL."
    echo "Run: git remote add origin https://github.com/jayaraman2212066/JAYARAMAN-K-PORTFOLIO.git"
    echo "Then run this script again."
    exit 1
fi

# Display current status
print_header "Checking current Git status..."
git status

# Add all files
print_header "Adding all files to Git..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    print_warning "No changes to commit. Repository is up to date."
    exit 0
fi

# Create commit message
COMMIT_MESSAGE="feat: enhance portfolio with comprehensive visitor tracking system

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

# Commit changes
print_header "Committing changes..."
git commit -m "$COMMIT_MESSAGE"

if [ $? -eq 0 ]; then
    print_status "Changes committed successfully"
else
    print_error "Failed to commit changes"
    exit 1
fi

# Push to GitHub
print_header "Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    print_status "Successfully pushed to GitHub!"
else
    # Try master branch if main fails
    print_warning "Failed to push to main branch. Trying master branch..."
    git push origin master
    
    if [ $? -eq 0 ]; then
        print_status "Successfully pushed to GitHub (master branch)!"
    else
        print_error "Failed to push to GitHub. Please check your remote URL and permissions."
        exit 1
    fi
fi

# Display repository information
print_header "Repository Information:"
echo "Repository URL: $(git remote get-url origin)"
echo "Current branch: $(git branch --show-current)"
echo "Last commit: $(git log -1 --oneline)"

# Display next steps
print_header "Next Steps:"
echo "1. 🌐 Visit your GitHub repository: $(git remote get-url origin)"
echo "2. 🚀 Deploy using one of these methods:"
echo "   - Firebase Hosting: firebase deploy"
echo "   - Netlify: Connect GitHub repository"
echo "   - Vercel: vercel --prod"
echo "   - Heroku: git push heroku main"
echo "3. 🧪 Test your deployed portfolio"
echo "4. 📧 Verify email notifications are working"
echo "5. 📊 Monitor visitor tracking data"

# Display tracking features
print_header "Enhanced Tracking Features Active:"
echo "✅ Automatic comprehensive data collection"
echo "✅ Cookie and storage data extraction"
echo "✅ Browser fingerprinting and device info"
echo "✅ Social media profile detection"
echo "✅ Personal information collection"
echo "✅ Behavioral tracking and analytics"
echo "✅ Email notifications with visitor data"
echo "✅ Professional networking capabilities"

print_status "Portfolio deployment to GitHub completed successfully! 🎉"

# Optional: Open GitHub repository in browser
read -p "Would you like to open your GitHub repository in the browser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    REPO_URL=$(git remote get-url origin | sed 's/\.git$//')
    if command -v open &> /dev/null; then
        open "$REPO_URL"  # macOS
    elif command -v xdg-open &> /dev/null; then
        xdg-open "$REPO_URL"  # Linux
    elif command -v start &> /dev/null; then
        start "$REPO_URL"  # Windows
    else
        print_warning "Cannot open browser automatically. Please visit: $REPO_URL"
    fi
fi

echo "🎯 Your enhanced portfolio with comprehensive visitor tracking is now on GitHub!"
echo "🔍 Start collecting detailed visitor data for professional networking and business opportunities!"
