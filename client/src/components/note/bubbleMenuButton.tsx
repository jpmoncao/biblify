import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGroupItem } from "@/components/ui/toggle-group";

interface BubbleButtonProps {
  onClick: () => void;
  title: string;
  dataState: string;
  value: string;
  ariaLabel: string;
  children: ReactNode;
}

const BubbleButton: React.FC<BubbleButtonProps> = ({ onClick,title,dataState,value,ariaLabel,children }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <ToggleGroupItem
        value={value}
        aria-label={ariaLabel}
        data-state={dataState}
        onClick={onClick}
        className="data-[state=on]:text-primary data-[state=on]:bg-accent whitespace-nowrap rounded-md 
        text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
        disabled:pointer-events-none disabled:opacity-50 shadow-sm px-3 hover:bg-accent h-9 bg-background py-1 
        max-w-[220px] justify-start text-left font-normal"
      >
        <span className="inline-flex items-center gap-2">{children}</span>
      </ToggleGroupItem>
    </TooltipTrigger>

    <TooltipContent className="mb-2 mx-auto">{title}</TooltipContent>
  </Tooltip>
);

export default BubbleButton;