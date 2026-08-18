import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Heart, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundFX';
import { ProjectModal } from './ProjectModal';
import { api } from '../services/api';

export const ProjectsSection = ({ projects, onProjectLiked }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [likedProjects, setLikedProjects] = useState(new Set());

  const categories = ['All', 'Cloud & Systems', 'AI & ML', 'Frontend & UI', 'Fullstack'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleUpvote = async (projectId) => {
    playSound('upvote');
    const nextSet = new Set(likedProjects);
    const isAdding = !nextSet.has(projectId);

    if (isAdding) {
      nextSet.add(projectId);
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 }
      });
    } else {
      nextSet.delete(projectId);
    }
    setLikedProjects(nextSet);

    try {
      const updated = await api.upvoteProject(projectId);
      if (onProjectLiked) onProjectLiked(updated);
      if (activeModalProject && activeModalProject.id === projectId) {
        setActiveModalProject(updated);
      }
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  // 3D Tilt Card Component
  const TiltCard = ({ project }) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
    const [isHovered, setIsHovered] = useState(false);
    const isLiked = likedProjects.has(project.id);

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt angles (max 6 deg)
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTilt({ x: rotateX, y: rotateY, glareX, glareY });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      playSound('hover');
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
    };

    return (
      <div
        className="tilt-card-container"
        style={{ height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="glass-panel tilt-card"
          onClick={() => {
            playSound('open');
            setActiveModalProject(project);
            api.trackEvent('project_click', { title: project.title });
          }}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.75rem',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`
          }}
        >
          {/* Dynamic Ambient Glare Glow */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(6, 182, 212, 0.12), transparent 70%)`,
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
          )}

          {/* Card Top Row: Tag & Upvote */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                className="section-tag"
                style={{
                  marginBottom: 0,
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.6rem',
                  borderColor: project.accentColor || 'var(--accent-cyan)'
                }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--accent-amber)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700
                  }}
                >
                  ★ Featured
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUpvote(project.id);
              }}
              className={`upvote-btn ${isLiked ? 'liked' : ''}`}
              title="Upvote this project"
            >
              <Heart size={14} fill={isLiked ? 'var(--accent-rose)' : 'none'} color="var(--accent-rose)" />
              <span>{project.upvotes || 0}</span>
            </button>
          </div>

          {/* Project Title */}
          <h3
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
              lineHeight: 1.25,
              position: 'relative',
              zIndex: 1
            }}
          >
            {project.title}
          </h3>

          {/* Summary */}
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              flex: 1,
              position: 'relative',
              zIndex: 1
            }}
          >
            {project.summary}
          </p>

          {/* Tech stack pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            {project.tech?.slice(0, 5).map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
            {project.tech?.length > 5 && (
              <span className="tech-pill" style={{ opacity: 0.7 }}>
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* Footer Action Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--accent-cyan)'
              }}
            >
              Case Study <ChevronRight size={14} />
            </span>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound('click');
                  }}
                  className="btn-icon"
                  style={{ width: '32px', height: '32px' }}
                  title="GitHub Repo"
                >
                  <GithubIcon size={14} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound('click');
                  }}
                  className="btn-icon"
                  style={{ width: '32px', height: '32px' }}
                  title="Live Demo"
                >
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" style={{ position: 'relative' }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>Engineering Showcase</span>
          </div>
          <h2 className="section-title">Architected Systems &amp; Deployments</h2>
          <p className="section-subtitle">
            Production-grade systems, distributed architectures, and fluid interactive applications built for scale and sub-millisecond responsiveness.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  playSound('click');
                  setSelectedCategory(cat);
                }}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-card)',
                  background: isSelected ? 'var(--accent-cyan-glow)' : 'var(--bg-card)',
                  color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onUpvote={handleUpvote}
          isLiked={likedProjects.has(activeModalProject.id)}
        />
      )}
    </section>
  );
};
