const Bar = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

const CardSkeleton = () => (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex items-center gap-3">
            <Bar className="h-12 w-12 rounded-xl" />
            <div className="flex-1 space-y-2">
                <Bar className="h-4 w-2/3" />
                <Bar className="h-3 w-1/3" />
            </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
            <div className="space-y-2">
                <Bar className="h-3 w-16" />
                <Bar className="h-6 w-24" />
            </div>
            <Bar className="h-6 w-14 rounded-full" />
        </div>
    </div>
);

const SectionSkeleton = ({ cards = 3 }: { cards?: number }) => (
    <section className="container mx-auto px-4 py-6">
        <Bar className="h-6 w-48" />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: cards }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    </section>
);

export default function Loading() {
    return (
        <div role="status" aria-busy="true" aria-label="লোড হচ্ছে">
            {/* Marquee */}
            <div className="border-y border-gray-100 bg-white py-3">
                <div className="container mx-auto px-4">
                    <Bar className="h-5 w-full" />
                </div>
            </div>

            {/* Banner */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between gap-6 rounded-2xl border border-gray-100 bg-white p-8">
                    <div className="flex-1 space-y-4">
                        <Bar className="h-5 w-28 rounded-full" />
                        <Bar className="h-9 w-3/4" />
                        <Bar className="h-4 w-full" />
                        <Bar className="h-4 w-2/3" />
                        <Bar className="h-10 w-32 rounded-lg" />
                    </div>
                    <Bar className="hidden h-36 w-36 rounded-2xl sm:block" />
                </div>
            </div>

            <SectionSkeleton />
            <SectionSkeleton />
            <span className="sr-only">লোড হচ্ছে...</span>
        </div>
    );
}