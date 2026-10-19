import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m as motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { useTheme } from '../../app/ThemeProvider';
import { Brand } from '../common/Primitives';

export default function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const escape = event => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    const resize = () => { if (window.innerWidth >= 1100) setOpen(false); };
    document.addEventListener('keydown', escape);
    window.addEventListener('resize', resize);
    return () => { document.removeEventListener('keydown', escape); window.removeEventListener('resize', resize); };
  }, [open]);
  return <header className="site-header"><div className="nav-inner shell"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <NavLink key={item.href} to={item.href} end={item.href === '/'}>{item.label}</NavLink>)}</nav><div className="nav-actions"><button className="theme-toggle icon-button" type="button" onClick={toggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button><button ref={menuButton} className="mobile-toggle icon-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X size={23} /> : <Menu size={23} />}</button></div></div><AnimatePresence>{open && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .15 }}>{navigation.map((item, i) => <NavLink key={item.href} to={item.href} end={item.href === '/'} onClick={() => setOpen(false)}><span className="mono">0{i + 1}</span>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></NavLink>)}</motion.nav>}</AnimatePresence></header>;
}
