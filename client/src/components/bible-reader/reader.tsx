import { useEffect, useState } from "react";
import { useSettingsContext } from "@/contexts/settings";
import { useBibleContext } from "@/contexts/bible";
import FormatMenu from "@/components/bible-reader/format-menu";
import { getClassNameHighlightColorBible } from "@/utils/colors";

interface HighlightedVerse {
    verse: number;
    color: string;
}

export default function BibleReader() {
    useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

    const { settings } = useSettingsContext();
    const { fontSize } = settings;

    const { book, selectedVerses, toggleSelectedVerse, clearSelectedVerses } = useBibleContext();

    const [highlightedVerses, setHighlightedVerses] = useState<HighlightedVerse[]>([]);

    const getHighlightColor = (verse: number) => {
        const highlightedVerse = highlightedVerses.find((v) => v.verse === verse);
        return highlightedVerse?.color || '';
    };

    const applyHighlightColor = (color: string | null): void => {
        if (!color) return;

        const onGoingHighlightedVerses: HighlightedVerse[] = selectedVerses.map(v => ({ verse: v, color }));

        const filteredHighlightedVerses = highlightedVerses.filter(hv =>
            !selectedVerses.includes(hv.verse)
        );

        setHighlightedVerses([...filteredHighlightedVerses, ...onGoingHighlightedVerses]);
        clearSelectedVerses();
    };

    return (
        <main className="mt-4 mb-12 px-4 w-full max-w-[880px] mx-auto">
            <FormatMenu onColorSelect={(color) => applyHighlightColor(color)} />
            <main >
                {book && book?.verses?.map((verse) => {
                    const isHighlighted = selectedVerses.includes(verse.number ?? 0);
                    const highlightColor = getHighlightColor(verse.number ?? 0);

                    return (
                        <span
                            onClick={() => toggleSelectedVerse(verse)}
                            className={`${isHighlighted ? 'border-b border-primary border-dashed' : ''} ${highlightColor != '' && getClassNameHighlightColorBible(settings.theme, highlightColor)} text-foreground pr-2 cursor-pointer select-none ${fontSize}`}
                            key={verse.number}
                        >
                            <span className="text-sm text-zinc-400 mr-1">{verse.number}</span>
                            <span>{verse.text}</span>
                        </span>
                    );
                })}
            </main>
        </main>
    );
}
