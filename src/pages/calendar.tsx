import { Link, useSearchParams } from "react-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import { useCalendar } from "@/hooks/use-calendar";
import { Button } from "@/components/ui/button";
import { MonthDialog } from "@/components/calendar/month-dialog";
import { Week } from "@/components/calendar/week";
import DayButton from "@/components/calendar/day-button";
import { useEffect } from "react";

export default function DevotionalCalendar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const dateTarget = searchParams.get('_target')?.split('-') ?? ['', '', ''];

    const initialDate = (() => {
        const [year, month, day] = dateTarget;
        if (year && month && day) {
            return new Date(Number(year), Number(month) - 1, Number(day));
        }

        return new Date();
    })();

    const {
        date,
        currentDay,
        daysOfMonth,
        handlePrevMonth,
        handleNextMonth,
        handleToDate
    } = useCalendar(initialDate);

    const daysWithNotes = ['2025-1-7'];

    useEffect(() => {
        searchParams.delete('_target');
        setSearchParams(searchParams);
    }, [])

    return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center gap-4 -mt-8">
            <div className="max-w-[700px] mx-auto w-[95vw] transition-all animate-slide-up">
                <Link to="/note">
                    <Button
                        className="self-start border border-b-2 border-primary bg-background text-primary hover:text-primary-foreground"
                    >
                        <ArrowLeft /> Voltar
                    </Button>
                </Link>
            </div>
            <div className="border border-b-4 border-primary pt-4 pb-8 px-4 rounded-md max-w-[700px] mx-auto shadow-lg w-[95vw] transition-all animate-slide-up min-h-[30rem] sm:min-h-[40rem]">
                <div className="flex justify-between items-center w-full max-w-[280px] mx-auto mb-4 text-primary text-2xl font-bold">
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
                            hasNote={daysWithNotes.includes(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + day)}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
