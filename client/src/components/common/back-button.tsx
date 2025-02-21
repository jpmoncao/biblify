import { ButtonHTMLAttributes } from "react";
import { useNavigate, useLocation } from "react-router";
import { DoorOpenIcon } from "lucide-react";
import { Button } from '@/components/ui/button';

const BackButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { children, ...rest } = props;
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Button
            className="bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary"
            onClick={() => location.key ? navigate(-1) : navigate("/")}
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
