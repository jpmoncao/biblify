import { Calendar, NotebookText, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function Note() {
    const { toast } = useToast();

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <Link to="/">
                <Button variant="ghost" className="pl-2 pr-4 animate-slide-up flex justify-start gap-2 fixed top-4 left-2 md:left-4">
                    <ChevronLeft /> Voltar
                </Button>
            </Link>
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
            </div>
        </main>
    )
}