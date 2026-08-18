import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, setSoundEnabled } from '../utils/soundFX';
import { api } from '../services/api';

export const CommandPalette = ({ isOpen, onClose, setTheme, onSelectProject, projects = [] }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: "⚡ Nishant Tiwari Dev OS [Version 2.4.0-kinetic]" },
    { type: 'system', text: "Type 'help' to view available commands, or navigate using shortcuts." }
  ]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const parts = raw.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    playSound('terminal_key');
    api.trackEvent('command', { command: raw });

    const newHistory = [...history, { type: 'user', text: `$ ${raw}` }];

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  • projects     - Browse engineering systems (IntellMeet, NeriDena, Research Assistant...)
  • skills       - View technical stack (Python, Java, React 19, WebRTC, ML, n8n)
  • certs        - View verified industry certifications & credentials
  • journey      - View experience & education (Happieloop, Rungta College)
  • patent       - View published MedTech AI patent details (202521015415)
  • youtube      - Open YouTube channel @innostack-369
  • contact      - Jump to contact info (Phone, Email, YouTube, LinkedIn)
  • hire         - Availability & roles overview
  • stats        - Live portfolio & visitor analytics
  • theme <name> - Switch theme (obsidian, cyberpunk, titanium)
  • sound <on|off>- Enable or disable sound effects
  • matrix       - Cyberpunk binary stream
  • easter-egg   - Trigger kinetic celebration 🎉
  • clear        - Reset terminal window
  • exit / quit  - Close CLI`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `Featured Engineering Systems:\n` +
            (projects.length > 0
              ? projects.map((p, i) => `  [${i + 1}] ${p.title} (${p.category})`).join('\n')
              : `  [1] IntellMeet - AI Video Conferencing & Summaries (WebRTC, React 19)\n  [2] Multi Model Research Assistant (n8n, GPT-4o, Vector DB, RAG)\n  [3] NeriDena - Smart Water Pipeline Leak Detection (IoT, Sensors)\n  [4] Career Guidance Assistant AI (n8n, Google Sheets, OpenAI)`)
        });
        window.location.hash = '#projects';
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Technical Competencies:
  • Languages: Python, Java, SQL, C, PHP, JavaScript, TypeScript
  • Web & Real-Time: React 19, Node.js, Express, WebRTC, Socket.io, Tailwind CSS, Redis
  • AI & ML: Linear/Logistic Regression, Decision Trees, KNN, SVM, RAG, OpenAI GPT-4o, n8n
  • Databases: MySQL, MongoDB, PostgreSQL, Pinecone Vector DB`
        });
        window.location.hash = '#skills';
        break;

      case 'certs':
      case 'certifications':
      case 'certificates':
        newHistory.push({
          type: 'output',
          text: `Verified Industry Certifications (6):
  [1] Data Science Certification (Coding Spoon)
  [2] Ignite for Entrepreneurs (Wadhwani Foundation - India)
  [3] Machine Learning & AI Foundations (DeepLearning.AI / Coursera)
  [4] Full-Stack Web Development MERN Stack (HackerRank / Meta)
  [5] n8n Workflow Automation & AI Agent Orchestration (n8n Academy)
  [6] SQL & Relational Database Engineering (HackerRank)`
        });
        window.location.hash = '#experience';
        break;

      case 'patent':
        newHistory.push({
          type: 'output',
          text: `🏅 Published Patent (Filed: 02/2025):
  • Title: AI-Driven Multimodal Imaging Platform for Enhanced Breast Cancer Diagnosis
  • Application Number: 202521015415
  • Focus: Deep Learning & Multimodal radiological feature extraction for early oncology diagnosis.`
        });
        window.location.hash = '#experience';
        break;

      case 'journey':
      case 'exp':
      case 'education':
      case 'experience':
        newHistory.push({
          type: 'output',
          text: `Milestones:
  • 02/2026 - 04/2026: Web Developer & ML Intern @ Happieloop Technologies (Pune, Remote)
  • 2024 - 2028: B.Tech CSE (AI) @ Rungta College of Engineering and Technology (SPI: 7.3)
  • 02/2025: Filed AI Cancer Diagnosis Patent (202521015415)`
        });
        window.location.hash = '#experience';
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Direct Contact Channels:
  • Email: nishanttiwari.nt9@gmail.com
  • Phone: +91-7389744808
  • LinkedIn: https://www.linkedin.com/in/nishant-tiwari-191a89412/
  • YouTube: https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ (@innostack-369)
  • GitHub: https://github.com/nishanttiwari
  • Location: Bhilai, Chhattisgarh, India`
        });
        window.location.hash = '#contact';
        break;

      case 'linkedin':
        window.open('https://www.linkedin.com/in/nishant-tiwari-191a89412/', '_blank');
        newHistory.push({
          type: 'success',
          text: `Opening LinkedIn profile: https://www.linkedin.com/in/nishant-tiwari-191a89412/`
        });
        break;

      case 'youtube':
      case 'video':
      case 'videos':
        window.location.hash = '#youtube-showcase';
        newHistory.push({
          type: 'success',
          text: `Navigating to Project Demos & YouTube Hub (@innostack-369).\nChannel: https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ`
        });
        break;

      case 'github':
        window.open('https://github.com/nishanttiwari', '_blank');
        newHistory.push({
          type: 'success',
          text: `Opening GitHub profile: https://github.com/nishanttiwari`
        });
        break;

      case 'hire':
        newHistory.push({
          type: 'output',
          text: `🟢 Status: Available for Full-Stack Developer, AI/ML Engineer roles & internships.\nEmail: nishanttiwari.nt9@gmail.com | Phone: +91-7389744808\nSpecialties: MERN, WebRTC real-time systems, n8n automation, RAG agents.`
        });
        break;

      case 'stats':
        newHistory.push({
          type: 'output',
          text: `📊 Performance Metrics:
  • Lighthouse Score: 99/100
  • Architecture: Express REST API + React Vite + Canvas 2D
  • API Response Time: < 4ms`
        });
        break;

      case 'theme':
        if (['obsidian', 'cyberpunk', 'titanium'].includes(args[0])) {
          setTheme(args[0]);
          document.documentElement.setAttribute('data-theme', args[0]);
          newHistory.push({ type: 'success', text: `Theme switched to '${args[0]}'.` });
        } else {
          newHistory.push({ type: 'error', text: "Usage: theme <obsidian | cyberpunk | titanium>" });
        }
        break;

      case 'sound':
        if (args[0] === 'off') {
          setSoundEnabled(false);
          newHistory.push({ type: 'output', text: "Audio SFX disabled." });
        } else {
          setSoundEnabled(true);
          playSound('success');
          newHistory.push({ type: 'success', text: "Audio SFX enabled." });
        }
        break;

      case 'matrix':
        newHistory.push({
          type: 'output',
          text: `01001110 01101001 01110011 01101000 01100001 01101110 01110100 00100000 01010100 01101001 01110111 01100001 01110010 01101001\nWake up, Neo... The Matrix has you.`
        });
        break;

      case 'easter-egg':
      case 'party':
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        playSound('success');
        newHistory.push({ type: 'success', text: "🎉 You discovered the secret kinetic party mode!" });
        break;

      case 'sudo':
        newHistory.push({
          type: 'error',
          text: "User 'guest' is not in the sudoers file. This incident will be reported to Nishant."
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command '${command}' not recognized. Type 'help' to see list of valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          height: '470px',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-card-solid)',
          border: '1px solid var(--border-focus)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                fontWeight: 600
              }}
            >
              nishant-tiwari-shell (zsh)
            </span>
          </div>

          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '28px', height: '28px', border: 'none' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Terminal Output Stream */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.86rem',
            lineHeight: 1.55,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap'
          }}
        >
          {history.map((line, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '0.5rem',
                color:
                  line.type === 'user'
                    ? 'var(--accent-cyan)'
                    : line.type === 'success'
                    ? 'var(--accent-emerald)'
                    : line.type === 'error'
                    ? 'var(--accent-rose)'
                    : line.type === 'system'
                    ? 'var(--text-muted)'
                    : 'var(--text-primary)'
              }}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Command Line Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-card)',
            gap: '0.5rem'
          }}
        >
          <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'projects', 'patent', 'skills', 'easter-egg'..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem'
            }}
          />
          <CornerDownLeft size={16} color="var(--text-muted)" />
        </div>
      </div>
    </div>
  );
};
