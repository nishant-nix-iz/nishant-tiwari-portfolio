import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting map (in-memory per IP)
const rateLimits = new Map();
const rateLimiter = (limit = 10, windowMs = 60000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const record = rateLimits.get(ip) || { count: 0, resetAt: now + windowMs };

    if (now > record.resetAt) {
      record.count = 1;
      record.resetAt = now + windowMs;
    } else {
      record.count += 1;
    }

    rateLimits.set(ip, record);

    if (record.count > limit) {
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please slow down and try again shortly."
      });
    }
    next();
  };
};

// ---------------- API Routes ----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Profile
app.get('/api/profile', (req, res) => {
  try {
    const profile = db.getProfile();
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/profile', (req, res) => {
  try {
    const updated = db.updateProfile(req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Projects
app.get('/api/projects', (req, res) => {
  try {
    const { category } = req.query;
    let projects = db.getProjects();
    if (category && category !== 'All') {
      projects = projects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/projects/:id', (req, res) => {
  try {
    const project = db.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/projects/:id/like', (req, res) => {
  try {
    const updated = db.upvoteProject(req.params.id);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Videos Showcase
app.get('/api/videos', (req, res) => {
  try {
    const { category } = req.query;
    let videos = db.getVideos();
    if (category && category !== 'All') {
      videos = videos.filter(v => v.category.toLowerCase().includes(category.toLowerCase()));
    }
    res.json({ success: true, data: videos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Skills
app.get('/api/skills', (req, res) => {
  try {
    const skills = db.getSkills();
    res.json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Experience
app.get('/api/experience', (req, res) => {
  try {
    const experience = db.getExperience();
    res.json({ success: true, data: experience });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Guestbook
app.get('/api/guestbook', (req, res) => {
  try {
    const entries = db.getGuestbook();
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/guestbook', rateLimiter(15, 60000), (req, res) => {
  try {
    const { name, handle, avatar, reaction, message } = req.body;
    if (!name || !message || name.trim().length === 0 || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Name and message are required." });
    }
    if (message.length > 500) {
      return res.status(400).json({ success: false, error: "Message must be under 500 characters." });
    }
    const entry = db.addGuestbookEntry({ name, handle, avatar, reaction, message });
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/guestbook/:id', (req, res) => {
  try {
    db.deleteGuestbookEntry(req.params.id);
    res.json({ success: true, message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Contact Messages
app.get('/api/messages', (req, res) => {
  try {
    const messages = db.getMessages();
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/contact', rateLimiter(5, 60000), (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Please fill in your name, email, and message." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Please provide a valid email address." });
    }
    const saved = db.addMessage({ name, email, subject, message });
    res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you as soon as possible.",
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/messages/:id/read', (req, res) => {
  try {
    const updated = db.markMessageRead(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/messages/:id', (req, res) => {
  try {
    db.deleteMessage(req.params.id);
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Analytics
app.get('/api/analytics', (req, res) => {
  try {
    const analytics = db.getAnalytics();
    res.json({ success: true, data: analytics });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/analytics/event', (req, res) => {
  try {
    const { eventType, meta } = req.body;
    const updated = db.recordEvent(eventType, meta);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "API endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio REST API Server running at http://localhost:${PORT}`);
});
