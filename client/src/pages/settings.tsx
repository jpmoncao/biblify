import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { SaveIcon, AArrowDown, AArrowUp } from "lucide-react";
import { useSettingsContext } from "@/contexts/settings";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { backNavigate } from "@/utils/navigate";
import BackButton from "@/components/menu/back-button";

const ThemeItem = ({ name }: { name: string }) => (
    <SelectItem value={name.toLowerCase()} className={`${name.toLowerCase()} mb-1 border border-b-2 bg-background border-primary text-foreground`}>
        {name}
    </SelectItem>
);

export default function Settings() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { settings, saveSettings, cancelSettings, isSettingsChanged, adjustFontSize, adjustFontEditorSize, setFont, setFontEditor, setTheme } = useSettingsContext();

    function handleBack() {
        if (isSettingsChanged) {
            setIsDialogOpen(true);
        } else {
            backNavigate(navigate, location);
        }
    }

    function handleDialogClose(shouldSave: boolean) {
        setIsDialogOpen(false);

        if (shouldSave) {
            saveSettings();
        } else {
            cancelSettings();
        }

        backNavigate(navigate, location);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.title = 'Biblify | Ajustes';
    }, []);

    return (
        <div className="animate-opacity">
            <AlertDialog open={isDialogOpen} onOpenChange={(open) => !open && setIsDialogOpen(false)}>
                <AlertDialogContent className="w-[300px] rounded-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja realmente sair sem salvar?</AlertDialogTitle>
                        <AlertDialogDescription>Se você clicar em "Cancelar alterações" as alterações serão desconsideradas.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => handleDialogClose(false)}>Cancelar alterações</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDialogClose(true)}>Salvar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <header className="py-4 px-4 w-full flex items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20 z-50 bg-background">
                <div className="py-4 px-4 flex items-center fixed top-0 left-0 h-20 w-[4.5rem] text-foreground justify-end">
                    <BackButton onClick={handleBack}></BackButton>
                </div>
                <main className="max-w-[840px] mx-auto w-full flex items-center">
                    <div className={`flex-grow text-center ${!isSettingsChanged && 'pr-24'}`}>
                        <h1 className={`font-semibold text-primary `}>Ajustes</h1>
                    </div>

                    <Button className={`${isSettingsChanged ? 'flex' : 'hidden'} flex-none group hover:bg-primary border border-b-2 border-primary hover:text-primary-foreground text-secondary-foreground bg-secondary w-24`} onClick={saveSettings}>
                        <SaveIcon /> <span className="hidden xs:block">Salvar</span>
                    </Button>
                </main>
            </header>

            <main className="mt-20 mb-12 w-full max-w-[880px] mx-auto px-8 py-4 flex flex-col gap-6">
                <div className="flex justify-between gap-4 flex-wrap min-w-1/2">
                    <div>
                        <p className="text-md font-semibold text-primary">Fonte Bíblia:</p>
                        <Select
                            value={settings().font}
                            onValueChange={(value) => setFont(value)}
                        >
                            <SelectTrigger className={"w-[180px] text-primary border-b-2 border-primary font-" + settings().font}>
                                <SelectValue placeholder="Selecione uma fonte" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Inter" className="font-Inter">Inter</SelectItem>
                                    <SelectItem value="Arimo" className="font-Arimo">Arimo</SelectItem>
                                    <SelectItem value="Georama" className="font-Georama">Georama</SelectItem>
                                    <SelectItem value="KleeOne" className="font-KleeOne">Klee One</SelectItem>
                                    <SelectItem value="LexendDeca" className="font-LexendDeca">Lexend Deca</SelectItem>
                                    <SelectItem value="Merriweather" className="font-Merriweather">Merriweather</SelectItem>
                                    <SelectItem value="Montserrat" className="font-Montserrat">Montserrat</SelectItem>
                                    <SelectItem value="Mulish" className="font-Mulish">Mulish</SelectItem>
                                    <SelectItem value="RedHatDisplay" className="font-RedHatDisplay">Red Hat Display</SelectItem>
                                    <SelectItem value="TaiHeritagePro" className="font-TaiHeritagePro">Tai Heritage Pro</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p className="text-md font-semibold text-primary">Tamanho da Fonte:</p>
                        <div className="flex items-center justify-between w-full font-bold gap-2">
                            <Button onClick={() => adjustFontSize('decrease')} disabled={settings().fontSize == 'text-xs'}>
                                <AArrowDown />
                            </Button>
                            <p className={"min-w-12 text-center text-primary " + settings().fontSize}>Abc</p>
                            <Button onClick={() => adjustFontSize('increase')} disabled={settings().fontSize == 'text-2xl'}>
                                <AArrowUp />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-4 flex-wrap min-w-1/2">
                    <div>
                        <p className="text-md font-semibold text-primary">Fonte Caderno:</p>
                        <Select
                            value={settings().fontEditor}
                            onValueChange={(value) => setFontEditor(value)}
                        >
                            <SelectTrigger className={"w-[180px] text-primary border-b-2 border-primary font-" + settings().fontEditor}>
                                <SelectValue placeholder="Selecione uma fonte" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Inter" className="font-Inter">Inter</SelectItem>
                                    <SelectItem value="Arimo" className="font-Arimo">Arimo</SelectItem>
                                    <SelectItem value="Georama" className="font-Georama">Georama</SelectItem>
                                    <SelectItem value="KleeOne" className="font-Klee One">Klee One</SelectItem>
                                    <SelectItem value="LexendDeca" className="font-Lexend Deca">Lexend Deca</SelectItem>
                                    <SelectItem value="Merriweather" className="font-Merriweather">Merriweather</SelectItem>
                                    <SelectItem value="Montserrat" className="font-Montserrat">Montserrat</SelectItem>
                                    <SelectItem value="Mulish" className="font-Mulish">Mulish</SelectItem>
                                    <SelectItem value="RedHatDisplay" className="font-Red Hat Display">Red Hat Display</SelectItem>
                                    <SelectItem value="TaiHeritagePro" className="font-Tai Heritage Pro">Tai Heritage Pro</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p className="text-md font-semibold text-primary">Tamanho da Fonte:</p>
                        <div className="flex items-center justify-between w-full font-bold gap-2">
                            <Button onClick={() => adjustFontEditorSize('decrease')} disabled={settings().fontEditorSize == 'text-xs'}>
                                <AArrowDown />
                            </Button>
                            <p className={"min-w-12 text-center text-primary " + settings().fontEditorSize}>Abc</p>
                            <Button onClick={() => adjustFontEditorSize('increase')} disabled={settings().fontEditorSize == 'text-2xl'}>
                                <AArrowUp />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-md font-semibold text-primary">Tema:</p>
                    <Select
                        value={settings().theme}
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
