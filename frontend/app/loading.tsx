
export default function Loading() {
    return (
        <div className="animate-pulse grid grid-cols-1 gap-3 p-3 lg:grid-cols-3">
            <div className="flex flex-col gap-3 lg:col-span-2">
                <section className="flex flex-col gap-2">
                    <div className="h-7 w-48 rounded bg-gray-200" />
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-2 border-b border-gray-200 pb-2">

                            <div className="h-44 w-full rounded bg-gray-200" />

                            <div className="h-5 w-3/4 rounded bg-gray-200" />
           
                            <div className="h-4 w-1/4 rounded bg-gray-200" />

                            <div className="h-4 w-full rounded bg-gray-200" />
                            <div className="h-4 w-5/6 rounded bg-gray-200" />
                            <div className="h-4 w-1/3 rounded bg-gray-200" />
                        </div>
                    ))}
                </section>

                {/* Latest News section */}
                <section className="flex flex-col gap-2">
                    <div className="h-7 w-40 rounded bg-gray-200" />
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-2 border-b border-gray-200 pb-2">
                            <div className="h-5 w-3/4 rounded bg-gray-200" />
                            <div className="h-4 w-1/4 rounded bg-gray-200" />
                            <div className="h-4 w-1/3 rounded bg-gray-200" />
                        </div>
                    ))}
                </section>
            </div>

            <section className="hidden flex-col gap-2 lg:flex">
                <div className="h-7 w-36 rounded bg-gray-200" />
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2 rounded border border-gray-200 p-3">
                        <div className="h-4 w-full rounded bg-gray-200" />
                        <div className="h-4 w-5/6 rounded bg-gray-200" />
                        <div className="h-3 w-1/3 rounded bg-gray-200" />
                    </div>
                ))}
            </section>
        </div>
    );
}
