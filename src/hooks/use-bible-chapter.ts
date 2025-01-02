import { useState, useEffect } from "react";
import api from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { ChapterResponse } from "@/components/bible-reader/reader";

export function useBibleChapter(initialBook: string, initialChapter: number) {
    const { toast } = useToast();
    const [verses, setVerses] = useState<ChapterResponse['verses']>([]);
    const [book, setBook] = useState<ChapterResponse['book'] & { chapter?: number }>({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchVerses = async () => {
        try {
            const data = await api.get(`/verses/nvi/${initialBook}/${initialChapter}`)
                .then(response => response.data);

            return data;
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Ops! Ocorreu um erro.",
                description: "Não foi possível carregar os versículos",
            });
            console.error('Erro ao carregar versículos:', error);
        }
    };

    useEffect(() => {
        (async () => {
            const data = await fetchVerses();
            if (data) {
                setVerses(data.verses);
                setBook({ ...data.book, chapter: data.chapter.number });

                document.title = `Biblify | ${data.book.name} ${data.chapter.number} (${data.book.version.toUpperCase()})`;
            }
            setIsLoading(false);
        })();
    }, [initialBook, initialChapter]);

    return { book, verses, isLoading };
}
