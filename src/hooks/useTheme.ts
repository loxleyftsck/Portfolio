import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('theme');
      return stored === 'light' ? 'light' : 'dark';
    } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch { /* Theme still works without storage. */ }
  }, [theme]);
  return { theme, toggle: () => setTheme(value => value === 'dark' ? 'light' : 'dark') };
}
