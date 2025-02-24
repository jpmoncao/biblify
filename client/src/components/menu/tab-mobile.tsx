import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import tabs from '@/components/menu/tabs'

export interface TabType {
    title: string;
    route: string;
    icon: JSX.Element;
}

export interface TabProps {
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
                } relative flex items-center rounded-full px-4 py-2 text-sm font-medium text-primary transition-colors duration-300 focus-within:outline-secondary/50`}
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

export default Tab;
