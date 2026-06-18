import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './index.scss';
import { LanguageProvider } from './LanguageContext';
import { image } from './image';

window.image = image;
(globalThis as any).image = image;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
