import { ErrorBoundary } from "react-error-boundary";
import useBibleChapter from "@/hooks/use-bible-chapter";
import useBibleRouter from "@/hooks/use-bible-router";
import ErrorFallback from "@/components/common/error";
import BibleReaderHeader from "@/components/bible-reader/header";
import { BibleReader } from "@/components/bible-reader/reader";
import BibleReaderSkeleton from "@/components/bible-reader/skeleton";
import { useSearchParams } from "react-router";

export default function Bible() {
    const { version, abbrev, chapter } = useBibleRouter();
    const { book, verses, isLoading } = useBibleChapter(version ?? '', abbrev ?? '', Number(chapter));
    const [searchParams, setSearchParams] = useSearchParams();
    const error = searchParams.get('error');

    if (error) return <ErrorFallback error={new Error(error)} resetErrorBoundary={() => {
        setSearchParams({ error: '' });
        window.location.reload();
    }} />;

    return (
        <ErrorBoundary fallbackRender={ErrorFallback}>
            <div className="flex flex-col h-[100vh]">
                {isLoading
                    ? <BibleReaderSkeleton />
                    : (
                        <>
                            <BibleReaderHeader
                                abbrev={abbrev}
                                name={book.name}
                                author={book.author}
                                chapter={book.chapter}
                                version={version}
                            />
                            <BibleReader
                                book={book}
                                chapter={book.chapter ?? 0}
                                verses={verses}
                            />
                            <footer className="mt-auto text-xs text-zinc-500 text-center pb-4">
                                Desenvolvido por João Pedro Monção - 2024
                            </footer>
                        </>
                    )}
            </div>
        </ErrorBoundary>
    );
}
