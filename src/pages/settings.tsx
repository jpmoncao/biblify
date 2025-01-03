import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { DoorOpenIcon, SaveIcon } from "lucide-react";
import useBibleSettings from "@/hooks/use-bible-settings";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function Settings() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const target = searchParams.get('_target');
    const [version, abbrev, chapter] = target?.split('_') ?? [];

    const { font, setFont, theme, setTheme } = useBibleSettings();
    const [tempFont, setTempFont] = useState(font);
    const [tempTheme, setTempTheme] = useState(theme);

    function handleSave() {
        setFont(tempFont);
        setTheme(tempTheme);
        navigate(`/${version ?? 'nvi'}/${abbrev ?? 'gn'}/${chapter ?? 1}`);
        window.location.reload();
    }

    useEffect(() => {
        document.title = 'Biblify | Ajustes';

        console.log(font, theme);
        console.log(tempFont, tempTheme);
    }, []);

    return (
        <div>
            <header className="bg-background py-4 px-4 w-full flex justify-around items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20">
                <Link className="group w-4/8" to={`/${version ?? 'nvi'}/${abbrev ?? 'gn'}/${chapter ?? '1'}`}>
                    <Button className="bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                        <DoorOpenIcon /> Voltar
                    </Button>
                </Link>

                <h1 className="text-center font-semibold text-primary">Ajustes</h1>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="group w-4/8 hover:bg-primary border border-b-2 border-primary hover:text-primary-foreground text-secondary-foreground bg-secondary">
                            <SaveIcon /> Salvar
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[300px] rounded-md">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Deseja realmente salvar?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Se você clicar em "Continuar", os ajustes serão salvos.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSave}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </header>

            <main className="mt-20 mb-12 w-full max-w-[880px] mx-auto px-8 py-4 flex flex-col gap-6">
                <div>
                    <p className="text-md font-semibold text-primary">Fonte:</p>
                    <Select value={tempFont} onValueChange={(value) => setTempFont(value)}>
                        <SelectTrigger className={`font-${tempFont} w-[180px] text-primary`}>
                            <SelectValue placeholder="Selecione uma fonte" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Inter" className="font-Inter">Inter</SelectItem>
                                <SelectItem value="Mulish" className="font-Mulish">Mulish</SelectItem>
                                <SelectItem value="Montserrat" className="font-Montserrat">Montserrat</SelectItem>
                                <SelectItem value="Arimo" className="font-Arimo">Arimo</SelectItem>
                                <SelectItem value="Merriweather" className="font-Merriweather">Merriweather</SelectItem>
                                <SelectItem value="RedHatDisplay" className="font-RedHatDisplay">Red Hat Display</SelectItem>
                                <SelectItem value="TaiHeritagePro" className="font-TaiHeritagePro">Tai Heritage Pro</SelectItem>
                                <SelectItem value="KleeOne" className="font-KleeOne">Klee One</SelectItem>
                                <SelectItem value="Georama" className="font-Georama">Georama</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <p className="text-md font-semibold text-primary">Tema:</p>
                    <Select value={tempTheme} onValueChange={(value) => setTempTheme(value)}>
                        <SelectTrigger className={`font-${tempTheme} w-[180px] text-primary`}>
                            <SelectValue placeholder="Selecione um tema" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="light">Claro</SelectItem>
                                <SelectItem value="dark">Escuro</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </main>
        </div>
    );
}
