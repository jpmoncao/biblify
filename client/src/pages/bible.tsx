import { useSearchParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { useSettingsContext } from "@/contexts/settings";
import { useBibleContext } from "@/contexts/bible";
import ErrorFallback from "@/components/common/error";
import BibleReaderHeader from "@/components/bible-reader/header";
import BibleReader from "@/components/bible-reader/reader";
import BibleReaderSkeleton from "@/components/bible-reader/skeleton";

export default function Bible() {
    const [_, setSearchParams] = useSearchParams();

    const { settings } = useSettingsContext();
    const { font } = settings();

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
            </div>
        </ErrorBoundary>
    );
}
