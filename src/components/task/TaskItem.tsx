import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
import type { Task } from '../../types/task';
import TrashIcon from '../../assets/trash';
import { parseDateOnly, isDateOverdue } from '../../lib/dateHelpers';

type TaskProps = {
    task: Task;
    onDelete: () => void;
    onEditDueDate?: (newDate: string) => void;
};

const priorityClasses = {
    low: 'bg-emerald-100 text-emerald-800',
    normal: 'bg-amber-100 text-amber-800',
    high: 'bg-red-100 text-red-800',
};

const formatTaskDate = (dateString?: string) => {
    const date = parseDateOnly(dateString);
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const TaskItem = ({ task, onDelete, onEditDueDate }: TaskProps) => {
    const isDone = task.status === 'done';
    const isOverdue = isDateOverdue(task.due_date);
    const [isEditingDueDate, setIsEditingDueDate] = useState(false);
    const [dueDateInput, setDueDateInput] = useState(task.due_date || '');

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const commitDueDate = (date: string) => {
        setIsEditingDueDate(false);
        setDueDateInput(date);
        onEditDueDate?.(date);
    };

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
            <div
                {...listeners}
                {...attributes}
                className="absolute top-0 left-0 right-12 bottom-12 cursor-grab"
            />

            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 p-1.5 rounded-md text-red-500 hover:bg-red-50 z-20 cursor-pointer"
            >
                <TrashIcon />
            </button>

            {task.due_date && !isEditingDueDate && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsEditingDueDate(true);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`absolute bottom-3 right-3 text-sm px-3 py-1 rounded-md border ${isOverdue ? 'text-red-600 font-semibold border-red-200 bg-red-50' : 'text-gray-600 border-gray-300 bg-gray-50'} hover:bg-gray-100 transition-colors cursor-pointer`}
                >
                    {isOverdue ? 'Overdue' : formatTaskDate(task.due_date)}
                </button>
            )}

            {isEditingDueDate && (
                <input
                    type="date"
                    value={dueDateInput}
                    onChange={(e) => setDueDateInput(e.target.value)}
                    onBlur={(e) => commitDueDate(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            commitDueDate(dueDateInput);
                        }
                        if (e.key === 'Escape') {
                            setIsEditingDueDate(false);
                        }
                    }}
                    className="absolute bottom-3 right-3 text-sm px-3 py-1 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 z-20"
                />
            )}

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

                    <div className="flex-1" />
                </div>
            </div>
        </div>
    );
};
export default TaskItem;
