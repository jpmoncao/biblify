export const DayOfWeek = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center w-full max-w-20 py-1 border border-primary text-primary bg-secondary text-sm truncate rounded-t-md -mb-1">
        {children}
    </div>
);

export const Week = () => (
    <>
        <DayOfWeek>Dom</DayOfWeek>
        <DayOfWeek>Seg</DayOfWeek>
        <DayOfWeek>Ter</DayOfWeek>
        <DayOfWeek>Qua</DayOfWeek>
        <DayOfWeek>Qui</DayOfWeek>
        <DayOfWeek>Sex</DayOfWeek>
        <DayOfWeek>Sáb</DayOfWeek>
    </>
)