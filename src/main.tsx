import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from './components/ui/toaster'

// import App from './App.tsx'
import Home from './pages/home';
import Bible from './pages/bible';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />

    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:version/:abbrev?/:chapter?" element={<Bible />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
