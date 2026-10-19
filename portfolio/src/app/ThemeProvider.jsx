import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { const saved = localStorage.getItem('adarsha-theme'); if (saved === 'light' || saved === 'dark') return saved; } catch {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [manual, setManual] = useState(() => { try { return ['light','dark'].includes(localStorage.getItem('adarsha-theme')); } catch { return false; } });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#241c18' : '#f6f3ec';
  }, [theme]);
  useEffect(() => {
    if (manual) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(media.matches ? 'dark' : 'light');
    const onChange = (event) => setTheme(event.matches ? 'dark' : 'light');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [manual]);
  useEffect(() => {
    const onStorage = (event) => { if (event.key === 'adarsha-theme' && ['light','dark'].includes(event.newValue)) { setTheme(event.newValue); setManual(true); } };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next); setManual(true);
    try { localStorage.setItem('adarsha-theme', next); } catch { /* Storage can be disabled; the toggle still works. */ }
  };
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
