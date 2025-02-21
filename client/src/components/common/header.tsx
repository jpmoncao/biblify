import BackButton from "./back-button";

interface IHeaderProps {
    title: string;
    fnBackButton?: () => void;
    hiddenBackButton?: boolean;
}

export function Header(props: IHeaderProps) {
    const TAMANHO_DIV_BACK_BUTTON = 12;

    return (
        <header className="bg-background py-4 px-4 w-full flex items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20">
            <div className={`ml-auto flex-none w-${TAMANHO_DIV_BACK_BUTTON}`}>
                {!props.hiddenBackButton && <BackButton onClick={props.fnBackButton} />}
            </div>

            {/* pr-12 é o tamanho da div do BackButton (w-12) */}
            <div className={`flex-grow text-center pr-${TAMANHO_DIV_BACK_BUTTON} max-w-[800px] mr-auto`}>
                <h1 className="text-primary font-semibold">{props.title}</h1>
            </div>
        </header>
    );
}
