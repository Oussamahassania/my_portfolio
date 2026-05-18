import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaBug, FaExternalLinkAlt, FaChevronDown, FaSkull, FaFire } from 'react-icons/fa';
import { SiHackerone, SiBugcrowd } from 'react-icons/si';

const severityConfig = {
  Critical: {
    color: '#ff2d2d',
    bg: 'rgba(255,45,45,0.08)',
    border: 'rgba(255,45,45,0.3)',
    glow: '0 0 16px rgba(255,45,45,0.25)',
    icon: FaSkull,
  },
  High: {
    color: '#ff7c2d',
    bg: 'rgba(255,124,45,0.08)',
    border: 'rgba(255,124,45,0.3)',
    glow: '0 0 16px rgba(255,124,45,0.2)',
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

// ── Sample writeups – replace with your real findings ──────────────────────
const writeups = [
  {
    id: 1,
    title: 'Stored XSS via SVG Upload in Profile Editor',
    program: 'HackerOne',
    programIcon: SiHackerone,
    target: 'Redacted Private Program',
    severity: 'High',
    type: 'Cross-Site Scripting (XSS)',
    cve: null,
    date: 'Apr 2025',
    summary:
      'The profile picture upload endpoint accepted SVG files without sanitising embedded `<script>` tags. An attacker could store a malicious payload executed in the context of any user who viewed the victim profile.',
    steps: [
      'Upload a crafted .svg file containing an XSS payload as a profile picture.',
      'Navigate to the public profile URL of the uploaded account.',
      'Observe JavaScript execution in the victim browser — cookies captured via out-of-band callback.',
    ],
    impact:
      'Account takeover, session hijacking, credential theft at scale.',
    link: '#',
  },
  {
    id: 2,
    title: 'IDOR Exposing PII of Arbitrary Users',
    program: 'Bugcrowd',
    programIcon: SiBugcrowd,
    target: 'E-commerce Platform',
    severity: 'Critical',
    type: 'Insecure Direct Object Reference',
    cve: null,
    date: 'Feb 2025',
    summary:
      'The `/api/v1/users/{id}/profile` endpoint lacked authorization checks. Incrementing the numeric `id` parameter returned full PII (name, email, address, phone) of any registered user.',
    steps: [
      'Authenticate as a regular user and capture the profile API request.',
      'Replace own user ID with any other integer value.',
      'Receive full PII of the targeted user with HTTP 200 — no extra privilege required.',
    ],
    impact:
      'Mass PII exposure affecting the entire user base — GDPR/CCPA violation risk.',
    link: '#',
  },
  {
    id: 3,
    title: 'Open Redirect Leading to OAuth Token Theft',
    program: 'HackerOne',
    programIcon: SiHackerone,
    target: 'SaaS Platform',
    severity: 'Medium',
    type: 'Open Redirect / OAuth Misconfiguration',
    cve: null,
    date: 'Jan 2025',
    summary:
      'The OAuth `redirect_uri` parameter was validated only by prefix-matching. By appending a crafted path, the access token could be redirected to an attacker-controlled server.',
    steps: [
      'Craft an OAuth authorization URL with a redirect_uri pointing to an attacker domain sharing the allowed prefix.',
      'Trick target user into clicking the link.',
      'OAuth token is sent to the attacker server in the URL fragment.',
    ],
    impact:
      'Full account takeover for any user lured to the malicious link.',
    link: '#',
  },
  {
    id: 4,
    title: 'Rate Limit Bypass on OTP Endpoint',
    program: 'Bugcrowd',
    programIcon: SiBugcrowd,
    target: 'FinTech App',
    severity: 'High',
    type: 'Broken Authentication',
    cve: null,
    date: 'Dec 2024',
    summary:
      'The SMS OTP verification endpoint enforced rate limiting via the `X-Forwarded-For` header. Rotating this header in each request bypassed the lockout, allowing full brute-force of a 6-digit OTP.',
    steps: [
      'Capture OTP verification POST request in Burp Suite.',
      'Add X-Forwarded-For header with a unique IP per attempt.',
      'Automate 1,000,000 attempts — OTP cracked within minutes.',
    ],
    impact:
      'Complete authentication bypass — attacker can access any account knowing only the phone number.',
    link: '#',
  },
];
// ───────────────────────────────────────────────────────────────────────────

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
      transition={{ delay: index * 0.1, duration: 0.5 }}
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
        {/* Severity badge */}
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
            <span className="text-xs text-gray-500">{writeup.type}</span>
            <span className="text-xs text-gray-600 ml-auto">{writeup.date}</span>
          </div>
          <h3 className="text-white font-semibold text-base leading-snug pr-6">
            {writeup.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <ProgramIcon size={12} color={writeup.program === 'HackerOne' ? '#25c2a0' : '#f26822'} />
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
    { label: 'Total Findings', value: writeups.length },
    { label: 'Critical / High', value: writeups.filter(w => ['Critical', 'High'].includes(w.severity)).length },
    { label: 'Programs', value: [...new Set(writeups.map(w => w.program))].length },
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
              <span className="gradient-text">Bug Bounty</span> Writeups
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Real vulnerabilities I discovered and responsibly disclosed across public and private bug bounty programs.
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

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              More writeups published on{' '}
              <a
                href="https://hackerone.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                HackerOne
              </a>{' '}
              &amp;{' '}
              <a
                href="https://bugcrowd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Bugcrowd
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Writeups;