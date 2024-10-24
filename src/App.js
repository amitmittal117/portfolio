import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Award,
  GraduationCap,
  Sun,
  Moon,
} from "lucide-react";
import certificatesData from './jsons/my_certificates.json';

import generativeIAFull from "./img/aws-educate-introduction-to-generative-ai-full.png";
import deepRace from "./img/aws-educate-machine-learning-deepracer.png";
import mlFoundation from "./img/aws-educate-machine-learning-foundations.png";
import ibmCloudAdvEs from "./img/ibm-cloud-advocate-essentials.png";
import ibmCloudAdvV2 from "./img/ibm-certified-advocate-cloud-v2.png";
import ibmSecurityFoundations from "./img/security-and-privacy-by-design-foundations.png";
import ibmEnterpriseDesign from "./img/enterprise-design-thinking-practitioner.png";


const imageMapping = {
  generativeIAFull: generativeIAFull,
  mlFoundation: mlFoundation,
  deepRace: deepRace,
  ibmCloudAdvEs: ibmCloudAdvEs,
  ibmCloudAdvV2: ibmCloudAdvV2,
  ibmSecurityFoundations: ibmSecurityFoundations,
  ibmEnterpriseDesign: ibmEnterpriseDesign
};

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
      // If no theme is saved, check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
};

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-opacity-20 backdrop-blur-sm 
      dark:bg-gray-800 bg-white shadow-lg hover:scale-110 transition-all duration-200 z-50"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-yellow-400" />
      ) : (
        <Moon className="h-6 w-6 text-gray-700" />
      )}
    </button>
  );
};

const timelineData = [
  {
    date: "2022-2024",
    title: "Software Engineer",
    company: "IBM LABS",
    description: [
      "Implemented IBM's Secret Manager on PaaS with SOC2 compliant encryption, eliminating HSMs from data centers and reducing migration time by 95%, saving $3 Million",
      "Integrated IBM IAM (Blue Groups) with LDAP for automated user permission management, reducing manual intervention and cutting ticket turnaround time by 90%",
      "Integrated Microservices with Debezium to enable real-time data transfer and auditing for data centers, automating updates to SSOT and SNOW",
    ],
    skills: ["Python", "Django", "Java", "Spring Boot", "Postgres"],
  },
  {
    date: "2021-2022",
    title: "Full Stack Developer",
    company: "Axiom IO",
    description: [
      "Designed and architected a Sports Aggregator Platform in Java Spring Boot, efficiently managing ~14M weekly sports feed requests with a segregated layered architecture, reducing response time by 30%",
      "Built CI/CD pipelines for dev, stage, and prod environments using Amazon CodePipeline, cutting release time by 50% and saving $200K annually in deployment costs",
      "Developed Golang REST APIs for major game providers (Ezugi, DreamCasino, SuperSpade, Pragmatic Play), helping $2M+ in game transactions, reducing downtime by 40%, and saving $150K in operational costs",
    ],
    skills: ["Golang", "MongoDB", "AWS", "CI/CD"],
  },
  {
    date: "2018-2021",
    title: "Software Developer",
    company: "Kuliza Technologies",
    description: [
      "Led Educational Loan project, designing key modules like EMI automation and account validation, managing a team of four, and improving process efficiency by 30%",
      "Optimized SQL queries, cutting execution time by 88%, and built an auto trigger system reducing API downtime by 95% with 10% improved audit accuracy",
    ],
    skills: ["Python", "Django", "Java", "BPM", "SQL"],
  },
  {
    date: "2017-2018",
    title: "Software Developer",
    company: "Digital Marketing Systems",
    description: [
      "Developed backend infrastructure in Flask for the company website with REST API (JSON) communication, improving SEO rankings by 25%, and built Android ERP modules, enhancing mobile adaptation by 30%",
    ],
    skills: ["Python", "Flask", "Android", "REST API"],
  },
];

const skillsData = {
  Languages: ["Python", "Golang", "Java"],
  Frameworks: ["Django", "Flask", "Spring Boot", "Go Fiber"],
  Databases: ["Postgres", "MongoDB"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "GitLab", "Linux"],
  Tools: ["Kafka", "LDAP", "Swagger", "Helm Chart"],
};

