import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Share, Palette, Copy } from "lucide-react";
import { Header } from "@/components/menu/header";
import { Button } from "@/components/ui/button";
import { getRandomBackgroundColor } from "@/utils/colors";
import { useToast } from "@/hooks/use-toast";

export default function ShareVerse() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [color, setColor] = useState(getRandomBackgroundColor());

    const verseText = location.state?.text;
    const bookName = location.state?.book.name;
    const bookChapter = location.state?.book.chapter;
    const bookVersion = location.state?.book.version;
    const bookFormat = location.state?.book.format;

    useEffect(() => { 
        if (!verseText || !bookName || !bookChapter || !bookVersion) navigate(-1) 
    }, [verseText, bookName, bookChapter, bookVersion]);


    const colorBackground = 'bg-' + color;
    const colorText = 'text-' + color;

    const handleAlterColor = () => {
        let newColor = color;

        do {
            newColor = getRandomBackgroundColor();
        } while (newColor == color)

        setColor(newColor);
    }

    const handleCopy = () => {
        const versesTextJoined = verseText + "\n" + `${bookName} ${bookChapter}:${bookFormat} (${bookVersion?.toUpperCase()})`;

        navigator.clipboard.writeText(versesTextJoined);

        toast({ title: "Versículos copiados!", duration: 800});
    }

    return (
        <div className={`${colorBackground} h-screen overflow-y-auto w-full fixed top-0 left-0 z-[50]`}>
            <Header title="Compartilhar" className={`${colorBackground} border-none`} />
            <div className="h-[5.25rem]"></div>
            <main className="w-full px-8 flex flex-col max-w-[800px] mx-auto">
                <div className="w-full flex justify-between mb-2">
                    <h1 className="text-2xl font-bold">{bookName} {bookChapter} <span className="text-base">({bookVersion.toUpperCase()})</span></h1>

                    <Button
                        className={`group ${colorBackground} border border-b-2 border-primary text-primary hover:${colorText} hover:bg-primary`}
                        onClick={handleCopy}
                    >
                        <Copy className={`text-primary group-hover:${colorText} `} />
                    </Button>
                </div>
                <p>{verseText}</p>
                <div className="flex flex-wrap justify-center items-center w-full my-6 gap-1">
                    <Button
                        className={`group ${colorBackground} border border-b-2 border-primary text-primary hover:${colorText} hover:bg-primary`}
                    >
                        <Share className={`text-primary group-hover:${colorText} `} />
                        Compartilhar
                    </Button>
                    <Button
                        className={`group ${colorBackground} border border-b-2 border-primary text-primary hover:${colorText} hover:bg-primary`}
                        onClick={handleAlterColor}
                    >
                        <Palette className={`text-primary group-hover:${colorText} `} />
                        Mudar Cor
                    </Button>
                </div>
            </main>
        </div>
    );
}
