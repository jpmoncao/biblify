import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { BookOpenText, Settings, RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BibleReaderHeaderProps {
    abbrev: string | undefined;
    name: string | undefined;
    author: string | undefined;
    chapter: number | undefined;
    version: string | undefined;
}

export default function BibleReaderHeader(props: BibleReaderHeaderProps) {
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
                {props.name && (
                    <div className="w-full flex justify-around gap-2">
                        <Link className="w-2/8" to={`/versions?_target=${props.version}_${props.abbrev}_${props.chapter}`}>
                            <Button className="group bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                <BookOpenText className="mx-auto text-primary group-hover:text-primary-foreground" /> {props.version?.toUpperCase()}
                            </Button>
                        </Link>
                        <Link className="w-2/8" to={`/books?_target=${props.version}_${props.abbrev}_${props.chapter}`}>
                            <Button className="group gap-1 w-4/8 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                <span className="block max-w-[130px] truncate">{props.name}</span>
                                <span className="block max-w-[30px] truncate"> {props.chapter ?? ''}</span>
                            </Button>
                        </Link>
                        <Link className="w-2/8" to={`/settings?_target=${props.version}_${props.abbrev}_${props.chapter}`}>
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
                    props.author && props.name && props.chapter && (
                        <>
                            <Link to={`/versions?_target=${props.version}_${props.abbrev}_${props.chapter}`}>
                                <Button className="group w-2/8 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                    <BookOpenText className="mx-auto text-primary group-hover:text-primary-foreground" />
                                </Button>
                            </Link>
                            <Link to={`/books?_target=${props.version}_${props.abbrev}_${props.chapter}`} className="flex flex-col items-center text-center">
                                <Button className="group w-2/8 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                                    <RefreshCcw strokeWidth={3} size={16} />
                                </Button>
                                <h1 className="mt-2 text-primary text-2xl font-bold max-w-[] flex items-center">{props.name ?? ''} </h1>
                                <h2 className="-mt-2 text-primary text-2xl font-bold ">{props.chapter ?? ''}</h2>
                            </Link>
                            <Link to={`/settings?_target=${props.version}_${props.abbrev}_${props.chapter}`}>
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
