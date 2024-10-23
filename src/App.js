import React, { useState } from 'react';
import { Linkedin, Mail, ChevronDown, Award, Briefcase, GraduationCap, Code } from 'lucide-react';

const timelineData = [
  {
    date: "2022-2024",
    title: "Software Engineer",
    company: "IBM LABS",
    description: "Led implementation of IBM's Secret Manager and IAM integration, reducing costs by $3M",
    skills: ["Python", "Django", "Java", "Spring Boot", "Postgres"]
  },
  {
    date: "2021-2022",
    title: "Full Stack Developer",
    company: "Axiom IO",
    description: "Architected Sports Aggregator Platform handling 14M weekly requests",
    skills: ["Golang", "MongoDB", "AWS", "CI/CD"]
  },
  {
    date: "2018-2021",
    title: "Software Developer",
    company: "Kuliza Technologies",
    description: "Led Educational Loan project, improving process efficiency by 30%",
    skills: ["Python", "Django", "Java", "BPM", "SQL"]
  },
  {
    date: "2017-2018",
    title: "Software Developer",
    company: "Digital Marketing Systems",
    description: "Developed backend infrastructure improving SEO by 25%",
    skills: ["Python", "Flask", "Android", "REST API"]
  }
];

const skillsData = {
  "Languages": ["Python", "Golang", "Java"],
  "Frameworks": ["Django", "Flask", "Spring Boot", "Go Fiber"],
  "Databases": ["Postgres", "MongoDB"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "GitLab", "Linux"],
  "Tools": ["Kafka", "LDAP", "Swagger", "Helm Chart"]
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Hero Section */}
      <header className="bg-blue-900 text-white min-h-screen flex flex-col justify-center relative">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4">Amit Mittal</h1>
          <h2 className="text-2xl mb-8">Software Engineer & Full Stack Developer</h2>
          <p className="text-xl mb-8 max-w-2xl">
            With 6+ years of experience in software development, I specialize in building scalable applications
            and leading technical initiatives that drive business growth.
          </p>
          <div className="flex gap-4">
            {/* <a href="https://github.com/yourgithub" className="p-2 hover:bg-blue-800 rounded-full">
              <GitHub size={24} />
            </a> */}
            <a href="https://linkedin.com/in/amitrmittal" className="p-2 hover:bg-blue-800 rounded-full">
              <Linkedin size={24} />
            </a>
            <a href="mailto:amitarmittal@gmail.com" className="p-2 hover:bg-blue-800 rounded-full">
              <Mail size={24} />
            </a>
          </div>
        </div>
        <ChevronDown 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" 
          size={32} 
        />
      </header>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Professional Journey</h2>
          <div className="relative">
            {timelineData.map((item, index) => (
              <div key={index} className="mb-8 flex">
                <div className="hidden md:block w-1/3 pr-8 text-right">
                  <span className="text-blue-600 font-semibold">{item.date}</span>
                </div>
                <div className="w-full md:w-2/3 relative pl-8 border-l-2 border-blue-500">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1.5" />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <h4 className="text-lg text-blue-600 mb-2">{item.company}</h4>
                  <p className="mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsData).map(([category, skills]) => (
              <div key={category} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-blue-600">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <GraduationCap className="text-blue-600 mr-4" size={32} />
                <div>
                  <h3 className="text-xl font-bold">Master of Science in Computer Science</h3>
                  <p className="text-gray-600">California State University, Fullerton</p>
                  <p className="text-gray-500">2024 - 2025</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <GraduationCap className="text-blue-600 mr-4" size={32} />
                <div>
                  <h3 className="text-xl font-bold">Bachelor of Science in Computer Science</h3>
                  <p className="text-gray-600">Indore Institute of Science and Technology</p>
                  <p className="text-gray-500">2013 - 2017</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
          <p className="mb-8 text-xl">I'm always open to discussing new projects and opportunities.</p>
          <div className="flex justify-center gap-8">
            <a href="mailto:amitarmittal@gmail.com" className="flex items-center hover:text-blue-300">
              <Mail className="mr-2" /> amitarmittal@gmail.com
            </a>
            <a href="tel:7146814599" className="flex items-center hover:text-blue-300">
              📱 (714) 681-4599
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;