import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, BookUpIcon, FolderGit } from "lucide-react";
import { getVerseOfDay } from "@/utils/verse-of-day";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface Verse {
    abbrev: string;
    name: string;
    chapter: number;
    number: number;
    text: string;
}

export default function Home() {
    const [verseOfDay, setVerseOfDay] = useState<Verse | null>(null);

    useEffect(() => {
        const date = new Date().getDate();
        setVerseOfDay(getVerseOfDay(date));
    }, []);

    return (
        <div className="p-4 w-full max-w-[880px] mx-auto flex flex-col gap-4">
            <Separator className="mt-4 mb-2" />
            <h1 className="text-2xl text-primary font-semibold">
                Bem-vindo ao <span className="text-3xl text-primary font-bold">Biblify</span>
            </h1>
            <p className="text-primary">
                Aqui você tem acesso ao livro mais impactante e poderoso de todos os tempos:{" "}
                <strong>a Bíblia</strong>.
            </p>

            <Separator className="my-2" />

            <div className="border-l-4 py-2 pl-4 border-primary bg-primary-foreground rounded-md shadow-sm min-h-75">
                <h2 className="text-lg text-primary font-semibold mb-2">Versículo do dia:</h2>
                {!verseOfDay && (
                    <div className="max-w-[600px] h-28 flex flex-col gap-2">
                        <Skeleton className="w-5/6 h-4" />
                        <Skeleton className="w-2/3 h-4" />
                        <Skeleton className="w-1/3 h-2" />
                        <Skeleton className="w-36 h-9 px-4 py-2" />
                    </div>
                )}
                {verseOfDay && (
                    <>
                        <p className="text-md text-primary font-TaiHeritagePro italic max-w-[600px]">
                            {verseOfDay?.text}
                            <span className="block font-Inter not-italic text-xs text-primary text-zinc-text-primary 400 drop-shadow-sm">
                                {verseOfDay?.name} {verseOfDay?.chapter}:{verseOfDay?.number}
                            </span>
                        </p>
                        <Link to={`/nvi/${verseOfDay.abbrev}/${verseOfDay.chapter}`} className="group inline-block mt-4">
                            <Button className="pl-1 bg-primary-foreground border border-b-2 border-primary text-primary group-hover:text-primary-foreground group-hover:bg-primary w-36 flex items-center">
                                <ArrowRight className="ml-2 group-hover:text-primary-foreground" />
                                <span className="mx-auto group-hover:text-primary-foreground truncate">
                                    Ver Agora
                                </span>
                            </Button>
                        </Link>
                    </>
                )}
            </div>

            <Separator className="my-2" />

            <div className="border-l-4 py-2 pl-4 border-primary bg-primary-foreground rounded-md shadow-sm">
                <h2 className="text-lg text-primary font-semibold mb-2">Clique aqui para ler:</h2>
                <p className="text-md text-primary ">
                    Diferentes versões e idiomas, tudo totalmente personalizável.
                </p>
                <Link to="/nvi/gn/1" className="group inline-block mt-4">
                    <Button className="pl-1 bg-primary-foreground border border-b-2 border-primary text-primary group-hover:text-primary-foreground foreground group-hover:bg-primary w-36 flex items-center">
                        <BookUpIcon className="ml-2 group-hover:text-primary-foreground" />
                        <span className="mx-auto group-hover:text-primary-foreground">Ler agora</span>
                    </Button>
                </Link>
            </div>

            <Separator className="my-2" />

            <div className="border-l-4 py-2 pl-4 border-primary bg-primary-foreground rounded-md shadow-sm">
                <h2 className="text-lg text-primary font-semibold mb-2">Mensagem do desenvolvedor:</h2>
                <p className="text-md text-primary ">
                    Que esta ferramenta possa ser benção na sua vida! Obrigado por acessá-la...
                </p>
                <p className="text-md text-primary ">
                    Fique à vontade para dar uma estrela no github ou me ajudar com sugestões/melhorias para o projeto.
                </p>
                <a href="https://github.com/jpmoncao/biblify" className="group inline-block mt-4" target="_blank">
                    <Button className="pl-1 bg-primary-foreground border border-b-2 border-primary text-primary group-hover:text-primary-foreground group-hover:bg-primary w-36 flex items-center">
                        <FolderGit className="ml-2 group-hover:text-primary-foreground" />
                        <span className="mx-auto group-hover:text-primary-foreground">Repositório</span>
                    </Button>
                </a>
            </div>

            <Separator className="mt-2" />

            <footer className="mt-auto text-xs text-primary text-zinc-text-primary 400 text-center font-Inter">
                Desenvolvido por João Pedro Monção - 2025
            </footer>
        </div >
    );
}
