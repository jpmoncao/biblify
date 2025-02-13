import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { getClassNameHighlightColorBible, getHighlightColorsBible } from "@/utils/colors";
import { useBibleContext } from "@/contexts/bible";
import { useSettingsContext } from "@/contexts/settings";
import { Separator } from "@/components/ui/separator";

interface FormatMenuProps {
    onColorSelect: (color: string | null) => void;
}

export default function FormatMenu({ onColorSelect }: FormatMenuProps) {
    const { settings } = useSettingsContext();
    const { book, chapter, selectedVerses, clearSelectedVerses } = useBibleContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [sortedVerses, setSortedVerses] = useState<number[]>([]);

    const highlighterColors = getHighlightColorsBible(settings.theme);

    useEffect(() => {
        setIsOpen(selectedVerses.length > 0);

        const sorted: number[] = [...selectedVerses].map(verse => Number(verse)).sort((a, b) => a - b);
        setSortedVerses(sorted);
    }, [selectedVerses]);

    const handleHighlight = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.currentTarget;
        const color = target.getAttribute('data-color');

        if (color) {
            onColorSelect(color);
        }
    };

    const handleClose = () => { clearSelectedVerses() }

    const formatVersesList = (numbers: number[]): string => {
        if (numbers.length === 0) return '';

        let numbersArray: number[][] = [];
        let referenceIndex = 0;

        numbers.forEach((number, index) => {
            if (index === numbers.length - 1 || numbers[index + 1] - number > 1) {
                const start = numbers[referenceIndex];
                const end = number;

                if (start !== end) {
                    numbersArray.push([start, end]);
                } else {
                    numbersArray.push([start]);
                }

                referenceIndex = index + 1;
            }
        });

        return numbersArray.map(arr => arr.join('-')).join(', ');
    };

    return (
        <div
            className={`${!isOpen && 'translate-y-full'} max-w-[880px] bg-background border-primary fixed w-full h-1/4 left-1/2 -translate-x-1/2 bottom-0 rounded-t-xl border-t-4 px-4 py-2 overflow-hidden z-20 transition-all duration-200 ease-in`}
            style={{ boxShadow: '0px -4px 32px rgba(0,0,0,0.4)' }}
        >
            <XIcon className="absolute text-primary right-4 cursor-pointer" onClick={handleClose} />
            <h1 className="text-primary text-lg font-bold">Versículos Selecionados</h1>
            <p className="text-primary text-md">{`${book.name} ${chapter}:${formatVersesList(sortedVerses)}`}</p>
            <Separator className="shadow-sm mt-2 mb-4" />

            <div className="relative overflow-x-auto pb-2 scrollbar delay-1000">
                <ul className="list-none flex items-center gap-[1.15rem] flex-nowrap w-max px-4 h-12">
                    {highlighterColors.map((color) => (
                        <li
                            className={`rounded-full w-9 h-9 ${color != '' && getClassNameHighlightColorBible(settings.theme, color)} shadow-md transition-all hover:-translate-y-1 cursor-pointer active:translate-y-0`}
                            key={color}
                            data-color={color}
                            onClick={handleHighlight}
                        ></li>
                    ))}
                </ul>
            </div>

            <Separator className="shadow-sm mt-4 mb-2" />
        </div>
    );
}
