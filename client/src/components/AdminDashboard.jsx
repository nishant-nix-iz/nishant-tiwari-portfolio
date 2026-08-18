import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  X, 
  Eye, 
  MousePointer, 
  Terminal, 
  Heart, 
  Mail, 
  Trash2, 
  Check, 
  TrendingUp, 
  RefreshCw,
  Edit3,
  BookOpen
} from 'lucide-react';
import { playSound } from '../utils/soundFX';
import { api } from '../services/api';

export const AdminDashboard = ({ isOpen, onClose, profile, onProfileUpdated }) => {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'messages' | 'guestbook' | 'profile'
  const [analytics, setAnalytics] = useState(null);
  const [messages, setMessages] = useState([]);
  const [guestbook, setGuestbook] = useState([]);
  const [loading, setLoading] = useState(false);

  // Profile Editor state
  const [editStatus, setEditStatus] = useState(profile?.statusBadge || '');
  const [editBio, setEditBio] = useState(profile?.bio || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [anData, msgData, gbData] = await Promise.all([
        api.getAnalytics(),
        api.getMessages(),
        api.getGuestbook()
      ]);
      setAnalytics(anData);
      setMessages(msgData || []);
      setGuestbook(gbData || []);
    } catch (err) {
      console.error("Admin data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    playSound('click');
    try {
      await api.markMessageRead(id);
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id) => {
    playSound('click');
    try {
      await api.deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGuestbook = async (id) => {
    playSound('click');
    try {
      await api.deleteGuestbookEntry(id);
      setGuestbook(guestbook.filter(g => g.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    playSound('click');
    try {
      const updated = await api.updateProfile({
        statusBadge: editStatus,
        bio: editBio
      });
      if (onProfileUpdated) onProfileUpdated(updated);
      setSaveSuccess(true);
      playSound('success');
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '880px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 2rem',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-emerald)'
              }}
            >
              <ShieldCheck size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                Admin &amp; Observability Portal
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Authenticated Session • SQLite Backend Active
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={loadData}
              className="btn-icon"
              style={{ width: '32px', height: '32px' }}
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={onClose}
              className="btn-icon"
              style={{ width: '32px', height: '32px' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '0.75rem 2rem',
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {[
            { id: 'analytics', label: 'Telemetry & Stats', icon: TrendingUp },
            { id: 'messages', label: `Inquiries (${messages.filter(m => !m.isRead).length})`, icon: Mail },
            { id: 'guestbook', label: `Guestbook (${guestbook.length})`, icon: BookOpen },
            { id: 'profile', label: 'Live Settings', icon: Edit3 }
          ].map((tab) => {
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSound('click');
                  setActiveTab(tab.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isSel ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                  background: isSel ? 'var(--accent-cyan-glow)' : 'transparent',
                  color: isSel ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                }}
              >
                <tab.icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {/* TAB 1: ANALYTICS */}
          {activeTab === 'analytics' && analytics && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Stat Metric Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '1rem'
                }}
              >
                <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <Eye size={20} color="var(--accent-cyan)" style={{ margin: '0 auto 0.4rem' }} />
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    {analytics.totalViews || 0}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Views</div>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <MousePointer size={20} color="var(--accent-emerald)" style={{ margin: '0 auto 0.4rem' }} />
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    {analytics.projectClicks || 0}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Project Clicks</div>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <Terminal size={20} color="var(--accent-amber)" style={{ margin: '0 auto 0.4rem' }} />
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    {analytics.commandExecutions || 0}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>CLI Commands</div>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <Heart size={20} color="var(--accent-rose)" style={{ margin: '0 auto 0.4rem' }} />
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    {analytics.upvotesGiven || 0}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Upvotes Given</div>
                </div>
              </div>

              {/* Traffic Visual Bar Chart */}
              <div
                className="glass-panel"
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  7-Day Visitor Traffic Breakdown
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '1rem',
                    height: '140px',
                    paddingTop: '1rem'
                  }}
                >
                  {(analytics.dailyTraffic || []).map((day) => {
                    const heightPercent = Math.min((day.views / 380) * 100, 100);
                    return (
                      <div
                        key={day.date}
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.4rem',
                          height: '100%'
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                          {day.views}
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: `${heightPercent}%`,
                            background: 'linear-gradient(180deg, var(--accent-cyan), rgba(6, 182, 212, 0.2))',
                            borderRadius: '4px 4px 0 0',
                            transition: 'height 400ms ease'
                          }}
                        />
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {day.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INCOMING MESSAGES */}
          {activeTab === 'messages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                  No contact submissions received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="glass-panel"
                    style={{
                      padding: '1.25rem 1.5rem',
                      borderLeft: msg.isRead ? '3px solid var(--border-subtle)' : '3px solid var(--accent-cyan)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                          {msg.name}
                        </span>
                        <a
                          href={`mailto:${msg.email}`}
                          style={{
                            marginLeft: '0.6rem',
                            fontSize: '0.84rem',
                            color: 'var(--accent-cyan)',
                            textDecoration: 'none'
                          }}
                        >
                          &lt;{msg.email}&gt;
                        </a>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                        {!msg.isRead && (
                          <button
                            onClick={() => handleMarkRead(msg.id)}
                            className="btn-icon"
                            style={{ width: '28px', height: '28px' }}
                            title="Mark as Read"
                          >
                            <Check size={14} color="var(--accent-emerald)" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="btn-icon"
                          style={{ width: '28px', height: '28px' }}
                          title="Delete Message"
                        >
                          <Trash2 size={14} color="#ef4444" />
                        </button>
                      </div>
                    </div>

                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      Subject: {msg.subject}
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: GUESTBOOK MODERATION */}
          {activeTab === 'guestbook' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {guestbook.map((entry) => (
                <div
                  key={entry.id}
                  className="glass-panel"
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{entry.avatar}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                        {entry.name} <span style={{ color: 'var(--accent-cyan)' }}>{entry.handle}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {entry.message}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteGuestbook(entry.id)}
                    className="btn-icon"
                    style={{ width: '32px', height: '32px' }}
                    title="Delete Entry"
                  >
                    <Trash2 size={14} color="#ef4444" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: LIVE PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Status Availability Badge</label>
                <input
                  type="text"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Portfolio Bio Summary</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="form-textarea"
                />
              </div>

              {saveSuccess && (
                <div style={{ color: 'var(--accent-emerald)', fontSize: '0.88rem' }}>
                  ✔ Profile updated successfully in SQLite backend!
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Save Profile Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
