import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import { navigation } from '../data/navigation';
import { profile } from '../data/profile';

export default function SiteLayout({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = navigation.find(item => item.href === pathname);
    document.title = `${page?.label || 'Page not found'} | ${profile.name}`;
    document.querySelector('meta[name="description"]').content = page?.description || 'Explore the portfolio of Adarsha Vimukthikani.';
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, [pathname]);
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></>;
}
