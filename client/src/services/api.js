import fallbackData from '../data/portfolioData.json';

const API_BASE = '/api';

const getLocalItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocalItem = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
};

export const api = {
  // Profile
  async getProfile() {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      return data.data;
    } catch (err) {
      return getLocalItem('profile', fallbackData.profile);
    }
  },

  async updateProfile(profileData) {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {
      // Local fallback
    }
    setLocalItem('profile', profileData);
    return profileData;
  },

  // Projects
  async getProjects(category) {
    try {
      const url = category && category !== 'All' 
        ? `${API_BASE}/projects?category=${encodeURIComponent(category)}`
        : `${API_BASE}/projects`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      return data.data;
    } catch (err) {
      let projs = getLocalItem('projects', fallbackData.projects);
      if (category && category !== 'All') {
        projs = projs.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
      }
      return projs;
    }
  },

  async getProjectById(id) {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`);
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {}
    const projs = getLocalItem('projects', fallbackData.projects);
    return projs.find(p => p.id === id || p.slug === id);
  },

  async upvoteProject(id) {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}/like`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {}
    const projs = getLocalItem('projects', fallbackData.projects);
    const p = projs.find(item => item.id === id || item.slug === id);
    if (p) {
      p.upvotes = (p.upvotes || 0) + 1;
      setLocalItem('projects', projs);
      return p;
    }
    return null;
  },

  // Videos Showcase
  async getVideos(category) {
    try {
      const url = category && category !== 'All'
        ? `${API_BASE}/videos?category=${encodeURIComponent(category)}`
        : `${API_BASE}/videos`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch videos');
      const data = await res.json();
      return data.data;
    } catch (err) {
      let vids = fallbackData.videos || [];
      if (category && category !== 'All') {
        vids = vids.filter(v => v.category.toLowerCase().includes(category.toLowerCase()));
      }
      return vids;
    }
  },

  // Skills
  async getSkills() {
    try {
      const res = await fetch(`${API_BASE}/skills`);
      if (!res.ok) throw new Error('Failed to fetch skills');
      const data = await res.json();
      return data.data;
    } catch (err) {
      return fallbackData.skills;
    }
  },

  // Experience
  async getExperience() {
    try {
      const res = await fetch(`${API_BASE}/experience`);
      if (!res.ok) throw new Error('Failed to fetch experience');
      const data = await res.json();
      return data.data;
    } catch (err) {
      return fallbackData.experience;
    }
  },

  // Guestbook
  async getGuestbook() {
    try {
      const res = await fetch(`${API_BASE}/guestbook`);
      if (!res.ok) throw new Error('Failed to fetch guestbook');
      const data = await res.json();
      return data.data;
    } catch (err) {
      return getLocalItem('guestbook', fallbackData.guestbook || []);
    }
  },

  async addGuestbookEntry(entry) {
    try {
      const res = await fetch(`${API_BASE}/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {}

    const newEntry = {
      id: "gb_" + Date.now(),
      name: entry.name.trim(),
      handle: entry.handle ? (entry.handle.startsWith('@') ? entry.handle.trim() : '@' + entry.handle.trim()) : '@anonymous',
      avatar: entry.avatar || '🚀',
      reaction: entry.reaction || '❤️',
      message: entry.message.trim(),
      timestamp: new Date().toISOString()
    };
    const current = getLocalItem('guestbook', fallbackData.guestbook || []);
    const updated = [newEntry, ...current];
    setLocalItem('guestbook', updated);
    return newEntry;
  },

  async deleteGuestbookEntry(id) {
    try {
      await fetch(`${API_BASE}/guestbook/${id}`, { method: 'DELETE' });
    } catch (e) {}
    const current = getLocalItem('guestbook', fallbackData.guestbook || []);
    const updated = current.filter(g => g.id !== id);
    setLocalItem('guestbook', updated);
    return { success: true };
  },

  // Contact
  async sendContactMessage(messageData) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    const messages = getLocalItem('messages', []);
    const newMsg = {
      id: 'msg_' + Date.now(),
      ...messageData,
      timestamp: new Date().toISOString()
    };
    setLocalItem('messages', [newMsg, ...messages]);
    return { success: true, message: 'Message sent successfully' };
  },

  async getMessages() {
    try {
      const res = await fetch(`${API_BASE}/messages`);
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {}
    return getLocalItem('messages', []);
  },

  async markMessageRead(id) {
    try {
      await fetch(`${API_BASE}/messages/${id}/read`, { method: 'PUT' });
    } catch (e) {}
    const messages = getLocalItem('messages', []);
    const updated = messages.map(m => m.id === id ? { ...m, isRead: true } : m);
    setLocalItem('messages', updated);
    return { success: true };
  },

  async deleteMessage(id) {
    try {
      await fetch(`${API_BASE}/messages/${id}`, { method: 'DELETE' });
    } catch (e) {}
    const messages = getLocalItem('messages', []);
    const updated = messages.filter(m => m.id !== id);
    setLocalItem('messages', updated);
    return { success: true };
  },

  // Analytics
  async getAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/analytics`);
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {}
    return fallbackData.analytics || {
      pageViews: 1420,
      uniqueVisitors: 680,
      resumeDownloads: 195,
      upvotesGiven: 940,
      dailyTraffic: [
        { date: "Aug 12", views: 190 },
        { date: "Aug 13", views: 240 },
        { date: "Aug 14", views: 210 },
        { date: "Aug 15", views: 280 },
        { date: "Aug 16", views: 330 },
        { date: "Aug 17", views: 305 },
        { date: "Aug 18", views: 375 }
      ]
    };
  },

  trackEvent(eventType, meta = {}) {
    try {
      fetch(`${API_BASE}/analytics/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: eventType, metadata: meta })
      }).catch(() => {});
    } catch (e) {}
  }
};
