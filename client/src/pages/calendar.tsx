import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "@/hooks/use-calendar";
import { Button } from "@/components/ui/button";
import { MonthDialog } from "@/components/calendar/month-dialog";
import { Week } from "@/components/calendar/week";
import DayButton from "@/components/calendar/day-button";

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
        daysWithNotes,
        handlePrevMonth,
        handleNextMonth,
        handleToDate
    } = useCalendar(initialDate);

    useEffect(() => {
        searchParams.delete('_target');
        setSearchParams(searchParams);
    }, [])

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center gap-4 py-6">
            <div className="flex xs:hidden w-[95vw] mx-auto">
                <Link to="/note">
                    <Button
                        className="self-start border border-b-2 border-primary bg-foreground text-background hover:text-primary-foreground"
                    >
                        <ArrowLeft /> <span>Voltar</span>
                    </Button>
                </Link>
            </div>
            <div className="border border-b-4 border-primary pt-4 pb-8 px-4 rounded-md max-w-[700px] mx-auto shadow-lg w-[95vw] transition-all animate-slide-up min-h-fit mb-auto sm:mb-0 sm:min-h-full">
                <div className="flex items-center max-w-[600px] w-full mx-auto gap-2 mb-4 justify-between">
                    <div className="items-center hidden xs:flex">
                        <Link to="/note">
                            <Button
                                className="self-start border border-b-2 border-primary bg-foreground text-background hover:text-primary-foreground"
                            >
                                <ArrowLeft /> <span className="hidden xs:block">Voltar</span>
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 mx-auto xs:m-0">
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
                            hasNote={daysWithNotes.includes(day) && !isPrevious}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
