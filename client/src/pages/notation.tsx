import { useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { ArrowLeft, Check, Settings } from "lucide-react";
import { apiAccount } from "@/services/api";
import { NotationProvider, useNotationContext } from "@/contexts/notation";
import { useSettingsContext } from "@/contexts/settings";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Editor from "@/components/note/editor";
import { Loader } from "@/components/common/loader";

function NotationContent() {
    const navigate = useNavigate();
    const { settings, setToken, saveSettings } = useSettingsContext();
    const [searchParams] = useSearchParams();
    const data = searchParams.get('date')?.split('-') ?? ['', '', ''];

    const { saveIsPending } = useNotationContext();

    useEffect(() => {
        document.title = `Devocional ${data[2]}/${data[1].padStart(2, '0')}/${data[0]} | Biblify`;

        const fetchUser = async () => {
            try {
                const token = settings().token;

                if (token) {
                    const response = await apiAccount.post("/users/token", { token });
                    const { tokenIsValid } = response.data.data;

                    if (!tokenIsValid) {
                        navigate("/login");
                        return;
                    }
                } else {
                    navigate("/login");
                    return;
                }
            } catch (error) {
                setToken(null);
                saveSettings();
                navigate("/login");
            }
        };

        fetchUser();
    }, []);

    return (
        <main className="min-h-screen flex flex-col gap-4 pt-4 px-4 max-w-[1200px] mx-auto transition-all animate-opacity">
            <header className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Link to={`/calendar?_target=${data.join('-')}`}>
                        <Button className="self-start border border-b-2 border-primary bg-background text-primary hover:text-primary-foreground">
                            <ArrowLeft /><span className="hidden xs:block">Voltar</span>
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4 ">
                        <Button className="h-6 bg-transparent border text-primary border-primary opacity-60 hover:bg-primary hover:text-primary-foreground cursor-default">
                            <span className="text-xs flex gap-2 justify-between">
                                {saveIsPending ? (<><Loader className="p-0" />Salvando...</>) : (<><Check />Salvo</>)}
                            </span>
                        </Button>
                        <Link to={`/settings?_target=notation?date=${data.join('-')}`}>
                            <Button className="self-start border border-b-2 border-primary bg-background text-primary hover:text-primary-foreground">
                                <Settings /><span className="hidden xs:block">Ajustes</span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <h1 className="text-2xl text-primary">
                    Devocional do dia <strong>{data[2].padStart(2, '0')}/{data[1].padStart(2, '0')}/{data[0]}</strong>
                </h1>
                <Separator className="bg-black opacity-50 h-[2px] rounded-md" />
            </header>

            <Editor />
        </main>
    );
}

export default function Notation() {
    return (
        <NotationProvider>
            <NotationContent />
        </NotationProvider>
    );
}
