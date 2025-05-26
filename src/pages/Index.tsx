
import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Navigation from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Education />
      </main>
    </div>
  );
};

export default Index;
