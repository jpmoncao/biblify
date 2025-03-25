import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation, useParams } from "react-router";
import { Home, BookMarked, Notebook, CircleUserRound, Settings } from "lucide-react";
import { useSettingsContext } from "@/contexts/settings";

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
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (selected: boolean) => ({
    gap: selected ? ".5rem" : 0,
    paddingLeft: selected ? "1rem" : ".5rem",
    paddingRight: selected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.35 };

const Tab = ({ tab, isSelected, onSelect }: TabProps) => {
  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      custom={isSelected}
      onClick={() => {
        if (!isSelected) onSelect(tab);
      }}
      transition={transition}
      className={`${isSelected
        ? "bg-foreground/5 text-primary "
        : "hover:text-secondary"
        } relative flex items-center rounded-full px-4 py-1 text-sm font-medium text-primary transition-colors duration-300 focus-within:outline-secondary/50`}
      aria-current={isSelected ? "page" : undefined}
    >
      {tab.icon}
      <AnimatePresence>
        {isSelected && (
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="overflow-hidden"
          >
            {tab.title}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const MobileMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { settings } = useSettingsContext();
  const { lastBookChapter } = settings();

  // Se os parâmetros não estiverem na URL, usamos os valores do contexto
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

  useEffect(() => {
    setSelected(currentTab);
  }, [currentTab]);

  const handleSelect = (tab: TabType) => {
    if (location.pathname !== `/${tab.route}`) {
      navigate("/" + tab.route);
      setSelected(tab);
    }
  };

  return (
    <div className="fixed shadow-foreground/15 shadow-xl bottom-0 w-full flex justify-center gap-2 px-3 py-1 bg-background border border-b-0 rounded-t-2xl min-h-[8vh] max-w-[880px] left-1/2 -translate-x-1/2 z-[41]">
      {tabs.map((tab) => (
        <Tab
          key={tab.title}
          tab={tab}
          isSelected={selected?.route === tab.route}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default MobileMenu;
