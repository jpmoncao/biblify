import { Calendar, NotebookText, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Note() {
    const { toast } = useToast();

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-lg mb-2 text-primary">Selecione uma opção:</h1>
            <div className="flex flex-col gap-4 w-3/4 max-w-[300px] mx-auto">
                <Link to="/calendar">
                    <Button className="animate-slide-up bg-background border border-b-2 border-primary text-primary hover:text-primary-foreground w-full">
                        <Calendar /> Devocionais
                    </Button>
                </Link>
                <Button className="animate-slide-up bg-background border border-b-2 border-primary text-primary hover:text-primary-foreground w-full" onClick={() => toast({
                    title: "Em desenvolvimento",
                    description: "Essa opção ainda está em testes! Agradeço a compreensão.",
                })}><NotebookText /> Anotações</Button>
                <Link to="/" className="w-1/2 mx-auto">
                    <Button className="animate-slide-up hover:bg-background border border-b-2 border-primary hover:text-primary text-primary-foreground w-full text-center">
                        <ArrowLeft />Voltar
                    </Button>
                </Link>
            </div>
        </main>
    )
}