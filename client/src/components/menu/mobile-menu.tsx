import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import tabs from '@/components/menu/tabs'
import Tab, { TabType } from '@/components/menu/tab-mobile';

const MobileMenu = () => {
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
