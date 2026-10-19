import { m as motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: reduced ? 0 : .6, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
export function Eyebrow({ number, children }) {
  return <div className="eyebrow"><span className="section-number">{number}</span><span>{children}</span></div>;
}
export function Brand({ footer = false }) {
  return <Link className={`brand ${footer ? 'brand-footer' : ''}`} to="/" aria-label="Adarsha home">adarsha<span>.</span></Link>;
}
export function Spark({ className = '' }) {
  return <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M40 5v70M5 40h70M15 15l50 50M15 65l50-50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" /></svg>;
}
export function ExternalLink({ href, children, className = '' }) {
  return <a className={`arrow-link ${className}`} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}
