import { LoaderIcon } from "lucide-react";

export function Loader() {
    return (
        <div className="flex justify-center items-center my-4">
            <LoaderIcon className="animate-spin text-zinc-600" size={32} />
        </div>
    );
}
