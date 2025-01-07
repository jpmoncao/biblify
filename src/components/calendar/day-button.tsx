import { Button } from "@/components/ui/button";

interface DayButtonProps {
    index: number;
    day: number;
    isPrevious: boolean;
    currentDay: number;
    date: Date
}

const DayButton = ({ index, day, isPrevious, currentDay, date }: DayButtonProps) => (
    <Button
        key={index}
        className={`group items-center xs:items-start rounded-md border border-b-2 ${index < 7 && 'rounded-t-none sm:border-t-0'}
             ${isPrevious
                ? 'bg-zinc-600 text-gray-400'
                : day === currentDay && date.getMonth() === new Date().getMonth()
                    ? 'bg-zinc-300'
                    : 'bg-background'
            } border-primary text-primary aspect-square w-full max-w-20 h-full max-h-20 p-1 font-semibold flex flex-col justify-between hover:text-primary-foreground text-md transition-all cursor-not-allowed ${!isPrevious && 'cursor-pointer active:translate-y-[0.1rem] max-[400px]:border-lime-400 z-10'}`}
    >
        <span className="group-hover:scale-125 transition-all">{day}</span>
        {!isPrevious && (
            <div className="aspect-square bottom-1 right-1 rounded-full w-2 h-2 bg-lime-400 shadow xs:self-end hidden min-[401px]:block group-hover:scale-150 transition-all"></div>
        )}
    </Button>
)

export default DayButton;