import SkeletonVerses from "@/components/bible-reader/skeleton-verses";

export interface ChapterResponse {
    book: { abbrev?: string, name?: string, author?: string, group?: string, version?: string };
    chapter: number;
    verses: Array<{ number?: number; text?: string }>;
}

interface BibleReaderProps {
    book: ChapterResponse['book'];
    chapter: number;
    verses: ChapterResponse['verses'];
}

export function BibleReader({ book, chapter, verses }: BibleReaderProps) {
    return (
        <main className="mt-4 mb-12 px-4 w-full max-w-[880px] mx-auto">
            {verses.length > 0 ? (
                verses.map((verse) => (
                    <span
                        className="text-lg text-zinc-800 pr-2"
                        key={`${book.abbrev}-${chapter}-${verse.number}`}
                    >
                        <span className="text-sm text-zinc-500">{verse.number}</span> {verse.text}
                    </span>
                ))
            ) : (
                <>
                    <SkeletonVerses />
                    <SkeletonVerses />
                    <SkeletonVerses />
                    <SkeletonVerses />
                </>
            )}
        </main>
    );
}
