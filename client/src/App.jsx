import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CommandPalette } from './components/CommandPalette';
import { ProjectsSection } from './components/ProjectsSection';
import { YouTubeShowcase } from './components/YouTubeShowcase';
import { SkillsRadar } from './components/SkillsRadar';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { InteractivePlayground } from './components/InteractivePlayground';
import { GuestbookSection } from './components/GuestbookSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { api } from './services/api';
import './styles/animations.css';

export function App() {
  const [theme, setTheme] = useState('obsidian');
  const [activeSection, setActiveSection] = useState('hero');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [videos, setVideos] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [guestbook, setGuestbook] = useState([]);
  const [loading, setLoading] = useState(true);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track initial page visit
  useEffect(() => {
    api.trackEvent('view');
  }, []);

  // Fetch initial portfolio dataset
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [profData, projData, videoData, skillData, expData, gbData] = await Promise.all([
          api.getProfile(),
          api.getProjects(),
          api.getVideos(),
          api.getSkills(),
          api.getExperience(),
          api.getGuestbook()
        ]);
        setProfile(profData);
        setProjects(projData || []);
        setVideos(videoData || []);
        setSkills(skillData || []);
        setExperience(expData || []);
        setGuestbook(gbData || []);
      } catch (err) {
        console.error("Initial data load failed:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);

  // Scrollspy observer for active section
  useEffect(() => {
    const sections = ['hero', 'projects', 'youtube-showcase', 'skills', 'experience', 'playground', 'guestbook', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProjectLiked = (updatedProject) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleGuestbookAdded = (newEntry) => {
    setGuestbook(prev => [newEntry, ...prev]);
  };

  const handleProfileUpdated = (newProfile) => {
    setProfile(newProfile);
  };

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          gap: '1rem',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '3px solid var(--border-subtle)',
              borderTopColor: 'var(--accent-cyan)',
              borderRadius: '50%',
              animation: 'orbitSpin 0.8s linear infinite'
            }}
          />
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>INITIALIZING CORE...</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
          Loading microservices &amp; persistent state...
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Background Interactive Particle Web Canvas */}
      <ParticleCanvas />

      {/* Desktop Custom Interactive Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        activeSection={activeSection}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Page Sections */}
      <main className="main-content">
        <Hero
          profile={profile}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        <ProjectsSection
          projects={projects}
          onProjectLiked={handleProjectLiked}
        />

        <YouTubeShowcase videos={videos} />

        <SkillsRadar skills={skills} />

        <ExperienceTimeline
          experience={experience}
          certifications={profile?.certifications || []}
        />

        <InteractivePlayground />

        <GuestbookSection
          entries={guestbook}
          onEntryAdded={handleGuestbookAdded}
        />

        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenCLI={() => setCommandPaletteOpen(true)}
      />

      {/* Interactive Command Palette / Terminal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        setTheme={setTheme}
        projects={projects}
      />

      {/* Owner Admin & Telemetry Dashboard */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        profile={profile}
        onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
}

export default App;
