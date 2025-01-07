import { BrowserRouter, Route, Routes } from 'react-router'

import useBibleSettings from '@/hooks/use-bible-settings';

import Home from '@/pages/home';
import Bible from '@/pages/bible';
import Versions from '@/pages/versions';
import Books from '@/pages/books';
import Settings from '@/pages/settings';
import Note from '@/pages/note';
import DevotionalCalendar from '@/pages/calendar';
import Notation from '@/pages/notation';

function App() {
  const { theme } = useBibleSettings();

  return (
    <BrowserRouter>
      <div className={`${theme} bg-background min-h-screen absolute top-0 w-full`}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:version/:abbrev?/:chapter?" element={<Bible />} />
          <Route path="/versions" element={<Versions />} />
          <Route path="/books" element={<Books />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/note" element={<Note />} />
          <Route path="/calendar" element={<DevotionalCalendar />} />
          <Route path="/notation" element={<Notation />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
