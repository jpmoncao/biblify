import { Link, useSearchParams } from "react-router"
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Notation() {
    const [searchParams, _] = useSearchParams();
    const data = searchParams.get('date')?.split('-') ?? ['', '', ''];

    return (
        <main className="min-h-screen flex flex-col gap-4 pt-4 max-w-[880px] mx-auto transition-all animate-opacity">
            <div className="">
                <Link to={`/calendar?_target=${(data.join('-'))}`}>
                    <Button
                        className="self-start border border-b-2 border-primary bg-background text-primary hover:text-primary-foreground"
                    >
                        <ArrowLeft /> Voltar
                    </Button>
                </Link>
            </div>
            <h1 className="text-2xl">Devocional do dia {data[2].padStart(2, '0') + '/' + data[1].padStart(2, '0') + '/' + data[0]}</h1>
            <Separator className="bg-black opacity-50 h-[2px] rounded-md" />
        </main>
    )
}