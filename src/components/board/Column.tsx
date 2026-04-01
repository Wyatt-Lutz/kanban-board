import { useState } from 'react';
import type { Task } from '../../types/task';
import TaskItem from '../task/TaskItem';
import NewTaskItem from '../task/NewTaskItem';
import { useDroppable } from '@dnd-kit/core';

type ColumnProps = {
    status: string;
    title: string;
    tasks: Task[];
    onTaskCreated: (task: Task) => void;
    onTaskDeleted: (taskId: string) => void;
};

const Column = ({ status, title, tasks, onTaskCreated, onTaskDeleted }: ColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });
    const [isAddingTask, setIsAddingTask] = useState(false);

    return (
        <div
            ref={setNodeRef}
            className={`min-h-96 flex flex-col gap-2 p-4 rounded-md w-80 ${isOver ? 'bg-gray-100' : ''}`}
        >
            {tasks.length === 0 && <div className="text-xs text-gray-400 text-center py-8"></div>}
            <div>{title}</div>
            <div>{tasks.length}</div>
            <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} onDelete={() => onTaskDeleted(task.id)} />
                ))}
            </div>
            {isAddingTask ? (
                <NewTaskItem
                    status={status}
                    onTaskCreated={(task) => {
                        onTaskCreated(task);
                        setIsAddingTask(false);
                    }}
                    onCancel={() => setIsAddingTask(false)}
                />
            ) : (
                <button
                    className="border rounded-lg py-2 border-dashed"
                    onClick={() => setIsAddingTask(true)}
                >
                    + Add task
                </button>
            )}
        </div>
    );
};

export default Column;
