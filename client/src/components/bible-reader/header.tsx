import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { BookOpenText, ArrowLeft, ArrowRight, RefreshCcw } from 'lucide-react';
import { useBibleContext } from "@/contexts/bible";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function BibleReaderHeader() {
    const { version, book, chapter, prevVerse, nextVerse } = useBibleContext();

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
            <header className={`bg-background py-4 w-full border-b-[1px] shadow-md fixed top-0 transition-all duration-200 ease-in font-Inter ${isVisible ? '-translate-y-full' : 'translate-y-0'}`}
            >
                <div className="w-full flex justify-center gap-6">
                    <Link to={`/versions`} className="w-1/6 max-w-24">
                        <Button className="group w-full bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                            <BookOpenText className="mx-auto text-primary group-hover:text-primary-foreground" /> {
                                book.name && chapter ? version?.toUpperCase() : <Skeleton className="h-4 w-[30px]" />}
                        </Button>
                    </Link>
                    <Link to={`/books`} className="w-2/6 max-w-[400px]">
                        <Button className="group w-full gap-1 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                            {book.name && chapter
                                ? (<>
                                    <span className="block max-w-[130px] truncate">{book.name}</span>
                                    <span className="block max-w-[30px] truncate"> {chapter ?? ''}</span>
                                </>)
                                : (<>
                                    <Skeleton className="h-4 w-[130px]" />
                                    <Skeleton className="h-4 w-[30px]" />
                                </>)
                            }
                        </Button>
                    </Link>
                    <div className="w-1/6 max-w-24 flex gap-1 items-center">
                        <Button className="group w-1/2  bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary aspect-square py-1 px-2" onClick={prevVerse}>
                            <ArrowLeft className="mx-auto text-primary group-hover:text-primary-foreground" />
                        </Button>
                        <Button className="group w-1/2 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary aspect-square py-1 px-2" onClick={nextVerse}>
                            <ArrowRight className="mx-auto text-primary group-hover:text-primary-foreground" />
                        </Button>
                    </div>
                </div>
            </header >

            <header ref={elementRef} className={`max-h-32 h-full pt-4 w-full flex flex-col justify-center transition-all ease-in ${isVisible ? 'opacity-100' : 'opacity-0'} max-w-[880px] mx-auto`}>
                <nav className="w-full flex justify-around">
                    <Link to={`/versions`} className="sm:w-1/6 max-w-24">
                        <Button className="group w-full bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                            <BookOpenText className="mx-auto text-primary group-hover:text-primary-foreground" />
                            {book.name && chapter ? version?.toUpperCase() : <Skeleton className="h-4 w-12" />}
                        </Button>
                    </Link>

                    <Link to={`/books`} className="sm:w-2/6 max-w-12 flex items-center justify-center">
                        <Button className="group bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary flex w-full">
                            <RefreshCcw strokeWidth={3} size={16} />
                        </Button>
                    </Link>

                    <div className="sm:w-1/6 flex gap-1 items-center max-w-24">
                        <Button className="group w-1/2 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary aspect-square py-1 px-2" onClick={prevVerse}>
                            <ArrowLeft className="mx-auto text-primary group-hover:text-primary-foreground" />
                        </Button>
                        <Button className="group w-1/2 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary aspect-square py-1 px-2" onClick={nextVerse}>
                            <ArrowRight className="mx-auto text-primary group-hover:text-primary-foreground" />
                        </Button>
                    </div>
                </nav>

                <Link to={`/books`} className="flex flex-col items-center text-center mt-4">
                    {book.name && chapter
                        ? <h1 className="mt-2 text-primary text-2xl font-bold flex items-center">{book.name}</h1>
                        : <Skeleton className="mt-4 h-6 w-1/3 mx-auto" />
                    }
                    {book.name && chapter
                        ? <h2 className="-mt-2 text-primary text-2xl font-bold ">{chapter}</h2>
                        : <Skeleton className="mt-1 h-6 w-8" />
                    }
                </Link>
            </header >
        </>
    );
}
