import { Skeleton } from "@/components/ui/skeleton";

export default function AllUsersLoading() {
    return (
        <div className="flex flex-col p-4 space-y-4">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-10 w-full rounded-md mb-6" />
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-9 w-16 rounded-md" />
                </div>
            ))}
        </div>
    );
}
