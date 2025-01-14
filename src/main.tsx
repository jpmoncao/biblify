import { createRoot } from 'react-dom/client'
import './index.css'

import { Toaster } from '@/components/ui/toaster'

import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster />
    <App />
  </>
)
