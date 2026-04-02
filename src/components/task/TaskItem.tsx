import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
import type { Task } from '../../types/task';
import TrashIcon from '../../assets/trash';
import { parseDateOnly, isDateOverdue } from '../../lib/dateHelpers';
import Date from '../../assets/date';

type TaskProps = {
    task: Task;
    onDelete: () => void;
    onEdit?: (updates: Partial<Pick<Task, 'title' | 'priority' | 'due_date'>>) => void;
};

const PRIORITY_STYLES = {
    low: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
    normal: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
    high: 'bg-red-400/10 text-red-400 border-red-400/30',
};

const PRIORITY_BAR = {
    low: 'border-l-emerald-400',
    normal: 'border-l-amber-400',
    high: 'border-l-red-400',
};

const formatTaskDate = (dateString?: string) => {
    const date = parseDateOnly(dateString);
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const TaskItem = ({ task, onDelete, onEdit }: TaskProps) => {
    const isDone = task.status === 'done';
    const isOverdue = isDateOverdue(task.due_date);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleInput, setTitleInput] = useState(task.title);
    const [isEditingPriority, setIsEditingPriority] = useState(false);
    const [priorityInput, setPriorityInput] = useState<Task['priority']>(task.priority);
    const [isEditingDueDate, setIsEditingDueDate] = useState(false);
    const [dueDateInput, setDueDateInput] = useState(task.due_date || '');

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const commitTitle = (value: string) => {
        setIsEditingTitle(false);
        setTitleInput(value);
        if (value.trim().length > 0) {
            onEdit?.({ title: value.trim() });
        }
    };

    const commitPriority = (value: Task['priority']) => {
        setIsEditingPriority(false);
        setPriorityInput(value);
        onEdit?.({ priority: value });
    };

    const commitDueDate = (date: string) => {
        setIsEditingDueDate(false);
        setDueDateInput(date);
        onEdit?.({ due_date: date });
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={
                transform
                    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
                    : undefined
            }
            className={`group relative rounded-xl px-3.5 py-3 border border-white/10 bg-white/[0.035] cursor-grab active:cursor-grabbing shadow-sm hover:shadow-lg ${PRIORITY_BAR[priorityInput]} border-l-2`}
        >
            <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete();
                }}
                className="absolute top-2 right-2 z-20 p-1 rounded-md opacity-0 group-hover:opacity-100 text-red-400/70 hover:bg-red-400/10 hover:text-red-400 transition-opacity"
            >
                <TrashIcon />
            </button>

            <div className="pr-6 mb-6">
                {isEditingTitle ? (
                    <input
                        autoFocus
                        onPointerDown={(e) => e.stopPropagation()}
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        onBlur={(e) => commitTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') commitTitle(titleInput);
                            if (e.key === 'Escape') setIsEditingTitle(false);
                        }}
                        className="w-full px-2 py-1 text-[13px] font-medium text-white bg-white/10 border border-indigo-500/40 rounded-md outline-none relative z-20"
                    />
                ) : (
                    <p
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            setIsEditingTitle(true);
                        }}
                        className={`text-[16px] font-medium leading-snug cursor-text ${isDone ? 'text-white/30 line-through' : 'text-white/90'}`}
                    >
                        {titleInput}
                    </p>
                )}

                <p
                    className={`text-sm wrap-break-word whitespace-pre-wrap text-gray-400 mb-3  ${isDone ? 'line-through' : ''}`}
                >
                    {task.description}
                </p>
            </div>

            <div className="flex items-center justify-between gap-2 mt-1">
                {!isDone &&
                    (isEditingPriority ? (
                        <select
                            autoFocus
                            onPointerDown={(e) => e.stopPropagation()}
                            value={priorityInput}
                            onChange={(e) => setPriorityInput(e.target.value as Task['priority'])}
                            onBlur={(e) => commitPriority(e.target.value as Task['priority'])}
                            className="relative z-20 text-[11px] px-2 py-0.5 rounded-full bg-slate-800 border border-white/20 text-white outline-none"
                        >
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                            <option value="low">Low</option>
                        </select>
                    ) : (
                        <span
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsEditingPriority(true);
                            }}
                            className={`relative z-20 text-[11px] font-medium capitalize px-2 py-0.5 rounded-full border ${PRIORITY_STYLES[priorityInput]} cursor-pointer hover:opacity-80`}
                        >
                            {priorityInput}
                        </span>
                    ))}

                <div className="flex-1" />

                {task.due_date && !isEditingDueDate && (
                    <div
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsEditingDueDate(true);
                        }}
                        className={`relative z-20 flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md border cursor-pointer ${isOverdue ? 'bg-red-400/10 border-red-400/30 text-red-400 font-semibold' : 'bg-white/5 border-white/10 text-white/40'}`}
                    >
                        <Date />
                        {isOverdue ? 'Overdue' : formatTaskDate(task.due_date)}
                    </div>
                )}

                {isEditingDueDate && (
                    <input
                        type="date"
                        autoFocus
                        onPointerDown={(e) => e.stopPropagation()}
                        value={dueDateInput}
                        onChange={(e) => setDueDateInput(e.target.value)}
                        onBlur={(e) => commitDueDate(e.target.value)}
                        className="relative z-20 text-[11px] px-2 py-0.5 rounded-md bg-slate-800 border border-indigo-500/40 text-white outline-none"
                    />
                )}
            </div>
        </div>
    );
};
export default TaskItem;
