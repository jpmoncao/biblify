import { ButtonHTMLAttributes } from "react";
import { useNavigate, useLocation } from "react-router";
import { DoorOpenIcon } from "lucide-react";
import { backNavigate } from "@/utils/navigate";
import { Button } from '@/components/ui/button';

const BackButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { children, onClick, className, ...rest } = props;

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) {
            onClick(event);
        } else {
            backNavigate(navigate, location);
        }
    };

    return (
        <Button
            className={`${className} bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary`}
            onClick={(event) => handleClick(event)}
            {...rest}
        >
            {children ?? (
                <>
                    <DoorOpenIcon />
                    <span className="hidden xs:block">Voltar</span>
                </>
            )}
        </Button>
    );
};

export default BackButton;
