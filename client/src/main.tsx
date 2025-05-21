import './index.css';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import { Toaster } from '@/components/ui/toaster';

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster />
    <App />
  </>
)
