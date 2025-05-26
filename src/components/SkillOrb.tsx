
import React, { useState } from 'react';

interface SkillOrbProps {
  skill: {
    name: string;
    icon: string;
    level: number;
  };
  index: number;
}

const SkillOrb = ({ skill, index }: SkillOrbProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`text-center group cursor-pointer animate-fade-in`}
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative w-20 h-20 mx-auto mb-3 transition-transform duration-300 ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}>
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
          <span className="text-2xl">{skill.icon}</span>
        </div>
        <div className={`absolute inset-0 rounded-full border-4 border-blue-400/30 transition-all duration-500 ${
          isHovered ? 'scale-125 border-blue-400/60' : ''
        }`}></div>
      </div>
      <h3 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors duration-300">
        {skill.name}
      </h3>
      <div className="text-sm text-gray-400">
        {skill.level}%
      </div>
    </div>
  );
};

export default SkillOrb;
