import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { IBook, IVerse, IHighlightedVerse } from "@/interfaces/bible";
import { foundErrorCode } from "@/utils/errors";
import { useSettingsContext } from "@/contexts/settings";
import useBible from "@/hooks/use-bible";
import { useToast } from "@/hooks/use-toast";
import { apiAccount } from "@/services/api";

type IBibleContext = {
    version: string;
    chapter: number;
    book: IBook;
    isLoading: boolean;
    error: Error | null;
    selectedVerses: number[];
    highlightedVerses: IHighlightedVerse[];
    prevVerse: () => void;
    nextVerse: () => void;
    toggleSelectedVerse: (verse: IVerse) => void;
    clearSelectedVerses: () => void;
    copySelectedVerses: () => void;
    formatSelectedVerses: () => string;
    applyHighlightColor: (color: string) => void;
};

const BibleContext = createContext<IBibleContext | undefined>(undefined);

const BibleProvider = ({ children }: { children: React.ReactNode }) => {
    const { settings } = useSettingsContext();

    const { toast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
    const [highlightedVerses, setHighlightedVerses] = useState<IHighlightedVerse[]>([]);

    const { version, book, chapter } = useBible();

    useEffect(() => {
        const errorSearchParams = searchParams.get("error");
        setError(
            errorSearchParams
                ? { name: errorSearchParams, message: foundErrorCode(errorSearchParams) }
                : null
        );

        setIsLoading(!version || !book || !chapter || !book.verses);

        const fetchData = async () => {
            await fetchHighlightedVerses(book?.abbrev, chapter);
        };

        fetchData();
    }, [version, book, chapter, searchParams]);

    const fetchHighlightedVerses = async (abbrev: string | undefined, chapter: number) => {
        const token = settings().token;

        if (!token || !abbrev || !chapter) {
            setHighlightedVerses([]);
            return;
        }

        try {
            const response = await apiAccount.get(`/verses/highlight/${abbrev}/${chapter}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setHighlightedVerses(response.data.data);
        } catch (error) {
            console.error("Error fetching highlighted verses:", error);
            setHighlightedVerses([]);
        }
    }

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

    const copySelectedVerses = () => {
        const verses = selectedVerses.sort((a, b) => a - b);

        const versesText = verses.map((v) => {
            const verse = book?.verses?.find((verse) => verse.number === v);
            return verse ? `${verse.number} ${verse.text}` : "";
        });

        const versesTextJoined = versesText.join("\n") + "\n" + `${book?.name} ${formatSelectedVerses()} (${version?.toUpperCase()})`;

        navigator.clipboard.writeText(versesTextJoined);

        toast({ title: "Versículos copiados!", duration: 800, });

        clearSelectedVerses();
    };

    const formatSelectedVerses = (): string => {
        if (selectedVerses.length === 0)
            return '';

        const numbers = [...selectedVerses].map(verse => Number(verse)).sort((a, b) => a - b);

        let numbersArray: number[][] = [];
        let referenceIndex = 0;

        numbers.forEach((number, index) => {
            if (index === numbers.length - 1 || numbers[index + 1] - number > 1) {
                const start = numbers[referenceIndex];
                const end = number;

                if (start !== end) {
                    numbersArray.push([start, end]);
                } else {
                    numbersArray.push([start]);
                }

                referenceIndex = index + 1;
            }
        });

        return numbersArray.map(arr => arr.join('-')).join(', ');
    };

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

    const applyHighlightColor = async (color: string | null): Promise<void> => {
        if (!color) return;
        const token = settings().token;

        if (!token || !book || !chapter) return;

        try {
            await apiAccount.post(`/verses/highlight/${book.abbrev}/${chapter}`, {
                verses: selectedVerses,
                color,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const newHighlightedVerses: IHighlightedVerse[] = selectedVerses.map(verse => ({ verse, color }));
            const filteredHighlightedVerses = highlightedVerses.length > 0 ? highlightedVerses.filter(hv => !selectedVerses.includes(hv.verse)) : [];

            setHighlightedVerses([...filteredHighlightedVerses, ...newHighlightedVerses]);
        } catch (error) {
            console.error("Erro ao aplicar cor de destaque:", error);
        } finally {
            clearSelectedVerses();
        }
    };

    const contextValue = useMemo(
        () => ({
            version: version ?? "nvi",
            book: {
                abbrev: book?.abbrev ?? "gn",
                name: book?.name,
                author: book?.author,
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
            highlightedVerses,
            prevVerse,
            nextVerse,
            toggleSelectedVerse,
            clearSelectedVerses,
            copySelectedVerses,
            formatSelectedVerses,
            applyHighlightColor,
        }),
        [version, book, chapter, isLoading, error, selectedVerses, highlightedVerses]
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
