import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { DoorOpenIcon, SaveIcon, AArrowDown, AArrowUp } from "lucide-react";

import useSettings from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const ThemeItem = ({ name }: { name: string }) => (
    <SelectItem value={name.toLowerCase()} className={`${name.toLowerCase()} mb-1 border border-b-2 bg-background border-primary text-foreground`}>
        {name}
    </SelectItem>
);

const familyFonts = [
    { value: "Inter", name: "Inter" },
    { value: "Mulish", name: "Mulish" },
    { value: "Montserrat", name: "Montserrat" },
    { value: "Arimo", name: "Arimo" },
    { value: "Merriweather", name: "Merriweather" },
    { value: "RedHatDisplay", name: "Red Hat Display" },
    { value: "TaiHeritagePro", name: "Tai Heritage Pro" },
    { value: "KleeOne", name: "Klee One" },
    { value: "Georama", name: "Georama" },
]

export default function Settings() {
    window.scrollTo({ top: 0, behavior: "instant" });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const target = searchParams.get('_target') ?? '';
    const { settings, saveSettings, adjustFontSize, adjustFontEditorSize, setFont, setFontEditor, setTheme } = useSettings();

    function handleSave() {
        saveSettings();
        navigate('/' + target);
        window.location.reload();
    }

    useEffect(() => {
        document.title = 'Biblify | Ajustes';
    }, []);

    return (
        <div className="animate-opacity">
            <header className="bg-background py-4 px-4 w-full flex justify-around items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20">
                <Link className="group w-4/8" to={'/' + target}>
                    <Button className="bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                        <DoorOpenIcon /> <span className="hidden xs:block">Voltar</span>
                    </Button>
                </Link>

                <h1 className="text-center font-semibold text-primary">Ajustes</h1>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="group w-4/8 hover:bg-primary border border-b-2 border-primary hover:text-primary-foreground text-secondary-foreground bg-secondary">
                            <SaveIcon /> <span className="hidden xs:block">Salvar</span>
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
                <div className="flex justify-between gap-4 flex-wrap min-w-1/2">
                    <div>
                        <p className="text-md font-semibold text-primary">Fonte Bíblia:</p>
                        <Select
                            value={settings.font}
                            onValueChange={(value) => setFont(value)}
                        >
                            <SelectTrigger className="w-[180px] text-primary border-b-2 border-primary">
                                <SelectValue placeholder="Selecione uma fonte" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {familyFonts.map((f, index) =>
                                        <SelectItem key={index} value={f.value} className={"font-" + f.value}>{f.name}</SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p className="text-md font-semibold text-primary">Tamanho da Fonte:</p>
                        <div className="flex items-center justify-between w-full font-bold gap-2">
                            <Button onClick={() => adjustFontSize('decrease')} disabled={settings.fontSize == 'text-xs'}>
                                <AArrowDown />
                            </Button>
                            <p className={"min-w-12 text-center text-primary " + settings.fontSize}>Abc</p>
                            <Button onClick={() => adjustFontSize('increase')} disabled={settings.fontSize == 'text-2xl'}>
                                <AArrowUp />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-4 flex-wrap min-w-1/2">
                    <div>
                        <p className="text-md font-semibold text-primary">Fonte Caderno:</p>
                        <Select
                            value={settings.fontEditor}
                            onValueChange={(value) => setFontEditor(value)}
                        >
                            <SelectTrigger className="w-[180px] text-primary border-b-2 border-primary">
                                <SelectValue placeholder="Selecione uma fonte" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {familyFonts.map((f, index) =>
                                        <SelectItem key={index} value={f.value} className={"font-" + f.value}>{f.name}</SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p className="text-md font-semibold text-primary">Tamanho da Fonte:</p>
                        <div className="flex items-center justify-between w-full font-bold gap-2">
                            <Button onClick={() => adjustFontEditorSize('decrease')} disabled={settings.fontEditorSize == 'text-xs'}>
                                <AArrowDown />
                            </Button>
                            <p className={"min-w-12 text-center text-primary " + settings.fontEditorSize}>Abc</p>
                            <Button onClick={() => adjustFontEditorSize('increase')} disabled={settings.fontEditorSize == 'text-2xl'}>
                                <AArrowUp />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-md font-semibold text-primary">Tema:</p>
                    <Select
                        value={settings.theme}
                        onValueChange={(value) => setTheme(value)}
                    >
                        <SelectTrigger className="w-[180px] text-primary border-b-2 border-primary">
                            <SelectValue placeholder="Selecione um tema" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <ThemeItem name="Light" />
                                <ThemeItem name="Dark" />
                                <ThemeItem name="Ancient" />
                                <ThemeItem name="Ocean" />
                                <ThemeItem name="Naranga" />
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </main >
        </div >
    );
}
