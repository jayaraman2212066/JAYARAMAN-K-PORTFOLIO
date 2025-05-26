
import React from 'react';
import { GraduationCap, Calendar, Award, Book } from 'lucide-react';

const Education = () => {
  const education = [
    {
      institution: "SSN College of Engineering",
      degree: "Bachelor of Technology in Information Technology",
      duration: "Sep 2021 - May 2026",
      cgpa: "7.5 / 10.0",
      location: "Chennai, India",
      highlights: [
        "Specialized in Machine Learning and Data Science",
        "Completed projects in Computer Vision and Deep Learning",
        "Active participation in technical workshops and seminars"
      ]
    },
    {
      institution: "Valivalm Desikar Polytechnic College",
      degree: "Diploma in Engineering",
      duration: "Jun 2019 - May 2022",
      cgpa: "96 / 100",
      location: "Nagapattinam, India",
      highlights: [
        "Graduated with First Class with Distinction",
        "Strong foundation in engineering fundamentals",
        "Leadership role as Scout Captain in 2017"
      ]
    }
  ];

  const achievements = [
    {
      title: "Scout Captain",
      year: "2017",
      description: "Led and organized scout activities and community service programs"
    },
    {
      title: "Academic Excellence",
      year: "2022",
      description: "Achieved 96% in Diploma Engineering with First Class Distinction"
    }
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Education & Achievements
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Strong academic foundation with consistent performance and leadership experience.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Education */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-400" />
            Academic Background
          </h3>
          
          {education.map((edu, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="mb-4">
                <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                <h5 className="text-lg text-blue-400 mb-3">{edu.institution}</h5>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <Award className="w-4 h-4" />
                    <span>CGPA: {edu.cgpa}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2">
                {edu.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="w-8 h-8 text-purple-400" />
            Key Achievements
          </h3>
          
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-white">{achievement.title}</h4>
                <span className="text-purple-400 font-semibold">{achievement.year}</span>
              </div>
              <p className="text-gray-300">{achievement.description}</p>
            </div>
          ))}

          {/* Technical Skills Summary */}
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Book className="w-5 h-5 text-blue-400" />
              Core Competencies
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <div className="text-blue-400 font-semibold">Programming</div>
                <div className="text-sm text-gray-300">Python, JavaScript</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <div className="text-purple-400 font-semibold">ML/AI</div>
                <div className="text-sm text-gray-300">TensorFlow, PyTorch</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <div className="text-green-400 font-semibold">Web Dev</div>
                <div className="text-sm text-gray-300">React, Flutter</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <div className="text-cyan-400 font-semibold">Engineering</div>
                <div className="text-sm text-gray-300">HVAC, Operations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