// Certificate Card Component
const CertificateCard = ({ cert, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_SKILLS = 2;

  const displaySkills = isExpanded
    ? cert.skills
    : cert.skills.slice(0, MAX_SKILLS);
  const hasMoreSkills = cert.skills.length > MAX_SKILLS;

  return (
    <div
      key={index}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-16 h-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <img
              src={imageMapping[cert.image]}
              alt={`${cert.title} badge`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1 dark:text-white group">
                  <a
                    href={cert.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                  >
                    {cert.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {cert.issuer}
                </p>
              </div>
              <Award
                className="text-blue-600 dark:text-blue-400 ml-2"
                size={20}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {cert.date}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {cert.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {displaySkills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {hasMoreSkills && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              +{cert.skills.length - MAX_SKILLS} more...
            </button>
          )}
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Show less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle theme={theme} setTheme={setTheme} />

      {/* Header/Hero Section */}
      <header className="bg-blue-900 dark:bg-gray-900 text-white min-h-screen flex flex-col justify-center relative transition-colors duration-200">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4">Amit Mittal</h1>
          <h2 className="text-2xl mb-8">
            Software Engineer & Full Stack Developer
          </h2>
          <p className="text-xl mb-8 max-w-2xl">
            With 6+ years of experience in software development, I specialize in
            building scalable applications and leading technical initiatives
            that drive business growth.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/amitmittal117"
              className="p-2 hover:bg-blue-800 rounded-full"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/amitrmittal"
              className="p-2 hover:bg-blue-800 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:amitarmittal@gmail.com"
              className="p-2 hover:bg-blue-800 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
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
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
            Professional Journey
          </h2>
          <div className="relative">
            {timelineData.map((item, index) => (
              <div key={index} className="mb-8 flex">
                <div className="hidden md:block w-1/3 pr-8 text-right">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {item.date}
                  </span>
                </div>
                <div className="w-full md:w-2/3 relative pl-8 border-l-2 border-blue-500 dark:border-blue-400">
                  <div className="absolute w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full -left-[9px] top-1.5" />
                  <h3 className="text-xl font-bold dark:text-white">
                    {item.title}
                  </h3>
                  <h4 className="text-lg text-blue-600 dark:text-blue-400 mb-2">
                    {item.company}
                  </h4>
                  <ul className="list-disc pl-5 mb-4 dark:text-gray-300">
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex} className="mb-1">
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm transition-colors"
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

      {/* Assistantship */}


      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsData).map(([category, skills]) => (
              <div
                key={category}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm transition-colors"
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

      {/* Certificate Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
            Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificatesData.certificates.map((cert, index) => (
              <CertificateCard key={index} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-white dark:bg-gray-700 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
            Education
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center mb-4">
                <GraduationCap
                  className="text-blue-600 dark:text-blue-400 mr-4"
                  size={32}
                />
                <div>
                  <h3 className="text-xl font-bold dark:text-white">
                    Master of Science in Computer Science
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    California State University, Fullerton
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    2024 - 2025
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center mb-4">
                <GraduationCap
                  className="text-blue-600 dark:text-blue-400 mr-4"
                  size={32}
                />
                <div>
                  <h3 className="text-xl font-bold dark:text-white">
                    Bachelor of Science in Computer Science
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Indore Institute of Science and Technology
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    2013 - 2017
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-900 dark:bg-gray-900 text-white transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
          <p className="mb-8 text-xl">
            I'm always open to discussing new projects and opportunities.
          </p>
          <div className="flex justify-center gap-8">
            <a
              href="mailto:amitarmittal@gmail.com"
              className="flex items-center hover:text-blue-300 transition-colors"
            >
              <Mail className="mr-2" /> amitarmittal@gmail.com
            </a>
            <a
              href="tel:7146814599"
              className="flex items-center hover:text-blue-300 transition-colors"
            >
              📱 (714) 681-4599
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
