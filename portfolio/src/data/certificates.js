export const certificates = [
  { id: 'cim-social', title: 'Social Media Marketing', issuer: 'Chartered Institute of Marketing', image: 'cim-social.webp', category: 'Marketing', type: 'Level 4 badge', badge: true },
  { id: 'google-display', title: 'Google Ads Display', issuer: 'Google', image: 'google-display.webp', badgeImage: 'google-display-badge.webp', category: 'Marketing', type: 'Certification', date: 'September 21, 2025', expiry: '2026-09-21', expiryLabel: 'September 21, 2026', credentialId: '161350744', description: 'Earned in 2025. The supplied credential lists an expiry date of September 21, 2026.' },
  { id: 'cim-responsible', title: 'Responsible Marketing', issuer: 'Chartered Institute of Marketing', image: 'cim-responsible.webp', category: 'Marketing', type: 'Level 4 badge', badge: true },
  { id: 'cmi-digital', title: 'Digital Marketing Professional Certificate', issuer: 'Content Marketing Institute · LinkedIn Learning', image: 'cmi-digital.webp', category: 'Marketing', type: 'Learning path', date: 'April 23, 2025' },
  { id: 'hootsuite-social', title: 'Social Media Marketing Professional Certificate', issuer: 'Hootsuite · LinkedIn Learning', image: 'hootsuite-social.webp', category: 'Marketing', type: 'Learning path', date: 'April 18, 2025' },
  { id: 'apidm', title: 'Fundamentals in Digital Marketing', issuer: 'Asia Pacific Institute of Digital Marketing', image: 'apidm.webp', category: 'Marketing', type: 'Course participation' },
  { id: 'ga4', title: 'Google Analytics 4 (GA4) Essential Training', issuer: 'LinkedIn Learning', image: 'ga4.webp', category: 'Technology', type: 'Course completion', date: 'April 2, 2025' },
  { id: 'cybersecurity', title: 'Cybersecurity for Businesses – The Fundamental Edition', issuer: 'EC-Council · Continuing Education', image: 'cybersecurity.webp', category: 'Technology', type: 'Course completion', date: 'June 2, 2025', description: 'A two-hour course. This document verifies course completion; it is not a professional certification.' },
  { id: 'project-management', title: 'Foundations of Project Management', issuer: 'University of Moratuwa · CODL', image: 'project-management.webp', category: 'Business', type: 'Programme participation', credentialUrl: 'https://open.uom.lk/verify' },
  { id: 'digital-foundations', title: 'Digital Marketing Foundations', issuer: 'LinkedIn Learning', image: 'digital-foundations.webp', category: 'Marketing', type: 'Course completion', date: 'March 14, 2025' },
  { id: 'email-marketing', title: 'Email Marketing', issuer: 'Great Learning Academy', image: 'email-marketing.webp', category: 'Marketing', type: 'Course completion', date: 'October 2024' },
  { id: 'power-bi', title: 'Data Visualization With Power BI', issuer: 'Great Learning Academy', image: 'power-bi.webp', category: 'Technology', type: 'Course completion', date: 'October 2024' },
  { id: 'seo', title: 'SEO Strategies', issuer: 'Great Learning Academy', image: 'seo.webp', category: 'Marketing', type: 'Course completion', date: 'October 2024' },
];

export function credentialStatus(certificate) {
  if (!certificate.expiry) return null;
  return new Date(`${certificate.expiry}T23:59:59+05:30`) < new Date() ? 'Expired' : 'Valid until';
}
