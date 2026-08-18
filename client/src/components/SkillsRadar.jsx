import React, { useState } from 'react';
import { 
  Cpu, 
  Search, 
  Code2, 
  Globe, 
  Server, 
  Cloud, 
  Sparkles, 
  Layers, 
  Zap, 
  Shield 
} from 'lucide-react';
import { playSound } from '../utils/soundFX';

export const SkillsRadar = ({ skills = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryIcons = {
    'Languages': Code2,
    'Frontend & UI': Globe,
    'Backend & Systems': Server,
    'Cloud & DevOps': Cloud,
    'AI & Data': Sparkles
  };

  // Flattened & filtered skills
  const allCategories = ['All', ...skills.map(s => s.category)];

  const displayedGroups = skills.map(group => {
    let items = group.items;
    if (searchQuery.trim()) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return {
      category: group.category,
      items
    };
  }).filter(group => {
    if (activeCategory !== 'All' && group.category !== activeCategory) return false;
    return group.items.length > 0;
  });

  return (
    <section id="skills" style={{ position: 'relative' }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">Skills &amp; Technology Radar</h2>
          <p className="section-subtitle">
            Core proficiencies, modern frameworks, low-level systems architectures, and cloud deployment pipelines.
          </p>
        </div>

        {/* Filter Controls: Category Buttons & Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {allCategories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    playSound('click');
                    setActiveCategory(cat);
                  }}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.84rem',
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

          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              minWidth: '240px'
            }}
          >
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.5rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                fontSize: '0.88rem'
              }}
            />
          </div>
        </div>

        {/* Skills Groups Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {displayedGroups.map((group) => {
            const IconComp = categoryIcons[group.category] || Layers;
            return (
              <div
                key={group.category}
                className="glass-panel"
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                {/* Group Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-cyan-glow)',
                      border: '1px solid var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    <IconComp size={18} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {group.category}
                  </h3>
                </div>

                {/* Skill Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => playSound('hover')}
                      style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.88rem'
                        }}
                      >
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {item.name}
                        </span>
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              color: 'var(--text-muted)'
                            }}
                          >
                            {item.years}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              color: 'var(--accent-cyan)'
                            }}
                          >
                            {item.level}%
                          </span>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="skill-bar-track">
                        <div
                          className="skill-bar-fill"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
