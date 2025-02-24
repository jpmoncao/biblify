import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { BookOpenText, Settings, RefreshCcw } from 'lucide-react';
import { useBibleContext } from "@/contexts/bible";
import { Button } from "@/components/ui/button";

export default function BibleReaderHeader() {
    const { version, book, chapter } = useBibleContext();

    const elementRef = useRef<HTMLHeadElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const checkPosition = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                setIsVisible(rect.top > -48);
            }
        };

        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', checkPosition);
        checkPosition();

        return () => {
            window.removeEventListener('scroll', checkPosition);
            window.removeEventListener('resize', checkPosition);
        };
    }, []);

    return (
        <>
            <header
                className={`bg-background py-4 w-full flex justify-around items-center border-b-[1px] shadow-md fixed top-0 transition-all duration-200 ease-in font-Inter ${isVisible ? '-translate-y-full' : 'translate-y-0'}`}
            >
                {book.name && (
                    <div className="w-full flex justify-around gap-2">
                        <Link className="w-2/8" to={`/versions`}>
                            <Button className="group bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                <BookOpenText className="mx-auto text-primary group-hover:text-primary-foreground" /> {version?.toUpperCase()}
                            </Button>
                        </Link>
                        <Link className="w-2/8" to={`/books`}>
                            <Button className="group gap-1 w-4/8 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                <span className="block max-w-[130px] truncate">{book.name}</span>
                                <span className="block max-w-[30px] truncate"> {chapter ?? ''}</span>
                            </Button>
                        </Link>
                        <Link className="w-2/8" to={`/settings`}>
                            <Button className="group bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                <Settings className="mx-auto text-primary group-hover:text-primary-foreground" /> Ajustes
                            </Button>
                        </Link>
                    </div>
                )}
            </header >

            < header
                ref={elementRef}
                className={`h-32 pt-4 w-full flex  justify-around transition-all ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`
                }
            >
                {
                    book.author && book.name && chapter && (
                        <>
                            <Link to={`/versions`}>
                                <Button className="group w-2/8 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                    <BookOpenText className="mx-auto text-primary group-hover:text-primary-foreground" />
                                </Button>
                            </Link>
                            <Link to={`/books`} className="flex flex-col items-center text-center">
                                <Button className="group w-2/8 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                    <RefreshCcw strokeWidth={3} size={16} />
                                </Button>
                                <h1 className="mt-2 text-primary text-2xl font-bold max-w-[] flex items-center">{book.name ?? ''} </h1>
                                <h2 className="-mt-2 text-primary text-2xl font-bold ">{chapter ?? ''}</h2>
                            </Link>
                            <Link to={`/settings`}>
                                <Button className="group w-2/8 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                    <Settings className="mx-auto text-primary group-hover:text-primary-foreground" />
                                </Button>
                            </Link>
                        </>
                    )
                }
            </header >
        </>
    );
}
