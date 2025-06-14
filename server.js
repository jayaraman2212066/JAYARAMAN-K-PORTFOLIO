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

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '/')));

// Visitor logging endpoint
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