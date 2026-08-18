import React, { useState } from 'react';
import { BookOpen, Send, Sparkles, MessageSquare, Check, Heart, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundFX';
import { api } from '../services/api';

export const GuestbookSection = ({ entries = [], onEntryAdded }) => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [avatar, setAvatar] = useState('🚀');
  const [reaction, setReaction] = useState('🔥');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const emojis = ['🚀', '⚡', '💎', '🦾', '☕', '🔥', '💻', '🎯', '✨', '👾'];
  const reactions = ['🔥', '❤️', '⭐', '💡', '🚀', '👏'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter your name and a brief message.' });
      return;
    }

    playSound('click');
    setSubmitting(true);
    setStatusMsg(null);

    try {
      const newEntry = await api.addGuestbookEntry({
        name,
        handle,
        avatar,
        reaction,
        message
      });

      playSound('success');
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 }
      });

      if (onEntryAdded) onEntryAdded(newEntry);
      setName('');
      setHandle('');
      setMessage('');
      setStatusMsg({ type: 'success', text: 'Thank you for signing the guestbook!' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to submit message.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook" style={{ position: 'relative' }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <BookOpen size={14} />
            <span>Community Board</span>
          </div>
          <h2 className="section-title">Visitor Guestbook &amp; Notes</h2>
          <p className="section-subtitle">
            Leave a message, say hello from anywhere in the world, or drop a quick feedback note.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 420px) 1fr',
            gap: '2rem',
            alignItems: 'start'
          }}
          className="guestbook-grid"
        >
          {/* Sign the Guestbook Form */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Sparkles size={18} color="var(--accent-cyan)" />
              <span>Sign the Board</span>
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Social Handle (Optional)</label>
                <input
                  type="text"
                  placeholder="@handle or website"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Avatar Selector */}
              <div className="form-group">
                <label className="form-label">Choose Avatar Icon</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {emojis.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => {
                        playSound('hover');
                        setAvatar(em);
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: avatar === em ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                        background: avatar === em ? 'var(--accent-cyan-glow)' : 'var(--bg-secondary)',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reaction Selector */}
              <div className="form-group">
                <label className="form-label">Badge Reaction</label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {reactions.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        playSound('hover');
                        setReaction(r);
                      }}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        border: reaction === r ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                        background: reaction === r ? 'var(--accent-emerald-glow)' : 'var(--bg-secondary)',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>Message *</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    {message.length}/500
                  </span>
                </label>
                <textarea
                  required
                  maxLength={500}
                  placeholder="Leave a thought, greeting, or tech discussion..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '100px' }}
                />
              </div>

              {statusMsg && (
                <div
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    fontSize: '0.85rem',
                    background: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: statusMsg.type === 'success' ? '1px solid var(--accent-emerald)' : '1px solid #ef4444',
                    color: statusMsg.type === 'success' ? 'var(--accent-emerald)' : '#ef4444'
                  }}
                >
                  {statusMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                <Send size={16} />
                <span>{submitting ? 'Signing...' : 'Sign Guestbook'}</span>
              </button>
            </form>
          </div>

          {/* Guestbook Messages Feed */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: '650px',
              overflowY: 'auto',
              paddingRight: '0.5rem'
            }}
          >
            {entries.length === 0 ? (
              <div
                className="glass-panel"
                style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}
              >
                <MessageSquare size={32} style={{ margin: '0 auto 0.75rem' }} />
                <p>No messages yet. Be the first visitor to sign!</p>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="glass-panel"
                  onMouseEnter={() => playSound('hover')}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}
                >
                  {/* Top Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-card)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem'
                        }}
                      >
                        {entry.avatar || '🚀'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {entry.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                          {entry.handle || '@guest'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '1.1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        {entry.reaction || '🔥'}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Message Body */}
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {entry.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .guestbook-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
