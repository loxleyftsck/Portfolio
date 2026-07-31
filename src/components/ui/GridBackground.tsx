import { useEffect, useRef } from 'react';

/**
 * Fixed blueprint lattice behind the page. Two grids at different scales drift
 * at different rates as you scroll, which is what makes the depth read — a
 * single layer just looks like a static texture.
 *
 * Sits at z-0; page content is lifted to z-10 in App. Cards keep their opaque
 * backgrounds so the grid never runs underneath body text.
 */
export default function GridBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      el.style.setProperty('--fine-y', `${(-y * 0.11).toFixed(1)}px`);
      el.style.setProperty('--coarse-y', `${(-y * 0.035).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="grid-bg" aria-hidden="true">
      <div className="grid-bg__coarse" />
      <div className="grid-bg__fine" />
    </div>
  );
}
