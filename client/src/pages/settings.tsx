import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { SaveIcon, AArrowDown, AArrowUp } from "lucide-react";
import { adjustFontSize, FontSize, useSettingsStore } from "@/stores/settings";
import { SettingsState } from "@/hooks/use-settings";
import { backNavigate } from "@/utils/navigate";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import BackButton from "@/components/menu/back-button";

const ThemeItem = ({ name }: { name: string }) => (
    <SelectItem
        value={name.toLowerCase()}
        className={`${name.toLowerCase()} mb-1 border border-b-2 bg-background border-primary text-foreground`}
    >
        {name}
    </SelectItem>
);

function FontSelector({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
}) {
    const fontOptions = useMemo(
        () => [
            "Inter",
            "Arimo",
            "Georama",
            "KleeOne",
            "LexendDeca",
            "Merriweather",
            "Montserrat",
            "Mulish",
            "RedHatDisplay",
            "TaiHeritagePro",
        ],
        []
    );

    return (
        <div>
            <p className="text-md font-semibold text-primary">{label}</p>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={`w-[180px] text-primary border-b-2 border-primary font-${value}`}>
                    <SelectValue placeholder="Selecione uma fonte" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {fontOptions.map((font) => (
                            <SelectItem key={font} value={font} className={`font-${font.replace(/\s/g, "")}`}>
                                {font.replace(/([A-Z])/g, " $1").trim()}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

function FontSizeAdjuster({
    label,
    value,
    onIncrease,
    onDecrease,
    disableDecrease,
    disableIncrease,
}: {
    label: string;
    value: string;
    onIncrease: () => void;
    onDecrease: () => void;
    disableDecrease: boolean;
    disableIncrease: boolean;
}) {
    return (
        <div>
            <p className="text-md font-semibold text-primary">{label}</p>
            <div className="flex items-center justify-between w-full font-bold gap-2">
                <Button onClick={onDecrease} disabled={disableDecrease}>
                    <AArrowDown />
                </Button>
                <p className={`min-w-12 text-center text-primary ${value}`}>Abc</p>
                <Button onClick={onIncrease} disabled={disableIncrease}>
                    <AArrowUp />
                </Button>
            </div>
        </div>
    );
}

export default function Settings() {
    const navigate = useNavigate();
    const location = useLocation();

    const settings = useSettingsStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [draft, setDraft] = useState({
        font: settings.font,
        fontEditor: settings.fontEditor,
        fontSize: settings.fontSize,
        fontEditorSize: settings.fontEditorSize,
        theme: settings.theme,
        isSettingsChanged: false
    });

    const updateDraft = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
        setDraft((prev) => ({ ...prev, [key]: value, isSettingsChanged: true }));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.title = "Biblify | Ajustes";
    }, []);

    const handleBack = () => {
        if (draft.isSettingsChanged) setIsDialogOpen(true);
        else backNavigate(navigate, location);
    };

    const handleDialogClose = (shouldSave: boolean) => {
        setIsDialogOpen(false);
        if (shouldSave) handleSave();
        else handleCancel();
        backNavigate(navigate, location);
    };

    const handleSave = () => {
        settings.setFont(draft.font);
        settings.setFontEditor(draft.fontEditor);
        settings.setFontSize(draft.fontSize);
        settings.setFontEditorSize(draft.fontEditorSize);
        settings.setTheme(draft.theme);
        settings.saveSettings();
    };

    const handleCancel = () => {
        setDraft({
            font: settings.font,
            fontEditor: settings.fontEditor,
            fontSize: settings.fontSize,
            fontEditorSize: settings.fontEditorSize,
            theme: settings.theme,
            isSettingsChanged: false
        });
        settings.cancelSettings();
    };

    const themeOptions = useMemo(() => ["Light", "Dark", "Ancient", "Ocean", "Naranga"], []);

    return (
        <div className="animate-opacity">
            <AlertDialog open={isDialogOpen} onOpenChange={(open) => !open && setIsDialogOpen(false)}>
                <AlertDialogContent className="w-[300px] rounded-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja realmente sair sem salvar?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Se você clicar em "Cancelar alterações" as alterações serão desconsideradas.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => handleDialogClose(false)}>
                            Cancelar alterações
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDialogClose(true)}>Salvar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <header className="py-4 px-4 w-full flex items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20 z-50 bg-background">
                <div className="py-4 px-4 flex items-center fixed top-0 left-0 h-20 w-[4.5rem] text-foreground justify-end">
                    <BackButton onClick={handleBack} />
                </div>
                <main className="max-w-[840px] mx-auto w-full flex items-center">
                    <div className={`flex-grow text-center ${!settings.isSettingsChanged && "pr-24"}`}>
                        <h1 className="font-semibold text-primary">Ajustes</h1>
                    </div>
                    <Button
                        className={`${settings.isSettingsChanged ? "flex" : "hidden"} flex-none group hover:bg-primary border border-b-2 border-primary hover:text-primary-foreground text-secondary-foreground bg-secondary w-24`}
                        onClick={settings.saveSettings}
                    >
                        <SaveIcon /> <span className="hidden xs:block">Salvar</span>
                    </Button>
                </main>
            </header>

            <main className="mt-20 mb-12 w-full max-w-[880px] mx-auto px-8 py-4 flex flex-col gap-6">
                <div className="flex justify-between gap-4 flex-wrap min-w-1/2">
                    <FontSelector
                        label="Fonte Bíblia:"
                        value={draft.font}
                        onChange={(value) => updateDraft("font", value)}
                    />
                    <FontSizeAdjuster
                        label="Tamanho da Fonte:"
                        value={draft.fontSize}
                        onDecrease={() => updateDraft("fontSize", adjustFontSize(draft.fontSize.split('-')[1] as FontSize, "decrease"))}
                        onIncrease={() => updateDraft("fontSize", adjustFontSize(draft.fontSize.split('-')[1] as FontSize, "increase"))}
                        disableDecrease={draft.fontSize === "text-xs"}
                        disableIncrease={draft.fontSize === "text-2xl"}
                    />
                </div>

                <div className="flex justify-between gap-4 flex-wrap min-w-1/2">
                    <FontSelector
                        label="Fonte Caderno:"
                        value={draft.fontEditor}
                        onChange={(value) => updateDraft("fontEditor", value)}
                    />
                    <FontSizeAdjuster
                        label="Tamanho da Fonte:"
                        value={draft.fontEditorSize}
                        onDecrease={() => updateDraft("fontEditorSize", adjustFontSize(draft.fontEditorSize.split('-')[1] as FontSize, "decrease"))}
                        onIncrease={() => updateDraft("fontEditorSize", adjustFontSize(draft.fontEditorSize.split('-')[1] as FontSize, "increase"))}
                        disableDecrease={draft.fontEditorSize === "text-xs"}
                        disableIncrease={draft.fontEditorSize === "text-2xl"}
                    />
                </div>

                <div className="w-full">
                    <p className="text-md font-semibold text-primary">Tema:</p>
                    <Select value={draft.theme} onValueChange={(value) => updateDraft("theme", value)}>
                        <SelectTrigger className="w-[180px] text-primary border-b-2 border-primary">
                            <SelectValue placeholder="Selecione um tema" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {themeOptions.map((theme) => (
                                    <ThemeItem key={theme} name={theme} />
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </main>
        </div>
    );
}
