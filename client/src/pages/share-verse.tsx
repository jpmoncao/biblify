import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton, TelegramShareButton } from "react-share";
import html2canvas from "html2canvas";
import { Palette, Copy, Facebook, Twitter, Send, Download, MessagesSquare } from "lucide-react";
import { Header } from "@/components/menu/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getRandomBackgroundColor } from "@/utils/colors";
import { useToast } from "@/hooks/use-toast";

export default function ShareVerse() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [color, setColor] = useState(getRandomBackgroundColor());
    const [isCapturing, setIsCapturing] = useState(false);
    const captureRef = useRef<HTMLDivElement>(null);

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
        await new Promise((resolve) => setTimeout(resolve, 300)); // dá tempo de ocultar os botões

        const canvas = await html2canvas(captureRef.current!, {
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
            className={`${colorBackground} transition-all h-screen w-full fixed top-0 left-0 z-[50] flex flex-col items-center justify-center overflow-hidden`}
        >
            <Header
                title="Compartilhar"
                className={`${colorBackground} transition-all border-none ${isCapturing ? "hidden" : ""}`}
            />

            <main
                className={`mt-[5rem] w-full px-8 pb-6 flex flex-col max-w-[800px] flex-grow overflow-x-hidden overflow-y-auto mx-auto`}
            >
                <div className="w-full flex justify-between mb-2">
                    <h1 className="text-2xl font-bold">
                        {bookName} {bookChapter}{" "}
                        <span className="text-base">({bookVersion.toUpperCase()})</span>
                    </h1>

                    <div className={`flex gap-2 ${isCapturing ? "hidden" : ""}`}>
                        <Button
                            onClick={handleAlterColor}
                            className={`group ${colorBackground} transition-all border border-b-2 border-primary text-primary hover:text-white hover:bg-primary px-2`}
                        >
                            <Palette className="text-primary group-hover:text-white" />
                        </Button>

                        <Button
                            onClick={handleShareImage}
                            className={`group ${colorBackground} transition-all border border-b-2 border-primary text-primary hover:text-white hover:bg-primary px-2`}
                        >
                            <Download className="text-primary group-hover:text-white" />
                        </Button>

                        <Button
                            onClick={handleCopy}
                            className={`group ${colorBackground} transition-all border border-b-2 border-primary text-primary hover:text-white hover:bg-primary px-2`}
                        >
                            <Copy className="text-primary group-hover:text-white" />
                        </Button>
                    </div>
                </div>

                <p>{verseText}</p>

                <div className={`flex justify-center mt-auto ${isCapturing ? "" : "hidden"}`}>
                    <img src="/bible-icon.png" alt="Logo Biblify" className="w-12" />
                </div>
            </main >

            <Separator
                className={`${isCapturing ? "hidden" : ""} bg-black mt-3 mb-6 w-3/4 max-w-[600px]`}
            />

            <div className={`${isCapturing ? "hidden" : ""} flex flex-col items-center justify-center mb-4`}>
                <p className="font-bold">Compartilhe nas redes:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <FacebookShareButton url="https://biblify.vercel.app" hashtag={verseMessage}>
                        <Button className={`flex gap-2 items-center ${colorBackground} border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}>
                            <Facebook className="w-4 h-4" />
                            Facebook
                        </Button>
                    </FacebookShareButton>

                    <TwitterShareButton url="https://biblify.vercel.app" title={verseMessage}>
                        <Button className={`flex gap-2 items-center ${colorBackground} border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}>
                            <Twitter className="w-4 h-4" />
                            Twitter
                        </Button>
                    </TwitterShareButton>

                    <WhatsappShareButton url="https://biblify.vercel.app" title={verseMessage}>
                        <Button className={`flex gap-2 items-center ${colorBackground} border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}>
                            <MessagesSquare className="w-4 h-4" />
                            WhatsApp
                        </Button>
                    </WhatsappShareButton>

                    <TelegramShareButton url="https://biblify.vercel.app" title={verseMessage}>
                        <Button className={`flex gap-2 items-center ${colorBackground} border border-b-2 border-primary text-primary hover:text-white hover:bg-primary`}>
                            <Send className="w-4 h-4" />
                            Telegram
                        </Button>
                    </TelegramShareButton>
                </div>
            </div>

            <div
                ref={captureRef}
                className={`absolute left-[-9999px] top-0 p-8 w-full max-w-[500px] min-h-screen text-white ${colorBackground} flex flex-col`}
            >
                <h1 className="text-2xl font-bold mb-4">
                    {bookName} {bookChapter} ({bookVersion.toUpperCase()})
                </h1>
                <p className="whitespace-pre-line">{verseText}</p>
                <div className="flex justify-center mt-auto">
                    <img src="/bible-icon.png" alt="Logo Biblify" className="w-12 aspect-square" />
                </div>
            </div>
        </div >
    );
}
