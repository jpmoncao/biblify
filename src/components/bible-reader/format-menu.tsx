import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSettings from "@/hooks/use-settings";
import { Separator } from "@/components/ui/separator";
import { XIcon } from "lucide-react";

interface FormatMenuProps {
    open: boolean;
    versesHighlighted: string[];
    onColorSelect: (color: string | null) => void;
}

const highlighterColorsDark = [
    'bg-blue-600',
    'bg-yellow-600',
    'bg-teal-600',
    'bg-green-600',
    'bg-red-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-emerald-600',
    'bg-orange-600',
    'bg-cyan-600',
    'bg-lime-600',
    'bg-sky-600',
    'bg-slate-600',
];

const highlighterColorsLight = [
    'bg-blue-300',
    'bg-yellow-300',
    'bg-teal-300',
    'bg-green-300',
    'bg-red-300',
    'bg-purple-300',
    'bg-pink-300',
    'bg-indigo-300',
    'bg-emerald-300',
    'bg-orange-300',
    'bg-cyan-300',
    'bg-lime-300',
    'bg-sky-300',
    'bg-slate-300',
];

export default function FormatMenu({ open, versesHighlighted, onColorSelect }: FormatMenuProps) {
    const { abbrev } = useParams();
    const { theme } = useSettings();
    const [sortedVerses, setSortedVerses] = useState<number[]>([]);
    const highlighterColors = theme === 'dark' ? highlighterColorsDark : highlighterColorsLight;

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
            className={`${open ? 'block' : 'hidden'} max-w-[880px] bg-background border-primary fixed w-full h-1/4 left-1/2 -translate-x-1/2 bottom-0 rounded-t-xl border-t-4 px-4 py-2 overflow-hidden z-20`}
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
                            className={`rounded-full w-9 h-9 ${color} border-2 shadow-sm transition-all hover:-translate-y-1 cursor-pointer active:translate-y-0 border-primary`}
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
