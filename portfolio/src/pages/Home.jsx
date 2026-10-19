import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { m as motion, useReducedMotion } from 'motion/react';
import { asset } from '../data/assets';
import { Eyebrow, Reveal, Spark } from '../components/common/Primitives';
import { RouteLink } from '../components/common/PageUI';

const words = ['Branding', 'Business thinking', 'Creative communication', 'Marketing'];
const previews = [
  { to: '/about', name: 'About', title: 'The person behind the perspective.', text: 'A little about my interests, studies, and creative side.', className: 'preview-about' },
  { to: '/work', name: 'Work', title: 'Part of a marketing community.', text: 'Public Relations Coordinator, Circle of Marketing.', className: 'preview-work' },
  { to: '/skills', name: 'Skills', title: 'A strategic mind. A creative toolkit.', text: 'Branding, communication, and business thinking.', className: 'preview-skills' },
  { to: '/education', name: 'Education', title: 'Always a work in progress.', text: 'University of Ruhuna and CIM Level 4 studies.', className: 'preview-education' },
  { to: '/credentials', name: 'Credentials', title: 'Learning, documented.', text: 'The badges and certificates along the way.', className: 'preview-credentials' },
  { to: '/articles', name: 'Articles', title: 'A closer look at brands.', text: 'My observations on the campaigns we remember.', className: 'preview-articles' },
  { to: '/contact', name: 'Contact', title: 'Let’s start a conversation.', text: 'An idea, a collaboration, or simply a hello.', className: 'preview-contact' },
];

export default function Home() {
  const reduced = useReducedMotion();
  return <div className="home-page" data-page="home">
    <section className="home-hero shell">
      <div className="hero-topline mono"><span><i className="tiny-dot" />ADARSHA VIMUKTHIKANI</span><span>A PERSONAL PORTFOLIO / SRI LANKA</span></div>
      <div className="hero-grid">
        <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}><div className="hero-hello"><span className="small-star" aria-hidden="true">✳</span> A little strategy. A little curiosity.</div><h1>Business <br />mind.<br /><span className="type-highlight">Creative eye.</span></h1><p className="hero-description">I’m Adarsha, a Management undergraduate specializing in Marketing. I’m interested in brands, people, and the ideas that connect them.</p><div className="hero-buttons"><RouteLink to="/work" button>Explore my experience</RouteLink><RouteLink to="/about">A little about me</RouteLink></div></motion.div>
        <motion.div className="hero-art" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1 }}><div className="portrait-outline" aria-hidden="true" /><div className="portrait-frame"><img src={asset('images/profile/portrait.webp')} alt="Adarsha Vimukthikani" width="1000" height="1250" fetchPriority="high" /></div><div className="portrait-sticker"><Spark /><span>BUSINESS<br />MEETS<br /><strong>CREATIVITY.</strong></span></div><div className="portrait-caption"><span className="mono">HELLO, I’M</span><strong>Adarsha<span>.</span></strong><ArrowUpRight size={28} strokeWidth={1.5} aria-hidden="true" /></div><span className="portrait-side mono">A CURIOUS MIND, AT WORK.</span></motion.div>
      </div><div className="hero-bottom mono"><span>MANAGEMENT × MARKETING × CREATIVITY</span><span>UNIVERSITY OF RUHUNA <span aria-hidden="true">↗</span></span></div>
    </section>
    <div className="marquee" role="region" aria-label={words.join(', ')}><div className="marquee-track" aria-hidden="true">{[0, 1].map(copy => <div className="marquee-group" key={copy}>{words.map(word => <span key={word}>{word}<i>✳</i></span>)}</div>)}</div></div>
    <section className="home-directory shell section-pad"><Reveal className="directory-intro"><Eyebrow number="01">A FEW SIDES OF ME</Eyebrow><div><h2>One curious person.<br /><span className="muted-type">A few ways to get to know me.</span></h2><p>Academic grounding, creative interests, and an evolving marketing perspective. Pick a place to begin.</p></div></Reveal><div className="preview-grid">{previews.map((page, i) => <Reveal key={page.to} delay={i % 4 * .04} className={page.className}><Link to={page.to} className="page-preview"><div className="preview-top mono"><span>0{i + 1} / {page.name}</span><ArrowUpRight size={22} aria-hidden="true" /></div><h3>{page.title}</h3><p>{page.text}</p>{page.name === 'Skills' && <Spark className="preview-spark" />}{page.name === 'Education' && <span className="preview-four" aria-hidden="true">L4</span>}</Link></Reveal>)}</div></section>
  </div>;
}
