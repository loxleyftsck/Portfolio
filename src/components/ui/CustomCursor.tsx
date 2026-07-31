import { useEffect, useRef } from 'react';

/**
 * CustomCursor — professional dual-element cursor.
 *
 * Dot   : 6 px, snaps instantly. Hides on hover/text states.
 * Ring  : 28 px, lerp-trails behind. Expands on hover, morphs on text.
 * Ripple: single-use div spawned on click, cleaned up after animation.
 *
 * All motion is driven by RAF + direct DOM mutation — zero React re-renders,
 * zero layout costs, stable 60 fps.
 *
 * Auto-disabled on touch / pointer:coarse devices and when the user
 * prefers-reduced-motion.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Guard: touch devices or reduced-motion preference ──────────────────
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ── Config ──────────────────────────────────────────────────────────────
    const LERP = 0.15;                     // ring lag (higher = snappier)
    const HOVER_SEL = 'a, button, [role="button"], label, [data-cursor-hover]';
    const TEXT_SEL  = 'input, textarea, select, [contenteditable]';

    // ── State ───────────────────────────────────────────────────────────────
    let mouseX = -200, mouseY = -200;
    let ringX  = -200, ringY  = -200;
    let state: 'default' | 'hover' | 'text' = 'default';
    let rafId: number;
    let pressing = false;

    // ── Helpers ─────────────────────────────────────────────────────────────
    const setState = (next: typeof state) => {
      if (state === next) return;
      state = next;

      switch (next) {
        case 'hover':
          ring.style.width           = '42px';
          ring.style.height          = '42px';
          ring.style.borderColor     = 'rgba(255,255,255,0.9)';
          ring.style.backgroundColor = 'rgba(255,255,255,0.06)';
          ring.style.borderWidth     = '1.5px';
          break;
        case 'text':
          ring.style.width           = '2px';
          ring.style.height          = '24px';
          ring.style.borderRadius    = '2px';
          ring.style.borderColor     = 'rgba(255,255,255,0.85)';
          ring.style.backgroundColor = 'rgba(255,255,255,0.15)';
          ring.style.borderWidth     = '0px';
          break;
        default:
          ring.style.width           = '28px';
          ring.style.height          = '28px';
          ring.style.borderRadius    = '50%';
          ring.style.borderColor     = 'rgba(255,255,255,1)';
          ring.style.backgroundColor = 'transparent';
          ring.style.borderWidth     = '1.5px';
      }
    };

    // ── Mouse move ──────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as Element;
      if (target.closest(TEXT_SEL)) {
        setState('text');
      } else if (target.closest(HOVER_SEL)) {
        setState('hover');
      } else {
        setState('default');
      }
    };

    // ── Visibility ──────────────────────────────────────────────────────────
    const show = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };
    const hide = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };

    // ── Click ripple ────────────────────────────────────────────────────────
    const spawnRipple = (x: number, y: number) => {
      const r = document.createElement('div');
      r.className = 'cursor-ripple';
      r.style.left = `${x}px`;
      r.style.top  = `${y}px`;
      document.body.appendChild(r);
      // Clean up after animation (400 ms)
      setTimeout(() => r.remove(), 420);
    };

    const onDown = (e: MouseEvent) => {
      pressing = true;
      spawnRipple(e.clientX, e.clientY);
    };

    const onUp = () => { pressing = false; };

    // ── RAF loop ─────────────────────────────────────────────────────────────
    const animate = () => {
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;

      const isText = state === 'text';
      const isHover = state === 'hover';

      // Dot: snaps to cursor, hides on hover/text, squishes on press
      const dotScale = pressing ? 0.5 : (isHover || isText) ? 0 : 1;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(${dotScale})`;

      // Ring: trails behind, text mode = caret above cursor
      if (isText) {
        // center the caret bar on x, offset y to read naturally
        ring.style.transform = `translate(${ringX - 1}px, ${ringY - 12}px)`;
      } else {
        const half = isHover ? 21 : 14;
        ring.style.transform = `translate(${ringX - half}px, ${ringY - half}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    // ── Attach ───────────────────────────────────────────────────────────────
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    document.documentElement.addEventListener('mouseenter', show);
    document.documentElement.addEventListener('mouseleave', hide);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      document.documentElement.removeEventListener('mouseenter', show);
      document.documentElement.removeEventListener('mouseleave', hide);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
