import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, .tilt-card, .btn');
      setHovered(!!isInteractive);
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth animation loop for the trailing ring
    let animationId;
    const animateTrailing = () => {
      setTrailing((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18
        };
      });
      animationId = requestAnimationFrame(animateTrailing);
    };
    animationId = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [position.x, position.y]);

  if (!visible) return null;

  return (
    <>
      {/* Center Dot */}
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-cyan)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 100ms ease'
        }}
      />
      {/* Outer Halo */}
      <div
        style={{
          position: 'fixed',
          top: trailing.y,
          left: trailing.x,
          width: hovered ? '48px' : '26px',
          height: hovered ? '48px' : '26px',
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}`,
          backgroundColor: hovered ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 200ms ease, height 200ms ease, border-color 200ms ease, background-color 200ms ease'
        }}
      />
    </>
  );
};
