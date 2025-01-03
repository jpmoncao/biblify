import { Link } from "react-router";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { foundErrorCode } from "@/utils/errors";

export default function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    return (
        <div className="flex flex-col h-[100vh] justify-center items-center">
            <h1 className="text-4xl text-zinc-800">Ocorreu um erro!</h1>
            <h2 className="text-md text-zinc-700">{foundErrorCode(error.message)}</h2>


            <Button onClick={resetErrorBoundary} variant="outline" className="mt-4 flex items-center text-zinc-600">Tentar Novamente</Button>

            <Button variant="link">
                <Link to="/" className="mt-4 flex items-center text-zinc-600">
                    <LinkIcon size={24} className="mr-2" /> Voltar para a página inicial
                </Link>
            </Button>
            <Accordion type="single" collapsible >
                <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="text-xs text-zinc-400">Detalhes para nerds</AccordionTrigger>
                    <AccordionContent>{error.message}</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div >
    )
}