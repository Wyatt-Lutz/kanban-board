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
};

const Column = ({ status, title, tasks, onTaskCreated }: ColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });
    const [isAddingTask, setIsAddingTask] = useState(false);

    return (
        <div
            ref={setNodeRef}
            className={`min-h-25 flex flex-col gap-2 p-2 rounded-md ${isOver ? 'bg-gray-100' : ''}`}
        >
            {tasks.length === 0 && <div className="text-xs text-gray-400 text-center py-4"></div>}
            <div>{title}</div>
            <div>{tasks.length}</div>
            <div>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
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
                <button onClick={() => setIsAddingTask(true)}> Add task </button>
            )}
        </div>
    );
};

export default Column;
