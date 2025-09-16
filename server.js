const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '/')));

// Enhanced visitor logging endpoint
app.post('/log', async (req, res) => {
  try {
    const { 
      timestamp, 
      userAgent, 
      pageURL, 
      language, 
      screenSize, 
      referrer,
      cookies,
      timezone,
      platform,
      doNotTrack
    } = req.body;

    // Format email content
    const emailContent = `
🔔 New Visitor on Portfolio
----------------------------
📅 Time: ${timestamp}
🌐 URL: ${pageURL}
🔗 Referrer: ${referrer}
🌍 Language: ${language}
📱 Screen Size: ${screenSize}
🖥️ User Agent: ${userAgent}
🍪 Cookies: ${cookies}
⏰ Timezone: ${timezone}
💻 Platform: ${platform}
🚫 Do Not Track: ${doNotTrack}
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jayaraman2212066@ssn.edu.in',
      subject: '📬 New Portfolio Visitor',
      text: emailContent
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    // Log success
    console.log('Visitor data emailed successfully');
    res.status(200).json({ message: 'Visitor data logged successfully' });
  } catch (error) {
    console.error('Error processing visitor data:', error);
    res.status(500).json({ error: 'Failed to process visitor data' });
  }
});

// Comprehensive visitor data endpoint
app.post('/log-comprehensive', async (req, res) => {
  try {
    const comprehensiveData = req.body;

    // Store comprehensive data in a structured format
    const processedData = {
      timestamp: new Date().toISOString(),
      sessionId: comprehensiveData.sessionId,
      visitorType: 'comprehensive',
      data: comprehensiveData
    };

    // Log to console for debugging
    console.log('📊 Comprehensive visitor data received:', {
      sessionId: processedData.sessionId,
      timestamp: processedData.timestamp,
      cookieCount: Object.keys(comprehensiveData.cookies || {}).length,
      hasPersonalInfo: !!comprehensiveData.personalInfo,
      browserFingerprint: comprehensiveData.fingerprint
    });

    // Send confirmation email with summary
    const summaryEmail = `
🔍 COMPREHENSIVE VISITOR DATA RECEIVED
=====================================

📅 Timestamp: ${new Date().toISOString()}
🆔 Session ID: ${processedData.sessionId}
🌐 Page URL: ${comprehensiveData.pageUrl}

📊 DATA SUMMARY:
• Cookies Collected: ${Object.keys(comprehensiveData.cookies || {}).length}
• LocalStorage Items: ${Object.keys(comprehensiveData.localStorage || {}).length}
• SessionStorage Items: ${Object.keys(comprehensiveData.sessionStorage || {}).length}
• Browser Fingerprint: ${comprehensiveData.fingerprint || 'Unknown'}

👤 PERSONAL INFO:
• Name: ${comprehensiveData.personalInfo?.name || 'Not provided'}
• Email: ${comprehensiveData.personalInfo?.email || 'Not provided'}
• Phone: ${comprehensiveData.personalInfo?.phone || 'Not provided'}

🌍 LOCATION:
• IP: ${comprehensiveData.locationInfo?.ipLocation?.ip || 'Unknown'}
• Country: ${comprehensiveData.locationInfo?.ipLocation?.country_name || 'Unknown'}
• City: ${comprehensiveData.locationInfo?.ipLocation?.city || 'Unknown'}

💻 BROWSER:
• User Agent: ${comprehensiveData.browserInfo?.userAgent?.substring(0, 100) || 'Unknown'}
• Platform: ${comprehensiveData.browserInfo?.platform || 'Unknown'}
• Language: ${comprehensiveData.browserInfo?.language || 'Unknown'}

🎯 SOCIAL PROFILES DETECTED: ${Object.keys(comprehensiveData.socialProfiles || {}).length}

=====================================
🔍 COMPREHENSIVE DATA STORED SUCCESSFULLY
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jayaraman2212066@ssn.edu.in',
      subject: `🔍 Comprehensive Data - Session ${processedData.sessionId.substring(0, 10)}`,
      text: summaryEmail
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      message: 'Comprehensive visitor data logged successfully',
      sessionId: processedData.sessionId,
      dataReceived: true
    });
  } catch (error) {
    console.error('Error processing comprehensive visitor data:', error);
    res.status(500).json({ error: 'Failed to process comprehensive visitor data' });
  }
});

// Enhanced form submission endpoint
app.post('/log-form', async (req, res) => {
  try {
    const formData = req.body;

    // Process form submission data
    const processedFormData = {
      timestamp: new Date().toISOString(),
      formType: formData.formType,
      sessionId: formData.sessionId,
      data: formData
    };

    console.log('📝 Form submission received:', {
      formType: processedFormData.formType,
      sessionId: processedFormData.sessionId,
      timestamp: processedFormData.timestamp,
      hasPersonalInfo: !!formData.personalInfo
    });

    // Send form submission notification
    const formEmail = `
📝 FORM SUBMISSION RECEIVED
===========================

📅 Timestamp: ${new Date().toISOString()}
📋 Form Type: ${formData.formType}
🆔 Session ID: ${formData.sessionId}

👤 PERSONAL INFO PROVIDED:
${formData.personalInfo ? Object.entries(formData.personalInfo).map(([key, value]) => 
    `• ${key}: ${value}`
).join('\n') : 'No personal information provided'}

📊 INTERACTION DATA:
• Time to Complete: ${formData.interactionData?.timeToComplete || 0}ms
• Device Type: ${formData.interactionData?.deviceType || 'Unknown'}
• Field Interactions: ${formData.interactionData?.fieldInteractions?.length || 0}

🎯 SOCIAL MEDIA DETECTED: ${Object.keys(formData.socialMediaProfiles || {}).length} platforms

===========================
📝 FORM DATA STORED SUCCESSFULLY
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jayaraman2212066@ssn.edu.in',
      subject: `📝 Form Submission - ${formData.formType.toUpperCase()}`,
      text: formEmail
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      message: 'Form submission data logged successfully',
      formType: processedFormData.formType,
      sessionId: processedFormData.sessionId
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ error: 'Failed to process form submission' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 