import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

export function AlertError({ children }: { children: React.ReactNode }) {
    return (
        <Alert variant="destructive" className="w-full max-w-[400px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
                {children}
            </AlertDescription>
        </Alert>
    )
}
