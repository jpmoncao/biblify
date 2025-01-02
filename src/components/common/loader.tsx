import { Loader2 } from "lucide-react";

export function Loader() {
    return (
        <div className="flex justify-center items-center my-4">
            <Loader2 className="animate-spin text-zinc-500" />
        </div>
    );
}
