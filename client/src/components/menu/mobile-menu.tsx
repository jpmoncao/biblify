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
        <div className='fixed left-0 bottom-0 w-full flex justify-center gap-2 p-4 bg-background shadow-md border-t h-[8vh]'>
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
