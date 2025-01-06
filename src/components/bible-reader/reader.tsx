import { useEffect, useState } from "react";
import FormatMenu from "@/components/bible-reader/format-menu";

export interface ChapterResponse {
    book: { abbrev?: { pt?: string }, name?: string, author?: string, group?: string, version?: string };
    chapter: number;
    verses: Array<{ number?: number; text?: string }>;
}

interface BibleReaderProps {
    book: ChapterResponse['book'];
    chapter: number;
    verses: ChapterResponse['verses'];
}

interface HighlightedVerse {
    key: string;
    color: string;
}

export function BibleReader({ book, chapter, verses }: BibleReaderProps) {
    const [versesHighlighted, setVersesHighlighted] = useState<string[]>([]);
    const [highlightedVerses, setHighlightedVerses] = useState<HighlightedVerse[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Seleciona ou desseleciona um versículo
    const toggleHighlight = (verseKey: string) => {
        setVersesHighlighted((prev) =>
            prev.includes(verseKey)
                ? prev.filter((key) => key !== verseKey) // Remove se já estiver selecionado
                : [...prev, verseKey] // Adiciona se não estiver selecionado
        );
    };

    // Aplica ou remove a cor nos versículos selecionados
    const applyHighlightColor = (color: string) => {
        const allHaveSameColor = versesHighlighted.every((key) => {
            const verse = highlightedVerses.find((v) => v.key === key);
            return verse?.color === color;
        });

        setHighlightedVerses((prev) => {
            let updatedVerses = prev.filter((v) => !versesHighlighted.includes(v.key)); // Remove versículos selecionados

            if (!allHaveSameColor) {
                // Adiciona com nova cor
                const newHighlights = versesHighlighted.map((key) => ({ key, color }));
                updatedVerses = [...updatedVerses, ...newHighlights];
            }

            return updatedVerses;
        });

        setVersesHighlighted([]); // Limpa seleção
        setIsMenuOpen(false); // Fecha menu
    };

    // Abre/fecha o menu baseado nos versículos selecionados
    useEffect(() => {
        setIsMenuOpen(versesHighlighted.length !== 0);
    }, [versesHighlighted]);

    // Retorna a cor de um versículo, se tiver
    const getHighlightColor = (verseKey: string) => {
        const verse = highlightedVerses.find((v) => v.key === verseKey);
        return verse?.color || '';
    };

    return (
        <main className="mt-4 mb-12 px-4 w-full max-w-[880px] mx-auto">
            <FormatMenu
                open={isMenuOpen}
                versesHighlighted={versesHighlighted}
                onColorSelect={applyHighlightColor}
            />
            <main className={`${isMenuOpen && 'pb-36'}`}>
                {verses.length > 0 && verses.map((verse) => {
                    const verseKey = `${book?.abbrev?.pt}-${chapter}-${verse.number}`;
                    const isHighlighted = versesHighlighted.includes(verseKey);
                    const highlightColor = getHighlightColor(verseKey);

                    return (
                        <span
                            onClick={() => toggleHighlight(verseKey)}
                            className={`${isHighlighted ? 'border-b border-primary border-dashed' : ''} ${highlightColor} text-lg text-primary pr-2 cursor-pointer select-none`}
                            key={verseKey}
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
