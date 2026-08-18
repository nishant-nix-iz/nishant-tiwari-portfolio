import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { playSound } from '../utils/soundFX';

export const ExperienceTimeline = ({ experience = [], certifications = [] }) => {
  const defaultCertifications = [
    {
      title: "Data Science Certification",
      issuer: "Coding Spoon",
      category: "Data Science & Python",
      badge: "Verified"
    },
    {
      title: "Ignite for Entrepreneurs",
      issuer: "Wadhwani Foundation - India",
      category: "Entrepreneurship & Venture",
      badge: "Verified"
    },
    {
      title: "Machine Learning & AI Foundations",
      issuer: "DeepLearning.AI / Coursera",
      category: "Machine Learning",
      badge: "Accredited"
    },
    {
      title: "Full-Stack Web Development (MERN Stack)",
      issuer: "HackerRank / Meta Certified",
      category: "Web & Real-Time",
      badge: "Proficient"
    },
    {
      title: "n8n Workflow Automation & AI Agent Orchestration",
      issuer: "n8n Academy",
      category: "AI Agents & Automation",
      badge: "Specialist"
    },
    {
      title: "SQL & Relational Database Engineering",
      issuer: "HackerRank Skills Certification",
      category: "Databases & Backend",
      badge: "Advanced"
    }
  ];

  const certList = certifications.length > 0 ? certifications : defaultCertifications;

  const getItemIcon = (role = '') => {
    if (role.toLowerCase().includes('patent')) return Award;
    if (role.toLowerCase().includes('b.tech') || role.toLowerCase().includes('education')) return GraduationCap;
    return Briefcase;
  };

  return (
    <section id="experience" style={{ position: 'relative' }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={14} />
            <span>Journey &amp; Qualifications</span>
          </div>
          <h2 className="section-title">Experience, Education &amp; Patents</h2>
          <p className="section-subtitle">
            Internship experience, academic milestones in AI &amp; Computer Science, published medical technology patents, and verified industry credentials.
          </p>
        </div>

        {/* Timeline Container */}
        <div
          style={{
            position: 'relative',
            maxWidth: '880px',
            margin: '0 auto',
            paddingLeft: '2rem'
          }}
        >
          {/* Vertical Connecting Line */}
          <div
            style={{
              position: 'absolute',
              left: '7px',
              top: '15px',
              bottom: '15px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-emerald), var(--accent-amber), transparent)',
              borderRadius: 'var(--radius-full)'
            }}
          />

          {/* Timeline Entries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {experience.map((item, idx) => {
              const IconComp = getItemIcon(item.role);
              const isPatent = item.role.toLowerCase().includes('patent');

              return (
                <div
                  key={item.id || idx}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => playSound('hover')}
                >
                  {/* Glowing Node Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-2rem',
                      top: '1.25rem',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'var(--bg-primary)',
                      border: isPatent ? '3px solid var(--accent-amber)' : '3px solid var(--accent-cyan)',
                      boxShadow: isPatent ? '0 0 10px rgba(245, 158, 11, 0.4)' : '0 0 10px var(--accent-cyan-glow)',
                      zIndex: 2
                    }}
                  />

                  {/* Content Card */}
                  <div
                    className="glass-panel"
                    style={{
                      padding: '1.75rem',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      borderColor: isPatent ? 'rgba(245, 158, 11, 0.3)' : undefined
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radius-md)',
                            background: isPatent ? 'rgba(245, 158, 11, 0.15)' : 'var(--accent-cyan-glow)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isPatent ? 'var(--accent-amber)' : 'var(--accent-cyan)',
                            flexShrink: 0
                          }}
                        >
                          <IconComp size={18} />
                        </div>
                        <div>
                          <h3
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: 800,
                              color: 'var(--text-primary)',
                              lineHeight: 1.2
                            }}
                          >
                            {item.role}
                          </h3>
                          <div
                            style={{
                              fontSize: '0.98rem',
                              fontWeight: 600,
                              color: isPatent ? 'var(--accent-amber)' : 'var(--accent-cyan)',
                              marginTop: '0.2rem'
                            }}
                          >
                            {item.company}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)'
                          }}
                        >
                          <Calendar size={13} />
                          {item.period}
                        </span>
                        {item.location && (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontSize: '0.78rem',
                              color: 'var(--text-muted)'
                            }}
                          >
                            <MapPin size={12} />
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {item.description}
                    </p>

                    {/* Highlights Bullet Points */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {item.highlights.map((h, i) => (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.5rem',
                              fontSize: '0.88rem',
                              color: 'var(--text-primary)'
                            }}
                          >
                            <CheckCircle2
                              size={16}
                              color={isPatent ? 'var(--accent-amber)' : 'var(--accent-emerald)'}
                              style={{ flexShrink: 0, marginTop: '0.15rem' }}
                            />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech stack used */}
                    {item.tech && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.45rem',
                          paddingTop: '0.5rem',
                          borderTop: '1px solid var(--border-subtle)'
                        }}
                      >
                        {item.tech.map((t) => (
                          <span key={t} className="tech-pill" style={{ fontSize: '0.75rem' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certifications Box */}
          <div style={{ marginTop: '3.5rem' }}>
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-cyan-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                      Verified Certifications &amp; Accreditations
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Industry verified credentials in AI, Data Science, WebRTC, and Full-Stack
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    padding: '0.3rem 0.8rem',
                    background: 'var(--accent-emerald-glow)',
                    border: '1px solid var(--accent-emerald)',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--accent-emerald)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700
                  }}
                >
                  {certList.length} Credentials Listed
                </span>
              </div>

              {/* Responsive Certifications Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.15rem'
                }}
              >
                {certList.map((cert, index) => {
                  const title = typeof cert === 'string' ? cert : cert.title;
                  const issuer = typeof cert === 'object' ? cert.issuer : 'Verified Authority';
                  const category = typeof cert === 'object' ? cert.category : 'Technical';
                  const badge = typeof cert === 'object' ? cert.badge : 'Verified';

                  return (
                    <div
                      key={index}
                      onMouseEnter={() => playSound('hover')}
                      style={{
                        background: 'var(--bg-secondary)',
                        padding: '1.2rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.8rem',
                        transition: 'all var(--transition-fast)'
                      }}
                      className="glass-panel"
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <CheckCircle2
                          size={18}
                          color="var(--accent-emerald)"
                          style={{ flexShrink: 0, marginTop: '0.2rem' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.25rem' }}>
                            {title}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                            {issuer}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {category}
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--accent-emerald)',
                            background: 'rgba(16, 185, 129, 0.12)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid rgba(16, 185, 129, 0.25)'
                          }}
                        >
                          ✔ {badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
