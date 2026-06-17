import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './index.scss';
import { LanguageProvider } from './LanguageContext';

// Global image helper for importing / resolving files dynamically from public path
window.image = (name: string): string => {
  if (!name) return "";
  if (name.startsWith("http://") || name.startsWith("https://") || name.startsWith("data:")) {
    return name;
  }
  let cleanName = name.trim();
  if (cleanName.startsWith("/")) {
    cleanName = cleanName.slice(1);
  }
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(cleanName);
  // Default to .png if no extension is specified because it's the standard for icons / assets
  if (!hasExtension) {
    return `/${cleanName}.png`;
  }
  return `/${cleanName}`;
};

// Attach to globalThis for clean access in HTML / JSX elements without window. prefixes
(globalThis as any).image = window.image;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
