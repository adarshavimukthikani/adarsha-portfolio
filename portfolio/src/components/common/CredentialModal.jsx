import { useEffect, useRef } from 'react';
import { ArrowUpRight, Expand, X } from 'lucide-react';
import { asset } from '../../data/assets';
import { credentialStatus } from '../../data/certificates';

export default function CredentialModal({ certificate, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = 'hidden';
    return () => { node.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, []);
  const keepFocusInside = (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.current.querySelectorAll('button:not([disabled]), a[href], [tabindex="0"]')].filter((node) => node.getClientRects().length);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  const status = credentialStatus(certificate);
  return <dialog ref={dialog} className="credential-dialog" aria-labelledby="credential-title" aria-describedby="credential-issuer" onKeyDown={keepFocusInside} onCancel={(e) => { e.preventDefault(); onClose(); }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="modal-content"><div className="modal-top"><span className="mono">A LEARNING MILESTONE</span><button type="button" className="icon-button" aria-label="Close credential" onClick={onClose} autoFocus><X size={23} /></button></div>
      <div className={`modal-image ${certificate.badge ? 'is-badge' : ''}`}><img src={asset(`images/certificates/${certificate.image}`)} alt={`${certificate.title}: supplied credential document`} />{certificate.badgeImage && <img className="modal-companion-badge" src={asset(`images/certificates/${certificate.badgeImage}`)} alt="Google Ads Display badge supplied with the certificate" />}</div>
      <div className="modal-details"><span className="category-label">{certificate.category} · {certificate.type}</span><h2 id="credential-title">{certificate.title}</h2><p id="credential-issuer">{certificate.issuer}</p><div className="credential-dates">{certificate.date && <span>Issued: {certificate.date}</span>}{status && <span>{status}: {certificate.expiryLabel}</span>}</div>{certificate.description && <p className="modal-description">{certificate.description}</p>}
        <div className="modal-links"><a className="arrow-link" href={asset(`images/certificates/${certificate.image}`)} target="_blank" rel="noopener noreferrer">Open full image<Expand size={16} aria-hidden="true" /></a>{certificate.credentialUrl && <a className="arrow-link" href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">Issuer verification page<ArrowUpRight size={17} aria-hidden="true" /></a>}</div>
      </div>
    </div>
  </dialog>;
}
