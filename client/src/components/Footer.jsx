import React, { useState, useEffect } from 'react';
import { ArrowUp, Terminal, Heart, Sparkles, Cpu, ShieldCheck } from 'lucide-react';
import { playSound } from '../utils/soundFX';

export const Footer = ({ onOpenAdmin, onOpenCLI }) => {
  const [latency, setLatency] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 4) + 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-card)',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 2,
        padding: '4rem 1.5rem 2.5rem'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem'
        }}
      >
        {/* Top Tier */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#090d16',
                  fontWeight: 900,
                  fontSize: '0.8rem'
                }}
              >
                NT
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                Nishant Tiwari
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>
              Crafting high-throughput distributed architectures, microservices, and fluid kinetic web interfaces.
            </p>
          </div>

          {/* Quick Actions & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              className="glass-panel"
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <span className="status-dot" />
              <span>API Ping: <strong style={{ color: 'var(--accent-emerald)' }}>{latency}ms</strong></span>
            </div>

            <button
              onClick={() => {
                playSound('open');
                onOpenCLI();
              }}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
            >
              <Terminal size={14} color="var(--accent-cyan)" />
              <span>Open CLI</span>
            </button>

            <button
              onClick={scrollToTop}
              className="btn-icon"
              title="Scroll to Top"
              style={{ width: '38px', height: '38px' }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Tier */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.75rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} Nishant Tiwari. Engineered with React, Express, and Canvas.
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span>Privacy First</span>
            <span>•</span>
            <span>Sub-millisecond Latency</span>
            <span>•</span>
            <button
              onClick={() => {
                playSound('open');
                onOpenAdmin();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.82rem'
              }}
            >
              <ShieldCheck size={14} />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
