import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MonthDialog } from "@/components/calendar/month-dialog";
import { Week } from "@/components/calendar/week";
import DayButton from "@/components/calendar/day-button";
import { useCalendar } from "@/hooks/use-calendar";

export default function DevotionalCalendar() {
    const {
        date,
        currentDay,
        daysOfMonth,
        handlePrevMonth,
        handleNextMonth,
        handleToDate
    } = useCalendar();

    return (
        <main className="min-h-screen w-full p-2 sm:p-4">
            <div className="border border-b-4 border-primary pt-4 pb-8 px-4 rounded-md max-w-[800px] mx-auto shadow-lg">
                <div className="flex justify-between items-center w-2/3 max-w-[280px] mx-auto mb-4 text-primary text-2xl font-bold">
                    <Button
                        className="border border-b-2 border-primary bg-background text-primary hover:text-primary-foreground"
                        onClick={handlePrevMonth}
                    >
                        <ChevronLeft strokeWidth={3} />
                    </Button>
                    <MonthDialog
                        date={date}
                        handleToDate={handleToDate}
                    />
                    <Button
                        className="border border-b-2 border-primary bg-background text-primary hover:text-primary-foreground"
                        onClick={handleNextMonth}
                    >
                        <ChevronRight strokeWidth={3} />
                    </Button>
                </div>

                {/* Corpo do Calendário */}
                <div className="grid grid-cols-7 gap-[0.15rem] sm:gap-1 max-w-[600px] mx-auto place-items-center">
                    <Week />
                    {daysOfMonth.map(({ day, isPrevious }, index) => (
                        <DayButton
                            key={index}
                            index={index}
                            day={day}
                            isPrevious={isPrevious}
                            currentDay={currentDay}
                            date={date}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
