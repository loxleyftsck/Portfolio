import { useEffect, useState } from 'react';
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
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="shell site-nav">
        <a href="#hero" className="wordmark" aria-label="HG.ai home" onClick={() => setOpen(false)}>HG<span>.ai</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button type="button" onClick={toggle} className="icon-button" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="nav-contact">Hire Me <ArrowUpRight size={15} /></a>
          <button type="button" className="icon-button menu-toggle" onClick={() => setOpen(value => !value)}
            aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {open && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
        {navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
          {link.label}<ArrowUpRight size={18} />
        </a>)}
      </nav>}
    </header>
  );
}
