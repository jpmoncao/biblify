import { useEffect, useState, ReactNode } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useLocation } from "react-router";
import { Menu, XIcon, Home, BookMarked, Notebook, CircleUserRound, Settings } from 'lucide-react';
import { useSettingsContext } from "@/contexts/settings";
import { Button } from "@/components/ui/button";

interface TabType {
    title: string;
    route: string;
    icon: JSX.Element;
}

interface TabProps {
    text: string;
    selected: boolean;
    setSelected: (tab: TabType | undefined) => void;
    children: ReactNode;
    index: number;
}

const buttonVariants = {
    initial: {
        gap: 0,
        paddingLeft: '1rem',
        paddingRight: '1rem',
    },
    animate: (selected: boolean) => ({
        gap: selected ? '.5rem' : 0,
        paddingLeft: selected ? '.5rem' : '1rem',
        paddingRight: selected ? '.5rem' : '1rem',
    }),
}

const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: 'auto', opacity: 1 },
    exit: { width: 0, opacity: 0 },
}

const transition = { delay: 0.1, type: 'spring', bounce: 0, duration: 0.35 }

const Tab = ({ text, selected, setSelected, index, children }: TabProps) => {
    const { settings } = useSettingsContext();
    const { version, book, chapter } = settings().lastBookChapter;

    const tabs = [
        { title: 'Home', route: '', icon: <Home /> },
        { title: 'Bíblia', route: `${version}/${book}/${chapter}`, icon: <BookMarked /> },
        { title: 'Anotações', route: 'note', icon: <Notebook /> },
        { title: 'Perfil', route: 'profile', icon: <CircleUserRound /> },
        { title: 'Ajustes', route: 'settings', icon: <Settings /> },
    ]

    const navigate = useNavigate();

    const handleSelected = (tab: TabType) => {
        navigate('/' + tab.route);
        setSelected(tab);
    }

    return (
        <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            custom={selected}
            onClick={() => handleSelected(tabs[index])}
            transition={transition}
            className={`${selected
                ? 'bg-foreground/5 text-primary '
                : ' hover:text-secondary'
                } relative flex items-center rounded-full justify-left w-40 px-4 py-2 text-sm font-medium text-primary transition-colors duration-300 focus-within:outline-secondary/50`}
            aria-current={selected ? 'page' : undefined}
        >
            {children}
            <AnimatePresence>
                <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="ml-2 overflow-hidden"
                >
                    {text}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    )
}

export default function DesktopMenu() {
    const { settings } = useSettingsContext();
    const { version, book, chapter } = settings().lastBookChapter;

    const tabs = [
        { title: 'Home', route: '', icon: <Home /> },
        { title: 'Bíblia', route: `${version}/${book}/${chapter}`, icon: <BookMarked /> },
        { title: 'Anotações', route: 'note', icon: <Notebook /> },
        { title: 'Perfil', route: 'profile', icon: <CircleUserRound /> },
        { title: 'Ajustes', route: 'settings', icon: <Settings /> },
    ]

    const location = useLocation();

    const currentTab = tabs.find(tab => location.pathname === `/${tab.route}`);
    const [selected, setSelected] = useState<TabType | undefined>(currentTab);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelected(currentTab);
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            <div className="py-4 px-4 w-full flex items-center fixed top-0 h-20 z-[51] text-foreground justify-end">
                <Button variant='ghost' className="[&_svg]:size-6 px-2 py-0 hover:text-foreground" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen
                        ? <XIcon className='cursor-pointer' />
                        : <Menu className='cursor-pointer' />
                    }
                </Button>
            </div >
            <nav className={(isOpen ? 'flex translate-x-0' : 'hidden translate-x-full') + ' z-50 fixed right-0 top-0 h-[100vh] w-[40vw] bg-background shadow-md transition-transform border-l'}>
                {/* <Button variant='ghost' className="fixed text-foreground right-6 top-6 [&_svg]:size-6 px-2 py-0 hover:text-foreground z-50" onClick={() => setIsOpen(!isOpen)}>
                    <XIcon className='cursor-pointer' />
                </Button> */}

                <div className='flex flex-col items-center justify-center h-full w-full gap-4'>
                    {tabs.map((tab, index) => (
                        <Tab
                            text={tab.title}
                            selected={selected?.route === tab.route}
                            setSelected={setSelected}
                            index={index}
                            key={tab.title}
                        >
                            {tab.icon}
                        </Tab>
                    ))}
                </div>
            </nav>
        </>
    )
}