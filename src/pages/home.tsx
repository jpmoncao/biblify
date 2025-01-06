import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { ArrowRight, BookUpIcon, FolderGit } from "lucide-react";
import api from '@/services/api';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Verse {
    text: string;
    book: {
        abbrev: {
            pt: string;
        }
        name: string;
    };
    chapter: number;
    number: number;
}

export default function Home() {
    const [verseOfDay, setVerseOfDay] = useState<Verse | null>(null);

    const fetchVerseOfDay = async () => {
        try {
            const response = await api.get('/verses/nvi/random');
            setVerseOfDay(response.data);
        } catch (err) {
            console.error('Erro ao buscar o versículo do dia:', err);
        }
    };

    useEffect(() => {
        fetchVerseOfDay();
    }, []);

    return (
        <div className="p-4 w-full max-w-[880px] mx-auto flex flex-col gap-4">
            <Separator className="mt-4 mb-2" />
            <h1 className="text-2xl font-semibold">
                Bem-vindo ao <span className="text-3xl font-bold">Biblify</span>
            </h1>
            <p>
                Aqui você tem acesso ao livro mais impactante e poderoso de todos os tempos:{" "}
                <strong>a Bíblia</strong>.
            </p>

            <Separator className="my-2" />

            <div className="border-l-4 py-2 pl-4 border-primary bg-primary-foreground rounded-md shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Versículo do dia:</h2>
                <p className="text-md font-TaiHeritagePro italic max-w-[600px]">
                    {verseOfDay?.text}
                    <span className="block font-Inter not-italic text-xs text-zinc-400 drop-shadow-sm">
                        {verseOfDay?.book?.name} {verseOfDay?.chapter}:{verseOfDay?.number}
                    </span>
                </p>
                {verseOfDay && (
                    <Link to={`/nvi/${verseOfDay.book.abbrev.pt}/${verseOfDay.chapter}`} className="group inline-block mt-4">
                        <Button className="pl-1 bg-primary-foreground border border-b-2 border-primary text-primary group-hover:text-primary-foreground group-hover:bg-primary w-36 flex items-center">
                            <ArrowRight className="ml-2 group-hover:text-primary-foreground" />
                            <span className="mx-auto group-hover:text-primary-foreground truncate">
                                Ver Agora
                            </span>
                        </Button>
                    </Link>
                )}
            </div>

            <Separator className="my-2" />

            <div className="border-l-4 py-2 pl-4 border-primary bg-primary-foreground rounded-md shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Clique aqui para ler:</h2>
                <p className="text-md">
                    Diferentes versões e idiomas, tudo totalmente personalizável.
                </p>
                <Link to="/nvi/gn/1" className="group inline-block mt-4">
                    <Button className="pl-1 bg-primary-foreground border border-b-2 border-primary text-primary group-hover:text-primary-foreground group-hover:bg-primary w-36 flex items-center">
                        <BookUpIcon className="ml-2 group-hover:text-primary-foreground" />
                        <span className="mx-auto group-hover:text-primary-foreground">Ler agora</span>
                    </Button>
                </Link>
            </div>

            <Separator className="my-2" />

            <div className="border-l-4 py-2 pl-4 border-primary bg-primary-foreground rounded-md shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Mensagem do desenvolvedor:</h2>
                <p className="text-md">
                    Que esta ferramenta possa ser benção na sua vida! Obrigado por acessá-la...
                </p>
                <p className="text-md">
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

            <footer className="mt-auto text-xs text-zinc-400 text-center font-Inter">
                Desenvolvido por João Pedro Monção - 2025
            </footer>
        </div>
    );
}
