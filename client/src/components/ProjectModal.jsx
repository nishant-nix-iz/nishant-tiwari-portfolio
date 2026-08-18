import React from 'react';
import { 
  X, 
  ExternalLink, 
  Heart, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Cpu, 
  Server,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundFX';

export const ProjectModal = ({ project, onClose, onUpvote, isLiked }) => {
  if (!project) return null;

  const handleLike = (e) => {
    e.stopPropagation();
    playSound('upvote');
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    onUpvote(project.id);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '820px',
          maxHeight: '88vh',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem'
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span
                className="section-tag"
                style={{ marginBottom: 0, fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span
                  style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid var(--accent-amber)',
                    color: 'var(--accent-amber)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600
                  }}
                >
                  ★ Featured Architecture
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Overview & Summary */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          {project.description}
        </p>

        {/* Performance Metrics Stats Bar */}
        {project.stats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)'
            }}
          >
            {Object.entries(project.stats).map(([key, val]) => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  {val}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {key}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Deep Dive Case Study Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div
            className="glass-panel"
            style={{ padding: '1.25rem', borderLeft: '3px solid #ef4444' }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              The Engineering Challenge
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {project.problem || "Addressing high throughput latency and complex state reconciliation."}
            </p>
          </div>

          <div
            className="glass-panel"
            style={{ padding: '1.25rem', borderLeft: '3px solid var(--accent-emerald)' }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Architectural Solution
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {project.solution || "Designed an asynchronous distributed queue with memory-mapped caching."}
            </p>
          </div>
        </div>

        {/* System Architecture Detail */}
        {project.architecture && (
          <div
            style={{
              padding: '1.25rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Server size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                System Topology &amp; Stack
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {project.architecture}
            </p>
          </div>
        )}

        {/* Tech Badges List */}
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
            Technologies &amp; Libraries
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tech?.map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-card)',
            paddingTop: '1.25rem',
            marginTop: 'auto',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <button
            onClick={handleLike}
            className={`upvote-btn ${isLiked ? 'liked' : ''}`}
            style={{ padding: '0.6rem 1.1rem', fontSize: '0.92rem' }}
          >
            <Heart size={18} fill={isLiked ? 'var(--accent-rose)' : 'none'} color="var(--accent-rose)" />
            <span>{project.upvotes || 0} Upvotes</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
              >
                <GithubIcon size={16} />
                <span>Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
              >
                <span>Live Demo</span>
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
