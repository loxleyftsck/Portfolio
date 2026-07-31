import { useState } from 'react';
import { Menu, X, Sun, Moon } from '../ui/Icons';
import { GithubIcon } from '../ui/Icons';
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

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" className="font-bold text-gray-900 dark:text-white tracking-tight text-lg">
          HG<span className="text-gray-400 dark:text-gray-500">.ai</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="hidden md:flex btn-primary text-sm py-2 px-4">
            Hire Me
          </a>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 flex flex-col gap-4">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="nav-link text-base" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary justify-center" onClick={() => setOpen(false)}>
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}

// Suppress unused warning — GithubIcon kept for potential extension
void GithubIcon;
