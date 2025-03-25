import BackButton from "@/components/menu/back-button";

interface IHeaderProps {
    title: string;
    fnBackButton?: () => void;
    hiddenBackButton?: boolean;
}

export function Header(props: IHeaderProps) {
    return (
        <header className="py-4 px-4 w-full flex items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20 z-50 bg-background">
            <div className={`py-4 px-4 flex items-center fixed top-0 left-0 h-20 w-[4.5rem] text-foreground justify-end`}>
                {!props.hiddenBackButton && <BackButton onClick={props.fnBackButton} />}
            </div>

            {/* pr-12 é o tamanho da div do BackButton (w-12) */}
            <div className={`flex-grow text-center max-w-[840px] mx-auto`}>
                <h1 className="text-primary font-semibold">{props.title}</h1>
            </div>
        </header>
    );
}
