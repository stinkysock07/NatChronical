export default function Loading() {
    return (
        <div className="animate-pulse p-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <div className="h-10 w-3/4 rounded bg-gray-200" />
                <div className="h-64 w-full rounded bg-gray-200" />
                <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-5/6 rounded bg-gray-200" />
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                </div>
            </div>
        </div>
    );
}
