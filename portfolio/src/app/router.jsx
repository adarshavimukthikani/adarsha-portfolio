import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, m as motion, useReducedMotion } from 'motion/react';
import Home from '../pages/Home';
import About from '../pages/About';
import Work from '../pages/Work';
import Skills from '../pages/Skills';
import Education from '../pages/Education';
import Credentials from '../pages/Credentials';
import Articles from '../pages/Articles';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

function RouteFrame({ children }) {
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, []);
  return <motion.div className="route-view" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -6 }} transition={{ duration: reduced ? 0 : .18 }}>{children}</motion.div>;
}

export default function AppRoutes() {
  const location = useLocation();
  return <AnimatePresence mode="wait" initial={false}><RouteFrame key={location.pathname}>
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/work" element={<Work />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/education" element={<Education />} />
      <Route path="/credentials" element={<Credentials />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </RouteFrame></AnimatePresence>;
}
