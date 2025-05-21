import { useEffect } from "react";
import { useSettingsContext } from "@/contexts/settings";
import { useBibleContext } from "@/contexts/bible";
import { getClassNameHighlightColorBible } from "@/utils/colors";
import SelectionMenu from "@/components/bible-reader/selection-menu";

export default function BibleReader() {
    useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

    const { settings } = useSettingsContext();
    const { fontSize, theme } = settings();

    const { book, selectedVerses, highlightedVerses, toggleSelectedVerse, applyHighlightColor } = useBibleContext();

    const getVerseHighlightColor = (verse: number) => {
        const highlightedVerse = highlightedVerses.length > 0 ? highlightedVerses.find((v) => v.verse === verse) : null;
        return { isHighlighted: highlightedVerse ? true : false, verseHighlightColor: highlightedVerse?.color || '' };
    };

    return (
        <main className="mt-4 mb-12 px-4 w-full max-w-[880px] mx-auto">
            <SelectionMenu onColorSelect={(color) => applyHighlightColor(color ?? '')} />
            <main className={`${selectedVerses.length > 0 ? 'pb-36' : ''}`}>
                {book && book?.verses?.map((verse) => {
                    const isSelected = selectedVerses.includes(verse.number ?? 0);

                    const { isHighlighted, verseHighlightColor } = getVerseHighlightColor(verse.number ?? 0);
                    const classNameHighlightColorBible = getClassNameHighlightColorBible(theme, verseHighlightColor);

                    return (
                        <span
                            onClick={() => toggleSelectedVerse(verse)}
                            className={`text-foreground pr-2 cursor-pointer select-none ${fontSize} transition-all ${isSelected ? 'border-b border-primary border-dashed' : ''} ${isHighlighted ? classNameHighlightColorBible : ''} `}
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
