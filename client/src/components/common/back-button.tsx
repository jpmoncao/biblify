import { ButtonHTMLAttributes } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft } from "lucide-react";
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
            size={"icon"}
            variant="ghost"
            className={`${className} [&_svg]:size-6`}
            onClick={(event) => handleClick(event)}
            {...rest}
        >
            {children ?? (
                <>
                    <ChevronLeft />
                </>
            )}
        </Button>
    );
};

export default BackButton;
