import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { IBook } from "@/interfaces/bible";
import { foundErrorCode } from "@/utils/errors";
import useBible from "@/hooks/use-bible";
import { useToast } from "@/hooks/use-toast";

type IBibleContext = {
    version: string;
    book: IBook;
    chapter: number;
    isLoading: boolean;
    error: Error | null;
    prevVerse: () => void;
    nextVerse: () => void;
};

const BibleContext = createContext<IBibleContext>({
    version: 'nvi',
    book: {
        abbrev: 'gn',
        name: 'Desconhecido',
        author: 'Desconhecido',
        verses: [],
        etc: { prevBook: null, nextBook: null }
    },
    prevVerse: () => { },
    nextVerse: () => { },
    chapter: 1,
    isLoading: true,
    error: null
});

const BibleProvider = ({ children }: { children: React.ReactNode }) => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { version, book, chapter } = useBible();
    const [searchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const errorSearchParams = searchParams.get('error');
        setError(errorSearchParams
            ? { name: errorSearchParams!, message: foundErrorCode(errorSearchParams) }
            : null);

        setIsLoading(!version || !book || !chapter || !book.verses)
    }, [version, book, chapter]
    );
    useEffect(() => console.log({ isLoading, error }), [isLoading, error]);

    const contextValue = useMemo(() => ({
        version: version ?? 'nvi',
        book: {
            abbrev: book?.abbrev ?? 'gn',
            name: book?.name ?? 'Desconhecido',
            author: book?.author ?? 'Desconhecido',
            numChapter: book?.numChapters ?? 1,
            verses: book?.verses ?? [],
            etc: { prevBook: book?.etc.prevBook ?? null, nextBook: book?.etc.nextBook ?? null }
        },
        chapter: chapter ?? 1,
        isLoading: isLoading ?? false,
        error,
        prevVerse,
        nextVerse,
    }), [version, book, chapter, isLoading, error]);

    function prevVerse(): void {
        if (chapter == 1) {
            if (book?.etc.prevBook) {
                setIsLoading(true);
                navigate(`/${version}/${book?.etc.prevBook.abbrev}/${book?.etc.prevBook.numChapters}`);
            } else {
                toast({
                    title: 'Ops... Esse é o primeiro livro.',
                    description: 'Continue sua leitura, estamos apenas começando!'
                });
            }

            return;
        }

        setIsLoading(true);
        navigate(`/${version}/${book?.abbrev}/${chapter - 1}`);
    }

    function nextVerse(): void {
        if (chapter == book?.numChapters) {
            if (book?.etc.nextBook) {
                setIsLoading(true);
                navigate(`/${version}/${book?.etc.nextBook.abbrev}/${1}`);
            } else {
                toast({
                    title: 'Esse é o fim.',
                    description: 'Cultive esses livros no seu coração, experimente voltar ao início e seja transformado!'
                });
            }

            return;
        }

        setIsLoading(true);
        navigate(`/${version}/${book?.abbrev}/${chapter + 1}`);
    }

    return (
        <BibleContext.Provider value={contextValue}>
            {children}
        </BibleContext.Provider>
    );
};

const useBibleContext = () => useContext(BibleContext);

export { BibleContext, BibleProvider, useBibleContext };
