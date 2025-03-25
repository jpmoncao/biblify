import './index.css';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import { SettingsProvider } from '@/contexts/settings';
import { Toaster } from '@/components/ui/toaster';

createRoot(document.getElementById('root')!).render(
  <>
    <SettingsProvider>
      <Toaster />
      <App />
    </SettingsProvider>
  </>
)
