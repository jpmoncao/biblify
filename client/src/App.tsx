import { BrowserRouter, Route, Routes } from 'react-router'
import useSettings from '@/hooks/use-settings';

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
  const { settings } = useSettings();
  const { theme } = settings;

  return (
    <BrowserRouter>
      <div className={`${theme} bg-background min-h-screen absolute top-0 w-full`}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cadaster" element={<Cadaster />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/versions" element={<Versions />} />
          <Route path="/books" element={<Books />} />
          <Route path="/:version/:abbrev?/:chapter?" element={<Bible />} />
          <Route path="/note" element={<Note />} />
          <Route path="/notation" element={<Notation />} />
          <Route path="/calendar" element={<DevotionalCalendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
