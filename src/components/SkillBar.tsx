
import React, { useEffect, useState } from 'react';

interface SkillBarProps {
  skill: {
    name: string;
    level: number;
    color: string;
  };
  index: number;
}

const SkillBar = ({ skill, index }: SkillBarProps) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(skill.level);
    }, index * 200 + 500);

    return () => clearTimeout(timer);
  }, [skill.level, index]);

  return (
    <div className={`animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-blue-400 text-sm">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out relative`}
          style={{ width: `${animatedLevel}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
