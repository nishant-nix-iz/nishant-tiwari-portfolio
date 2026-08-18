import React, { useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Download, 
  Mail, 
  Phone,
  MapPin,
  Sparkles,
  CheckCircle2,
  Code2,
  Award
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon, TwitterIcon } from './Icons';
import { playSound } from '../utils/soundFX';
import { api } from '../services/api';

export const Hero = ({ profile, onOpenCommandPalette }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [downloadingResume, setDownloadingResume] = useState(false);

  const handleCopyEmail = () => {
    playSound('upvote');
    const email = profile?.email || 'nishanttiwari.nt9@gmail.com';
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    playSound('upvote');
    const phone = profile?.phone || '+91-7389744808';
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleDownloadResume = () => {
    playSound('success');
    setDownloadingResume(true);
    api.trackEvent('resume', { name: profile?.name || 'Nishant Tiwari' });

    setTimeout(() => {
      const resumeContent = `# Nishant Tiwari
Phone: +91-7389744808 | Email: nishanttiwari.nt9@gmail.com
LinkedIn: https://www.linkedin.com/in/nishant-tiwari-191a89412/ | GitHub: https://github.com/nishanttiwari
YouTube: https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ
Location: Bhilai, Chhattisgarh, India | Open to Worldwide Remote

---

## EDUCATION
**Rungta College of Engineering and Technology** (2024 – 2028)
- B.Tech - Computer Science and Engineering (AI)
- SPI (3rd Semester): 7.3 | Bhilai, Chhattisgarh

---

## INTERNSHIP
**Happieloop Technologies** (02/2026 – 04/2026)
*Role: Web Developer Intern (Remote)* | Pune, Maharashtra
- Completed an intensive Machine Learning & Web Development internship gaining practical exposure to machine learning concepts, data preprocessing, model development, and performance evaluation.
- Enhanced Python programming, analytical thinking, and algorithmic problem-solving skills working on real-world learning tasks and AI/ML fundamentals.

---

## PROJECTS
1. **IntellMeet** | *React 19, TypeScript, Node.js, MongoDB, Socket.io, WebRTC, OpenAI API, Tailwind CSS*
   - Developed a full-stack AI-powered enterprise meeting platform with real-time video conferencing using WebRTC, live chat with typing indicators, AI-generated meeting summaries, smart action item extraction, and a team Kanban board — deployed on Vercel.
   - Skills: MERN Stack, WebRTC, Socket.io, REST APIs, JWT Auth, OpenAI Integration, Redis, Zustand, TypeScript, Cloudinary.

2. **NeriDena - Smart Water Pipeline Leakage Detection System** | *IoT, Sensors*
   - Developed an IoT-based smart water pipeline leakage detection system to detect underground pipeline leaks in real time and minimize water wastage through continuous monitoring and timely alerts.
   - Skills: IoT fundamentals, problem-solving, innovation, teamwork, project planning.

3. **Career Guidance Assistant** | *n8n, OpenAI GPT, Google Sheets, AI Agent, Simple Memory, OpenAI API*
   - Built an AI chatbot using n8n and OpenAI GPT that provides career guidance and answers FAQs using Google Sheets data.
   - Skills: AI Agents Development, Workflow Automation, Prompt Engineering, API Integration, n8n Workflow Design, Structured Data Handling, Google Sheets Integration.

4. **Multi Model Research Assistant** | *n8n, GPT-4o, PostgreSQL, OAI Embeddings, Tavily API, REST APIs*
   - Built an AI-powered Research Assistant with multi-modal document processing, semantic search, vector database integration, real-time web search, and automated workflow management.
   - Skills: RAG, Prompt Engineering, n8n Automation, Pinecone, PostgreSQL, Semantic Search, Vector Databases, Multi-modal AI, REST APIs.

---

## TECHNICAL SKILLS
- **Languages**: Python, Java, SQL, C, PHP, JavaScript, TypeScript
- **Databases**: MySQL, MongoDB, PostgreSQL, Redis, Pinecone Vector DB
- **ML & AI**: Linear Regression, Logistic Regression, Decision Tree, KNN, SVM, RAG, OpenAI GPT-4o, n8n Workflows, Prompt Engineering
- **Web & Frameworks**: React 19, Node.js, Express, WebRTC, Socket.io, Tailwind CSS, REST APIs

---

## EXTRACURRICULAR & PATENT
- **Patent (Filed: 02/2025)**: *AI-Driven Multimodal Imaging Platform for Enhanced Breast Cancer Diagnosis*
  - Application Number: 202521015415

---

## CERTIFICATIONS
- **Data Science Certification** - Coding Spoon
- **Wadhwani : Ignite for Entrepreneurs** - India
- **Machine Learning & AI Foundations** - DeepLearning.AI / Coursera
- **Full-Stack Web Development (MERN Stack)** - HackerRank / Meta Certified
- **n8n Workflow Automation & AI Agent Orchestration** - n8n Academy
- **SQL & Relational Database Engineering** - HackerRank Skills Certification
`;
      const blob = new Blob([resumeContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Nishant_Tiwari_Resume.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadingResume(false);
    }, 400);
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        position: 'relative'
      }}
    >
      <div className="section-wrapper" style={{ textAlign: 'center', width: '100%' }}>
        {/* Profile Photo Showcase */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.75rem' }}>
          {/* Animated Ambient Glow Ring */}
          <div
            className="avatar-glow"
            style={{
              position: 'absolute',
              inset: '-5px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald), var(--accent-amber))',
              opacity: 0.85,
              zIndex: 0
            }}
          />

          {/* Avatar Image Frame */}
          <div
            style={{
              position: 'relative',
              width: '136px',
              height: '136px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--bg-primary)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
              background: 'var(--bg-secondary)',
              zIndex: 1,
              transition: 'transform var(--transition-normal)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
          >
            <img
              src={profile?.avatar || '/profile.jpg'}
              alt="Nishant Tiwari - Full-Stack Developer & AI / ML Engineer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%'
              }}
              onError={(e) => {
                // Fallback to stylized initials if image load fails
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Active Status Beacon Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '6px',
              background: 'var(--bg-primary)',
              border: '2px solid var(--accent-emerald)',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.8)',
              zIndex: 2
            }}
            title="Nishant Tiwari - Active & Available"
          >
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
          </div>
        </div>

        {/* Availability & Patent Highlight Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          <div
            className="glass-panel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: 'var(--accent-emerald)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            <span className="status-dot" />
            <span>{profile?.statusBadge || '🟢 Available for Roles & Projects'}</span>
          </div>

          <div
            className="glass-panel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: 'var(--accent-amber)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <Award size={15} color="var(--accent-amber)" />
            <span>Patent Published: 202521015415</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.3rem, 5.2vw, 4.4rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            marginBottom: '1.25rem',
            color: 'var(--text-primary)'
          }}
        >
          Building <span style={{ color: 'var(--accent-cyan)' }}>AI-powered platforms</span> &amp;<br />
          <span style={{ color: 'var(--text-secondary)' }}>real-time fullstack</span> web applications.
        </h1>

        {/* Bio Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '780px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}
        >
          {profile?.tagline ||
            'B.Tech CSE (AI) engineer specializing in full-stack MERN, WebRTC real-time systems, multi-modal autonomous AI agents, and IoT architectures.'}
        </p>

        {/* Hero CTA Button Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem'
          }}
        >
          <a
            href="#projects"
            onClick={() => playSound('click')}
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
          >
            <span>View Projects</span>
            <ArrowRight size={18} />
          </a>

          <button
            onClick={() => {
              playSound('open');
              onOpenCommandPalette();
            }}
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
          >
            <Terminal size={18} color="var(--accent-cyan)" />
            <span>Interactive CLI</span>
            <kbd
              style={{
                fontSize: '0.75rem',
                background: 'rgba(255,255,255,0.08)',
                padding: '0.15rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid var(--border-card)'
              }}
            >
              ⌘K
            </kbd>
          </button>

          <button
            onClick={handleDownloadResume}
            disabled={downloadingResume}
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.4rem' }}
            title="Download Nishant Tiwari's Complete Resume (Markdown/Doc)"
          >
            <Download size={18} />
            <span>{downloadingResume ? 'Generating...' : 'Download Resume'}</span>
          </button>
        </div>

        {/* Contact Pill Row: Email, Phone & Location */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '4rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="glass-panel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)',
              color: copiedEmail ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontFamily: 'var(--font-mono)'
            }}
            title="Click to copy email address"
          >
            {copiedEmail ? <CheckCircle2 size={16} color="var(--accent-emerald)" /> : <Mail size={16} />}
            <span>{copiedEmail ? 'Email Copied!' : profile?.email || 'nishanttiwari.nt9@gmail.com'}</span>
          </button>

          {/* Copy Phone Button */}
          <button
            onClick={handleCopyPhone}
            className="glass-panel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)',
              color: copiedPhone ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontFamily: 'var(--font-mono)'
            }}
            title="Click to copy phone number"
          >
            {copiedPhone ? <CheckCircle2 size={16} color="var(--accent-emerald)" /> : <Phone size={16} />}
            <span>{copiedPhone ? 'Phone Copied!' : profile?.phone || '+91-7389744808'}</span>
          </button>

          {/* Social Links */}
          <a
            href={profile?.socials?.github || 'https://github.com/nishanttiwari'}
            target="_blank"
            rel="noreferrer"
            className="btn-icon"
            title="GitHub Profile"
            onClick={() => playSound('click')}
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile?.socials?.linkedin || 'https://www.linkedin.com/in/nishant-tiwari-191a89412/'}
            target="_blank"
            rel="noreferrer"
            className="btn-icon"
            title="LinkedIn Profile (Nishant Tiwari)"
            onClick={() => playSound('click')}
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={profile?.socials?.youtube || 'https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ'}
            target="_blank"
            rel="noreferrer"
            className="btn-icon"
            title="YouTube Channel (@innostack-369)"
            onClick={() => playSound('click')}
            style={{ color: '#ef4444' }}
          >
            <YoutubeIcon size={18} color="#ef4444" />
          </a>
        </div>

        {/* Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            maxWidth: '1020px',
            margin: '0 auto'
          }}
        >
          {(profile?.metrics || [
            { label: 'B.Tech CSE (AI) SPI', value: '7.3' },
            { label: 'Published Patents', value: '1 (AI MedTech)' },
            { label: 'AI & Fullstack Projects', value: '4+' },
            { label: 'Certifications', value: '2' }
          ]).map((metric, idx) => (
            <div
              key={metric.label}
              className="glass-panel"
              onMouseEnter={() => playSound('hover')}
              style={{
                padding: '1.5rem 1.25rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                  fontWeight: 900,
                  fontFamily: 'var(--font-mono)',
                  color: idx % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-emerald)',
                  lineHeight: 1.1,
                  marginBottom: '0.35rem'
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 500
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
