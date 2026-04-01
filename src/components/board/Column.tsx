import { useState } from 'react';
import { createTask } from '../../createTasks';
import type { Task } from '../../types/task';
import TaskItem from '../task/TaskItem';

type ColumnProps = {
    status: string;
    title: string;
    tasks: Task[];
    onTaskCreated: (task: Task) => void;
};

const Column = ({ status, title, tasks, onTaskCreated }: ColumnProps) => {
    console.log(tasks);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAdd = async () => {
        if (!newTaskTitle.trim()) return;
        const newTask = await createTask(status, newTaskTitle);
        if (newTask) {
            onTaskCreated(newTask);
        }
        setNewTaskTitle('');
        setIsAddingTask(false);
    };

    return (
        <div>
            <div>{title}</div>
            <div>{tasks.length}</div>
            <div>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
            {isAddingTask ? (
                <div>
                    <input
                        autoFocus
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAdd();
                            if (e.key === 'Escape') setIsAddingTask(false);
                        }}
                        placeholder="Task title..."
                    />
                    <button onClick={handleAdd}>Add</button>
                    <button onClick={() => setIsAddingTask(false)}>Cancel</button>
                </div>
            ) : (
                <button onClick={() => setIsAddingTask(true)}>Add Task</button>
            )}
        </div>
    );
};

export default Column;
