
import React from 'react';
import { Code, GraduationCap, Briefcase, Award, Target, Users, Lightbulb } from 'lucide-react';

const About = () => {
  const achievements = [
    { icon: Code, label: '5+ Projects', desc: 'Completed' },
    { icon: GraduationCap, label: 'B.Tech IT', desc: 'CGPA: 7.5' },
    { icon: Briefcase, label: '1+ Year', desc: 'Experience' },
    { icon: Award, label: 'Scout Captain', desc: '2017' },
  ];

  const strengths = [
    {
      icon: Target,
      title: "Problem Solving",
      description: "Strong analytical skills with experience in developing ML solutions for real-world problems"
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Proven experience in project management and cross-functional team coordination"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Creative approach to technology with focus on cutting-edge ML and AI applications"
    }
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About Me
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A passionate and results-driven Information Technology professional with expertise in 
          Machine Learning, Full-Stack Development, and Engineering Operations. Committed to 
          leveraging technology to solve complex problems and drive innovation.
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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

      {/* Core Strengths */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-white text-center mb-8">Core Strengths</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <strength.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{strength.title}</h4>
              <p className="text-gray-300 leading-relaxed">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Philosophy */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
        <h3 className="text-2xl font-bold text-white text-center mb-6">Professional Philosophy</h3>
        <p className="text-gray-300 text-center leading-relaxed max-w-4xl mx-auto">
          "I believe in the power of technology to transform industries and improve lives. 
          My approach combines technical expertise with practical engineering experience, 
          enabling me to bridge the gap between innovative concepts and real-world implementations. 
          I'm passionate about continuous learning and staying at the forefront of technological advancement."
        </p>
      </div>
    </section>
  );
};

export default About;
