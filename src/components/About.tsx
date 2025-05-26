
import React from 'react';
import { Code, Palette, Zap, Trophy } from 'lucide-react';

const About = () => {
  const achievements = [
    { icon: Code, label: '50+ Projects', desc: 'Completed' },
    { icon: Palette, label: '5 Years', desc: 'Experience' },
    { icon: Zap, label: '99%', desc: 'Client Satisfaction' },
    { icon: Trophy, label: '10+', desc: 'Awards Won' },
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About Me
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          I'm a passionate full-stack developer with expertise in modern web technologies. 
          I love creating beautiful, functional applications that solve real-world problems 
          and deliver exceptional user experiences.
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

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
        <p className="text-gray-300 leading-relaxed mb-6">
          Started as a curious student who fell in love with coding. Over the years, 
          I've evolved into a versatile developer who thrives on challenges and 
          continuous learning. My passion lies in creating digital experiences 
          that not only look great but also perform exceptionally.
        </p>
        <p className="text-gray-300 leading-relaxed">
          When I'm not coding, you'll find me exploring new technologies, 
          contributing to open-source projects, or mentoring aspiring developers. 
          I believe in the power of technology to transform ideas into reality.
        </p>
      </div>
    </section>
  );
};

export default About;
