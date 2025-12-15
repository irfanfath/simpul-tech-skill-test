export default function TaskHeader({
    onAdd
}: {
    onClose: () => void
    onAdd: () => void
}) {
    const options = ["Personal", "Errands", "Urgent To-Do"];
    return (
        <div className="flex items-center justify-between px-4 py-3 border-b">
            <select className="px-3 py-1 border rounded text-sm text-black cursor-pointer">
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>

            <div className="flex items-center gap-2">
                <button
                    onClick={onAdd}
                    className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded text-sm"
                >
                    New Task
                </button>
            </div>
        </div>
    )
}
