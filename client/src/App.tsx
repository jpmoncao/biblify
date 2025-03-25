import { BrowserRouter, Route, Routes } from 'react-router'

import { SettingsProvider, useSettingsContext } from '@/contexts/settings';
import { BibleProvider } from '@/contexts/bible';

import BibleRouteMiddleware from '@/middlewares/bible';
import Home from '@/pages/home';
import Bible from '@/pages/bible';
import Versions from '@/pages/versions';
import Books from '@/pages/books';
import Settings from '@/pages/settings';
import Note from '@/pages/note';
import DevotionalCalendar from '@/pages/calendar';
import Notation from '@/pages/notation';
import Cadaster from '@/pages/cadaster';
import Login from '@/pages/login';
import Profile from '@/pages/profile';

function App() {
  const { settings } = useSettingsContext();

  return (
    <SettingsProvider>
      <BrowserRouter>
        <div className={`${settings.theme} bg-background min-h-screen absolute top-0 w-full`}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/cadaster" element={<Cadaster />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/versions" element={<Versions />} />
            <Route path="/books" element={<Books />} />
            <Route
              path="/:version/:abbrev?/:chapter?"
              element={
                <BibleRouteMiddleware>
                  <BibleProvider>
                    <Bible />
                  </BibleProvider>
                </BibleRouteMiddleware>
              }
            />
            <Route path="/note" element={<Note />} />
            <Route path="/notation" element={<Notation />} />
            <Route path="/calendar" element={<DevotionalCalendar />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
