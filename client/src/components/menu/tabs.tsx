import { Home, BookMarked, Notebook, CircleUserRound, Settings } from 'lucide-react'

const getBibleRoute = () => {
    const localStorageLastBookChapter = localStorage.getItem('biblify__user_last_bookchapter') || 'nvi'; 
    const lastBookChapter = JSON.parse(localStorageLastBookChapter)
    const route =  `${lastBookChapter.version}/${lastBookChapter.book}/${lastBookChapter.chapter}`
    return route
}

const tabs = [
    { title: 'Home', route: '', icon: <Home /> },
    { title: 'Bíblia', route: getBibleRoute(), icon: <BookMarked /> }, 
    { title: 'Anotações', route: 'note', icon: <Notebook /> },
    { title: 'Perfil', route: 'profile', icon: <CircleUserRound /> },
    { title: 'Ajustes', route: 'settings', icon: <Settings /> },
]

export default tabs;
