import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">About</span> Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <div className="glass rounded-2xl p-8 hover-lift">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-red-900/20 to-red-600/20 flex items-center justify-center">
                  <img 
                    src="/my_portfolio/my_photo.jpg"
                    alt="Oussama Hassania" 
                    className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="order-1 md:order-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    Hi, I'm Oussama Hassania
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    I'm a 21-year-old backend developer and AI engineer from Morocco. 
                    I specialize in building scalable server-side systems and integrating 
                    AI into real-world applications, with a deep passion for web pentesting 
                    and offensive security.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3 text-red-400">
                    Beyond Development
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    When I'm not coding or hunting vulnerabilities, I enjoy doing voice-over 
                    work and dubbing. This creative outlet sharpens my communication and 
                    attention to detail — qualities I bring directly into my technical work.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="glass rounded-lg p-4 text-center hover-lift">
                    <div className="text-2xl font-bold gradient-text">21</div>
                    <div className="text-sm text-gray-400">Years Old</div>
                  </div>
                  <div className="glass rounded-lg p-4 text-center hover-lift">
                    <div className="text-2xl font-bold gradient-text">🇲🇦</div>
                    <div className="text-sm text-gray-400">Morocco</div>
                  </div>
                  <div className="glass rounded-lg p-4 text-center hover-lift">
                    <div className="text-2xl font-bold gradient-text">🤖</div>
                    <div className="text-sm text-gray-400">AI Engineer</div>
                  </div>
                  <div className="glass rounded-lg p-4 text-center hover-lift">
                    <div className="text-2xl font-bold gradient-text">🕵️</div>
                    <div className="text-sm text-gray-400">Web Pentester</div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mt-8"
                >
                  <div className="glass rounded-lg p-6 border-l-4 border-red-500">
                    <h4 className="text-lg font-semibold mb-2 text-white">
                      My Mission
                    </h4>
                    <p className="text-gray-300">
                      To engineer powerful backend systems, leverage AI to solve complex 
                      problems, and make the web a safer place — one vulnerability found 
                      at a time.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;