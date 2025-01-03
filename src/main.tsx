import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'

import { Toaster } from '@/components/ui/toaster'

// import App from './App.tsx'
import Home from '@/pages/home';
import Bible from '@/pages/bible';
import Versions from '@/pages/versions';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />

    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:version/:abbrev?/:chapter?" element={<Bible />} />
        <Route path="/versions" element={<Versions />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
