
import React from 'react';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import SkillBar from '@/components/SkillBar';
import SkillOrb from '@/components/SkillOrb';

const Skills = () => {
  const technicalSkills = [
    { name: 'Python', level: 90, color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-yellow-600' },
    { name: 'HTML/CSS', level: 88, color: 'from-orange-400 to-red-500' },
    { name: 'Machine Learning', level: 85, color: 'from-green-400 to-green-600' },
    { name: 'Deep Learning', level: 82, color: 'from-purple-400 to-purple-600' },
    { name: 'Flutter/Dart', level: 75, color: 'from-cyan-400 to-blue-500' },
  ];

  const frameworkSkills = [
    { name: 'TensorFlow', icon: '🧠', level: 85 },
    { name: 'PyTorch', icon: '🔥', level: 80 },
    { name: 'OpenCV', icon: '👁️', level: 78 },
    { name: 'Flutter', icon: '📱', level: 75 },
    { name: 'Git/GitHub', icon: '🔧', level: 88 },
    { name: 'VS Code', icon: '💻', level: 90 },
  ];

  const toolsAndTech = [
    { name: 'YOLO', icon: '🎯', level: 82 },
    { name: 'LIDAR', icon: '📡', level: 75 },
    { name: 'AutoCAD', icon: '📐', level: 70 },
    { name: 'Linux', icon: '🐧', level: 78 },
    { name: 'Ubuntu', icon: '🟠', level: 80 },
    { name: 'Google Cloud', icon: '☁️', level: 72 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Skills & Expertise
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              My technical skills span across programming languages, ML frameworks, and development tools.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Programming Languages */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Programming Languages</h2>
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Frameworks & Tools */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Frameworks & Developer Tools</h2>
              <div className="grid grid-cols-2 gap-6">
                {frameworkSkills.map((skill, index) => (
                  <SkillOrb key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Technologies & Specializations */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Technologies & Platforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {toolsAndTech.map((skill, index) => (
                <SkillOrb key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Specializations</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Machine Learning</h3>
                <p className="text-gray-300 text-sm">Deep Learning, Computer Vision, Time-series Analysis</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎮</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Game Development</h3>
                <p className="text-gray-300 text-sm">Reinforcement Learning, AI Agents, Game Logic</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Engineering</h3>
                <p className="text-gray-300 text-sm">HVAC Systems, Chemical Plant Operations, Project Management</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;
