import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";
import { apiBible } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/loader";
import { Header } from "@/components/common/header";
import { useSettingsContext } from "@/contexts/settings";

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
    const { settings } = useSettingsContext();
    const {version, book} = settings().lastBookChapter;

    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [bookAbbrev, setBookAbbrev] = useState(book);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBooks = async () => {
        const response = await apiBible.get('/books');
        const data = await response.data;
        return data;
    };

    const handleSelectedChapter = (index: number) => {
        navigate(`/${version ?? 'nvi'}/${bookAbbrev}/${index}`);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });

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
        <div className="animate-opacity bg-background min-h-screen">
            <Header title="Livros" />

            <main className="mt-24 mb-8 w-full max-w-[880px] mx-auto bg-background">
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
                    {filteredBooks && filteredBooks.map((book: { abbrev: { pt: string }, name: string, chapters: number }, key: number) => (
                        <div key={book.abbrev.pt}>
                            <AccordionItem value={book.abbrev.pt}>
                                <AccordionTrigger className={`px-4 py-4 w-full text-left text-lg text-primary ${key === 0 && 'border-t'}`}>
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
