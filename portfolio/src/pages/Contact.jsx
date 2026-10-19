import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { profile } from '../data/profile';
import { Eyebrow, Reveal, Spark } from '../components/common/Primitives';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setError(false); }
    catch { setCopied(false); setError(true); }
  }
  return <div className="contact-page shell page-pad" data-page="contact"><div className="contact-lead"><Reveal><Eyebrow number="07">CONTACT / SAY HELLO</Eyebrow><h1>Let’s make<br />a <span className="type-highlight">connection.</span></h1><p className="page-deck">A marketing idea, a university project, or an opportunity to learn. I’d be glad to hear from you.</p></Reveal><Reveal className="hello-stamp"><Spark /><span>GOOD IDEAS<br />START WITH<br /><strong>A HELLO.</strong></span></Reveal></div><Reveal className="contact-email-panel"><span className="mono">THE BEST PLACE TO START</span><div className="email-row"><a className="contact-email" href={`mailto:${profile.email}`}>adarshavimukthikani<wbr />@gmail.com<ArrowUpRight size={32} aria-hidden="true" /></a><button type="button" className="copy-button icon-button" aria-label={copied ? 'Email address copied' : 'Copy email address'} onClick={copyEmail}>{copied ? <Check size={20} /> : <Copy size={20} />}</button></div><span className="copy-status" role="status" aria-live="polite">{copied ? 'Email address copied.' : error ? 'Please select the email address to copy it.' : 'Opens your email application.'}</span></Reveal><div className="contact-methods"><Reveal><span className="mono">01 / PROFESSIONAL</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><h2>LinkedIn</h2><ArrowUpRight size={25} aria-hidden="true" /></a><p>Connect and follow my professional journey.</p></Reveal><Reveal delay={.05}><span className="mono">02 / WRITING</span><a href={profile.medium} target="_blank" rel="noopener noreferrer"><h2>Medium</h2><ArrowUpRight size={25} aria-hidden="true" /></a><p>My observations on brands and marketing.</p></Reveal><Reveal delay={.1}><span className="mono">03 / PHONE</span><a href={profile.phoneHref}><h2>{profile.phone}</h2><ArrowUpRight size={25} aria-hidden="true" /></a><p>A direct way to get in touch.</p></Reveal></div><Reveal className="contact-signoff"><p>Thanks for stopping by.</p><span className="handwritten">Adarsha.</span></Reveal></div>;
}
