
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
        "Coordinated with cross-functional teams to ensure project deadlines were met",
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
        "Handled chemical plant operations and equipment maintenance procedures",
        "Performed pump maintenance and troubleshooting to ensure optimal performance",
        "Prepared comprehensive daily operational reports for management review",
        "Ensured strict compliance with safety protocols and quality standards"
      ]
    }
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
          Professional Experience
        </h2>
        <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Over 1 year of progressive experience in engineering operations, project management, 
          and technical leadership roles across diverse industrial environments.
        </p>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-8 border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{exp.position}</h3>
                <h4 className="text-xl text-teal-600 font-semibold mb-4">{exp.company}</h4>
              </div>
              
              <div className="flex flex-col lg:items-end gap-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{exp.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-lg font-semibold text-slate-700 mb-3">Key Achievements & Responsibilities:</h5>
              <ul className="space-y-3">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{responsibility}</span>
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
