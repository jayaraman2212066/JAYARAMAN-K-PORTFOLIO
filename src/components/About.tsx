
import React from 'react';
import { Code, GraduationCap, Briefcase, Award, Target, Users, Lightbulb, Download } from 'lucide-react';

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
    <section className="py-20 px-6 max-w-6xl mx-auto bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
          Professional Summary
        </h2>
        <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
        
        {/* Resume Download Button */}
        <div className="mb-8">
          <button className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <Download className="w-5 h-5" />
            Download Resume
          </button>
        </div>
        
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Results-driven Information Technology professional with expertise in Machine Learning, 
          Full-Stack Development, and Engineering Operations. Proven track record of delivering 
          innovative solutions and leading cross-functional teams to achieve project objectives.
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {achievements.map((achievement, index) => (
          <div 
            key={index}
            className="text-center group hover:scale-105 transition-transform duration-300 bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-teal-200 transition-all duration-300">
              <achievement.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">{achievement.label}</h3>
            <p className="text-slate-600">{achievement.desc}</p>
          </div>
        ))}
      </div>

      {/* Core Competencies */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-slate-800 text-center mb-8">Core Competencies</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <strength.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{strength.title}</h4>
              <p className="text-slate-600 leading-relaxed">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Philosophy */}
      <div className="bg-gradient-to-r from-teal-50 to-orange-50 rounded-xl p-8 border border-teal-200">
        <h3 className="text-2xl font-bold text-slate-800 text-center mb-6">Professional Philosophy</h3>
        <p className="text-slate-700 text-center leading-relaxed max-w-4xl mx-auto">
          "I believe in leveraging technology to drive meaningful business outcomes. My approach combines 
          technical expertise with practical engineering experience, enabling me to deliver solutions that 
          not only meet technical requirements but also create tangible value for organizations. I am 
          committed to continuous learning and staying current with industry best practices."
        </p>
      </div>
    </section>
  );
};

export default About;
