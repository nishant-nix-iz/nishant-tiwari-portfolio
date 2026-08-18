# 🚀 Nishant Tiwari | Full-Stack Interactive Animated Portfolio

A state-of-the-art, high-performance Full-Stack Developer Portfolio built with **React**, **Vite**, **Express.js**, and **HTML5 Canvas 2D**. Features 60fps ambient particle webs, 3D mouse tilt physics cards, interactive developer CLI / Command Palette (`Ctrl+K`), live algorithm & spring physics playground, persistent SQLite backend, and an owner administration and observability portal.

---

## ✨ Features

- **⚡ Full REST API Backend (Express + SQLite)**:
  - Persistent database for projects, skills, career journey, visitor guestbook, contact submissions, and telemetry analytics.
  - Rate limiting, email validation, and live upvote increment counters.
- **🌌 Interactive Particle Constellation Canvas**:
  - 60 FPS HTML5 Canvas background with dynamic cursor repulsion and distance-weighted node lines.
- **⌨️ Developer Command Palette / Terminal (`Ctrl+K` / `⌘K`)**:
  - Interactive CLI supporting commands: `help`, `projects`, `skills`, `journey`, `contact`, `hire`, `stats`, `theme`, `sound`, `matrix`, `easter-egg`, `clear`.
- **🛠️ 3D Tilt Project Cards & Deep-Dive Case Studies**:
  - Filterable by tech stack (Cloud & Systems, AI & ML, Frontend & UI, Fullstack).
  - True 3D perspective mouse tilt with dynamic glare effect.
  - Deep-dive case studies covering architectural challenges, solutions, topology diagrams, and live GitHub / Demo links.
  - Persistent upvoting system with optimistic UI and celebration confetti.
- **🎯 Live Developer Sandbox Playground**:
  - **Algorithm Simulator**: Step-by-step O(1) Token Bucket Rate Limiter and LRU Cache simulations with live console logs.
  - **Kinetic Spring Physics Solver**: Adjust stiffness, mass, and damping sliders to see Euler integration physics oscillations.
- **📖 Visitor Community Guestbook**:
  - Real-time visitor sign-in board with custom avatar emojis and badge reactions.
- **📬 Direct Contact Gateway**:
  - Client & backend sanitized form with spam protection and rate limiting.
- **🛡️ Owner Admin & Observability Portal**:
  - View real-time visitor telemetry, review & mark contact inquiries as read, moderate guestbook entries, and edit profile status/bio live.
- **🎨 Theme Engine & Audio SFX**:
  - 3 curated themes: `Obsidian Dark`, `Cyberpunk Neon`, and `Titanium Light`.
  - Subtle synthesized Web Audio API sound effects with mute toggle.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Lucide Icons, Canvas 2D, Canvas Confetti, Web Audio API, Vanilla CSS Design System Tokens
- **Backend**: Node.js, Express.js, JSON-relational database engine, CORS, Morgan logger
- **Fonts**: Plus Jakarta Sans, JetBrains Mono

---

## 🚀 Quick Start

### 1. Start Both Backend & Frontend (Single Command)
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 2. Independent Commands
```bash
# Run server backend only
npm run server

# Run frontend client only
npm run client

# Build frontend for production
npm run build
```

---

## 🔑 Key Shortcuts & Easter Eggs

- Press `Ctrl + K` or `⌘ + K` anywhere to open the Interactive Command Palette.
- Run `easter-egg` or `party` in the terminal for kinetic confetti celebration.
- Run `matrix` for cybernetic matrix stream.
- Click the Shield icon in the top right to open the Owner Admin Portal.
