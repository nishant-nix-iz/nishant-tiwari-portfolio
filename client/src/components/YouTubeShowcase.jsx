import React, { useState } from 'react';
import { 
  Play, 
  ExternalLink, 
  Eye, 
  Clock, 
  Sparkles, 
  Layers, 
  Cpu, 
  Video, 
  CheckCircle2, 
  X,
  Share2,
  Tv
} from 'lucide-react';
import { YoutubeIcon } from './Icons';
import { playSound } from '../utils/soundFX';
import { api } from '../services/api';

export const YouTubeShowcase = ({ videos = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const defaultVideos = [
    {
      id: "yt_1",
      title: "EduVerify: The Future of Fake Degree Detection",
      description: "A tamper-proof academic credential verification and anti-fraud platform enabling educational institutions to issue cryptographically signed digital certificates, allowing students to securely store and share credentials, and empowering employers to verify authentic certificates with sub-second latency.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "Security & Verification",
      duration: "10:45",
      views: "2.4K",
      tags: ["EduVerify", "Anti-Fraud", "Cryptography", "Blockchain", "React", "Node.js"],
      featured: true,
      publishedDate: "2025",
      chapters: [
        { time: "00:00", title: "Problem Statement: Rise of Academic Forgery" },
        { time: "02:30", title: "Cryptographic Certificate Issuance Flow" },
        { time: "05:40", title: "Tamper-Proof Verification Pipeline & QR Validation" },
        { time: "08:15", title: "Employer Verification Portal Demo" }
      ]
    },
    {
      id: "yt_2",
      title: "InnoStack AI Agent Orchestrator & Autonomous Workflow Engine",
      description: "Designing an autonomous multi-agent execution pipeline with self-correcting prompt iterations, real-time web scrapers, dynamic tool calling, and automated workflow triggers on InnoStack.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "AI & Automation",
      duration: "13:20",
      views: "1.8K",
      tags: ["AI Agents", "Python", "Tool Calling", "FastAPI", "Automation"],
      featured: true,
      publishedDate: "2025",
      chapters: [
        { time: "00:00", title: "Agent Orchestration Principles" },
        { time: "03:45", title: "Dynamic Tool & API Dispatching" },
        { time: "07:20", title: "Self-Healing Retries & Loop Avoidance" },
        { time: "10:50", title: "Automated Production Workflow Execution" }
      ]
    },
    {
      id: "yt_3",
      title: "High-Concurrency Real-Time WebSocket & Pub/Sub Architecture",
      description: "Step-by-step architectural breakdown of high-throughput real-time communication systems using Redis Pub/Sub, Node.js clustering, and WebSocket connection pooling.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "System Design & Web",
      duration: "15:10",
      views: "1.5K",
      tags: ["WebSockets", "Redis", "System Design", "Node.js", "Scalability"],
      featured: false,
      publishedDate: "2025",
      chapters: [
        { time: "00:00", title: "C10K Concurrency Challenges" },
        { time: "04:10", title: "Redis Pub/Sub Channel Sharding" },
        { time: "08:30", title: "Heartbeat, Ping-Pong & Reconnection Mesh" },
        { time: "12:15", title: "Load Testing with 50,000 Simulated Sockets" }
      ]
    },
    {
      id: "yt_4",
      title: "Computer Vision & Edge Visual Anomaly Detection Pipeline",
      description: "Building a lightweight real-time visual anomaly detector using OpenCV, PyTorch, and camera stream buffers for real-time edge defect identification.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "Computer Vision",
      duration: "11:35",
      views: "1.1K",
      tags: ["OpenCV", "Computer Vision", "PyTorch", "Python", "Edge AI"],
      featured: false,
      publishedDate: "2024",
      chapters: [
        { time: "00:00", title: "Edge Video Ingestion & Frame Normalization" },
        { time: "03:15", title: "Feature Extraction & Contouring with OpenCV" },
        { time: "06:40", title: "PyTorch Inference Optimization" },
        { time: "09:20", title: "Live Defect Bounding Box Classification" }
      ]
    },
    {
      id: "yt_5",
      title: "Full-Stack Multi-Tenant SaaS Platform Blueprint",
      description: "Deep dive into building multi-tenant SaaS web applications with role-based access control (RBAC), tenant-isolated databases, and automated CI/CD pipeline deployments.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "Full-Stack SaaS",
      duration: "16:40",
      views: "2.8K",
      tags: ["SaaS", "PostgreSQL", "Full-Stack", "Docker", "DevOps"],
      featured: true,
      publishedDate: "2025",
      chapters: [
        { time: "00:00", title: "Multi-Tenancy vs Multi-Schema Strategies" },
        { time: "04:30", title: "Role-Based Access Control (RBAC) & JWTs" },
        { time: "09:10", title: "Stripe Subscriptions & Webhook Processing" },
        { time: "13:45", title: "Zero-Downtime Deployment with Docker" }
      ]
    }
  ];

  const videoList = videos.length > 0 ? videos : defaultVideos;

  const categories = ['All', 'Security & Verification', 'AI & Automation', 'System Design & Web', 'Computer Vision', 'Full-Stack SaaS'];

  const filteredVideos = selectedCategory === 'All'
    ? videoList
    : videoList.filter(v => v.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleOpenVideo = (video) => {
    playSound('open');
    setActiveVideoModal(video);
    api.trackEvent('video_view', { id: video.id, title: video.title });
  };

  return (
    <section id="youtube-showcase" style={{ position: 'relative' }}>
      <div className="section-wrapper">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <YoutubeIcon size={16} color="#ef4444" />
            <span>YouTube Engineering Hub</span>
          </div>
          <h2 className="section-title">Project Demos &amp; Video Walkthroughs</h2>
          <p className="section-subtitle">
            Watch real-time system architectures, WebRTC demo videos, AI autonomous workflow builds, and IoT hardware tests hosted on <strong>InnoStack (@innostack-369)</strong>.
          </p>
        </div>

        {/* YouTube Channel Banner Card */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '1020px',
            margin: '0 auto 2.5rem',
            padding: '1.75rem 2rem',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(6, 182, 212, 0.05), var(--bg-card))',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '2px solid rgba(239, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.35)',
                flexShrink: 0
              }}
            >
              <YoutubeIcon size={28} color="#ef4444" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  InnoStack
                </h3>
                <span
                  style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 700
                  }}
                >
                  @innostack-369
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Engineering tutorials, real-time WebRTC platforms, autonomous AI workflows, and software deep dives by Nishant Tiwari.
              </p>
            </div>
          </div>

          <a
            href="https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ"
            target="_blank"
            rel="noreferrer"
            className="btn"
            onClick={() => playSound('click')}
            style={{
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              padding: '0.65rem 1.4rem',
              fontSize: '0.92rem',
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
            }}
          >
            <YoutubeIcon size={18} color="#ffffff" />
            <span>Visit YouTube Channel</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Filter Categories */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSound('click');
                setSelectedCategory(cat);
              }}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedCategory === cat ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                background: selectedCategory === cat ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-secondary)',
                color: selectedCategory === cat ? '#ef4444' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="glass-panel tilt-card"
              onMouseEnter={() => playSound('hover')}
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border-card)',
                transition: 'transform var(--transition-normal), border-color var(--transition-normal)'
              }}
            >
              {/* Thumbnail Container */}
              <div
                style={{
                  position: 'relative',
                  height: '190px',
                  background: 'linear-gradient(135deg, #090d16, #161e2e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onClick={() => handleOpenVideo(video)}
              >
                {/* Decorative Canvas Wave Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.2,
                    background: 'radial-gradient(circle at 50% 50%, #ef4444 0%, transparent 70%)'
                  }}
                />

                {/* Big Play Button Icon */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.9)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 25px rgba(239, 68, 68, 0.7)',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 2
                  }}
                  className="play-pulse"
                >
                  <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
                </div>

                {/* Duration Badge */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '12px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    fontSize: '0.76rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Clock size={11} />
                  {video.duration}
                </span>

                {/* Category Pill */}
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    zIndex: 2
                  }}
                >
                  {video.category}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3
                    onClick={() => handleOpenVideo(video)}
                    style={{
                      fontSize: '1.12rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      lineHeight: 1.35,
                      marginBottom: '0.6rem',
                      cursor: 'pointer'
                    }}
                  >
                    {video.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.86rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {video.description}
                  </p>

                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {video.tags.map((t) => (
                      <span key={t} className="tech-pill" style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-subtle)'
                  }}
                >
                  <button
                    onClick={() => handleOpenVideo(video)}
                    className="btn btn-secondary"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                  >
                    <Play size={13} />
                    <span>Watch Demo</span>
                  </button>

                  <a
                    href={video.channelUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playSound('click')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: '#ef4444',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <YoutubeIcon size={14} color="#ef4444" />
                    <span>YouTube</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Walkthrough Player Modal */}
      {activeVideoModal && (
        <div className="modal-overlay" onClick={() => setActiveVideoModal(null)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '780px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-card-solid)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              overflow: 'hidden'
            }}
          >
            {/* Modal Video Header Screen */}
            <div
              style={{
                position: 'relative',
                height: '280px',
                background: '#04070d',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid var(--border-card)',
                padding: '2rem',
                textAlign: 'center'
              }}
            >
              <button
                onClick={() => setActiveVideoModal(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: 'none',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 35px rgba(239, 68, 68, 0.8)',
                  marginBottom: '1rem'
                }}
              >
                <Play size={30} fill="#ffffff" color="#ffffff" style={{ marginLeft: '4px' }} />
              </div>

              <h4 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 800, maxWidth: '600px', marginBottom: '0.4rem' }}>
                {activeVideoModal.title}
              </h4>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.84rem', fontFamily: 'var(--font-mono)' }}>
                Duration: {activeVideoModal.duration} • Channel: InnoStack (@innostack-369)
              </div>
            </div>

            {/* Modal Body & Chapters */}
            <div style={{ padding: '1.75rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Key Technical Chapters &amp; Architectural Highlights
              </h4>

              {activeVideoModal.chapters && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {activeVideoModal.chapters.map((chap, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0.85rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.86rem'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: '#ef4444',
                          fontWeight: 700,
                          fontSize: '0.8rem'
                        }}
                      >
                        {chap.time}
                      </span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{chap.title}</span>
                    </div>
                  ))}
                </div>
              )}

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {activeVideoModal.description}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="btn btn-secondary"
                  style={{ padding: '0.55rem 1.2rem', fontSize: '0.88rem' }}
                >
                  Close
                </button>

                <a
                  href={activeVideoModal.channelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  onClick={() => playSound('click')}
                  style={{
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.55rem 1.4rem',
                    fontSize: '0.88rem',
                    fontWeight: 700
                  }}
                >
                  <YoutubeIcon size={16} color="#ffffff" />
                  <span>Open On YouTube Channel</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
