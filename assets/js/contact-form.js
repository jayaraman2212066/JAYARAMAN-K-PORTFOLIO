document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const loadingDiv = contactForm.querySelector('.loading');
    const errorMessageDiv = contactForm.querySelector('.error-message');
    const sentMessageDiv = contactForm.querySelector('.sent-message');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading
        loadingDiv.style.display = 'block';
        errorMessageDiv.style.display = 'none';
        sentMessageDiv.style.display = 'none';

        // Get form data
        const formData = {
            name: document.getElementById('name-field').value,
            email: document.getElementById('email-field').value,
            subject: document.getElementById('subject-field').value,
            message: document.getElementById('message-field').value
        };

        try {
            // Save to Firebase
            const success = await saveContactForm(formData);
            
            if (success) {
                // Show success message
                loadingDiv.style.display = 'none';
                sentMessageDiv.style.display = 'block';
                
                // Reset form
                contactForm.reset();
            } else {
                throw new Error('Failed to save message');
            }
        } catch (error) {
            // Show error message
            loadingDiv.style.display = 'none';
            errorMessageDiv.style.display = 'block';
            errorMessageDiv.textContent = 'An error occurred while sending your message. Please try again.';
            console.error('Error:', error);
        }
    });
}); 