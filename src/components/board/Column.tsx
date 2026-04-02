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
    onTaskUpdated: (
        taskId: string,
        updates: Partial<Pick<Task, 'title' | 'priority' | 'due_date'>>,
    ) => void;
};

const Column = ({
    status,
    title,
    tasks,
    onTaskCreated,
    onTaskDeleted,
    onTaskUpdated,
}: ColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });
    const [isAddingTask, setIsAddingTask] = useState(false);

    const sortedTasks = [...tasks].sort((a, b) => {
        if (!a.due_date && !b.due_date) return 0;
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
    return (
        <div
            ref={setNodeRef}
            className={`flex flex-col p-4 rounded-md w-80 ${isOver ? 'bg-gray-100' : ''}`}
        >
            <div className="flex pb-1 justify-between">
                <div className="text-lg font-semibold">{title}</div>
                <div className="text-xs text-gray-500">{tasks.length} tasks</div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
                {sortedTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={() => onTaskDeleted(task.id)}
                        onEdit={(updates) => onTaskUpdated(task.id, updates)}
                    />
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
                    className="border rounded-lg py-2 px-4 border-dashed hover:bg-gray-50 transition-colors w-full mt-3"
                    onClick={() => setIsAddingTask(true)}
                >
                    + Add task
                </button>
            )}
        </div>
    );
};

export default Column;
