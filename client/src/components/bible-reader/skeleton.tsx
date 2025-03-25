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
            <main className="bg-background mt-4 mb-12 px-4 w-full max-w-[880px] mx-auto">
                <SkeletonVerses />
                <SkeletonVerses />
                <SkeletonVerses />
                <SkeletonVerses />
            </main >
        </>
    )
}