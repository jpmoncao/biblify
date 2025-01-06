import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { DoorOpenIcon, Search } from "lucide-react";

import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
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
    window.scrollTo({ top: 0, behavior: "instant" });

    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const target = searchParams.get('_target');
    const [version, abbrev, chapter] = target?.split('_') ?? [];

    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [bookAbbrev, setBookAbbrev] = useState(abbrev);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBooks = async () => {
        const response = await api.get('/books');
        const data = await response.data;
        return data;
    };

    const handleSelectedChapter = (index: number) => {
        navigate(`/${version ?? 'nvi'}/${bookAbbrev}/${index}`);
    };

    useEffect(() => {
        document.title = 'Biblify | Livros';

        (async () => {
            const data = await fetchBooks();
            setBooks(data);
            setFilteredBooks(data);
        })();
    }, []);

    // Filtra os livros com base no termo de busca
    useEffect(() => {
        const filtered = books.filter((book: { name: string }) =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [searchTerm, books]);

    return (
        <div className="bg-primary-foreground min-h-screen">
            <header className="flex flex-col gap-6 w-full bg-primary-foreground border-b-[1px] p-4 fixed top-0 transition-all duration-200 ease-in h-20">
                <div className="w-full flex justify-around items-center ">
                    <Link className="group w-4/8" to={`/${version ?? 'nvi'}/${abbrev ?? 'gn'}/${chapter ?? '1'}`}>
                        <Button className="bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                            <DoorOpenIcon /> Voltar
                        </Button>
                    </Link>

                    <h1 className="text-primary text-center font-semibold">Livros</h1>

                    <Button className="w-4/8 opacity-0"><DoorOpenIcon /> Voltar</Button>
                </div>
            </header>
            <main className="mt-24 mb-8 w-full max-w-[880px] mx-auto bg-primary-foreground">
                <div className="w-full flex items-center justify-center">
                    <Search className="relative text-secondary-foreground left-8" size={24} />
                    <Input
                        placeholder="Buscar livro..."
                        className="indent-8 -ml-1 w-11/12 my-4 max-w-[400px] bg-secondary text-secondary-foreground"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.currentTarget.value)}
                    />
                </div>
                {filteredBooks && filteredBooks.length === 0 && (
                    <div className="pt-4">
                        <Loader />
                        <SkeletonBooks width={2} />
                        <SkeletonBooks width={1} />
                    </div>
                )}
                <Accordion type="single" collapsible className="w-full" onValueChange={(event) => setBookAbbrev(event)}>
                    {filteredBooks && filteredBooks.map((book: { abbrev: { pt: string }, name: string, chapters: number }) => (
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
        </div>
    );
}
