import { useState, useEffect } from "react";
import api from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { ChapterResponse } from "@/components/bible-reader/reader";

export function useBibleChapter(version: string, initialBook: string, initialChapter: number) {
    const { toast } = useToast();
    const [verses, setVerses] = useState<ChapterResponse['verses']>([]);
    const [book, setBook] = useState<ChapterResponse['book'] & { chapter?: number }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!version || !initialBook || !initialChapter) {
            setFailed(true);
            setIsLoading(false);
            return;
        }

        const fetchVerses = async () => {
            try {
                const data = await api.get(`/verses/${version}/${initialBook}/${initialChapter}`).then(response => response.data);
                setFailed(false);
                setVerses(data.verses);
                setBook({ ...data.book, chapter: data.chapter.number });

                document.title = `Biblify | ${data.book.name} ${data.chapter.number} (${data.book.version.toUpperCase()})`;
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Ops! Ocorreu um erro.",
                    description: "Não foi possível carregar os versículos",
                });
                setFailed(true);
                console.error('Erro ao carregar versículos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVerses();
    }, [version, initialBook, initialChapter, toast]);

    return { book, verses, isLoading, failed };
}
