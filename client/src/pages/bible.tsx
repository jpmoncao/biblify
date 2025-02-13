import { useSearchParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { useSettingsContext } from "@/contexts/settings";
import { useBibleContext } from "@/contexts/bible";
import ErrorFallback from "@/components/common/error";
import BibleReaderHeader from "@/components/bible-reader/header";
import BibleReader from "@/components/bible-reader/reader";
import BibleReaderSkeleton from "@/components/bible-reader/skeleton";
import BibleReaderControl from "@/components/bible-reader/control";

export default function Bible() {
    const [_, setSearchParams] = useSearchParams();

    const { settings } = useSettingsContext();
    const { font } = settings;

    const { isLoading, error } = useBibleContext();

    const cleanError = () => {
        setSearchParams({ error: '' });
        window.location.reload();
    }

    if (error) return <ErrorFallback error={error} resetErrorBoundary={cleanError} />;
    if (isLoading) return <BibleReaderSkeleton />;

    return (
        <ErrorBoundary fallbackRender={ErrorFallback}>
            <div className={`flex flex-col min-h-[100vh] font-${font} animate-opacity`}>
                <BibleReaderHeader />
                <BibleReader />
                <footer className="mt-auto text-xs text-zinc-400 text-center pb-36 font-Inter">
                    Desenvolvido por João Pedro Monção - 2025
                </footer>
                <BibleReaderControl />
            </div>
        </ErrorBoundary>
    );
}
