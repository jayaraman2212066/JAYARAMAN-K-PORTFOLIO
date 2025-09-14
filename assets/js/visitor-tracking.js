// Function to get browser and device information
function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  const browserInfo = {
    userAgent: userAgent,
    browser: navigator.appName,
    version: navigator.appVersion,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    colorDepth: window.screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  return browserInfo;
}

// Function to get visitor's location using IP geolocation
async function getVisitorLocation() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      city: data.city,
      region: data.region,
      country: data.country_name,
      ip: data.ip
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return {
      ip: 'Unknown',
      location: 'Location data unavailable'
    };
  }
}

// Function to track visitor
async function trackVisitor() {
  try {
    const browserInfo = getBrowserInfo();
    const locationInfo = await getVisitorLocation();
    
    const visitorData = {
      timestamp: new Date().toISOString(),
      browser: browserInfo.browser,
      device: browserInfo.platform,
      ip: locationInfo.ip,
      location: `${locationInfo.city}, ${locationInfo.region}, ${locationInfo.country}`,
      screenResolution: browserInfo.screenResolution,
      timezone: browserInfo.timezone,
      userAgent: browserInfo.userAgent,
      language: browserInfo.language,
      referrer: document.referrer || 'Direct Visit',
      pageUrl: window.location.href,
      sessionId: generateSessionId()
    };

    // Send data using FormSubmit.co with enhanced formatting
    const emailContent = `
🔔 NEW PORTFOLIO VISITOR ALERT 🔔
=====================================

📅 VISIT TIME: ${new Date(visitorData.timestamp).toLocaleString()}
🌐 PAGE URL: ${visitorData.pageUrl}
🔗 REFERRER: ${visitorData.referrer}

📍 LOCATION DETAILS:
   • IP Address: ${visitorData.ip}
   • City: ${locationInfo.city || 'Unknown'}
   • Region: ${locationInfo.region || 'Unknown'}
   • Country: ${locationInfo.country || 'Unknown'}

💻 DEVICE & BROWSER INFO:
   • Browser: ${visitorData.browser}
   • Platform: ${visitorData.device}
   • Screen Resolution: ${visitorData.screenResolution}
   • Language: ${visitorData.language}
   • Timezone: ${visitorData.timezone}
   • User Agent: ${visitorData.userAgent}

🆔 SESSION ID: ${visitorData.sessionId}

=====================================
This is an automated notification from your portfolio website.
    `;

    const response = await fetch('https://formsubmit.co/jayaraman2212066@ssn.edu.in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: 'Portfolio Visitor Alert System',
        email: 'jayaraman2212066@ssn.edu.in',
        subject: `🔔 New Portfolio Visitor - ${locationInfo.country || 'Unknown Location'}`,
        message: emailContent,
        _template: 'table',
        _autoresponse: 'Visitor notification sent successfully',
        _captcha: 'false',
        _next: window.location.href
      })
    });

    if (!response.ok) {
      throw new Error('Failed to track visitor');
    }

    console.log('Visitor tracked successfully:', visitorData);

    // Also send to server endpoint as backup
    try {
      await fetch('/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timestamp: visitorData.timestamp,
          userAgent: visitorData.userAgent,
          pageURL: visitorData.pageUrl,
          language: visitorData.language,
          screenSize: visitorData.screenResolution,
          referrer: visitorData.referrer,
          cookies: navigator.cookieEnabled,
          timezone: visitorData.timezone,
          platform: visitorData.device,
          doNotTrack: navigator.doNotTrack
        })
      });
    } catch (serverError) {
      console.log('Server tracking failed, but FormSubmit worked:', serverError);
    }

    // Update visitor count in the UI
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
      const currentCount = parseInt(visitorCountElement.textContent) || 0;
      visitorCountElement.textContent = currentCount + 1;
    }

    // Store visitor data in localStorage to prevent duplicate tracking
    const visitorKey = `visitor_${visitorData.sessionId}`;
    localStorage.setItem(visitorKey, JSON.stringify(visitorData));
    
  } catch (error) {
    console.error('Error tracking visitor:', error);
    // Fallback: try to send basic visitor info
    try {
      await fetch('https://formsubmit.co/jayaraman2212066@ssn.edu.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: 'Portfolio Visitor Alert (Fallback)',
          email: 'jayaraman2212066@ssn.edu.in',
          subject: 'New Portfolio Visitor - Basic Info',
          message: `New visitor at ${new Date().toLocaleString()} from ${window.location.href}`,
          _template: 'table',
          _autoresponse: 'Visitor notification sent successfully'
        })
      });
    } catch (fallbackError) {
      console.error('Fallback tracking also failed:', fallbackError);
    }
  }
}

// Generate unique session ID
function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Check if visitor has already been tracked in this session
function hasBeenTracked() {
  const sessionKey = 'portfolio_visitor_tracked';
  return sessionStorage.getItem(sessionKey) === 'true';
}

// Mark visitor as tracked for this session
function markAsTracked() {
  const sessionKey = 'portfolio_visitor_tracked';
  sessionStorage.setItem(sessionKey, 'true');
}

// Track visitor when page loads (only once per session)
document.addEventListener('DOMContentLoaded', function() {
  if (!hasBeenTracked()) {
    trackVisitor();
    markAsTracked();
  }
});

// Track page views and time spent
let pageStartTime = Date.now();
let isPageVisible = true;

// Track when user leaves the page
window.addEventListener('beforeunload', function() {
  const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
  if (timeSpent > 5) { // Only track if user spent more than 5 seconds
    sendPageExitData(timeSpent);
  }
});

// Track page visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    isPageVisible = false;
  } else {
    isPageVisible = true;
    pageStartTime = Date.now();
  }
});

// Send page exit data
async function sendPageExitData(timeSpent) {
  try {
    await fetch('https://formsubmit.co/jayaraman2212066@ssn.edu.in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: 'Portfolio Page Exit Alert',
        email: 'jayaraman2212066@ssn.edu.in',
        subject: 'Portfolio Visitor Page Exit',
        message: `
📊 PAGE EXIT DATA
================
⏱️ Time Spent: ${timeSpent} seconds
🌐 Page: ${window.location.href}
📅 Exit Time: ${new Date().toLocaleString()}
        `,
        _template: 'table',
        _autoresponse: 'Page exit data recorded'
      })
    });
  } catch (error) {
    console.error('Error sending page exit data:', error);
  }
} 