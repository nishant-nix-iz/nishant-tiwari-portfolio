import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  Layers,
  Cpu,
  BookOpen,
  MessageSquare,
  Send
} from 'lucide-react';
import { YoutubeIcon } from './Icons';
import { playSound, isSoundEnabled, setSoundEnabled } from '../utils/soundFX';

export const Navbar = ({ 
  onOpenCommandPalette, 
  onOpenAdmin, 
  activeSection, 
  theme, 
  setTheme 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound('success');
  };

  const cycleTheme = () => {
    playSound('click');
    const themes = ['obsidian', 'cyberpunk', 'titanium'];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    const nextTheme = themes[nextIdx];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navItems = [
    { label: 'Projects', href: '#projects', icon: Layers },
    { label: 'Videos', href: '#youtube-showcase', icon: YoutubeIcon },
    { label: 'Skills', href: '#skills', icon: Cpu },
    { label: 'Journey', href: '#experience', icon: Sparkles },
    { label: 'Playground', href: '#playground', icon: Terminal },
    { label: 'Guestbook', href: '#guestbook', icon: BookOpen },
    { label: 'Contact', href: '#contact', icon: Send }
  ];

  const handleNavClick = (e, href) => {
    playSound('click');
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all var(--transition-normal)',
        padding: scrolled ? '0.75rem 1.5rem' : '1.25rem 2rem',
        background: scrolled ? 'var(--bg-glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-card)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.02em'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#090d16',
              fontWeight: 900,
              fontSize: '1rem',
              boxShadow: '0 0 15px var(--accent-cyan-glow)'
            }}
          >
            NT
          </div>
          <span>Nishant Tiwari<span style={{ color: 'var(--accent-cyan)' }}>.dev</span></span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--bg-card)',
            padding: '0.35rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-card)',
            backdropFilter: 'blur(12px)'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => playSound('hover')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-cyan-glow)' : 'transparent',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <item.icon size={14} />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Quick Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Spotlight / Command palette trigger */}
          <button
            onClick={() => {
              playSound('open');
              onOpenCommandPalette();
            }}
            className="btn-secondary"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <Terminal size={14} color="var(--accent-cyan)" />
            <span className="ctrl-k-text">CLI</span>
            <kbd
              style={{
                fontSize: '0.7rem',
                background: 'rgba(255,255,255,0.08)',
                padding: '0.15rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid var(--border-card)'
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="btn-icon"
            title={soundOn ? "Mute audio effects" : "Enable audio effects"}
            aria-label="Toggle Sound"
          >
            {soundOn ? <Volume2 size={18} color="var(--accent-cyan)" /> : <VolumeX size={18} />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={cycleTheme}
            className="btn-icon"
            title={`Current theme: ${theme}. Click to switch theme.`}
            aria-label="Toggle Theme"
          >
            {theme === 'titanium' ? <Sun size={18} color="var(--accent-amber)" /> : <Moon size={18} />}
          </button>

          {/* Admin Dashboard */}
          <button
            onClick={() => {
              playSound('open');
              onOpenAdmin();
            }}
            className="btn-icon"
            title="Owner Admin & Analytics Portal"
            aria-label="Admin Portal"
            style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
          >
            <ShieldCheck size={18} color="var(--accent-emerald)" />
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-menu-btn"
            aria-label="Toggle Mobile Menu"
            style={{ display: 'none' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card-solid)',
            borderBottom: '1px solid var(--border-card)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeIn 200ms ease-out'
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-card)'
              }}
            >
              <item.icon size={18} color="var(--accent-cyan)" />
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};
