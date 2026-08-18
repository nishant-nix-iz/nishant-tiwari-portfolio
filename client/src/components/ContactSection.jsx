import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { YoutubeIcon } from './Icons';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundFX';
import { api } from '../services/api';

export const ContactSection = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound('click');
    setLoading(true);
    setFeedback(null);

    try {
      const res = await api.sendContactMessage(formData);
      playSound('success');
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.8 }
      });
      setFeedback({
        type: 'success',
        message: res.message || "Message sent! I'll get back to you promptly."
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to send message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ position: 'relative' }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <Send size={14} />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="section-title">Let's Build Something Exceptional</h2>
          <p className="section-subtitle">
            Whether you have an ambitious platform architecture in mind, need strategic systems consulting, or want to discuss full-time opportunities.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 380px) 1fr',
            gap: '2.5rem',
            maxWidth: '1080px',
            margin: '0 auto',
            alignItems: 'start'
          }}
          className="contact-layout"
        >
          {/* Info Side Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              className="glass-panel"
              style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)' }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                Contact Channels
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-cyan-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Direct Email</div>
                    <a
                      href={`mailto:${profile?.email || 'nishanttiwari.nt9@gmail.com'}`}
                      style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}
                    >
                      {profile?.email || 'nishanttiwari.nt9@gmail.com'}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(6, 182, 212, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Phone / WhatsApp</div>
                    <a
                      href={`tel:${profile?.phone || '+91-7389744808'}`}
                      style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}
                    >
                      {profile?.phone || '+91-7389744808'}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(239, 68, 68, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ef4444'
                    }}
                  >
                    <YoutubeIcon size={20} color="#ef4444" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>YouTube Channel</div>
                    <a
                      href={profile?.socials?.youtube || 'https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ'}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}
                    >
                      @innostack-369
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-emerald-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-emerald)'
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Location &amp; University</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem' }}>
                      {profile?.location || 'Bhilai, Chhattisgarh, India'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(245, 158, 11, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-amber)'
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Response Time</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem' }}>
                      Within 24 business hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div
              className="glass-panel"
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <span className="status-dot" />
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                {profile?.availability || 'Available for contract & full-time architectural roles.'}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div
            className="glass-panel"
            style={{
              padding: '2.25rem',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-two-col">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject / Purpose</label>
                <input
                  type="text"
                  placeholder="e.g. Project Consultation / Staff Role"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea
                  required
                  placeholder="Describe your goals, project scope, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                  style={{ minHeight: '140px' }}
                />
              </div>

              {feedback && (
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.25rem',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: feedback.type === 'success' ? '1px solid var(--accent-emerald)' : '1px solid #ef4444',
                    color: feedback.type === 'success' ? 'var(--accent-emerald)' : '#ef4444'
                  }}
                >
                  {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{feedback.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              >
                <Send size={17} />
                <span>{loading ? 'Transmitting Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
          }
          .form-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
