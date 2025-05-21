import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { BookOpenText, ArrowLeft, ArrowRight, RefreshCcw } from 'lucide-react';
import { useBibleContext } from "@/contexts/bible";
import { StandardButton } from "@/components/common/standard/button";
import { Loader } from "@/components/common/loader";

export default function BibleReaderHeader() {
    const { version, book, chapter, isLoading, prevVerse, nextVerse } = useBibleContext();

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
    }, [prevVerse, nextVerse]);

    console.log({ version, book, chapter, isLoading })

    if (isLoading)
        return (
            <div className="h-32 flex justify-center items-center">
                <Loader />
            </div>
        );

    return (
        <>
            <header className={`bg-background py-4 w-full border-b-[1px] shadow-md fixed top-0 transition-all duration-200 ease-in font-Inter ${isVisible ? '-translate-y-full' : 'translate-y-0'}`}
            >
                <div className="w-full flex sm:justify-center sm:gap-6 justify-around">
                    <StandardButton
                        to="/versions"
                        icon={<BookOpenText />}
                        className="w-1/6 max-w-24"
                    >
                        {version?.toUpperCase()}
                    </StandardButton>

                    <StandardButton
                        to="/books"
                        className="w-2/6 max-w-96 px-0"
                    >
                        {`${book.name} ${chapter}`}
                    </StandardButton>

                    <div className="w-2/6 max-w-24 flex gap-1 items-center">
                        <StandardButton
                            icon={<ArrowLeft />}
                            onClick={prevVerse}
                            className="w-1/2 aspect-square py-1 px-2"
                        />

                        <StandardButton
                            icon={<ArrowRight />}
                            onClick={nextVerse}
                            className="w-1/2 aspect-square py-1 px-2"
                        />
                    </div>
                </div>
            </header >

            <header ref={elementRef} className={`max-h-32 h-full pt-4 w-full flex flex-col justify-center transition-all ease-in ${isVisible ? 'opacity-100' : 'opacity-0'} max-w-[880px] mx-auto`}>
                <nav className="w-full flex justify-around">
                    <StandardButton
                        to="/versions"
                        icon={<BookOpenText />}
                        className="w-2/6 max-w-24"
                    >
                        {version?.toUpperCase()}
                    </StandardButton>

                    <StandardButton
                        to="/books"
                        icon={<RefreshCcw strokeWidth={3} size={16} />}
                        className="w-1/6 max-w-24 justify-center"
                    />

                    <div className="w-2/6 max-w-24 flex gap-1 items-center">
                        <StandardButton
                            icon={<ArrowLeft />}
                            onClick={prevVerse}
                            className="w-1/2 aspect-square py-1 px-2"
                        />

                        <StandardButton
                            icon={<ArrowRight />}
                            onClick={nextVerse}
                            className="w-1/2 aspect-square py-1 px-2"
                        />
                    </div>
                </nav>

                <Link to={`/books`} className="flex flex-col items-center text-center mt-4">
                    <h1 className="mt-2 text-primary text-2xl font-bold flex items-center">{book.name}</h1>
                    <h2 className="-mt-2 text-primary text-2xl font-bold ">{chapter}</h2>
                </Link>
            </header >
        </>
    );
}
