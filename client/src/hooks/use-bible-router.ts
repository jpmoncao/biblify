import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { apiBible } from "@/services/api";

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
                const { data: versions } = await apiBible.get(`/versions`);
                if (!versions.find((v: any) => v.version === version)) {
                    setSearchParams({ error: 'version_not_found' });
                    return;
                }

                if (!abbrev) {
                    navigate(`/${version}/gn`);
                    return;
                }

                let nextBook = { abbrev: { pt: '' }, chapters: 0 };
                let prevBook = nextBook;

                const { data: books } = await apiBible.get(`/books`);
                const bookData = books.find((b: any, index: number) => {
                    prevBook = books[index - 1];
                    nextBook = books[index + 1];
                    return b.abbrev.pt === abbrev
                });

                if (!bookData) {
                    setSearchParams({ error: 'book_not_found' });
                    return;
                }

                const validChapter = Number(chapter);
                if (!chapter || validChapter <= 0) {
                    if (prevBook.abbrev.pt != '')
                        navigate(`/${version}/${prevBook.abbrev.pt}/${prevBook.chapters}`);
                    else
                        navigate(`/${version}/${abbrev}/1`);
                    return;
                }

                if (validChapter > bookData.chapters) {
                    if (nextBook.abbrev.pt != '')
                        navigate(`/${version}/${nextBook.abbrev.pt}/1`);
                    else
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
