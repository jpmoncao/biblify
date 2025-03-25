import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation, useParams } from "react-router";
import { Menu, XIcon, Home, BookMarked, Notebook, CircleUserRound, Settings } from "lucide-react";
import { useSettingsContext } from "@/contexts/settings";
import { Button } from "@/components/ui/button";

interface TabType {
    title: string;
    route: string;
    icon: JSX.Element;
}

interface TabProps {
    tab: TabType;
    isSelected: boolean;
    onSelect: (tab: TabType) => void;
}

const buttonVariants = {
    initial: { gap: 0, paddingLeft: "1rem", paddingRight: "1rem" },
    animate: (selected: boolean) => ({
        gap: selected ? ".5rem" : 0,
        paddingLeft: selected ? ".5rem" : "1rem",
        paddingRight: selected ? ".5rem" : "1rem",
    }),
};

const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.35 };

const Tab = ({ tab, isSelected, onSelect }: TabProps) => (
    <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        custom={isSelected}
        onClick={() => !isSelected && onSelect(tab)}
        transition={transition}
        className={`${isSelected ? "bg-foreground/5" : "hover:text-secondary"
            } relative flex items-center rounded-full justify-left w-40 px-4 py-2 text-sm font-medium text-primary transition-colors duration-300 focus-within:outline-secondary/50`}
        aria-current={isSelected ? "page" : undefined}
    >
        {tab.icon}
        <AnimatePresence>
            <motion.span
                variants={spanVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="ml-2 overflow-hidden"
            >
                {tab.title}
            </motion.span>
        </AnimatePresence>
    </motion.button>
);

export default function DesktopMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const { settings } = useSettingsContext();
    const { lastBookChapter } = settings();

    const bibleRoute = useMemo(() => {
        const version = params.version || lastBookChapter.version;
        const abbrev = params.abbrev || lastBookChapter.book;
        const chapter = params.chapter || lastBookChapter.chapter;
        return `${version}/${abbrev}/${chapter}`;
    }, [params, lastBookChapter]);

    const tabs = useMemo<TabType[]>(
        () => [
            { title: "Home", route: "", icon: <Home /> },
            { title: "Bíblia", route: bibleRoute, icon: <BookMarked /> },
            { title: "Anotações", route: "note", icon: <Notebook /> },
            { title: "Perfil", route: "profile", icon: <CircleUserRound /> },
            { title: "Ajustes", route: "settings", icon: <Settings /> },
        ],
        [bibleRoute]
    );

    const currentTab = useMemo(
        () => tabs.find((tab) => location.pathname === `/${tab.route}`),
        [tabs, location.pathname]
    );

    const [selected, setSelected] = useState<TabType | undefined>(currentTab);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelected(currentTab);
        setIsOpen(false);
    }, [currentTab]);

    const handleSelect = (tab: TabType) => {
        if (location.pathname !== `/${tab.route}`) {
            navigate("/" + tab.route);
            setSelected(tab);
        }
    };

    return (
        <>
            <div className="py-4 px-4 w-full flex items-center fixed top-0 h-20 z-[51] text-foreground justify-end">
                <Button
                    variant="ghost"
                    className="[&_svg]:size-6 px-2 py-0 hover:text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <XIcon className="cursor-pointer" /> : <Menu className="cursor-pointer" />}
                </Button>
            </div>

            <nav
                className={`z-50 fixed right-0 top-0 h-[100vh] w-[40vw] bg-background shadow-md transition-transform border-l ${isOpen ? "flex translate-x-0" : "hidden translate-x-full"
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full w-full gap-4">
                    {tabs.map((tab) => (
                        <Tab key={tab.title} tab={tab} isSelected={selected?.route === tab.route} onSelect={handleSelect} />
                    ))}
                </div>
            </nav>
        </>
    );
}
