import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Menu, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import tabs from '@/components/menu/tabs'
import Tab, { TabType } from "@/components/menu/tab-desktop";

export default function DesktopMenu() {
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