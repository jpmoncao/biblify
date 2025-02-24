import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, BookMarked, FolderGit, Notebook, Settings, CircleUserRound } from "lucide-react";
import { getVerseOfDay } from "@/utils/verse-of-day";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useSettings from "@/hooks/use-settings";

interface Verse {
    abbrev: string;
    name: string;
    chapter: number;
    number: number;
    text: string;
}

export default function Home() {
    const { settings } = useSettings();
    const [verseOfDay, setVerseOfDay] = useState<Verse | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });

        const date = new Date().getDate();
        setVerseOfDay(getVerseOfDay(date));

        document.title = 'Biblify';
    }, []);

    return (
        <div className="p-4 pt-6 w-full max-w-[880px] mx-auto flex flex-col gap-4 animate-opacity">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl text-foreground font-semibold">
                    Bem-vindo ao <span className="text-3xl text-foreground font-bold">Biblify</span>
                </h1>
                <div className="flex gap-4">
                    {!settings().token &&
                        <Link to={`/login`} className="group inline-block justify-self-end">
                            <Button variant={'secondary'} className="aspect-square px-3 py-1 border border-primary hover:bg-primary hover:text-primary-foreground border-b-2 flex items-center">Fazer Login</Button>
                        </Link>
                    }
                    <Link to={`/settings`} className="group inline-block justify-self-end">
                        <Button className="aspect-square p-1 bg-primary-foreground border border-b-2 border-primary text-foreground group-hover:text-primary group-hover:bg-primary flex items-center">
                            <Settings className="group-hover:text-primary-foreground" /></Button>
                    </Link>
                </div>
            </div>
            <p className="text-foreground max-md:max-w-[500px]">
                Aqui você tem acesso ao livro mais impactante e poderoso de todos os tempos:{" "}
                <strong>a Bíblia</strong>.
            </p>

            <Separator className="my-2" />

            <div className="flex justify-between items-center">
                <Link to={`/${settings().lastBookChapter.version}/${settings().lastBookChapter.book}/${settings().lastBookChapter.chapter}`} className="group inline-block h-24 w-24">
                    <Button className="p-0 bg-primary-foreground border border-b-2 border-primary text-foreground group-hover:text-primary-foreground foreground group-hover:bg-primary flex flex-col h-full w-full [&_svg]:size-14">
                        <BookMarked className="group-hover:text-primary-foreground items-center justify-center" />
                        <span className="group-hover:text-primary-foreground">Ler a Bíblia</span>
                    </Button>
                </Link>

                <Link to="/note" className="group inline-block h-24 w-24">
                    <Button className="p-0 bg-primary-foreground border border-b-2 border-primary text-foreground group-hover:text-primary-foreground foreground group-hover:bg-primary flex flex-col h-full w-full [&_svg]:size-14">
                        <Notebook className="group-hover:text-primary-foreground items-center justify-center" />
                        <span className="group-hover:text-primary-foreground">Anotações</span>
                    </Button>
                </Link>

                <Link to={settings().token ? '/profile' : '/login'} className="group inline-block h-24 w-24">
                    <Button className="p-0 bg-primary-foreground border border-b-2 border-primary text-foreground group-hover:text-primary-foreground foreground group-hover:bg-primary flex flex-col h-full w-full [&_svg]:size-14">
                        <CircleUserRound className="group-hover:text-primary-foreground items-center justify-center" />
                        <span className="group-hover:text-primary-foreground">Meu perfil</span>
                    </Button>
                </Link>
            </div>

            <Separator className="my-2" />

            <div className="border-l-4 py-2 pl-4 border-primary bg-primary-foreground rounded-md shadow-sm min-h-75">
                <h2 className="text-lg text-foreground font-semibold mb-2">Versículo do dia:</h2>
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
                        <p className="text-md text-foreground font-TaiHeritagePro italic max-w-[600px]">
                            {verseOfDay?.text}
                            <span className="block font-Inter not-italic text-xs text-foreground text-zinc-text-foreground 400 drop-shadow-sm">
                                {verseOfDay?.name} {verseOfDay?.chapter}:{verseOfDay?.number}
                            </span>
                        </p>
                        <Link to={`/nvi/${verseOfDay.abbrev}/${verseOfDay.chapter}`} className="group inline-block mt-4">
                            <Button className="pl-1 bg-primary-foreground border border-b-2 border-primary text-foreground group-hover:text-primary-foreground group-hover:bg-primary w-36 flex items-center">
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
                <h2 className="text-lg text-foreground font-semibold mb-2">Mensagem do desenvolvedor:</h2>
                <p className="text-md text-foreground ">
                    Que esta ferramenta possa ser benção na sua vida! Obrigado por acessá-la...
                </p>
                <p className="text-md text-foreground ">
                    Fique à vontade para dar uma estrela no github ou me ajudar com sugestões/melhorias para o projeto.
                </p>
                <a rel="noopener" href="https://github.com/jpmoncao/biblify" className="group inline-block mt-4" target="_blank">
                    <Button className="pl-1 bg-primary-foreground border border-b-2 border-primary text-foreground group-hover:text-primary-foreground group-hover:bg-primary w-36 flex items-center">
                        <FolderGit className="ml-2 group-hover:text-primary-foreground" />
                        <span className="mx-auto group-hover:text-primary-foreground">Repositório</span>
                    </Button>
                </a>
            </div>

            <Separator className="mt-2" />

            <footer className="mt-auto text-xs text-foreground text-zinc-text-foreground 400 text-center font-Inter">
                Desenvolvido por João Pedro Monção - 2025
            </footer>
        </div >
    );
}
