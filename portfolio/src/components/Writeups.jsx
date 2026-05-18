import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaBug, FaExternalLinkAlt, FaChevronDown, FaSkull, FaFire, FaTwitter, FaTrophy } from 'react-icons/fa';
import { SiHackerone, SiTryhackme } from 'react-icons/si';

const severityConfig = {
  Critical: {
    color: '#ff2d2d',
    bg: 'rgba(255,45,45,0.08)',
    border: 'rgba(255,45,45,0.3)',
    glow: '0 0 20px rgba(255,45,45,0.25)',
    icon: FaSkull,
  },
  High: {
    color: '#ff7c2d',
    bg: 'rgba(255,124,45,0.08)',
    border: 'rgba(255,124,45,0.3)',
    glow: '0 0 20px rgba(255,124,45,0.2)',
    icon: FaFire,
  },
  Medium: {
    color: '#f5c542',
    bg: 'rgba(245,197,66,0.08)',
    border: 'rgba(245,197,66,0.3)',
    glow: '0 0 16px rgba(245,197,66,0.15)',
    icon: FaBug,
  },
  Low: {
    color: '#4daaff',
    bg: 'rgba(77,170,255,0.08)',
    border: 'rgba(77,170,255,0.3)',
    glow: '0 0 16px rgba(77,170,255,0.15)',
    icon: FaShieldAlt,
  },
};

const writeups = [
  {
    id: 1,
    title: 'Java Deserialization Vulnerability — CVE-2015-7501 (Tony the Tiger)',
    program: 'TryHackMe',
    programIcon: SiTryhackme,
    target: 'JBoss Application Server (CTF)',
    severity: 'Critical',
    type: 'Java Deserialization / RCE',
    cve: 'CVE-2015-7501',
    date: 'Sep 2025',
    summary:
      'Explored and exploited a critical Java Deserialization vulnerability in a JBoss server. The JMXInvokerServlet endpoint accepted untrusted serialized Java objects, allowing remote code execution. Combined recon, exploit tooling (jexboss), reverse shell, privilege escalation via sudo misconfiguration, and hash cracking to achieve full root access.',
    steps: [
      'Ran nmap to enumerate 18 open ports — identified Java RMI, JBoss HTTP (8080), and AJP services.',
      'Found a hidden flag embedded in a JPEG image using the strings command.',
      'Used jexboss to identify the VULNERABLE JMXInvokerServlet endpoint and launched an automated exploit to obtain a reverse shell.',
      'Pivoted to the jboss user by reading a plaintext password from a note file, then SSH\'d in.',
      'Exploited sudo NOPASSWD permission on /usr/bin/find to spawn a root shell and retrieved the final base64-encoded flag, cracked with CrackStation.',
    ],
    impact:
      'Full remote code execution and root-level compromise of the server — complete system takeover from unauthenticated network access.',
    link: 'https://medium.com/@oussamahassania87/java-deserialization-vulnerability-cve-2015-7501-tony-the-tiger-1709ef788f01',
  },
  {
    id: 2,
    title: 'Blind SQL Injection with Conditional Errors (Oracle DB)',
    program: 'PortSwigger / Personal Research',
    programIcon: FaBug,
    target: 'Web Security Academy Lab',
    severity: 'High',
    type: 'Blind SQL Injection',
    cve: null,
    date: '2025',
    summary:
      'Exploited a blind SQL injection vulnerability via an analytics tracking cookie on an Oracle database. The application returned no query results and showed no visible difference in responses — requiring conditional error-triggering via CASE/TO_CHAR(1/0) logic to exfiltrate the administrator password character-by-character using Burp Suite Intruder.',
    steps: [
      'Intercepted the TrackingId cookie in Burp Suite Repeater and confirmed SQL injection by appending a single quote to trigger a 500 error.',
      'Confirmed Oracle DB by injecting SELECT from the dual dummy table; verified the users table existed via ROWNUM = 1 subquery.',
      'Used CASE WHEN ... THEN TO_CHAR(1/0) ELSE \'\' END payloads to trigger conditional 500 errors and distinguish true/false conditions.',
      'Determined the administrator password length, then used Burp Intruder in Cluster Bomb mode to brute-force each character position (a-z, 0-9).',
      'Filtered Intruder results by 500 status codes to reconstruct the full password and logged in as administrator.',
    ],
    impact:
      'Full authentication bypass — administrator account compromise via data exfiltration from a blind injection point with no visible error output.',
    link: 'https://medium.com/@oussamahassania87/blind-sql-injection-with-conditional-errors-5316f08d8f70',
  },
];

