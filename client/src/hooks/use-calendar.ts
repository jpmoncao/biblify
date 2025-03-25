import { useEffect, useState } from "react";
import { apiAccount } from "@/services/api";
import { useSettingsContext } from "@/contexts/settings";

interface Day {
    day: number;
    isPrevious: boolean;
}

export function useCalendar(initialDate: Date = new Date()) {
    const { settings } = useSettingsContext();
    const { token } = settings();

    const [daysWithNotes, setDaysWithNotes] = useState<number[]>([]);
    const [date, setDate] = useState<Date>(initialDate);
    const currentDay = new Date().getDate();
    const month = date.getMonth(); // Índice zero-based (0 = Jan, 1 = Fev, ...)
    const year = date.getFullYear();

    // Função para verificar ano bissexto
    const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    // Obter dias do mês atual
    const getDaysOfMonth = (): Day[] => {
        const daysInMonth =
            [0, 2, 4, 6, 7, 9, 11].includes(month) ? 31 : month === 1 ? (isLeapYear(year) ? 29 : 28) : 30;

        let days: Day[] = Array.from({ length: daysInMonth }, (_, i) => ({
            day: i + 1,
            isPrevious: false,
        }));

        // Adicionar dias do mês anterior para completar a semana inicial
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        if (firstDayOfMonth !== 0) {
            const previousMonth = month === 0 ? 11 : month - 1;
            const previousYear = month === 0 ? year - 1 : year;
            const daysInPreviousMonth =
                [0, 2, 4, 6, 7, 9, 11].includes(previousMonth)
                    ? 31
                    : previousMonth === 1
                        ? isLeapYear(previousYear)
                            ? 29
                            : 28
                        : 30;

            const previousDays = Array.from(
                { length: firstDayOfMonth },
                (_, i) => ({
                    day: daysInPreviousMonth - firstDayOfMonth + i + 1,
                    isPrevious: true,
                })
            );

            days = [...previousDays, ...days];
        }

        return days;
    };

    const handlePrevMonth = () => {
        setDaysWithNotes([]);
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setDaysWithNotes([]);
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    const handleToDate = (month: number, year: number) => {
        setDaysWithNotes([]);
        setDate(new Date(year, month));
    };

    const getMonthName = () => {
        const month = date.getMonth();
        const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const monthName = monthNames[month];
        return monthName;
    }


    useEffect(() => {
        const fetchData = async () => await fetchDevotionalsOfTheMonth();

        fetchData();
    }, [date])

    const fetchDevotionalsOfTheMonth = async () => {
        const response = await apiAccount.get(`/notes/devotional-notation/${date.getFullYear()}/${date.getMonth() + 1}`, {
            headers: { Authorization: 'Bearer ' + token }
        })

        setDaysWithNotes(response.data.data);
    }

    return {
        date,
        currentDay,
        daysOfMonth: getDaysOfMonth(),
        daysWithNotes,
        handlePrevMonth,
        handleNextMonth,
        handleToDate,
        getMonthName
    };
}
