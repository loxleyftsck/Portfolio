import { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#hero');
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = sections.filter(section => section.getBoundingClientRect().top <= 145).at(-1);
      setActive(current ? '#' + current.id : '#hero');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 901px)');
    const resized = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    desktop.addEventListener('change', resized);
    return () => {
      window.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
      desktop.removeEventListener('change', resized);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="shell site-nav">
        <a href="#hero" className="wordmark" aria-label="HG.ai home" onClick={() => setOpen(false)}>HG<span>.ai</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map(link => <a key={link.href} href={link.href}
            aria-current={active === link.href ? 'location' : undefined}>{link.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button type="button" onClick={toggle} className="icon-button"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="nav-contact">Hire Me <ArrowUpRight size={15} /></a>
          <button ref={menuButton} type="button" className="icon-button menu-toggle" onClick={() => setOpen(value => !value)}
            aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {open && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
        {navLinks.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? 'location' : undefined}
          onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={18} /></a>)}
      </nav>}
    </header>
  );
}
