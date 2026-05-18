import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CVSection from './components/CVSection';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Writeups from './components/Writeups';

function App() {
  return (
    <div className="App marble-bg min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Writeups />   {/* 👈 add this */}
        <CVSection />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;