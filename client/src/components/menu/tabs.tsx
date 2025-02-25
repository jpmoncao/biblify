import {
    Home,
    BookMarked,
    Notebook,
    CircleUserRound,
    Settings,
} from 'lucide-react'

const tabs = [
    { title: 'Home', route: '', icon: <Home /> },
    { title: 'Bíblia', route: 'bible', icon: <BookMarked /> },
    { title: 'Anotações', route: 'note', icon: <Notebook /> },
    { title: 'Perfil', route: 'profile', icon: <CircleUserRound /> },
    { title: 'Ajustes', route: 'settings', icon: <Settings /> },
]

export default tabs;
