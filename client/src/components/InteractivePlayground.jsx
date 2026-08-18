import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, Sliders, Cpu, Sparkles, Check, Activity } from 'lucide-react';
import { playSound } from '../utils/soundFX';

export const InteractivePlayground = () => {
  const [activeTab, setActiveTab] = useState('algorithm'); // 'algorithm' | 'physics'

  // --- 1. Algorithm Simulator State ---
  const [selectedSnippet, setSelectedSnippet] = useState('webrtc');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const snippets = {
    'webrtc': {
      title: 'WebRTC P2P Signaling & Media Mesh (IntellMeet)',
      description: 'Simulates ICE candidate negotiation, SDP offer/answer handshakes, and sub-50ms peer media transmission.',
      code: `// WebRTC Video Mesh Connector (IntellMeet)
class WebRTCPeerSession {
  async initiateHandshake(peerId) {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    return { peerId, sdp: offer.sdp };
  }
}`
    },
    'ml-knn': {
      title: 'K-Nearest Neighbors (KNN) Classifier & Gradient Step',
      description: 'Simulates Euclidean distance calculation across high-dimensional feature vectors with majority voting.',
      code: `// Machine Learning KNN Classifier (Python / JS)
function knnClassify(queryPoint, dataset, k = 3) {
  const distances = dataset.map(point => ({
    label: point.label,
    dist: Math.hypot(...point.features.map((f, i) => f - queryPoint[i]))
  }));
  distances.sort((a, b) => a.dist - b.dist);
  return majorityVote(distances.slice(0, k));
}`
    },
    'rag-agent': {
      title: 'Autonomous Multi-Modal RAG Agent (n8n + GPT-4o)',
      description: 'Simulates document chunking, OpenAI embeddings vector search in PostgreSQL, and context injection.',
      code: `// Multi-Modal RAG Workflow Pipeline
async function executeRAGQuery(query, vectorStore) {
  const embedding = await generateOAIEmbedding(query);
  const context = await vectorStore.querySimilar(embedding, { topK: 4 });
  return await invokeGPT4oWithContext(query, context);
}`
    }
  };

  const runSimulation = () => {
    playSound('terminal_key');
    setIsRunning(true);
    setConsoleLogs([]);

    let logs = [];
    if (selectedSnippet === 'webrtc') {
      logs = [
        "⚡ Initializing IntellMeet WebRTC Signaling Client...",
        "→ Created RTCPeerConnection instance with STUN turn relays.",
        "→ Capturing 1080p 60fps Video & Opus Audio MediaStream.",
        "→ Generating SDP Offer payload (H.264 / VP9 Codec profile)...",
        "→ Emitting 'offer-signal' over WebSocket server -> Room #Alpha4",
        "✔ Remote Peer connected: Received SDP Answer (RTT: 28ms)",
        "→ ICE Candidates reconciled. P2P Data & Video Channel OPEN.",
        "✔ AI Summary Daemon listening on live audio stream."
      ];
    } else if (selectedSnippet === 'ml-knn') {
      logs = [
        "⚡ Initializing ML Classification Pipeline (KNN k=3)...",
        "→ Ingesting normalized test vector: [0.82, 0.45, 0.91, 0.12]",
        "→ Calculating L2 Euclidean distances across training clusters...",
        "  • Neighbor #1 (dist: 0.042) -> Class 'Cancer_Benign'",
        "  • Neighbor #2 (dist: 0.051) -> Class 'Cancer_Benign'",
        "  • Neighbor #3 (dist: 0.089) -> Class 'Cancer_Malignant'",
        "→ Voting consensus: 2/3 Benign (Confidence: 94.2%)",
        "✔ Model inference completed in 1.4ms."
      ];
    } else {
      logs = [
        "⚡ Initializing Multi-Modal Research Assistant Workflow...",
        "→ Ingested Research Document: 'medical_imaging_patent.pdf' (14 pages)",
        "→ Chunked text & visual diagrams into 42 semantic blocks.",
        "→ Generated 1536-dim vectors via text-embedding-3-small.",
        "→ Queried PostgreSQL Vector Store (Cosine Similarity > 0.89)...",
        "→ Triggered Tavily live web retrieval for recent literature.",
        "→ GPT-4o synthesized verified response with 6 academic citations.",
        "✔ Automated research report dispatched."
      ];
    }

    logs.forEach((log, index) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, log]);
        playSound('hover');
        if (index === logs.length - 1) {
          setIsRunning(false);
          playSound('success');
        }
      }, (index + 1) * 220);
    });
  };

  // --- 2. Kinetic Spring Physics State ---
  const [stiffness, setStiffness] = useState(170);
  const [damping, setDamping] = useState(18);
  const [mass, setMass] = useState(1);
  const springCanvasRef = useRef(null);

  useEffect(() => {
    if (activeTab !== 'physics') return;
    const canvas = springCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;

    let pos = 50;
    let target = 280;
    let vel = 0;

    const animatePhysics = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const force = -stiffness * (pos - target) - damping * vel;
      const accel = force / mass;
      vel += accel * 0.016;
      pos += vel * 0.016;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(50, 80);
      ctx.lineTo(350, 80);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.beginPath();
      ctx.arc(target, 80, 8, 0, Math.PI * 2);
      ctx.fill();

      const gradient = ctx.createRadialGradient(pos, 80, 2, pos, 80, 18);
      gradient.addColorStop(0, '#06b6d4');
      gradient.addColorStop(1, '#0e7490');

      ctx.fillStyle = gradient;
      ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(pos, 80, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      frameId = requestAnimationFrame(animatePhysics);
    };

    frameId = requestAnimationFrame(animatePhysics);
    return () => cancelAnimationFrame(frameId);
  }, [activeTab, stiffness, damping, mass]);

  return (
    <section id="playground" style={{ position: 'relative' }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <Terminal size={14} />
            <span>Interactive Sandbox</span>
          </div>
          <h2 className="section-title">Live Developer Playground</h2>
          <p className="section-subtitle">
            Experience interactive WebRTC video streaming pipelines, machine learning algorithms, and real-time physics solvers.
          </p>
        </div>

        {/* Sandbox Panel */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--border-card)'
          }}
        >
          {/* Top Bar Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.5rem',
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-card)',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  playSound('click');
                  setActiveTab('algorithm');
                }}
                className={`btn ${activeTab === 'algorithm' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.84rem' }}
              >
                <Cpu size={14} />
                <span>WebRTC &amp; ML Simulators</span>
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  setActiveTab('physics');
                }}
                className={`btn ${activeTab === 'physics' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.84rem' }}
              >
                <Sliders size={14} />
                <span>Kinetic Spring Physics</span>
              </button>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--accent-emerald)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span className="status-dot" /> Live Sandbox
            </span>
          </div>

          {/* Tab 1: Algorithm Runner */}
          {activeTab === 'algorithm' && (
            <div style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {Object.keys(snippets).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        playSound('click');
                        setSelectedSnippet(key);
                        setConsoleLogs([]);
                      }}
                      style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        fontFamily: 'var(--font-mono)',
                        border: selectedSnippet === key ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                        background: selectedSnippet === key ? 'var(--accent-cyan-glow)' : 'transparent',
                        color: selectedSnippet === key ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {snippets[key].title.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="btn btn-emerald"
                  style={{ padding: '0.5rem 1.2rem', fontSize: '0.88rem' }}
                >
                  <Play size={15} />
                  <span>{isRunning ? 'Executing...' : 'Run Simulation'}</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem' }} className="playground-grid">
                {/* Code Block */}
                <div
                  style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    border: '1px solid var(--border-subtle)',
                    overflowX: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.5
                  }}
                >
                  <pre>{snippets[selectedSnippet].code}</pre>
                </div>

                {/* Console Log Terminal */}
                <div
                  style={{
                    background: '#04070d',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    border: '1px solid var(--border-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '220px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      paddingBottom: '0.5rem',
                      marginBottom: '0.75rem',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <span>SIMULATION LOGS</span>
                    <button
                      onClick={() => setConsoleLogs([])}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      <RotateCcw size={12} />
                    </button>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      lineHeight: 1.55,
                      color: 'var(--text-primary)'
                    }}
                  >
                    {consoleLogs.length === 0 ? (
                      <span style={{ color: 'var(--text-muted)' }}>
                        Click "Run Simulation" to execute the WebRTC / ML pipeline...
                      </span>
                    ) : (
                      consoleLogs.map((log, idx) => (
                        <div
                          key={idx}
                          style={{
                            color: log.includes('BLOCKED')
                              ? 'var(--accent-rose)'
                              : log.includes('✔')
                              ? 'var(--accent-emerald)'
                              : log.includes('⚡')
                              ? 'var(--accent-amber)'
                              : 'var(--text-secondary)'
                          }}
                        >
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Kinetic Spring Physics */}
          {activeTab === 'physics' && (
            <div style={{ padding: '1.75rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Adjust spring stiffness, mass, and damping coefficients to visualize the real-time Euler integration solver used for fluid UI animations.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
                {/* Visualizer Canvas */}
                <div
                  style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-card)',
                    padding: '1rem',
                    textAlign: 'center'
                  }}
                >
                  <canvas
                    ref={springCanvasRef}
                    width={380}
                    height={160}
                    style={{ width: '100%', height: '160px' }}
                  />
                  <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Continuous Real-Time Spring Oscillation
                  </div>
                </div>

                {/* Slider Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 600 }}>Stiffness (k):</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{stiffness}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="400"
                      value={stiffness}
                      onChange={(e) => setStiffness(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 600 }}>Damping (c):</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>{damping}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={damping}
                      onChange={(e) => setDamping(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 600 }}>Mass (m):</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>{mass}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={mass}
                      onChange={(e) => setMass(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent-amber)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .playground-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
