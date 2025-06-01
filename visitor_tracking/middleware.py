import requests
from django.core.mail import send_mail
from django.conf import settings
import threading
from datetime import datetime

class VisitorTrackingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only track visits to the homepage
        if request.path == '/':
            # Get visitor IP
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')

            # Get user agent
            user_agent = request.META.get('HTTP_USER_AGENT', '')

            # Get geolocation data
            try:
                response = requests.get(f'https://ipapi.co/{ip}/json/')
                data = response.json()
                city = data.get('city', 'Unknown')
                country = data.get('country_name', 'Unknown')
            except:
                city = 'Unknown'
                country = 'Unknown'

            # Send email notification asynchronously
            threading.Thread(
                target=self.send_visitor_notification,
                args=(ip, user_agent, city, country),
                daemon=True
            ).start()

        response = self.get_response(request)
        return response

    def send_visitor_notification(self, ip, user_agent, city, country):
        subject = 'New Portfolio Visitor Alert!'
        message = f"""
New visitor on your portfolio website!

Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
IP Address: {ip}
Location: {city}, {country}
Browser/OS: {user_agent}
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ADMIN_EMAIL],
            fail_silently=True
        ) 