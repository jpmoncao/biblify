import { Calendar, NotebookText } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Note() {
    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-lg mb-2">Selecione uma opção:</h1>
            <div className="flex flex-col gap-4 w-3/4 max-w-[300px] mx-auto">
                <Link to="/calendar">
                    <Button className="animate-slide-up bg-background border border-b-2 border-primary text-primary hover:text-primary-foreground w-full">
                        <Calendar /> Devocionais
                    </Button>
                </Link>
                <Button className="animate-slide-up bg-background border border-b-2 border-primary text-primary hover:text-primary-foreground w-full"><NotebookText /> Anotações</Button>
            </div>
        </main>
    )
}