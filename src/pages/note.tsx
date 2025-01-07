import { Button } from "@/components/ui/button";
import { Calendar, NotebookText } from "lucide-react";

export default function Note() {
    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-4 w-3/4 max-w-[300px] mx-auto">
                <Button className="bg-background border border-b-2 border-primary text-primary hover:text-primary-foreground w-full"><Calendar /> Devocionais</Button>
                <Button className="bg-background border border-b-2 border-primary text-primary hover:text-primary-foreground w-full"><NotebookText /> Anotações</Button>
            </div>
        </main>
    )
}