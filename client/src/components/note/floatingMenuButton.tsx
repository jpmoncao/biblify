import { ReactNode } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface FloatingButtonProps {
    onClick: () => void;
    title: string;
    children: ReactNode;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, title, children }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <div
                    className="cursor-pointer transition-all rounded p-1 data-[state=on]:text-primary hover:bg-secondary"
                    onClick={onClick}
                >
                    {children}
                </div>
                <TooltipContent className="mb-2 mx-auto">{title}</TooltipContent>
            </TooltipTrigger>
        </Tooltip>
    </TooltipProvider>
);

export default FloatingButton;
