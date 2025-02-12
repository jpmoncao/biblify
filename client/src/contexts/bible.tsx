import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { IBook, IVerse } from "@/interfaces/bible";
import { foundErrorCode } from "@/utils/errors";
import useBible from "@/hooks/use-bible";
import { useToast } from "@/hooks/use-toast";

type IBibleContext = {
    version: string;
    chapter: number;
    book: IBook;
    isLoading: boolean;
    error: Error | null;
    selectedVerses: number[];
    prevVerse: () => void;
    nextVerse: () => void;
    toggleSelectedVerse: (verse: IVerse) => void;
    clearSelectedVerses: () => void;
};

const BibleContext = createContext<IBibleContext | undefined>(undefined);

const BibleProvider = ({ children }: { children: React.ReactNode }) => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [selectedVerses, setSelectedVerses] = useState<number[]>([]);

    const { version, book, chapter } = useBible();

    useEffect(() => {
        const errorSearchParams = searchParams.get("error");
        setError(
            errorSearchParams
                ? { name: errorSearchParams, message: foundErrorCode(errorSearchParams) }
                : null
        );

        setIsLoading(!version || !book || !chapter || !book.verses);
    }, [version, book, chapter, searchParams]);

    const toggleSelectedVerse = (verse: IVerse) => {
        const verseNumber = verse.number;
        if (!verseNumber || verseNumber <= 0) return;

        setSelectedVerses((prev) =>
            prev.includes(verseNumber)
                ? prev.filter((v) => v !== verseNumber)
                : [...prev, verseNumber]
        );
    };

    const clearSelectedVerses = () => { setSelectedVerses([]); }

    const prevVerse = () => {
        if (chapter === 1) {
            if (book?.etc.prevBook) {
                setIsLoading(true);
                navigate(`/${version}/${book.etc.prevBook.abbrev}/${book.etc.prevBook.numChapters}`);
            } else {
                toast({
                    title: "Ops... Esse é o primeiro livro.",
                    description: "Continue sua leitura, estamos apenas começando!",
                });
            }
            return;
        }

        setIsLoading(true);
        navigate(`/${version}/${book?.abbrev}/${chapter - 1}`);
    };

    const nextVerse = () => {
        if (chapter === book?.numChapters) {
            if (book?.etc.nextBook) {
                setIsLoading(true);
                navigate(`/${version}/${book.etc.nextBook.abbrev}/1`);
            } else {
                toast({
                    title: "Esse é o fim.",
                    description:
                        "Cultive esses livros no seu coração, experimente voltar ao início e seja transformado!",
                });
            }
            return;
        }

        setIsLoading(true);
        navigate(`/${version}/${book?.abbrev}/${chapter + 1}`);
    };

    const contextValue = useMemo(
        () => ({
            version: version ?? "nvi",
            book: {
                abbrev: book?.abbrev ?? "gn",
                name: book?.name ?? "Desconhecido",
                author: book?.author ?? "Desconhecido",
                numChapters: book?.numChapters ?? 1,
                verses: book?.verses ?? [],
                etc: {
                    prevBook: book?.etc.prevBook ?? null,
                    nextBook: book?.etc.nextBook ?? null,
                },
            },
            chapter: chapter ?? 1,
            isLoading,
            error,
            selectedVerses,
            prevVerse,
            nextVerse,
            toggleSelectedVerse,
            clearSelectedVerses,
        }),
        [version, book, chapter, isLoading, error, selectedVerses]
    );

    return (
        <BibleContext.Provider value={contextValue}>
            {children}
        </BibleContext.Provider>
    );
};

const useBibleContext = () => {
    const context = useContext(BibleContext);
    if (!context) {
        throw new Error("useBibleContext must be used within a BibleProvider");
    }
    return context;
};

export { BibleProvider, useBibleContext };
