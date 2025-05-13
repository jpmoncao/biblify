import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Share, Palette, Copy, Facebook, Twitter, Send, Download, MessagesSquare } from "lucide-react";
import html2canvas from "html2canvas";
import { Header } from "@/components/menu/header";
import { Button } from "@/components/ui/button";
import { getRandomBackgroundColor } from "@/utils/colors";
import { useToast } from "@/hooks/use-toast";

import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TelegramShareButton
} from "react-share";
import { Separator } from "@/components/ui/separator";

export default function ShareVerse() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [color, setColor] = useState(getRandomBackgroundColor());
    const [isCapturing, setIsCapturing] = useState(false);

    const verseText = location.state?.text;
    const bookName = location.state?.book.name;
    const bookChapter = location.state?.book.chapter;
    const bookVersion = location.state?.book.version;
    const bookFormat = location.state?.book.format;

    useEffect(() => {
        if (!verseText || !bookName || !bookChapter || !bookVersion) navigate(-1);
    }, [verseText, bookName, bookChapter, bookVersion]);

    const colorBackground = "bg-" + color;

    const verseMessage = `${verseText}\n\n${bookName} ${bookChapter}:${bookFormat} (${bookVersion?.toUpperCase()})\nAcesse em https://biblify.vercel.app`;

    const handleAlterColor = () => {
        let newColor = color;
        do {
            newColor = getRandomBackgroundColor();
        } while (newColor === color);
        setColor(newColor);
    };

    const handleCopy = () => {
        const versesTextJoined =
            verseText +
            "\n" +
            `${bookName} ${bookChapter}:${bookFormat} (${bookVersion?.toUpperCase()})`;
        navigator.clipboard.writeText(versesTextJoined);
        toast({ title: "Versículos copiados!", duration: 800 });
    };

    const handleShareImage = async () => {
        setIsCapturing(true);
        await new Promise((resolve) => setTimeout(resolve, 300));

        const canvas = await html2canvas(document.body, {
            useCORS: true,
            backgroundColor: null,
            scale: 2,
        });

        const dataUrl = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "biblify-versiculo.png", {
            type: "image/png",
        });

        setIsCapturing(false);

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: "Versículo do dia",
                text: "Confira esse versículo que eu destaquei no Biblify!",
            });
        } else {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "biblify-versiculo.png";
            link.click();
        }
    };

    return (
        <div
            className={`${colorBackground} transition-all h-screen overflow-y-auto w-full fixed top-0 left-0 z-[50]`}
        >
            <Header
                title="Compartilhar"
                className={`${colorBackground} transition-all border-none ${isCapturing ? "hidden" : ""
                    }`}
            />
            <main
                className={`mt-[5rem] w-full px-8 flex flex-col max-w-[480px] h-[80vh] overflow-hidden mx-auto ${isCapturing
                    ? "shadow-lg shadow-black/70 py-4 rounded-lg sm:border border-black/70"
                    : ""
                    }`}
            >
                <div className="w-full flex justify-between mb-2">
                    <h1 className="text-2xl font-bold">
                        {bookName} {bookChapter}{" "}
                        <span className="text-base">({bookVersion.toUpperCase()})</span>
                    </h1>

                    <div className={`flex gap-1 ${isCapturing ? "hidden" : ""} `} >
                        <Button
                            onClick={handleAlterColor}
                            className={`group ${colorBackground} transition-all border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}
                        >
                            <Palette className={`text-primary group-hover:text-white`} />
                        </Button>

                        <Button
                            onClick={handleShareImage}
                            className={`group ${colorBackground} transition-all border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}
                        >
                            <Download className={`text-primary group-hover:text-white`} />
                        </Button>

                        <Button
                            onClick={handleCopy}
                            className={`group ${colorBackground} transition-all border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}
                        >
                            <Copy className={`text-primary group-hover:text-white`} />
                        </Button>
                    </div>
                </div>

                <p>{verseText}</p>

                <Separator className="bg-black my-6" />

                {/* Botões de compartilhamento via redes sociais */}
                <div
                    className={`${isCapturing ? "hidden" : ""
                        } flex flex-col items-center justify-center`}
                >
                    {/* Botões com seu estilo padrão */}
                    <p className="font-bold">Compartilhe nas redes:</p>
                    <div className={`flex flex-wrap justify-center gap-2 mt-4 ${isCapturing ? "hidden" : ""}`}>
                        <FacebookShareButton url="https://biblify.vercel.app" quote={verseMessage}>
                            <Button
                                className={`flex gap-2 items-center ${colorBackground} border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}
                            >
                                <Facebook className="w-4 h-4" />
                                Facebook
                            </Button>
                        </FacebookShareButton>

                        <TwitterShareButton url="https://biblify.vercel.app" title={verseMessage}>
                            <Button
                                className={`flex gap-2 items-center ${colorBackground} border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}
                            >
                                <Twitter className="w-4 h-4" />
                                Twitter
                            </Button>
                        </TwitterShareButton>

                        <WhatsappShareButton url="https://biblify.vercel.app" title={verseMessage}>
                            <Button
                                className={`flex gap-2 items-center ${colorBackground} border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}
                            >
                                <MessagesSquare className="w-4 h-4" />
                                WhatsApp
                            </Button>
                        </WhatsappShareButton>

                        <TelegramShareButton url="https://biblify.vercel.app" title={verseMessage}>
                            <Button
                                className={`flex gap-2 items-center ${colorBackground} border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}
                            >
                                <Send className="w-4 h-4" />
                                Telegram
                            </Button>
                        </TelegramShareButton>
                    </div>

                </div>

                <div
                    className={`${isCapturing ? "" : "hidden"
                        } w-full flex justify-center mt-auto`}
                >
                    <img
                        src="/bible-icon.png"
                        alt="Logo Biblify"
                        className={`w-12 aspect-square`}
                    />
                </div>
            </main>
        </div>
    );
}
