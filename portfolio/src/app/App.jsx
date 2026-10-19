import { BrowserRouter } from 'react-router-dom';
import SiteLayout from '../layouts/SiteLayout';
import AppRoutes from './router';

export default function App() {
  return <BrowserRouter><SiteLayout><AppRoutes /></SiteLayout></BrowserRouter>;
}
