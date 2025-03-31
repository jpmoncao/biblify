import { useEffect, useState } from "react";
import { XIcon, Copy } from "lucide-react";
import { useNavigate } from "react-router";
import { getClassNameHighlightColorBible, getHighlightColorsBible } from "@/utils/colors";
import { useBibleContext } from "@/contexts/bible";
import { useSettingsContext } from "@/contexts/settings";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

interface FormatMenuProps {
    onColorSelect: (color: string | null) => void;
}

export default function FormatMenu({ onColorSelect }: FormatMenuProps) {
    const { settings } = useSettingsContext();
    const { book, chapter, selectedVerses, clearSelectedVerses, copySelectedVerses, formatSelectedVerses } = useBibleContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const { toast } = useToast();

    const highlighterColors = getHighlightColorsBible(settings().theme);

    useEffect(() => { setIsOpen(selectedVerses.length > 0) }, [selectedVerses]);

    const handleHighlight = (e: React.MouseEvent<HTMLLIElement>) => {
        if (!settings().token) {
            toast({
                variant: "destructive",
                title: "Faça login para continuar!",
                description: "Essa ação requer autentificação com sua conta Biblify.",
                action: <ToastAction altText="Login" onClick={() => navigate('/login')}>Fazer Login</ToastAction>,
            });

            return handleClose();
        }

        const target = e.currentTarget;
        const color = target.getAttribute('data-color');

        if (color) {
            onColorSelect(color);
        }
    };

    const handleClose = () => { clearSelectedVerses() }

    const handleCopy = () => { copySelectedVerses() }

    return (
        <div
            className={`${!isOpen && 'translate-y-full'} max-w-[880px] bg-background border-primary fixed w-full left-1/2 -translate-x-1/2 bottom-0 rounded-t-xl border-t-4 px-4 py-2 overflow-hidden transition-all duration-200 ease-in z-50`}
            style={{ boxShadow: '0px -4px 32px rgba(0,0,0,0.4)' }}
        >
            <XIcon className="absolute text-primary right-4 cursor-pointer" onClick={handleClose} />
            <h1 className="text-primary text-lg font-bold">Versículos Selecionados</h1>
            <p className="text-primary text-md">{`${book.name} ${chapter}:${formatSelectedVerses()}`}</p>
            <Separator className="shadow-sm mt-2 mb-4" />

            <div className="relative overflow-x-auto pb-2 scrollbar delay-1000">
                <ul className="list-none flex items-center gap-[1.15rem] flex-nowrap w-max px-4 h-12">
                    {highlighterColors.map((color) => (
                        <li
                            className={`rounded-full w-9 h-9 ${color != '' && getClassNameHighlightColorBible(settings().theme, color)} shadow-md transition-all hover:-translate-y-1 cursor-pointer active:translate-y-0`}
                            key={color}
                            data-color={color}
                            onClick={handleHighlight}
                        ></li>
                    ))}
                </ul>
            </div>

            <Separator className="shadow-sm mt-4 mb-2" />

            <div className="py-2 flex items-center">
                <Button
                    className="group w-1/3 bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary"
                    onClick={handleCopy}
                >
                    <Copy className="text-primary group-hover:text-primary-foreground" />
                    Copiar
                </Button>
            </div>
        </div>
    );
}
