import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { DoorOpenIcon } from "lucide-react";

import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/common/loader";

const SkeletonBooks = (props: { width: number }) => (
    <>
        <div className="px-4 py-6">
            <Skeleton className={`h-4 w-${props.width}/3`} />
        </div>
        <Separator />
    </>
);

export default function Books() {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const target = searchParams.get('_target');
    const [version, abbrev, chapter] = target?.split('_') ?? [];

    const [books, setBooks] = useState([]);
    const [bookAbbrev, setBookAbbrev] = useState(abbrev);

    const fetchBooks = async () => {
        const response = await api.get('/books');
        const data = await response.data;
        return data;
    };

    const handleSelectedChapter = (index: number) => {
        console.log(index)
        navigate(`/${version ?? 'nvi'}/${bookAbbrev}/${index}`);
    }

    useEffect(() => {
        document.title = 'Biblify | Livros';

        (async () => {
            const data = await fetchBooks();
            setBooks(data);
        })();
    }, []);

    return (
        <div className="bg-primary-foreground min-h-screen">
            <header className="bg-primary-foreground py-4 px-4 w-full flex justify-around items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20">
                <Link className="group w-4/8" to={`/${version ?? 'nvi'}/${abbrev ?? 'gn'}/${chapter ?? '1'}`}>
                    <Button className="bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary"><DoorOpenIcon /> Voltar</Button>
                </Link>

                <h1 className="text-primary text-center font-semibold">Livros</h1>

                <Button className="w-4/8 opacity-0"><DoorOpenIcon /> Voltar</Button>
            </header>
            <main className="mt-20 mb-8 w-full max-w-[880px] mx-auto bg-primary-foreground">
                {books && books.length === 0 && (
                    <div className="pt-4">
                        <Loader />
                        <SkeletonBooks width={2} />
                        <SkeletonBooks width={1} />
                        <SkeletonBooks width={1} />
                        <SkeletonBooks width={3} />
                        <SkeletonBooks width={1} />
                        <SkeletonBooks width={2} />
                        <SkeletonBooks width={1} />
                        <SkeletonBooks width={2} />
                        <SkeletonBooks width={1} />
                    </div>
                )}
                <Accordion type="single" collapsible className="w-full" onValueChange={(event) => setBookAbbrev(event)}>
                    {books && books.map((book: { abbrev: { pt: string }, name: string, chapters: number }) => (
                        <div key={book.abbrev.pt}>
                            <AccordionItem value={book.abbrev.pt}>
                                <AccordionTrigger className="px-4 py-4 w-full text-left text-lg text-primary">
                                    {book.name}
                                </AccordionTrigger>
                                <AccordionContent className="grid grid-cols-5 gap-2 px-4 py-2 w-full place-items-center">
                                    {Array.from({ length: book.chapters }, (_, index) => (
                                        <Button
                                            key={index}
                                            className="w-16 h-12 flex items-center justify-center bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary"
                                            onClick={() => handleSelectedChapter(index + 1)}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                    ))}
                </Accordion>
            </main>
        </div >
    )
}