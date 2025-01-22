import { useState, useEffect } from "react";
import { apiBible } from "@/services/api";
import { ChapterResponse } from "@/components/bible-reader/reader";
import { useSearchParams } from "react-router";

export default function useBibleChapter(version: string, initialBook: string, initialChapter: number) {
    const [verses, setVerses] = useState<ChapterResponse['verses']>([]);
    const [book, setBook] = useState<ChapterResponse['book'] & { chapter?: number }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const error = searchParams.get('error');

    useEffect(() => {
        if (!version || !initialBook || !initialChapter || error) {
            setIsLoading(false);
            return;
        }

        const fetchVerses = async () => {
            try {
                const data = await apiBible.get(`/verses/${version}/${initialBook}/${initialChapter}`).then(response => response.data);
                setVerses(data.verses);
                setBook({ ...data.book, chapter: data.chapter.number });

                document.title = `Biblify | ${data.book.name} ${data.chapter.number} (${data.book.version.toUpperCase()})`;
            } catch (err) {
                console.error('Erro ao carregar versículos:', err);
                setSearchParams({ error: 'onload_verses_error' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchVerses();
    }, [version, initialBook, initialChapter]);

    return { book, verses, isLoading };
}
