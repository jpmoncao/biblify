import { useSearchParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import useBibleChapter from "@/hooks/use-bible-chapter";
import useBibleRouter from "@/hooks/use-bible-router";
import useBibleSettings from "@/hooks/use-bible-settings";
import ErrorFallback from "@/components/common/error";
import BibleReaderHeader from "@/components/bible-reader/header";
import { BibleReader } from "@/components/bible-reader/reader";
import BibleReaderSkeleton from "@/components/bible-reader/skeleton";
import BibleReaderControl from "@/components/bible-reader/control";

export default function Bible() {
    const { version, abbrev, chapter } = useBibleRouter();
    const { book, verses, isLoading } = useBibleChapter(version ?? '', abbrev ?? '', Number(chapter));
    const [searchParams, setSearchParams] = useSearchParams();
    const error = searchParams.get('error');

    const { font } = useBibleSettings();

    if (error) return <ErrorFallback error={new Error(error)} resetErrorBoundary={() => {
        setSearchParams({ error: '' });
        window.location.reload();
    }} />;

    return (
        <ErrorBoundary fallbackRender={ErrorFallback}>
            <div className={`flex flex-col min-h-[100vh] font-${font}`}>
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
                            <footer className="mt-auto text-xs text-zinc-400 text-center pb-36 font-Inter">
                                Desenvolvido por João Pedro Monção - 2025
                            </footer>
                            <BibleReaderControl
                                version={version}
                                abbrev={abbrev}
                                chapter={book.chapter ?? 0}
                            />
                        </>
                    )}
            </div>
        </ErrorBoundary>
    );
}
