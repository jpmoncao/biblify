import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface MonthDialogProps {
    date: Date;
    handleToDate: (month: number, year: number) => void;
}

export function MonthDialog({ date, handleToDate }: MonthDialogProps) {
    const [selectedMonth, setSelectedMonth] = useState<number>(date.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState<number>(date.getFullYear());

    useEffect(() => {
        setSelectedMonth(date.getMonth())
        setSelectedYear(date.getFullYear());
    }, [date]);

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const years = Array.from({ length: 11 }, (_, i) => date.getFullYear() - 5 + i);

    const handleConfirm = () => {
        handleToDate(selectedMonth, selectedYear);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-32 font-bold border border-b-2 border-primary bg-background text-primary hover:text-primary-foreground">
                    {monthNames[date.getMonth()] + " " + date.getFullYear()}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-[95%]">
                <DialogHeader>
                    <DialogTitle>Selecione o mês e o ano:</DialogTitle>
                    <DialogDescription>
                        Clique em confirmar para alterar no calendário.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between gap-4 items-center mb-4">
                    <div className="w-2/3">
                        <label className="block text-sm font-medium text-gray-700">Mês</label>
                        <Select onValueChange={(value) => setSelectedMonth(parseInt(value))} value={selectedMonth.toString()}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o mês" />
                            </SelectTrigger>
                            <SelectContent>
                                {monthNames.map((name, index) => (
                                    <SelectItem key={index} value={index.toString()}>
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-gray-700">Ano</label>
                        <Select onValueChange={(value) => setSelectedYear(parseInt(value))} value={selectedYear.toString()}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o ano" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((yearOption) => (
                                    <SelectItem key={yearOption} value={yearOption.toString()}>
                                        {yearOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={() => {
                        setSelectedMonth(new Date().getMonth())
                        setSelectedYear(new Date().getFullYear());
                    }} className="flex self-end"><Calendar /> <span className="hidden sm:block">Hoje</span></Button>
                </div>
                <DialogFooter className="sm:justify-start flex-row justify-center w-full">
                    <DialogClose asChild>
                        <Button type="button" variant="default" onClick={handleConfirm} className="max-w-[300px]">
                            Confirmar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
