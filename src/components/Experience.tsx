
import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: "Hi Trans Service Pvt. Ltd.",
      position: "Project Junior Engineer",
      duration: "Jun 2022 - Dec 2022",
      location: "Chennai, India",
      responsibilities: [
        "Supervised HVAC installation and maintenance work for Tata Electronics project",
        "Coordinated with cross-functional teams to ensure project deadlines",
        "Managed daily work targets and quality assurance protocols",
        "Maintained detailed project documentation and progress reports"
      ]
    },
    {
      company: "Sunmar Chemplast Pvt. Ltd.",
      position: "Junior Engineer",
      duration: "Jan 2023 - Jul 2023",
      location: "Chennai, India",
      responsibilities: [
        "Handled chemical plant operations and equipment maintenance",
        "Performed pump maintenance and troubleshooting procedures",
        "Prepared comprehensive daily operational reports",
        "Ensured compliance with safety protocols and quality standards"
      ]
    }
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Professional Experience
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Over 1 year of hands-on experience in engineering operations, project management, 
          and technical leadership roles.
        </p>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{exp.position}</h3>
                <h4 className="text-xl text-blue-400 mb-4">{exp.company}</h4>
              </div>
              
              <div className="flex flex-col lg:items-end gap-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-lg font-semibold text-gray-200 mb-3">Key Responsibilities:</h5>
              <ul className="space-y-2">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
