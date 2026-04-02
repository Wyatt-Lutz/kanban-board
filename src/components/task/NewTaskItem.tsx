import { useState } from 'react';
import { createTask } from '../../createTasks';
import type { Task } from '../../types/task';

type NewTaskItemProps = {
    status: string;
    onTaskCreated: (task: Task) => void;
    onCancel: () => void;
};

const NewTaskItem = ({ status, onTaskCreated, onCancel }: NewTaskItemProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('normal');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async () => {
        if (!title.trim()) return;
        const newTask = await createTask({ title, description, priority, dueDate, status });
        if (newTask) onTaskCreated(newTask);
    };

    return (
        <div className="bg-white/5 border border-indigo-500/40 border-l-2 border-l-indigo-500 rounded-xl p-3.5 flex flex-col gap-2.5">
            <input
                autoFocus
                placeholder="Task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                    if (e.key === 'Escape') onCancel();
                }}
                className="w-full bg-transparent border-none outline-none text-white/90 text-[13px] font-medium placeholder:text-white/30"
            />

            <textarea
                placeholder="Add description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-transparent border-none border-t border-white/10 pt-2.5 outline-none text-white/50 text-[12px] resize-none placeholder:text-white/30"
            />

            <div className="flex items-center gap-1 border-t border-white/10 pt-2.5">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-white/10 border border-white/10 rounded-md px-2 py-1 text-white/70 text-[11px] outline-none cursor-pointer"
                >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                </select>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-white/10 border border-white/10 rounded-md px-2 py-1 text-white/70 text-[11px] outline-none cursor-pointer"
                />

                <div className="flex-1" />

                <button
                    onClick={onCancel}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-white/10 text-white/40 hover:bg-white/10 hover:text-white/70 transition"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={!title.trim()}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-md transition ${title.trim() && dueDate.trim() ? 'bg-indigo-500 text-white hover:bg-indigo-400 cursor-pointer' : 'bg-white/10 text-white/20 cursor-not-allowed'}`}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default NewTaskItem;
