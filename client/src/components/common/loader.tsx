import { Loader2 } from "lucide-react";

export function Loader({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`flex justify-center items-center py-4 ${props.className}`} {...props}>
            <Loader2 className="animate-spin text-zinc-500" />
        </div>
    );
}
