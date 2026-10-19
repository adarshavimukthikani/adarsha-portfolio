import React from 'react';
import ReactDOM from 'react-dom/client';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import './styles/index.css';
import App from './app/App';
import { ThemeProvider } from './app/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider><LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user"><App /></MotionConfig></LazyMotion></ThemeProvider>
  </React.StrictMode>,
);
