import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonVerses() {
    return (
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
    )
}