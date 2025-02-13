import { useState, useEffect } from "react";
import { apiBible } from "@/services/api";
import { useParams, useSearchParams } from "react-router";
import useSettings from "@/hooks/use-settings";
import { verifyVersion } from "@/utils/verify";
import { IBook } from "@/interfaces/bible";

interface BooksResponse {
    abbrev: { pt: string, en: string },
    author: string,
    chapters: number,
    group: string,
    name: string,
    testament: string
}

interface ChapterResponse {
    book: { abbrev?: { pt?: string }, name?: string, author?: string, group?: string, version?: string };
    chapter: { number?: number, verses?: number };
    verses: Array<{ number?: number; text?: string }>;
}

export default function useBible() {
    const { version, abbrev, chapter } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { setLastBookChapter, saveSettings } = useSettings();

    const [book, setBook] = useState<IBook | null>(null);

    const initialBookAbbrev = abbrev ?? 'gn';
    const initialChapter = Number(chapter) || 1;

    const error = searchParams.get('error');

    useEffect(() => {
        setBook(null);

        if (!version || !initialBookAbbrev || !initialChapter || error)
            return;

        const fetchVerses = async () => {
            try {
                if (!verifyVersion(version)) {
                    const error = new Error('Versão não encontrada');
                    error.name = 'version_not_found';
                    throw error;
                }

                const responseBook = await apiBible.get(`/books`);
                const books: BooksResponse[] = responseBook.data;
                const bookIndex = books.findIndex((b) => b.abbrev.pt === initialBookAbbrev);
                const book = bookIndex !== -1 ? books[bookIndex] : undefined;

                if (!book) {
                    setLastBookChapter({ version: version ?? 'nvi', book: initialBookAbbrev ?? 'gn', chapter: 1 });
                    setSearchParams({ error: 'book_not_found' });
                    return;
                }

                const prevBook: BooksResponse = books[bookIndex - 1] ?? null;
                const nextBook: BooksResponse = books[bookIndex + 1] ?? null;

                const responseData = await apiBible.get(`/verses/${version}/${initialBookAbbrev}/${initialChapter}`);
                const data: ChapterResponse = responseData.data;

                setLastBookChapter({ version, book: initialBookAbbrev, chapter: initialChapter });
                setBook({
                    abbrev: book.abbrev.pt,
                    name: book.name,
                    author: book.author,
                    numChapters: book.chapters,
                    verses: data.verses,
                    etc: {
                        prevBook: prevBook ? { abbrev: prevBook.abbrev.pt, numChapters: prevBook.chapters } : null,
                        nextBook: nextBook ? { abbrev: nextBook.abbrev.pt, numChapters: nextBook.chapters } : null,
                    }
                });

                document.title = `Biblify | ${data.book.name} ${data.chapter.number} (${version.toUpperCase()})`;

                setSearchParams({});
            } catch (err: Error | any) {
                setLastBookChapter({ version: verifyVersion(version) ? version : 'nvi', book: 'gn', chapter: 1 });
                setBook(null);
                saveSettings();

                if (err.name != 'AxiosError')
                    setSearchParams({ error: err.name });
                else
                    setSearchParams({ error: 'onload_verses_error' });

                console.error('Erro ao carregar versículos:', err);
                location.reload();
            } finally {
                saveSettings();
            }
        };

        fetchVerses();
    }, [version, initialBookAbbrev, initialChapter]);

    return {
        version,
        book,
        chapter: initialChapter,
    };
}
