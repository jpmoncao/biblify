import { Link } from "react-router";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    return (
        <div className="flex flex-col h-[100vh] justify-center items-center">
            <h1 className="text-4xl text-primary">Ocorreu um erro!</h1>
            <h2 className="text-md text-primary">{error.message}</h2>


            <Button onClick={resetErrorBoundary} variant="outline" className="mt-4 flex items-center text-primary">Tentar Novamente</Button>

            <Button variant="link">
                <Link to="/" className="mt-4 flex items-center text-primary">
                    <LinkIcon size={24} className="mr-2" /> Voltar para a página inicial
                </Link>
            </Button>
            <Accordion type="single" collapsible >
                <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="text-center text-xs text-secondary">Detalhes para nerds</AccordionTrigger>
                    <AccordionContent className="text-center text-md text-primary">{error.stack ?? error.name}</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div >
    )
}