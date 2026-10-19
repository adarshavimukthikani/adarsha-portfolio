import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { certificates, credentialStatus } from '../data/certificates';
import { credentialBrands } from '../data/brands';
import { asset } from '../data/assets';
import BrandLogo from '../components/common/BrandLogo';
import CredentialModal from '../components/common/CredentialModal';
import { Reveal } from '../components/common/Primitives';
import { PageHeading, RouteLink } from '../components/common/PageUI';

const professionalIds = new Set(['google-display', 'apidm', 'cybersecurity', 'cmi-digital', 'hootsuite-social']);
function Record({ item, kind, onSelect }) {
  const image = kind === 'badge' ? item.badgeImage || item.image : item.image;
  return <button type="button" className={`record-card record-${kind}`} data-certificate-id={item.id} data-view={kind} aria-haspopup="dialog" title={`View ${item.title}${kind === 'badge' ? ' badge' : ' certificate'}`} onClick={() => onSelect(item)}><div className="record-image"><img src={asset(`images/certificates/${image}`)} alt="" width="600" height="420" loading="lazy" /><span className="record-zoom"><ArrowUpRight size={20} aria-hidden="true" /></span></div><div className="record-copy"><div className="record-issuer">{credentialBrands[item.id] && <BrandLogo brand={credentialBrands[item.id]} decorative />}<span className="category-label">{item.issuer}</span></div><h3>{item.title}</h3><p>{kind === 'badge' && item.badgeImage ? 'Companion badge to the Display certificate' : item.type}</p><div className="record-meta">{item.date && <span>{item.date}</span>}{credentialStatus(item) === 'Expired' && <span className="expired-label">Expired {item.expiryLabel}</span>}</div></div></button>;
}

export default function Credentials() {
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState('All');
  const filtered = certificates.filter(item => category === 'All' || item.category === category);
  const badges = filtered.filter(item => item.badge || item.badgeImage);
  const professional = filtered.filter(item => professionalIds.has(item.id));
  const additional = filtered.filter(item => !item.badge && !professionalIds.has(item.id));

  return <div className="credentials-page shell page-pad" data-page="credentials"><PageHeading number="05" label="BADGES & CERTIFICATES" title={<>Curiosity, backed<br /><span className="muted-type">by learning.</span></>}>The badges, certificates, and course records from my learning so far. A closer look at the work behind the interests.</PageHeading><div className="credential-toolbar"><div className="filter-controls" role="group" aria-label="Filter credentials by topic">{['All', 'Marketing', 'Business', 'Technology'].map(name => <button type="button" key={name} className={`filter-button ${category === name ? 'selected' : ''}`} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}</div><span className="mono" role="status" aria-live="polite">{filtered.length} LEARNING RECORDS</span></div>
    {badges.length > 0 && <section className="badge-gallery" aria-labelledby="badges-heading"><Reveal className="collection-heading"><div><span className="mono">01 / RECOGNITION</span><h2 id="badges-heading">Professional badges</h2></div><p>The original digital badges. Open one for a closer look.</p></Reveal><div className="badges-grid">{badges.map(item => <Record onSelect={setSelected} key={item.id} item={item} kind="badge" />)}</div></section>}
    {professional.length > 0 && <section className="certificate-collection" aria-labelledby="certificates-heading"><Reveal className="collection-heading"><div><span className="mono">02 / CERTIFICATE COLLECTION</span><h2 id="certificates-heading">Certificates</h2></div><p>Marketing, business, and technology learning, with the original documents to explore.</p></Reveal><div className="certificates-grid">{professional.map(item => <Record onSelect={setSelected} key={item.id} item={item} kind="certificate" />)}</div></section>}
    {additional.length > 0 && <section className="additional-learning" aria-labelledby="learning-heading"><Reveal className="collection-heading"><div><span className="mono">03 / CONTINUING DEVELOPMENT</span><h2 id="learning-heading">Additional learning</h2></div><p>Short courses and foundational learning across business, marketing, and technology.</p></Reveal><div className="learning-grid">{additional.map(item => <Record onSelect={setSelected} key={item.id} item={item} kind="learning" />)}</div></section>}
    <div className="credentials-footer"><p>For my degree and CIM study journey:</p><RouteLink to="/education">View education</RouteLink></div>{selected && <CredentialModal certificate={selected} onClose={() => setSelected(null)} />}</div>;
}
