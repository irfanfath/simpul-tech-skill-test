import {
    Bookmark,
    ChevronDown,
    ChevronUp,
    Clock4,
    Pencil,
    X
} from "lucide-react";
import { useState } from "react";

export type Task = {
    id: number;
    title: string;
    completed: boolean;
    description?: string;
    status?: string[];
    dueDate?: string;
};

const STATUS_OPTIONS = [
    "Important",
    "ASAP",
    "Offline Meeting",
    "Virtual Meeting",
    "Client Related",
    "Self Task",
    "Appointments",
    "Court Related"
];

const STATUS_COLOR: Record<string, string> = {
    Important: "bg-red-100 text-red-700 border-red-200",
    ASAP: "bg-orange-100 text-orange-700 border-orange-200",
    "Offline Meeting": "bg-purple-100 text-purple-700 border-purple-200",
    "Virtual Meeting": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Client Related": "bg-blue-100 text-blue-700 border-blue-200",
    "Self Task": "bg-green-100 text-green-700 border-green-200",
    Appointments: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Court Related": "bg-gray-200 text-gray-800 border-gray-300"
};

export default function TaskItem({
    task,
    onToggle,
    onDelete
}: {
    task: Task;
    onToggle: (id: number, value: boolean) => void;
    onDelete: (id: number) => void;
}) {
    const [expanded, setExpanded] = useState(false);
    const [editingDesc, setEditingDesc] = useState(false);
    const [description, setDescription] = useState(task.description || "");
    const [dueDate, setDueDate] = useState(
        task.dueDate || (() => {
            const today = new Date();
            if (task.id === 1) {
                today.setDate(today.getDate() + 2);
            } else if (task.id === 2) {
                today.setDate(today.getDate() + 4);
            } else {
                const randomDays = Math.floor(Math.random() * 7) + 8;
                today.setDate(today.getDate() + randomDays);
            }
            return today.toISOString().split("T")[0];
        })()
    );
    const [status, setStatus] = useState<string[]>(task.status || []);
    const [showStatusPicker, setShowStatusPicker] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const today = new Date();
    const due = new Date(dueDate);
    const daysLeft = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const availableStatus = STATUS_OPTIONS.filter((s) => !status.includes(s));

    const addStatus = (value: string) => {
        setStatus((prev) => [...prev, value]);
        setShowStatusPicker(false);
    };

    const removeStatus = (value: string) => {
        setStatus((prev) => prev.filter((s) => s !== value));
    };

    return (
        <div className="border-b pb-3 last:border-b-0 relative flex justify-between items-start">
            <div
                className="flex gap-3 w-full cursor-pointer"
                onClick={() => setExpanded((v) => !v)}
            >
                <div className="flex-shrink-0">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => onToggle(task.id, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <p
                            className={`text-sm font-medium ${task.completed ? "line-through text-gray-400" : "text-black"
                                }`}
                        >
                            {task.title}
                        </p>

                        <div className="flex gap-4 text-xs items-center pr-4">
                            {daysLeft < 7 && (
                                <span className="text-[#EB5757]">{daysLeft} days left</span>
                            )}
                            <span className="text-[#4F4F4F]">{dueDate}</span>
                            <span className="text-gray-400 mt-0.5">
                                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </span>
                        </div>
                    </div>

                    {expanded && (
                        <>
                            <div className="mt-4 flex items-center gap-3 text-sm">
                                <Clock4 size={16} className="text-[#2F80ED]" />
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="border rounded px-2 py-1 text-xs text-black border-gray-400"
                                />
                            </div>

                            <div className="mt-3 flex gap-3">
                                <Pencil size={16} className="text-[#2F80ED] mt-1" />
                                {!editingDesc ? (
                                    <p
                                        className="text-xs text-gray-500 cursor-pointer hover:text-gray-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingDesc(true);
                                        }}
                                    >
                                        {description || "No Description"}
                                    </p>
                                ) : (
                                    <div className="w-full space-y-2">
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-full border rounded px-2 py-1 text-xs resize-none text-black"
                                            rows={3}
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setEditingDesc(false)}
                                                className="cursor-pointer text-xs border px-2 py-1 rounded text-black"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => setEditingDesc(false)}
                                                className="cursor-pointer text-xs bg-blue-600 text-white px-2 py-1 rounded"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative mt-4">
                                <div
                                    className="flex items-start gap-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowStatusPicker((v) => !v);
                                    }}
                                >
                                    <Bookmark size={14} className="text-[#2F80ED] mt-0.5" />
                                    <div className="flex flex-wrap gap-1">
                                        {status.length === 0 && (
                                            <span className="text-xs text-gray-400">Add status</span>
                                        )}
                                        {status.map((s, i) => (
                                            <span
                                                key={`${task.id}-${s}-${i}`}
                                                className={`group flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border ${STATUS_COLOR[s]}`}
                                            >
                                                {s}
                                                <X
                                                    size={12}
                                                    className="opacity-0 group-hover:opacity-100 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeStatus(s);
                                                    }}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {showStatusPicker && availableStatus.length > 0 && (
                                    <div
                                        className="absolute z-20 mt-2 w-56 bg-white border rounded shadow-md p-2 space-y-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {availableStatus.map((opt) => (
                                            <div
                                                key={opt}
                                                onClick={() => addStatus(opt)}
                                                className={`px-3 py-1.5 text-xs cursor-pointer rounded flex items-center ${STATUS_COLOR[opt]}`}
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="relative flex-shrink-0 ml-2">
                <span
                    className="text-gray-400 cursor-pointer font-bold"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowOptions((v) => !v);
                    }}
                >
                    ...
                </span>

                {showOptions && (
                    <div
                        className="absolute right-0 bg-white border rounded shadow-md z-30 w-24"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-100 rounded"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
