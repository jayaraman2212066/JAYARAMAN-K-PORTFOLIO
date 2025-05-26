
import React from 'react';
import { Code, GraduationCap, Briefcase, Award } from 'lucide-react';

const About = () => {
  const achievements = [
    { icon: Code, label: '5+ Projects', desc: 'Completed' },
    { icon: GraduationCap, label: 'B.Tech IT', desc: 'CGPA: 7.5' },
    { icon: Briefcase, label: '1+ Year', desc: 'Experience' },
    { icon: Award, label: 'Scout Captain', desc: '2017' },
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About Me
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          I'm a passionate Information Technology graduate from SSN College of Engineering with expertise in 
          Machine Learning, Deep Learning, and Full-Stack Development. I love creating innovative solutions 
          that solve real-world problems using cutting-edge technologies.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {achievements.map((achievement, index) => (
          <div 
            key={index}
            className="text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <achievement.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{achievement.label}</h3>
            <p className="text-gray-400">{achievement.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-blue-400">SSN College of Engineering</h4>
              <p className="text-gray-300">B.Tech in Information Technology</p>
              <p className="text-gray-400">CGPA: 7.5 | Sep 2021 - May 2026</p>
              <p className="text-sm text-gray-500">Chennai, India</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-400">Valivalm Desikar Polytechnic College</h4>
              <p className="text-gray-300">Diploma in Engineering</p>
              <p className="text-gray-400">96/100 | Jun 2019 - May 2022</p>
              <p className="text-sm text-gray-500">Nagapattinam, India</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Work Experience</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-blue-400">Hi Trans Service Pvt. Ltd.</h4>
              <p className="text-gray-300">Project Junior Engineer</p>
              <p className="text-gray-400">Jun 2022 - Dec 2022</p>
              <p className="text-sm text-gray-300 mt-2">
                Supervised HVAC work for Tata Electronics, handled communication and daily targets.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-400">Sunmar Chemplast Pvt. Ltd.</h4>
              <p className="text-gray-300">Junior Engineer</p>
              <p className="text-gray-400">Jan 2023 - Jul 2023</p>
              <p className="text-sm text-gray-300 mt-2">
                Handled chemical plant operations, pump maintenance, and daily reporting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
