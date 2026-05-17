import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFilePdf } from 'react-icons/fa';

const CVSection = () => {
  const handleDownload = () => {
    // Create a simple PDF download link
    const link = document.createElement('a');
    link.href = '/OUSSAMA-HASSANIA-CV-FINALVERSION.pdf'; // Your actual CV file is now in the public folder
    link.download = 'OUSSAMA-HASSANIA-CV-FINALVERSION.pdf';
    link.click();
  };

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

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Download My <span className="gradient-text">Resume</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Get a detailed overview of my skills, experience, and achievements in a professional format.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl p-8 md:p-12 hover-lift"
          >
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-2xl">
                  <FaFilePdf size={40} color="white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PDF</span>
                </div>
              </motion.div>

              <div>
                <h3 className="text-2xl font-semibold mb-2 text-white">
                  Oussama Hassania - CV
                </h3>
                <p className="text-gray-400 mb-4">
                  Fullstack & Backend Developer
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {['Java', 'Spring Boot', 'React', 'Angular', 'Bootstrap', 'GitHub'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-red-900/30 text-red-300 rounded-full text-sm border border-red-800/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center space-x-3"
              >
                <FaDownload />
                <span>Download CV</span>
              </motion.button>

              <p className="text-gray-500 text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="glass rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">2+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="glass rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">10+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="glass rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">6</div>
              <div className="text-gray-400">Technologies</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CVSection;
