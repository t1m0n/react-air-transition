import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root not found');
}

createRoot(root).render(
  <StrictMode>
    <div className='min-h-screen bg-white sm:px-6 sm:py-4 lg:px-8'>
      <App />
    </div>
  </StrictMode>,
);
