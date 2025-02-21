import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SaveIcon } from "lucide-react";
import { apiBible } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/common/loader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import BackButton from "@/components/common/back-button";
import { useSettingsContext } from "@/contexts/settings";

const fetchVersions = async () => {
    const response = await apiBible.get('/versions');
    const data = await response.data;
    return data;
}

const SkeletonRadioGroup = () => (
    <>
        <Separator />
        <div>
            <div className="p-4 pl-12 mb-2 flex flex-col justify-center gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-64" />
            </div>
        </div>
        <Separator />
    </>
)

export default function Versions() {
    const navigate = useNavigate();

    const { settings } = useSettingsContext();
    const { version, book, chapter } = settings().lastBookChapter;

    const [newVersion, setNewVersion] = useState(version);
    const [versions, setVersions] = useState([]);

    function handleSave() {
        navigate(`/${newVersion}/${book}/${chapter}`);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });

        document.title = 'Biblify | Versões';

        (async () => {
            const data = await fetchVersions();
            setVersions(data);
        })();
    }, []);

    return (
        <div className="animate-opacity">
            <header className="bg-background py-4 px-4 w-full flex justify-around items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20">
                <BackButton />

                <h1 className="text-primary text-center font-semibold">Versões</h1>

                <Button
                    className="group w-4/8 hover:bg-primary border border-b-2 border-primary hover:text-primary-foreground text-secondary-foreground bg-secondary"
                    onClick={handleSave}
                ><SaveIcon /><span className="hidden xs:block">Salvar</span></Button>
            </header>

            <main className="mt-20 mb-12 w-full max-w-[880px] mx-auto">
                <RadioGroup onValueChange={(event) => setNewVersion(event)} className="gap-0">
                    {versions.length == 0 && (
                        <>
                            <Loader />
                            <SkeletonRadioGroup />
                            <SkeletonRadioGroup />
                            <SkeletonRadioGroup />
                            <SkeletonRadioGroup />
                            <SkeletonRadioGroup />
                            <SkeletonRadioGroup />
                        </>
                    )}
                    {versions && versions.map((version: { version: string, verses: number }) => (
                        <div key={version.version} className={`shadow-sm ${newVersion == version.version ? 'bg-primary' : 'bg-background'}`}>
                            <Label htmlFor={version.version} className="p-4 mb-2 flex items-center gap-4">
                                <RadioGroupItem value={version.version} id={version.version} checked={newVersion == version.version} className="border-primary-foreground" />
                                <div className="flex flex-wrap justify-start items-center">
                                    <h1 className={`text-lg font-bold ${newVersion == version.version ? 'text-primary-foreground' : 'text-primary'}`}>{version.version.toUpperCase()}</h1>
                                    <p className={`w-full text-sm font-normal ${newVersion == version.version ? 'text-primary-foreground' : 'text-primary'}`}>{version.verses} versículos</p>
                                </div>
                            </Label>
                            <Separator />
                        </div>
                    ))}
                </RadioGroup>
            </main>
        </div >
    )
}