import { useState } from 'react';
import { createTask } from '../../createTasks';
import type { Task } from '../../types/task';

type NewTaskItemProps = {
    status: string;
    onTaskCreated: (task: Task) => void;
    onCancel: () => void;
};

const PRIORITIES = ['low', 'normal', 'high'];

const NewTaskItem = ({ status, onTaskCreated, onCancel }: NewTaskItemProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('normal');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async () => {
        if (!title.trim) return;
        const newTask = await createTask({ title, description, priority, dueDate, status });
        if (newTask) onTaskCreated(newTask);
    };

    return (
        <div className="border rounded-lg p-3 flex flex-col gap-2">
            <input
                autoFocus
                placeholder="Task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border px-3 py-2 rounded-lg"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                    if (e.key === 'Escape') onCancel();
                }}
            />
            <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-transparent outline-none resize-none"
            />

            <div>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    {PRIORITIES.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>

            <div>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={handleSubmit}>Add</button>
            </div>
        </div>
    );
};

export default NewTaskItem;
