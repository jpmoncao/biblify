import { Link, useNavigate, useSearchParams } from "react-router";

import api from "@/services/api";
import { Button } from "@/components/ui/button";

import { DoorOpenIcon, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/common/loader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const fetchVersions = async () => {
    const response = await api.get('/versions');
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
    const [searchParams, _] = useSearchParams();
    const target = searchParams.get('_target');
    const [version, abbrev, chapter] = target?.split('_') ?? [];
    const [newVersion, setNewVersion] = useState(version ?? 'nvi');
    const [versions, setVersions] = useState([]);

    function handleSave() {
        navigate(`/${newVersion}/${abbrev ?? 'gn'}/${chapter ?? 1}`);
    }

    useEffect(() => {
        document.title = 'Biblify | Versões';

        (async () => {
            const data = await fetchVersions();
            setVersions(data);
        })();
    }, []);

    return (
        <div>
            <header className="bg-white py-4 px-4 w-full flex justify-around items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20">
                <Link className="group w-4/8" to={`/${version ?? 'nvi'}/${abbrev ?? 'gn'}/${chapter ?? '1'}`}>
                    <Button className="bg-white border border-b-2 border-black text-black hover:text-white hover:bg-black"><DoorOpenIcon /> Voltar</Button>
                </Link>

                <h1 className="text-center font-semibold">Versões</h1>

                <Button
                    className="group w-4/8 hover:bg-black border border-b-2 border-black hover:text-white text-zinc-100 bg-zinc-600"
                    onClick={handleSave}
                ><SaveIcon /> Salvar</Button>
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
                        <div key={version.version} className={`shadow-sm ${newVersion == version.version ? 'bg-zinc-200' : ''}`}>
                            <Label htmlFor={version.version} className="p-4 mb-2 flex items-center gap-4">
                                <RadioGroupItem value={version.version} id={version.version} checked={newVersion == version.version} />
                                <div className="flex flex-wrap justify-start items-center">
                                    <h1 className="text-lg font-semibold text-zinc-800">{version.version.toUpperCase()}</h1>
                                    <p className="w-full text-sm font-normal text-zinc-500">{version.verses} versículos</p>
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