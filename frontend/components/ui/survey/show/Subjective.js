export default function Subjective() {
    return (
        <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
            <div className="overflow-hidden shadow rounded-2xl">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="mt-1">
                        <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="you@example.com"
                        defaultValue={''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
  