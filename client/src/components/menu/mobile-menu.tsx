import { useEffect, useState, ReactNode } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useLocation } from "react-router";
import { Home, BookMarked, Notebook, CircleUserRound, Settings } from 'lucide-react';
import { useSettingsContext } from "@/contexts/settings";

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
        paddingLeft: '.5rem',
        paddingRight: '.5rem',
    },
    animate: (selected: boolean) => ({
        gap: selected ? '.5rem' : 0,
        paddingLeft: selected ? '1rem' : '.5rem',
        paddingRight: selected ? '1rem' : '.5rem',
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
                } relative flex items-center rounded-full px-4 py-1 text-sm font-medium text-primary transition-colors duration-300 focus-within:outline-secondary/50`}
            aria-current={selected ? 'page' : undefined}
        >
            {children}
            <AnimatePresence>
                {selected && (
                    <motion.span
                        variants={spanVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                        className="overflow-hidden"
                    >
                        {text}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

const MobileMenu = () => {
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

    useEffect(() => {
        setSelected(currentTab);
    }, [location.pathname]);

    return (
        <div className='fixed shadow-foreground/15 shadow-xl bottom-0 w-full flex justify-center gap-2 px-3 py-1 bg-background border border-b-0 rounded-t-2xl min-h-[8vh] max-w-[880px] left-1/2 -translate-x-1/2'>
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
    )
}

export default MobileMenu;
