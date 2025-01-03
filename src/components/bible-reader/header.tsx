import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { BookOpenText, Settings } from 'lucide-react';
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
                setIsVisible(rect.top > -64);
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
                className={`bg-white py-4 w-full flex justify-around items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in ${isVisible ? '-translate-y-full' : 'translate-y-0'}`}
            >
                {props.name && (
                    <div className="w-full flex justify-around gap-2">
                        <Link className="w-2/8" to={`/versions?_target=${props.version}_${props.abbrev}_${props.chapter}`}>
                            <Button className="group bg-white border border-b-2 border-black text-black hover:text-white hover:bg-black">
                                <BookOpenText className="mx-auto text-black group-hover:text-white" /> {props.version?.toUpperCase()}
                            </Button>
                        </Link>
                        <Link className="w-2/8" to={`/books?_target=${props.version}_${props.abbrev}_${props.chapter}`}>
                            <Button className="group gap-1 w-4/8 bg-white border border-b-2 border-black text-black hover:text-white hover:bg-black">
                                <span className="block max-w-[130px] truncate">{props.name}</span>
                                <span className="block max-w-[30px] truncate"> {props.chapter ?? ''}</span>
                            </Button>
                        </Link>
                        <Button className="group w-2/8 bg-white border border-b-2 border-black text-black hover:text-white hover:bg-black">
                            <Settings className="mx-auto text-black group-hover:text-white" /> Ajustes
                        </Button>
                    </div>
                )}
            </header >

            < header
                ref={elementRef}
                className={`bg-white pt-4 h-32 w-full flex items-center justify-around transition-all ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`
                }
            >
                {
                    props.author && props.name && props.chapter && (
                        <>
                            <Link to={`/versions?_target=${props.version}_${props.abbrev}_${props.chapter}`}>
                                <Button className="group w-2/8 bg-white border border-b-2 border-black text-black hover:text-white hover:bg-black">
                                    <BookOpenText className="mx-auto text-black group-hover:text-white" />
                                </Button>
                            </Link>
                            <Link to={`/books?_target=${props.version}_${props.abbrev}_${props.chapter}`} className="flex flex-col items-center text-center">
                                <h2 className="text-sm">{props.author && `Escrito por ${props.author}`}</h2>
                                <h1 className="text-2xl font-bold max-w-[200px]">{props.name ?? ''}</h1>
                                <h2 className="text-lg">{props.chapter ?? ''}</h2>
                            </Link>
                            <Button className="group w-2/8 bg-white border border-b-2 border-black text-black hover:text-white hover:bg-black">
                                <Settings className="mx-auto text-black group-hover:text-white" />
                            </Button>
                        </>
                    )
                }
            </header >
        </>
    );
}
