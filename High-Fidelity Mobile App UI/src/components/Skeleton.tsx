export function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg ${className}`} />
    );
}

export function SchemeDiscoverySkeleton() {
    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-start mb-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6 mb-3" />
                    <div className="pt-3 border-t border-gray-50 dark:border-gray-800/50 flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ChatSkeleton() {
    return (
        <div className="space-y-4 pt-4">
            <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-2xl rounded-tl-none p-4 w-2/3 space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                </div>
            </div>
            <div className="flex justify-end">
                <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl rounded-tr-none p-4 w-1/2 space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                </div>
            </div>
        </div>
    );
}
