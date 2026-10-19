import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow, Reveal, Spark } from './Primitives';

export function RouteLink({ to, children, className = '', button = false }) {
  return <Link to={to} className={`${button ? 'button button-primary' : 'arrow-link'} ${className}`}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function PageHeading({ number, label, title, children, className = '' }) {
  return <Reveal className={`page-heading ${className}`}><Eyebrow number={number}>{label}</Eyebrow><h1>{title}</h1>{children && <p className="page-deck">{children}</p>}</Reveal>;
}
export function ContactCTA() {
  return <section className="contact-cta shell"><Reveal className="cta-inner"><Spark className="cta-spark" /><div><span className="mono">GOOD IDEAS START WITH A CONVERSATION</span><h2>Have something<br />in mind<span>?</span></h2></div><RouteLink to="/contact" button>Let's talk</RouteLink></Reveal></section>;
}
