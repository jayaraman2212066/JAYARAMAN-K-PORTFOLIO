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
      timezone: browserInfo.timezone
    };

    // Send data using FormSubmit.co
    const response = await fetch('https://formsubmit.co/jayaraman2212066@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: 'Portfolio Visitor Alert',
        email: 'jayaraman2212066@gmail.com',
        subject: 'New Portfolio Visitor Alert',
        message: `
New Visitor Details:
- Time: ${new Date(visitorData.timestamp).toLocaleString()}
- IP: ${visitorData.ip}
- Location: ${visitorData.location}
- Browser: ${visitorData.browser}
- Device: ${visitorData.device}
- Screen Resolution: ${visitorData.screenResolution}
- Timezone: ${visitorData.timezone}
- Referrer: ${document.referrer || 'Direct Visit'}
- Page: ${window.location.href}
        `,
        _template: 'table',
        _autoresponse: 'Visitor notification sent successfully'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to track visitor');
    }

    // Update visitor count in the UI
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
      const currentCount = parseInt(visitorCountElement.textContent) || 0;
      visitorCountElement.textContent = currentCount + 1;
    }
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
}

// Track visitor when page loads
document.addEventListener('DOMContentLoaded', trackVisitor); 