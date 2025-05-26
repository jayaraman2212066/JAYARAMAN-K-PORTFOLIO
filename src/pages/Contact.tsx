
import React from 'react';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'jayaraman2212066@ssn.edu.in',
      link: 'mailto:jayaraman2212066@ssn.edu.in'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91-6369804386',
      link: 'tel:+916369804386'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chennai, India',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/jayaramankalidhasan',
      color: 'hover:text-teal-600'
    },
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/jayaraman2212066',
      color: 'hover:text-slate-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 animate-fade-in">
              Let's Connect
            </h1>
            <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, exciting projects, or collaborating on innovative solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm font-medium">{info.label}</p>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-slate-800 hover:text-teal-600 transition-colors duration-300 font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-slate-800 font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Professional Profiles</h2>
                <div className="flex space-x-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-slate-600 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-md`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gradient-to-r from-teal-50 to-orange-50 rounded-xl p-8 border border-teal-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Availability</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Current Status</p>
                    <p className="text-slate-800 font-semibold">Open to opportunities</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Response Time</p>
                    <p className="text-slate-800 font-semibold">Within 24 hours</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Preferred Contact</p>
                    <p className="text-slate-800 font-semibold">Email or LinkedIn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
