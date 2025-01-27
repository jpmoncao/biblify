import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { XIcon } from "lucide-react";
import useSettings from "@/hooks/use-settings";
import { Separator } from "@/components/ui/separator";
import { getHighlightColorsBible } from "@/utils/colors";

interface FormatMenuProps {
    open: boolean;
    versesHighlighted: string[];
    onColorSelect: (color: string | null) => void;
}

export default function FormatMenu({ open, versesHighlighted, onColorSelect }: FormatMenuProps) {
    const { abbrev } = useParams();
    const { settings } = useSettings();
    const { theme } = settings;
    const [sortedVerses, setSortedVerses] = useState<number[]>([]);
    const highlighterColors = getHighlightColorsBible(theme);

    useEffect(() => {
        const sorted: number[] = [...versesHighlighted].map(verse => Number(verse.split('-').slice(-1)[0])).sort((a, b) => a - b);
        setSortedVerses(sorted);
    }, [versesHighlighted]);

    const handleHighlight = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.currentTarget;
        const color = target.getAttribute('data-color');
        if (color) {
            onColorSelect(color);
        }
    };

    const handleClose = () => {
        onColorSelect(null);
    }

    return (
        <div
            className={`${!open && 'translate-y-full'} max-w-[880px] bg-background border-primary fixed w-full h-1/4 left-1/2 -translate-x-1/2 bottom-0 rounded-t-xl border-t-4 px-4 py-2 overflow-hidden z-20 transition-all duration-200 ease-in`}
            style={{ boxShadow: '0px -4px 32px rgba(0,0,0,0.4)' }}
        >
            <XIcon className="absolute text-primary right-4 cursor-pointer" onClick={handleClose} />
            <h1 className="text-primary text-lg font-bold">Versículos Selecionados</h1>
            <p className="text-primary text-md">
                {abbrev?.toUpperCase() + ' '}
                {sortedVerses.join(', ')}
            </p>
            <Separator className="shadow-sm mt-2 mb-4" />

            <div className="relative overflow-x-auto pb-2 scrollbar delay-1000">
                <ul className="list-none flex items-center gap-[1.15rem] flex-nowrap w-max px-4 h-12">
                    {highlighterColors.map((color) => (
                        <li
                            className={`rounded-full w-9 h-9 ${color} shadow-md transition-all hover:-translate-y-1 cursor-pointer active:translate-y-0`}
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
