import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

interface DayButtonProps {
    index: number;
    day: number;
    currentDay: number;
    date: Date;
    isPrevious: boolean;
    hasNote: boolean;
}

const DayButton = ({ index, day, isPrevious, currentDay, date, hasNote }: DayButtonProps) => {
    const navigate = useNavigate();

    const handleNavigate = (isPrevious: boolean) => {
        if (!isPrevious)
            navigate(`/notation?date=${date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + day}`)
    }

    return (
        <Button
            key={index}
            className={`group items-center xs:items-start rounded-md border border-b-2 ${index < 7 && 'rounded-t-none sm:border-t-0'}
             ${isPrevious
                    ? 'bg-zinc-700 text-gray-500'
                    : day === currentDay && date.getMonth() === new Date().getMonth()
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-background text-primary'
                } border-primary aspect-square w-full max-w-20 h-full max-h-20 p-1 font-semibold flex flex-col justify-between hover:text-primary-foreground text-md transition-all cursor-not-allowed z-10 ${!isPrevious && 'cursor-pointer active:translate-y-[0.1rem]'} ${!isPrevious && hasNote && 'max-[400px]:border-destructive'}`}
            onClick={() => handleNavigate(isPrevious)}
        >
            <span className={`${!isPrevious && 'group-hover:scale-[120%] group-hover:xs:translate-x-1 transition-all'} `}>{day}</span>
            {!isPrevious && hasNote && (
                <div className={`aspect-square bottom-1 right-1 rounded-full w-2 h-2 bg-destructive shadow xs:self-end hidden min-[401px]:block border-zinc-500 group-hover:border-none group-hover:scale-150 transition-all ${day === currentDay && date.getMonth() === new Date().getMonth() && 'border'}`}></div>
            )}
        </Button>
    )
}

export default DayButton;