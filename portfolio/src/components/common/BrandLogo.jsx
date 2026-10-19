import { brands } from '../../data/brands';
import { asset } from '../../data/assets';

export default function BrandLogo({ brand, className = '', decorative = false }) {
  const item = brands[brand];
  if (!item) return null;
  return <span className={`brand-logo brand-logo-${brand}${item.darkSurface ? ' brand-logo-dark' : ''} ${className}`}>
    <img src={asset(`images/logos/${item.image}`)} alt={decorative ? '' : `${item.name} logo`} width={item.width} height={item.height} loading="lazy" decoding="async" />
  </span>;
}
