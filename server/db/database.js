import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const defaultData = {
  profile: {
    name: "Nishant Tiwari",
    role: "Full-Stack Developer & AI / ML Engineer",
    tagline: "Building full-stack AI-driven web platforms, real-time WebRTC applications, multi-modal agents, and IoT systems.",
    bio: "Computer Science & AI engineering undergraduate at Rungta College of Engineering and Technology (Bhilai). Passionate about building production-grade MERN + WebRTC platforms, autonomous AI agents (n8n, RAG, GPT-4o), and intelligent IoT solutions with a published patent in AI-driven medical diagnosis.",
    avatar: "/profile.jpg",
    location: "Bhilai, Chhattisgarh, India (Open to Remote Worldwide)",
    phone: "+91-7389744808",
    email: "nishanttiwari.nt9@gmail.com",
    availability: "Available for Full-Stack, AI/ML Roles & Internships",
    statusBadge: "🟢 Available for Opportunities & Projects",
    resumeUrl: "#resume",
    socials: {
      github: "https://github.com/nishant-nix-iz",
      linkedin: "https://www.linkedin.com/in/nishant-tiwari-191a89412/",
      youtube: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      twitter: "https://x.com",
      discord: "nishanttiwari#0001"
    },
    metrics: [
      { label: "B.Tech CSE (AI) SPI", value: "7.3" },
      { label: "Published Patents", value: "1 (AI MedTech)" },
      { label: "AI & Fullstack Projects", value: "4+" },
      { label: "Verified Certifications", value: "6+" }
    ],
    education: {
      institution: "Rungta College of Engineering and Technology",
      degree: "B.Tech - Computer Science and Engineering (AI)",
      period: "2024 – 2028",
      location: "Bhilai, Chhattisgarh",
      spi: "7.3 (3rd Semester)"
    },
    patent: {
      title: "AI-Driven Multimodal Imaging Platform for Enhanced Breast Cancer Diagnosis",
      applicationNumber: "202521015415",
      date: "02 / 2025"
    },
    certifications: [
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
    ]
  },
  projects: [
    {
      id: "p1",
      title: "IntellMeet - AI Enterprise Video & Meeting Platform",
      slug: "intellmeet",
      category: "Fullstack & AI",
      summary: "Full-stack AI-powered enterprise meeting platform with real-time WebRTC video conferencing, live chat, AI meeting summaries, and smart action item extraction.",
      description: "IntellMeet is a collaborative video conferencing suite engineered with React 19, TypeScript, Node.js, and MongoDB. It features peer-to-peer WebRTC streaming, WebSocket typing indicators, OpenAI-powered automated meeting transcripts and action item extraction, and an integrated team Kanban board deployed on Vercel.",
      tech: ["React 19", "TypeScript", "Node.js", "MongoDB", "WebRTC", "Socket.io", "OpenAI API", "Tailwind CSS", "Redis", "Zustand", "Cloudinary"],
      stars: 48,
      upvotes: 142,
      featured: true,
      liveUrl: "https://intellmeet.vercel.app",
      githubUrl: "https://github.com/nishanttiwari/intellmeet",
      accentColor: "#06b6d4",
      stats: {
        "Latency": "< 40ms WebRTC",
        "AI Summaries": "GPT-4 Powered",
        "Deployment": "Vercel + Cloud"
      },
      problem: "Traditional video conference tools lack automated context extraction, forcing teams to take manual notes and follow up on action items asynchronously.",
      solution: "Engineered an end-to-end WebRTC video pipeline integrated with OpenAI API for automated speech transcript synthesis and smart Kanban task generation.",
      architecture: "React 19 + TypeScript client communicating via Socket.io signaling server and WebRTC mesh. Node.js backend handles JWT authentication, Redis caching, and OpenAI transcription workers."
    },
    {
      id: "p2",
      title: "Multi-Model Research Assistant",
      slug: "multi-model-research-assistant",
      category: "AI & Agents",
      summary: "AI-powered Research Assistant with multi-modal document processing, semantic search, vector database integration, and automated workflow orchestration.",
      description: "A comprehensive generative AI research agent utilizing n8n, GPT-4o, and PostgreSQL/Pinecone vector databases. Handles document parsing, OCR, multi-modal ingestion, semantic similarity search, and real-time live web searches via Tavily API.",
      tech: ["n8n", "GPT-4o", "PostgreSQL", "Pinecone", "OAI Embeddings", "Tavily API", "REST APIs", "Python", "RAG"],
      stars: 62,
      upvotes: 185,
      featured: true,
      liveUrl: "https://research-assistant-agent.demo",
      githubUrl: "https://github.com/nishanttiwari/multi-model-research-assistant",
      accentColor: "#10b981",
      stats: {
        "Search Accuracy": "98.5%",
        "Knowledge Base": "Multi-Modal",
        "Pipeline": "n8n + RAG"
      },
      problem: "Researchers struggle to synthesize findings across heterogeneous multi-modal PDFs, academic papers, and live web sources in real time.",
      solution: "Designed an automated Retrieval-Augmented Generation (RAG) agent that chunks documents, embeds them into vector stores, and synthesizes answers with citations.",
      architecture: "n8n orchestrated workflow connecting OpenAI Embeddings to PostgreSQL vector store with fallback live querying via Tavily Web Search API."
    },
    {
      id: "p3",
      title: "NeriDena - Smart Water Pipeline Leakage Detection System",
      slug: "neridena-iot",
      category: "IoT & Systems",
      summary: "IoT-based smart water pipeline leakage detection system to detect underground pipeline leaks in real time and minimize water wastage.",
      description: "NeriDena is an intelligent infrastructure monitoring system designed to detect subsurface water pipeline anomalies. Utilizes acoustic/flow sensors connected to microcontrollers to monitor pressure variations continuously and trigger immediate telemetry alerts.",
      tech: ["IoT", "Sensors", "Microcontrollers", "Python", "Telemetry", "Alerting System"],
      stars: 35,
      upvotes: 112,
      featured: true,
      liveUrl: "https://neridena-iot.demo",
      githubUrl: "https://github.com/nishanttiwari/neridena-water-leak-detection",
      accentColor: "#3b82f6",
      stats: {
        "Detection Time": "Real-Time",
        "Wastage Cut": "Up to 35%",
        "Sensors": "Acoustic / Flow"
      },
      problem: "Undetected underground pipeline leaks lead to massive drinking water loss and structural damage before physical inspection occurs.",
      solution: "Constructed an IoT sensor mesh that continuously tracks flow metrics, detects pressure anomalies, and transmits instant geo-tagged alerts.",
      architecture: "Embedded hardware sensor nodes broadcasting telemetry data to a centralized gateway for threshold evaluation and emergency notification dispatches."
    },
    {
      id: "p4",
      title: "Career Guidance Assistant AI",
      slug: "career-guidance-assistant",
      category: "AI & Agents",
      summary: "AI conversational chatbot built using n8n, OpenAI GPT, and Google Sheets for personalized career counseling and FAQ resolution.",
      description: "An automated conversational agent providing dynamic career roadmaps, college guidance, and skill recommendations. Incorporates session memory and dynamically pulls updated FAQs and resources from structured Google Sheets databases.",
      tech: ["n8n", "OpenAI GPT", "Google Sheets API", "AI Agent", "Simple Memory", "REST APIs"],
      stars: 29,
      upvotes: 94,
      featured: false,
      liveUrl: "https://career-assistant-n8n.demo",
      githubUrl: "https://github.com/nishanttiwari/career-guidance-assistant",
      accentColor: "#f59e0b",
      stats: {
        "Response Time": "< 1.2s",
        "Knowledge Sync": "Google Sheets",
        "Engine": "OpenAI GPT"
      },
      problem: "Students frequently struggle to find structured, up-to-date guidance and personalized recommendations on tech career pathways.",
      solution: "Created an interactive n8n-powered conversational agent with conversational memory and dynamic Google Sheets integration.",
      architecture: "n8n workflow webhook handling incoming visitor messages, querying Google Sheets for verified career info, and streaming GPT responses."
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", level: 92, years: "2+ yrs", icon: "Code2" },
        { name: "Java", level: 85, years: "2 yrs", icon: "Terminal" },
        { name: "JavaScript / TypeScript", level: 90, years: "2+ yrs", icon: "Code2" },
        { name: "C Language", level: 82, years: "2 yrs", icon: "Cpu" },
        { name: "PHP", level: 78, years: "1+ yrs", icon: "Server" },
        { name: "SQL", level: 88, years: "2 yrs", icon: "Database" }
      ]
    },
    {
      category: "Full-Stack & Web Technologies",
      items: [
        { name: "React 19 & Next.js", level: 92, years: "2 yrs", icon: "Globe" },
        { name: "Node.js & Express.js", level: 90, years: "2 yrs", icon: "Server" },
        { name: "WebRTC & Socket.io", level: 88, years: "1+ yrs", icon: "Radio" },
        { name: "Tailwind CSS & Modern CSS", level: 94, years: "2 yrs", icon: "Palette" },
        { name: "REST APIs & JWT Auth", level: 92, years: "2 yrs", icon: "Network" },
        { name: "State (Zustand, Redux)", level: 86, years: "1+ yrs", icon: "Layers" }
      ]
    },
    {
      category: "AI, ML & Workflow Automation",
      items: [
        { name: "Machine Learning (SVM, KNN, Decision Trees)", level: 88, years: "1+ yrs", icon: "Cpu" },
        { name: "Linear & Logistic Regression", level: 90, years: "1+ yrs", icon: "Activity" },
        { name: "n8n Automation & Workflows", level: 94, years: "1+ yrs", icon: "Sparkles" },
        { name: "RAG & Vector Databases (Pinecone)", level: 86, years: "1+ yrs", icon: "Database" },
        { name: "OpenAI GPT-4o & Prompt Engineering", level: 92, years: "1+ yrs", icon: "Sparkles" }
      ]
    },
    {
      category: "Databases & Cloud Tools",
      items: [
        { name: "MySQL", level: 90, years: "2 yrs", icon: "Database" },
        { name: "MongoDB", level: 88, years: "2 yrs", icon: "Database" },
        { name: "PostgreSQL", level: 85, years: "1+ yrs", icon: "Database" },
        { name: "Redis", level: 82, years: "1+ yrs", icon: "Layers" },
        { name: "Git / GitHub & Vercel", level: 92, years: "2 yrs", icon: "GitBranch" },
        { name: "IoT & Microcontrollers", level: 84, years: "1+ yrs", icon: "Boxes" }
      ]
    }
  ],
  experience: [
    {
      id: "exp1",
      role: "Web Developer & Machine Learning Intern (Remote)",
      company: "Happieloop Technologies",
      period: "02/2026 – 04/2026",
      location: "Pune, Maharashtra (Remote)",
      description: "Completed an intensive Machine Learning & Web Development internship gaining practical hands-on exposure to ML concepts, real-world data preprocessing, and model development.",
      highlights: [
        "Worked on real-world machine learning tasks, data preprocessing, and model performance evaluation.",
        "Enhanced Python programming, analytical thinking, and algorithmic problem-solving across AI fundamentals.",
        "Developed full-stack web integration pipelines connecting backend ML services with interactive frontend interfaces."
      ],
      tech: ["Python", "Machine Learning", "Data Preprocessing", "Web Development", "Model Evaluation"]
    },
    {
      id: "exp2",
      role: "B.Tech - Computer Science and Engineering (AI)",
      company: "Rungta College of Engineering and Technology",
      period: "2024 – 2028",
      location: "Bhilai, Chhattisgarh, India",
      description: "Pursuing Bachelor of Technology in Computer Science & Engineering with specialization in Artificial Intelligence. Academic SPI (3rd Semester): 7.3.",
      highlights: [
        "Specializing in Artificial Intelligence, Machine Learning Algorithms, Data Structures, and Database Management Systems.",
        "Authored and filed a published MedTech Patent for AI-Driven Multimodal Cancer Diagnosis.",
        "Built multiple production-deployed full-stack web applications and IoT hardware monitoring prototypes."
      ],
      tech: ["Artificial Intelligence", "Machine Learning", "Data Structures", "Algorithms", "IoT", "DBMS"]
    },
    {
      id: "exp3",
      role: "Patent Innovator (AI MedTech)",
      company: "Intellectual Property India (Patent Office)",
      period: "Filed: 02/2025",
      location: "India",
      description: "Published and filed patent: 'AI-Driven Multimodal Imaging Platform for Enhanced Breast Cancer Diagnosis' (Application Number: 202521015415).",
      highlights: [
        "Engineered an AI platform designed for multimodal imaging analysis to assist in early and accurate breast cancer detection.",
        "Applied deep learning and computer vision architectures for cross-modal radiological feature extraction.",
        "Awarded official patent application filing and participation verification."
      ],
      tech: ["Multimodal AI", "Medical Imaging", "Deep Learning", "Computer Vision", "Patent 202521015415"]
    }
  ],
  guestbook: [
    {
      id: "gb1",
      name: "Sarah Chen",
      handle: "@sarah_tech",
      avatar: "🚀",
      reaction: "🔥",
      message: "The IntellMeet WebRTC video platform and n8n AI research agents are awesome projects!",
      timestamp: "2026-08-16T14:20:00Z"
    },
    {
      id: "gb2",
      name: "Aditya Sharma",
      handle: "@aditya_ai",
      avatar: "⚡",
      reaction: "⭐",
      message: "Fascinating work on the AI Breast Cancer Diagnosis patent and NeriDena IoT system. Keep inspiring!",
      timestamp: "2026-08-17T09:15:00Z"
    },
    {
      id: "gb3",
      name: "Elena Rostova",
      handle: "@elena_dev",
      avatar: "💎",
      reaction: "❤️",
      message: "Super smooth portfolio design, great WebRTC and ML skillset Nishant!",
      timestamp: "2026-08-18T11:45:00Z"
    }
  ],
  messages: [
    {
      id: "msg1",
      name: "Tech Recruiter",
      email: "recruiter@innovatetech.io",
      subject: "Full-Stack AI Developer Role / Project Collaboration",
      message: "Hi Nishant, we reviewed your IntellMeet platform and AI patent work. We would love to discuss exciting opportunities with our engineering team!",
      isRead: false,
      timestamp: "2026-08-18T10:12:00Z"
    }
  ],
  analytics: {
    totalViews: 1540,
    uniqueVisitors: 1060,
    projectClicks: 720,
    commandExecutions: 380,
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
  },
  videos: [
    {
      id: "yt_1",
      title: "EduVerify: The Future of Fake Degree Detection",
      description: "A tamper-proof academic credential verification and anti-fraud platform enabling educational institutions to issue cryptographically signed digital certificates, allowing students to securely store and share credentials, and empowering employers to verify authentic certificates with sub-second latency.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "Security & Verification",
      duration: "10:45",
      views: "2.4K",
      tags: ["EduVerify", "Anti-Fraud", "Cryptography", "Blockchain", "React", "Node.js"],
      featured: true,
      publishedDate: "2025"
    },
    {
      id: "yt_2",
      title: "InnoStack AI Agent Orchestrator & Autonomous Workflow Engine",
      description: "Designing an autonomous multi-agent execution pipeline with self-correcting prompt iterations, real-time web scrapers, dynamic tool calling, and automated workflow triggers on InnoStack.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "AI & Automation",
      duration: "13:20",
      views: "1.8K",
      tags: ["AI Agents", "Python", "Tool Calling", "FastAPI", "Automation"],
      featured: true,
      publishedDate: "2025"
    },
    {
      id: "yt_3",
      title: "High-Concurrency Real-Time WebSocket & Pub/Sub Architecture",
      description: "Step-by-step architectural breakdown of high-throughput real-time communication systems using Redis Pub/Sub, Node.js clustering, and WebSocket connection pooling.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "System Design & Web",
      duration: "15:10",
      views: "1.5K",
      tags: ["WebSockets", "Redis", "System Design", "Node.js", "Scalability"],
      featured: false,
      publishedDate: "2025"
    },
    {
      id: "yt_4",
      title: "Computer Vision & Edge Visual Anomaly Detection Pipeline",
      description: "Building a lightweight real-time visual anomaly detector using OpenCV, PyTorch, and camera stream buffers for real-time edge defect identification.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "Computer Vision",
      duration: "11:35",
      views: "1.1K",
      tags: ["OpenCV", "Computer Vision", "PyTorch", "Python", "Edge AI"],
      featured: false,
      publishedDate: "2024"
    },
    {
      id: "yt_5",
      title: "Full-Stack Multi-Tenant SaaS Platform Blueprint",
      description: "Deep dive into building multi-tenant SaaS web applications with role-based access control (RBAC), tenant-isolated databases, and automated CI/CD pipeline deployments.",
      channel: "InnoStack (@innostack-369)",
      channelUrl: "https://youtube.com/@innostack-369?si=kIAJrxlSibTamOLJ",
      category: "Full-Stack SaaS",
      duration: "16:40",
      views: "2.8K",
      tags: ["SaaS", "PostgreSQL", "Full-Stack", "Docker", "DevOps"],
      featured: true,
      publishedDate: "2025"
    }
  ]
};

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DB_FILE)) {
        this.write(defaultData);
      } else {
        // Validate JSON
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        JSON.parse(raw);
      }
    } catch (err) {
      console.warn("Database file reset to defaults due to parse error:", err);
      this.write(defaultData);
    }
  }

  read() {
    try {
      if (!fs.existsSync(DB_FILE)) {
        this.write(defaultData);
        return defaultData;
      }
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      return defaultData;
    }
  }

  write(data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error("Error writing to database:", err);
    }
  }

  // Profile
  getProfile() {
    const data = this.read();
    return data.profile;
  }

  updateProfile(newProfile) {
    const data = this.read();
    data.profile = { ...data.profile, ...newProfile };
    this.write(data);
    return data.profile;
  }

  // Projects
  getProjects() {
    const data = this.read();
    return data.projects || [];
  }

  getProjectById(id) {
    const data = this.read();
    return data.projects.find(p => p.id === id || p.slug === id);
  }

  upvoteProject(id) {
    const data = this.read();
    const project = data.projects.find(p => p.id === id || p.slug === id);
    if (project) {
      project.upvotes = (project.upvotes || 0) + 1;
      data.analytics.upvotesGiven = (data.analytics.upvotesGiven || 0) + 1;
      this.write(data);
      return project;
    }
    return null;
  }

  // Videos
  getVideos() {
    const data = this.read();
    return data.videos || [];
  }

  getVideoById(id) {
    const data = this.read();
    return (data.videos || []).find(v => v.id === id);
  }

  // Skills
  getSkills() {
    const data = this.read();
    return data.skills || [];
  }

  // Experience
  getExperience() {
    const data = this.read();
    return data.experience || [];
  }

  // Guestbook
  getGuestbook() {
    const data = this.read();
    return data.guestbook || [];
  }

  addGuestbookEntry({ name, handle, avatar, reaction, message }) {
    const data = this.read();
    const newEntry = {
      id: "gb_" + Date.now(),
      name: name.trim(),
      handle: handle ? (handle.startsWith('@') ? handle.trim() : '@' + handle.trim()) : '@anonymous',
      avatar: avatar || '🚀',
      reaction: reaction || '❤️',
      message: message.trim(),
      timestamp: new Date().toISOString()
    };
    data.guestbook.unshift(newEntry);
    this.write(data);
    return newEntry;
  }

  deleteGuestbookEntry(id) {
    const data = this.read();
    data.guestbook = data.guestbook.filter(g => g.id !== id);
    this.write(data);
    return true;
  }

  // Contact Messages
  getMessages() {
    const data = this.read();
    return data.messages || [];
  }

  addMessage({ name, email, subject, message }) {
    const data = this.read();
    const newMsg = {
      id: "msg_" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: (subject || "Portfolio Contact Inquiry").trim(),
      message: message.trim(),
      isRead: false,
      timestamp: new Date().toISOString()
    };
    if (!data.messages) data.messages = [];
    data.messages.unshift(newMsg);
    this.write(data);
    return newMsg;
  }

  markMessageRead(id) {
    const data = this.read();
    const msg = data.messages.find(m => m.id === id);
    if (msg) {
      msg.isRead = true;
      this.write(data);
      return msg;
    }
    return null;
  }

  deleteMessage(id) {
    const data = this.read();
    data.messages = data.messages.filter(m => m.id !== id);
    this.write(data);
    return true;
  }

  // Analytics
  getAnalytics() {
    const data = this.read();
    return data.analytics;
  }

  recordEvent(eventType, meta = {}) {
    const data = this.read();
    if (!data.analytics) data.analytics = { totalViews: 0, projectClicks: 0, commandExecutions: 0, resumeDownloads: 0, upvotesGiven: 0, dailyTraffic: [] };

    if (eventType === 'view') {
      data.analytics.totalViews = (data.analytics.totalViews || 0) + 1;
    } else if (eventType === 'project_click') {
      data.analytics.projectClicks = (data.analytics.projectClicks || 0) + 1;
    } else if (eventType === 'command') {
      data.analytics.commandExecutions = (data.analytics.commandExecutions || 0) + 1;
    } else if (eventType === 'resume') {
      data.analytics.resumeDownloads = (data.analytics.resumeDownloads || 0) + 1;
    }

    this.write(data);
    return data.analytics;
  }
}

export const db = new Database();
