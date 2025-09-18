import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaDatabase } from 'react-icons/fa';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
      technologies: ["React", "Spring Boot", "MySQL"],
      category: "fullstack",
      github: "https://github.com/Oussamahassania",
      live: "#",
      features: ["User Authentication", "Payment Gateway", "Admin Dashboard", "Responsive Design"]
    },
    {
      id: 2,
      title: "Task Management API",
      description: "RESTful API for task management with JWT authentication and real-time notifications.",
      technologies: ["Java", "Spring Boot", "PostgreSQL"],
      category: "backend",
      github: "https://github.com/Oussamahassania",
      live: "#",
      features: ["JWT Authentication", "RESTful API", "Real-time Updates", "Database Design"]
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Modern responsive portfolio website with smooth animations and dark theme.",
      technologies: ["React", "CSS3", "Framer Motion"],
      category: "frontend",
      github: "https://github.com/Oussamahassania",
      live: "#",
      features: ["Responsive Design", "Smooth Animations", "Dark Theme", "Modern UI"]
    },
    {
      id: 4,
      title: "Cybersecurity Dashboard",
      description: "Security monitoring dashboard with threat detection and reporting features.",
      technologies: ["Angular", "Spring Boot", "MongoDB"],
      category: "fullstack",
      github: "https://github.com/Oussamahassania",
      live: "#",
      features: ["Threat Detection", "Real-time Monitoring", "Security Reports", "User Management"]
    },
    {
      id: 5,
      title: "Voice Over Studio App",
      description: "Application for managing voice over projects with audio recording and editing capabilities.",
      technologies: ["React", "Node.js", "Web Audio API"],
      category: "frontend",
      github: "https://github.com/Oussamahassania",
      live: "#",
      features: ["Audio Recording", "File Management", "Project Tracking", "Audio Editing"]
    },
    {
      id: 6,
      title: "Banking System API",
      description: "Secure banking system with transaction processing and account management.",
      technologies: ["Java", "Spring Security", "MySQL"],
      category: "backend",
      github: "https://github.com/Oussamahassania",
      live: "#",
      features: ["Secure Transactions", "Account Management", "Audit Logging", "Role-based Access"]
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'frontend':
        return <FaCode className="text-blue-400" />;
      case 'backend':
        return <FaServer className="text-green-400" />;
      case 'fullstack':
        return <FaDatabase className="text-purple-400" />;
      default:
        return <FaCode className="text-gray-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A showcase of my recent work and projects that demonstrate my skills and passion for development.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                    : 'glass text-gray-300 hover:text-white hover:bg-red-900/20'
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-2xl overflow-hidden hover-lift group"
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-red-900/20 to-red-600/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                          {getCategoryIcon(project.category)}
                        </div>
                        <p className="text-gray-400 text-sm">Project Preview</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <FaGithub size={20} color="white" />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <FaExternalLinkAlt size={20} color="white" />
                      </motion.a>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-red-900/30 text-red-300 rounded-full border border-red-800/50">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs border border-gray-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-400">Key Features:</h4>
                      <ul className="text-xs text-gray-500 space-y-1">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
