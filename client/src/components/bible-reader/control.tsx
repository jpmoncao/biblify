import { useState } from "react";
import { Link } from "react-router";
import { HomeIcon, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { useBibleContext } from "@/contexts/bible";
import { Button } from "@/components/ui/button";

export default function BibleReaderControl() {
    const { prevVerse, nextVerse } = useBibleContext();

    const [controlIsOpen, setControlIsOpen] = useState<boolean>(true);

    return (
        <>
            <footer
                className={`${!controlIsOpen && 'translate-y-full'} bg-background py-4 flex justify-around items-center border-t-[1px] left-1/2 -translate-x-1/2 fixed bottom-0 transition-all duration-200 ease-in font-Inter z-10 max-h-16 max-w-[880px] mx-auto w-full rounded-t-md`} style={{ boxShadow: '0px -4px 16px rgba(0,0,0,0.3)' }}>
                <div
                    className={`fixed right-1 bottom-[3.98rem] bg-background text-primary rounded-t-md px-2 w-12 border border-b-0 cursor-pointer flex justify-center items-center`}
                    onClick={() => setControlIsOpen(prev => !prev)}
                >
                    <ChevronDown
                        className={`${!controlIsOpen && 'rotate-180'}`}
                        size={24}
                    />
                </div >
                <div className="w-full flex justify-around gap-2">
                    <Button className="w-2/8 group bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary" onClick={prevVerse}>
                        <ArrowLeft className="mx-auto text-primary group-hover:text-primary-foreground" />
                    </Button>
                    <Link className="w-2/8" to={`/`}>
                        <Button className="group gap-1 w-4/8 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                            <HomeIcon className="mx-auto text-primary group-hover:text-primary-foreground" />
                        </Button>
                    </Link>
                    <Button className="w-2/8 group bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary" onClick={nextVerse}>
                        <ArrowRight className="mx-auto text-primary group-hover:text-primary-foreground" />
                    </Button>
                </div>
            </ footer>
        </>
    );
}
