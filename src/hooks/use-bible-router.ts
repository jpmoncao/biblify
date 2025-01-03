import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import api from "@/services/api";

export default function useBibleRouter() {
    const navigate = useNavigate();
    const { version, abbrev, chapter } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    const error = searchParams.get('error');

    useEffect(() => {
        if (error) {
            setIsLoading(false);
            return;
        }

        (async () => {
            try {
                const { data: versions } = await api.get(`/versions`);
                if (!versions.find((v: any) => v.version === version)) {
                    setSearchParams({ error: 'version_not_found' });
                    return;
                }

                if (!abbrev) {
                    navigate(`/${version}/gn`);
                    return;
                }

                const { data: books } = await api.get(`/books`);
                const bookData = books.find((b: any) => b.abbrev.pt === abbrev);
                console.log(bookData);
                if (!bookData) {
                    setSearchParams({ error: 'book_not_found' });
                    return;
                }

                const validChapter = Number(chapter);
                if (!chapter || validChapter <= 0) {
                    navigate(`/${version}/${abbrev}/1`);
                    return;
                }

                if (validChapter > bookData.chapters) {
                    navigate(`/${version}/${abbrev}/${bookData.chapters}`);
                    return;
                }
            } catch (err) {
                console.error('Erro inesperado:', err);
                setSearchParams({ error: 'unexpected_error' });
            } finally {
                setIsLoading(false);
            }
        })();
    }, [version, abbrev, chapter, navigate]);

    return { version, abbrev, chapter, isLoading };
}
