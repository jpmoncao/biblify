import { Link, useSearchParams } from "react-router"
import { ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Editor from "@/components/note/editor";

export default function Notation() {
    const [searchParams, _] = useSearchParams();
    const data = searchParams.get('date')?.split('-') ?? ['', '', ''];

    return (
        <main className="min-h-screen flex flex-col gap-4 pt-4 px-4 max-w-[1200px] mx-auto transition-all animate-opacity">
            <header className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <Link to={`/calendar?_target=${(data.join('-'))}`}>
                        <Button
                            className="self-start border border-b-2 border-primary bg-background text-primary hover:text-primary-foreground"
                        >
                            <ArrowLeft /><span className="hidden xs:block">Voltar</span>
                        </Button>
                    </Link>
                    <Link to={`/settings?_target=notation?date=${data.join('-')}`}>
                        <Button
                            className="self-start border border-b-2 border-primary bg-background text-primary hover:text-primary-foreground"
                        >
                            <Settings /><span className="hidden xs:block">Ajustes</span>
                        </Button>
                    </Link>
                </div>
                <h1 className="text-2xl text-primary">Devocional do dia <strong>{data[2].padStart(2, '0') + '/' + data[1].padStart(2, '0') + '/' + data[0]}</strong></h1>
                <Separator className="bg-black opacity-50 h-[2px] rounded-md" />
            </header>

            <Editor />
        </main>
    )
}