import { NavLink } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Brand } from '../common/Primitives';
import { profile } from '../../data/profile';

export default function Footer() {
  return <footer className="site-footer"><div className="shell"><div className="footer-main"><div><Brand footer /><p>Business thinking. A creative perspective.</p></div><nav aria-label="Footer navigation"><NavLink to="/about">About</NavLink><NavLink to="/work">Work</NavLink><NavLink to="/articles">Articles</NavLink><NavLink to="/contact">Contact</NavLink><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={13} aria-hidden="true" /></a></nav><button className="back-top icon-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} aria-label="Back to top"><ArrowUp size={18} aria-hidden="true" /></button></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><span className="mono">A LITTLE STRATEGY. A LITTLE CURIOSITY.</span><span>Sri Lanka <span aria-hidden="true">↗</span></span></div></div></footer>;
}
