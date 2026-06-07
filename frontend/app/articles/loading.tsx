export default function Loading() {
    return (
        <div className="animate-pulse p-4">
            <div className="mx-auto max-w-4xl space-y-4">
                <div className="h-10 w-1/2 rounded bg-gray-200" />
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2 border-b border-gray-200 pb-3">
                        <div className="h-5 w-3/4 rounded bg-gray-200" />
                        <div className="h-4 w-1/3 rounded bg-gray-200" />
                        <div className="h-32 w-full rounded bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>
    );
}
