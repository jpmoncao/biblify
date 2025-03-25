import { ReactNode } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";


interface BubbleButtonProps {
    onClick: () => void;
    title: string;
    dataState: string;
    children: ReactNode;
}

const BubbleButton: React.FC<BubbleButtonProps> = ({ onClick, title, dataState, children }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <ToggleGroupItem
                    value="bold"
                    aria-label="Toggle bold"
                    className="data-[state=on]:text-primary data-[state=on]:bg-accent whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0  shadow-sm px-3 hover:bg-accent h-9 bg-background py-1 max-w-[220px] justify-start text-left font-normal false"
                    data-state={dataState}
                    onClick={onClick}
                >
                    {children}
                </ToggleGroupItem>
                <TooltipContent className="mb-2 mx-auto">{title}</TooltipContent>
            </TooltipTrigger>
        </Tooltip>
    </TooltipProvider>
);

export default BubbleButton;
