import { Link } from "react-router";
import { Link as LinkIcon } from "lucide-react";
import { useBibleChapter } from "@/hooks/use-bible-chapter";
import BibleReaderHeader from "@/components/bible-reader/header";
import { BibleReader } from "@/components/bible-reader/reader";
import { Loader } from "@/components/common/loader";
import UseBibleRouter from "@/hooks/use-bible-router";
import { AlertError } from "@/components/common/alert-error";
import { Button } from "@/components/ui/button";

const AlertErrorBibleReader = () => (
    <div className="flex flex-col items-center justify-center mx-4 mt-24">
        <AlertError>
            <div className="flex flex-col items-start">
                <p>Falha ao carregar esse capítulo!</p>
                <Button variant="destructive">
                    <Link to='/' className="flex gap-2 items-center"><LinkIcon /> Voltar para o ínicio</Link>
                </Button>
            </div>
        </AlertError>
    </div >
);

export default function Bible() {
    const { version, abbrev, chapter } = UseBibleRouter();
    const { book, verses, isLoading, failed } = useBibleChapter(version ?? '', abbrev ?? '', Number(chapter));

    if (failed) return <AlertErrorBibleReader />;

    return (
        <>
            {isLoading && <Loader />}
            <BibleReaderHeader
                name={book.name}
                author={book.author}
                chapter={book.chapter}
            />
            <BibleReader
                book={book}
                chapter={book.chapter ?? 0}
                verses={verses}
            />
            <footer className="text-xs text-zinc-500 text-center mb-4">
                Desenvolvido por João Pedro Monção - 2024
            </footer>
        </>
    );
}
