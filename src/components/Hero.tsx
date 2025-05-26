
import React, { useEffect, useState } from 'react';
import { ChevronDown, Download, Mail, Phone, MapPin } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownloadResume = () => {
    // Create a mock resume download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Jayaraman_K_Resume.pdf';
    link.click();
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      {/* Animated gradient blurs */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #3b82f6 0%, transparent 50%)`
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left side - Professional Info */}
        <div className="text-left animate-fade-in">
          <div className="mb-6">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Jayaraman K
            </h1>
            <p className="text-2xl text-gray-300 mb-2">
              Information Technology Engineer
            </p>
            <p className="text-lg text-blue-400 mb-6">
              Machine Learning Enthusiast | Full-Stack Developer
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>jayaraman2212066@ssn.edu.in</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>+91-6369804386</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Chennai, India</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleDownloadResume}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </button>
            <button 
              onClick={() => window.open('/projects', '_self')}
              className="px-8 py-4 border border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              View Portfolio
            </button>
          </div>
        </div>

        {/* Right side - Professional Summary */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-fade-in delay-300">
          <h3 className="text-2xl font-bold text-white mb-6">Professional Summary</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Motivated Information Technology graduate with hands-on experience in Machine Learning, 
            Deep Learning, and Full-Stack Development. Proven track record in project management 
            and engineering operations with 1+ years of professional experience.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-600/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">5+</div>
              <div className="text-gray-300 text-sm">Projects</div>
            </div>
            <div className="text-center p-4 bg-purple-600/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">7.5</div>
              <div className="text-gray-300 text-sm">CGPA</div>
            </div>
            <div className="text-center p-4 bg-green-600/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">1+</div>
              <div className="text-gray-300 text-sm">Year Exp</div>
            </div>
            <div className="text-center p-4 bg-cyan-600/20 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">ML</div>
              <div className="text-gray-300 text-sm">Specialist</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
