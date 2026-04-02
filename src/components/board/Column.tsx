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

const LABEL_COLORS: Record<string, string> = {
    todo: 'text-slate-400',
    in_progress: 'text-amber-400',
    in_review: 'text-violet-400',
    done: 'text-emerald-400',
};

const Column = ({
    status,
    title,
    tasks,
    onTaskCreated,
    onTaskDeleted,
    onTaskUpdated,
}: ColumnProps) => {
    const { setNodeRef } = useDroppable({
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
        <div ref={setNodeRef} className="flex flex-col w-85 shrink-0 rounded-xl">
            <div className="px-4 pt-3.5 pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <span
                            className={`w-2 h-2 rounded-full shrink-0 ${LABEL_COLORS[status] || 'bg-gray-400'}`}
                        />
                        <span
                            className={`text-[12px] font-semibold tracking-wider uppercase ${LABEL_COLORS[status] || 'text-gray-400'}`}
                        >
                            {title}
                        </span>
                    </div>

                    <span className="text-[11px] font-semibold text-white/30 bg-white/10 rounded-full px-2 py-0.5 tabular-nums">
                        {tasks.length}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-1.5 p-2.5 grow min-h-15">
                {sortedTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={() => onTaskDeleted(task.id)}
                        onEdit={(updates) => onTaskUpdated(task.id, updates)}
                    />
                ))}

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
                        onClick={() => setIsAddingTask(true)}
                        className={`w-full px-3 py-2 text-left text-[12px] font-medium flex items-center gap-1.5 rounded-lg border border-dashed border-white/20 text-white/50 transition-all hover:border-white/30 hover:text-white/70 hover:bg-white/5 ${sortedTasks.length > 0 ? 'mt-1' : ''}`}
                    >
                        + Add task
                    </button>
                )}
            </div>
        </div>
    );
};

export default Column;
