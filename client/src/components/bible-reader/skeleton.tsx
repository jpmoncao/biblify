import { Loader } from "@/components/common/loader";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonVerses = () => (
    <div className="flex flex-col align-center gap-2">
        <Skeleton className="h-4 w-12-12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-9/12" />
        <Skeleton className="h-4 w-9/12" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-12/12" />
        <Skeleton className="h-4 w-12/12 mb-2" />
    </div>
);

export default function BibleReaderSkeleton() {
    return (
        <>
            <header className='bg-background pt-8 h-32 w-full transition-all ease-in'>
                <div className="flex flex-col align-center gap-2">
                    <Skeleton className="h-2 w-1/4 mx-auto" />
                    <Skeleton className="h-6 w-2/4 mx-auto" />
                    <Skeleton className="h-6 w-1/6 mx-auto" />
                </div>
            </header>

            <main className="bg-background  mb-12 px-4 w-full max-w-[880px] mx-auto">
                <Loader />
                <SkeletonVerses />
                <SkeletonVerses />
                <SkeletonVerses />
                <SkeletonVerses />
            </main >
        </>
    )
}