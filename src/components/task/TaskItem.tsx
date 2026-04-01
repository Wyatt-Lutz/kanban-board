import { useDraggable } from '@dnd-kit/core';
import type { Task } from '../../types/task';

type TaskProps = {
    task: Task;
};

const priorityColors: Record<string, string> = {
    low: 'bg-emerald-100 text-emerald-800',
    normal: 'bg-amber-100 text-amber-800',
    high: 'bg-red-100 text-red-800',
};

const isOverdue = (dueDate: string | null | undefined) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
};
const formatDate = (dueDate: string | null | undefined) => {
    if (!dueDate) return null;
    return new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const TaskItem = ({ task }: TaskProps) => {
    const overdue = isOverdue(task.due_date);
    const isDone = task.status === 'done';
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
        : undefined;
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="relative bg-background-primary border rounded-xl px-5 py-4 cursor-grab overflow-hidden shadow-sm hover:shadow-md"
        >
            {task.priority && !isDone && (
                <div
                    className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${
                        priorityColors[task.priority] ?? ''
                    }`}
                />
            )}

            <div className="pl-3">
                <p
                    className={`
                        text-[16px] font-semibold leading-snug mb-3
                        ${isDone ? 'line-through text-secondary' : 'text-primary'}
                    `}
                >
                    {task.title}
                </p>

                <div className="flex items-center justify-between gap-3">
                    {task.priority ? (
                        <span
                            className={`
                                text-[12px] font-medium px-3 py-1 rounded-full tracking-wide
                                ${
                                    isDone
                                        ? 'bg-background-secondary text-secondary'
                                        : priorityColors[task.priority]
                                }
                            `}
                        >
                            {task.priority}
                        </span>
                    ) : (
                        <span />
                    )}

                    {task.due_date && (
                        <span
                            className={`
                                flex items-center gap-1 text-[13px]
                                ${overdue ? 'text-red-800 font-semibold' : 'text-secondary'}
                            `}
                        >
                            {overdue ? 'Overdue' : formatDate(task.due_date)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
export default TaskItem;
