import { useDraggable } from '@dnd-kit/core';
import type { Task } from '../../types/task';
import TrashIcon from '../../assets/trash';

type TaskProps = {
    task: Task;
    onDelete: () => void;
};

const priorityClasses = {
    low: 'bg-emerald-100 text-emerald-800',
    normal: 'bg-amber-100 text-amber-800',
    high: 'bg-red-100 text-red-800',
};

const TaskItem = ({ task, onDelete }: TaskProps) => {
    const isDone = task.status === 'done';
    const isOverdue = task.due_date && new Date(task.due_date) < new Date();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    return (
        <div
            ref={setNodeRef}
            style={
                transform
                    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
                    : undefined
            }
            className="relative bg-white border rounded-xl p-6 shadow-sm hover:shadow-md"
        >
            <div {...listeners} {...attributes} className="absolute inset-0 cursor-grab" />

            <button
                onClick={onDelete}
                className="absolute top-3 right-3 p-1.5 rounded-md text-red-500 hover:bg-red-50 z-10"
            >
                <TrashIcon />
            </button>

            {task.priority && !isDone && (
                <div
                    className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${priorityClasses[task.priority]}`}
                />
            )}

            <div className="pr-8">
                <p
                    className={`text-lg font-semibold mb-3 ${isDone ? 'line-through text-gray-500' : 'text-gray-900'}`}
                >
                    {task.title}
                </p>

                <div className="flex items-center justify-between">
                    {task.priority && (
                        <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${isDone ? 'bg-gray-100 text-gray-500' : priorityClasses[task.priority]}`}
                        >
                            {task.priority}
                        </span>
                    )}

                    {task.due_date && (
                        <span
                            className={`text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'}`}
                        >
                            {isOverdue
                                ? 'Overdue'
                                : new Date(task.due_date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                  })}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
export default TaskItem;
