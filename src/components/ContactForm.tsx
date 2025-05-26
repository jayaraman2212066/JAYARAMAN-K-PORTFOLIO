
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-4 animate-scale-in">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-slate-600">Thank you for reaching out. I'll get back to you soon!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-colors duration-300"
              placeholder="Your Name"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-colors duration-300"
              placeholder="Your Email"
            />
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-colors duration-300"
            placeholder="Subject"
          />
        </div>

        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-colors duration-300 resize-none"
            placeholder="Your Message"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
