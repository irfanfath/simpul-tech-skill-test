"use client"

import { useEffect, useState } from "react";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import { Clock4, Pencil } from "lucide-react";
import { Task } from "@/types/task";
import { fetchTasks } from "@/lib/api";

export default function TaskPanel({ onClose }: { onClose: () => void }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [showNewTask, setShowNewTask] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const toggleCompleted = (id: number, value: boolean) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: value } : t)));
  };

  const addTask = () => {
    if (!newTitle.trim()) return;

    setTasks(prev => [
      {
        id: Date.now(),
        title: newTitle,
        completed: false,
        description: newDescription || "",
        dueDate: newDueDate || undefined,
        status: []
      },
      ...prev
    ]);

    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
    setShowNewTask(false);
  };

  const handleDelete = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed bottom-24 right-6 w-[700px] h-[700px] bg-white shadow-2xl rounded-lg border z-50 flex flex-col">
      <TaskHeader onClose={onClose} onAdd={() => setShowNewTask(true)} />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {loading && <p className="text-sm text-gray-400">Loading tasks...</p>}

        {!loading &&
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleCompleted}
              onDelete={handleDelete}
            />
          ))}

        {showNewTask && (
          <NewTaskForm
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
            newDueDate={newDueDate}
            setNewDueDate={setNewDueDate}
            onCancel={() => setShowNewTask(false)}
            onAdd={addTask}
          />
        )}
      </div>
    </div>
  );
}

function NewTaskForm({
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  newDueDate,
  setNewDueDate,
  onCancel,
  onAdd
}: {
  newTitle: string;
  setNewTitle: (v: string) => void;
  newDescription: string;
  setNewDescription: (v: string) => void;
  newDueDate: string;
  setNewDueDate: (v: string) => void;
  onCancel: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="border-t pt-4 space-y-3">
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1" />
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Type Task Title"
          className="w-full border rounded px-3 py-2 text-sm text-black"
          autoFocus
        />
      </div>

      <div className="flex items-center gap-3 text-sm">
        <Clock4 size={16} className="text-[#4F4F4F]" />
        <input
          type="date"
          value={newDueDate}
          onChange={e => setNewDueDate(e.target.value)}
          className="text-black border rounded px-2 py-1 text-xs"
        />
      </div>

      <div className="flex items-start gap-3">
        <Pencil size={16} className="text-[#4F4F4F] mt-1" />
        <textarea
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="No Description"
          rows={3}
          className="w-full border rounded px-2 py-1 text-xs resize-none text-black"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="cursor-pointer text-black px-3 py-1 text-xs border rounded"
        >
          Cancel
        </button>
        <button
          onClick={onAdd}
          className="cursor-pointer text-black px-3 py-1 text-xs bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
