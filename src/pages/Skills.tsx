
import React from 'react';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import SkillBar from '@/components/SkillBar';
import SkillOrb from '@/components/SkillOrb';

const Skills = () => {
  const technicalSkills = [
    { name: 'JavaScript', level: 95, color: 'from-yellow-400 to-yellow-600' },
    { name: 'React', level: 90, color: 'from-blue-400 to-blue-600' },
    { name: 'TypeScript', level: 85, color: 'from-blue-500 to-blue-700' },
    { name: 'Node.js', level: 88, color: 'from-green-400 to-green-600' },
    { name: 'Python', level: 82, color: 'from-blue-300 to-blue-500' },
    { name: 'SQL', level: 80, color: 'from-purple-400 to-purple-600' },
  ];

  const frameworkSkills = [
    { name: 'React', icon: '⚛️', level: 90 },
    { name: 'Vue.js', icon: '💚', level: 75 },
    { name: 'Express', icon: '🚀', level: 85 },
    { name: 'Django', icon: '🐍', level: 70 },
    { name: 'Next.js', icon: '▲', level: 80 },
    { name: 'MongoDB', icon: '🍃', level: 78 },
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
              A comprehensive overview of my technical skills and proficiency levels.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Technical Skills</h2>
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Framework Skills */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Frameworks & Tools</h2>
              <div className="grid grid-cols-2 gap-6">
                {frameworkSkills.map((skill, index) => (
                  <SkillOrb key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Additional Skills */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Additional Expertise</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">UI/UX Design</h3>
                <p className="text-gray-300 text-sm">Creating intuitive and beautiful user interfaces</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">☁️</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Cloud Services</h3>
                <p className="text-gray-300 text-sm">AWS, Google Cloud, and Azure deployment</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">DevOps</h3>
                <p className="text-gray-300 text-sm">CI/CD, Docker, and automation tools</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;
