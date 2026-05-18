import React from 'react';
import { motion } from 'framer-motion';
import { FaJava, FaGithub, FaShieldAlt } from 'react-icons/fa';
import { SiSpringboot, SiOpenai } from 'react-icons/si';

const Hero = () => {
  const techStack = [
    { icon: FaJava, color: '#f89820', label: 'Java' },
    { icon: SiSpringboot, color: '#6db33f', label: 'Spring Boot' },
    { icon: FaGithub, color: '#e6edf3', label: 'GitHub' },
    { icon: FaShieldAlt, color: '#ff4d4d', label: 'Pentesting' },
    { icon: SiOpenai, color: '#74aa9c', label: 'AI' },
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="gradient-text">Oussama</span>
            <br />
            <span className="text-white">Hassania</span>
          </motion.h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-4">
            Backend Developer · AI Engineer · Web Pentester
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Building robust backend systems, integrating AI solutions, and uncovering web vulnerabilities
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
              >
                <div className="p-4 rounded-full glass hover-lift flex flex-col items-center gap-1">
                  <tech.icon 
                    size={40} 
                    color={tech.color}
                    className="transition-all duration-300 group-hover:drop-shadow-lg"
                  />
                  <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {tech.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            Discover More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-red-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;