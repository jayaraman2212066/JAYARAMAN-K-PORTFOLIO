
import React from 'react';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import ProjectCard from '@/components/ProjectCard';

const Projects = () => {
  const projects = [
    {
      title: "Bridge Game Mini Project",
      description: "A complete bridge card game implementation with multiplayer support, game state management, documentation, and binomial heap extraction algorithms.",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5",
      tags: ["Python", "JavaScript", "HTML", "CSS", "Game Development"],
      liveUrl: "#",
      githubUrl: "https://github.com/jayaraman2212066",
    },
    {
      title: "CO2 Emission Detection using ML",
      description: "Deep learning model for CO concentration classification using time-series sensor data with optimized architecture and cross-validation.",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
      tags: ["Python", "JavaScript", "HTML", "CSS", "Machine Learning", "Deep Learning"],
      liveUrl: "#",
      githubUrl: "https://github.com/jayaraman2212066",
    },
    {
      title: "LidarBased Road Anomaly Detection",
      description: "Real-time road surface anomaly detection system using YOLOv8 model with LIDAR sensor data for pothole and speed bump detection.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
      tags: ["Python", "JavaScript", "HTML", "CSS", "YOLO", "Computer Vision"],
      liveUrl: "#",
      githubUrl: "https://github.com/jayaraman2212066",
    },
    {
      title: "DQN-Snake Game (Reinforcement Learning)",
      description: "Modular Snake Game in Flutter with both manual and AI gameplay modes using Q-learning based Reinforcement Learning agent.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
      tags: ["Flutter", "Dart", "Reinforcement Learning", "Q-Learning", "Game AI"],
      liveUrl: "#",
      githubUrl: "https://github.com/jayaraman2212066",
    },
    {
      title: "Stealth Mode Watercraft",
      description: "Implementation of power transmission system for upgraded watercraft powered by liquid nitrogen with YBCO superconductor components.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
      tags: ["Engineering", "Power Systems", "Superconductors", "Marine Technology"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              My Projects
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A showcase of my work spanning Machine Learning, Game Development, Computer Vision, and Engineering projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