const socialLinks = [
  {
    label: 'HackerOne',
    icon: SiHackerone,
    color: '#25c2a0',
    url: 'https://hackerone.com/lucuiec?type=user',
  },
  {
    label: 'TryHackMe',
    icon: SiTryhackme,
    color: '#c11111',
    url: 'https://tryhackme.com/p/Lucuiec',
  },
  {
    label: 'X / Twitter',
    icon: FaTwitter,
    color: '#e7e9ea',
    url: 'https://x.com/HassaniaOu764',
  },
];

const WriteupCard = ({ writeup, index }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = severityConfig[writeup.severity];
  const SeverityIcon = cfg.icon;
  const ProgramIcon = writeup.programIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${cfg.border}`,
        boxShadow: expanded ? cfg.glow : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Severity accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ background: cfg.color }}
      />

      {/* Card header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-7 py-5 flex items-start gap-4"
      >
        {/* Severity badge icon */}
        <div
          className="flex-shrink-0 mt-1 w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          <SeverityIcon size={16} color={cfg.color} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
            >
              {writeup.severity}
            </span>
            {writeup.cve && (
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,45,45,0.05)', color: '#ff6b6b', border: '1px solid rgba(255,45,45,0.2)' }}
              >
                {writeup.cve}
              </span>
            )}
            <span className="text-xs text-gray-500">{writeup.type}</span>
            <span className="text-xs text-gray-600 ml-auto">{writeup.date}</span>
          </div>
          <h3 className="text-white font-semibold text-base leading-snug pr-6">
            {writeup.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <ProgramIcon
              size={12}
              color={
                writeup.program === 'TryHackMe'
                  ? '#c11111'
                  : writeup.program === 'HackerOne'
                  ? '#25c2a0'
                  : '#f5c542'
              }
            />
            <span>{writeup.program}</span>
            <span className="text-gray-700">·</span>
            <span>{writeup.target}</span>
          </div>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-2"
        >
          <FaChevronDown size={14} color="#666" />
        </motion.div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-6 space-y-4 border-t border-white/5 pt-4">
              {/* Summary */}
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Summary</span>
                <p className="text-gray-300 text-sm mt-1 leading-relaxed">{writeup.summary}</p>
              </div>

              {/* Steps */}
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Reproduction Steps</span>
                <ol className="mt-2 space-y-2">
                  {writeup.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Impact */}
              <div
                className="rounded-lg px-4 py-3"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
              >
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: cfg.color }}>
                  Impact
                </span>
                <p className="text-gray-200 text-sm mt-1">{writeup.impact}</p>
              </div>

              {/* Read more link */}
              {writeup.link && writeup.link !== '#' && (
                <a
                  href={writeup.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                  style={{ color: cfg.color }}
                >
                  Read Full Writeup <FaExternalLinkAlt size={11} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Writeups = () => {
  const stats = [
    { label: 'Total Writeups', value: writeups.length },
    { label: 'Critical / High', value: writeups.filter(w => ['Critical', 'High'].includes(w.severity)).length },
    { label: 'CVEs Covered', value: writeups.filter(w => w.cve).length },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="writeups" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Security</span> Writeups
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Real vulnerabilities I researched, exploited, and documented — from CVE exploitation to blind injection techniques.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-12">
            {stats.map((s, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center hover-lift">
                <div className="text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Writeup cards */}
          <motion.div variants={itemVariants} className="space-y-4">
            {writeups.map((writeup, index) => (
              <WriteupCard key={writeup.id} writeup={writeup} index={index} />
            ))}
          </motion.div>

          {/* Social / Profile Links */}
          <motion.div variants={itemVariants} className="mt-14">
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-500 text-sm tracking-wide uppercase font-semibold">Find me on</p>
              <div className="flex flex-wrap justify-center gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: `1px solid rgba(255,255,255,0.1)`,
                        color: s.color,
                      }}
                    >
                      <Icon size={14} />
                      {s.label}
                    </a>
                  );
                })}
              </div>
              <p className="text-gray-600 text-xs mt-1">
                More writeups published on{' '}
                <a
                  href="https://medium.com/@oussamahassania87"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Medium
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Writeups;