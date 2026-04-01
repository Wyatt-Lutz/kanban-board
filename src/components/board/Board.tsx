import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Task } from '../../types/task';
import Column from './Column';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';

const COLUMNS: { title: string; status: Task['status'] }[] = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'in_progress' },
    { title: 'In Review', status: 'in_review' },
    { title: 'Done', status: 'done' },
];

const Board = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const onTaskCreated = (newTask: Task) => {
        setTasks((prev) => [...prev, newTask]);
    };

    const onTaskDeleted = async (taskId: string) => {
        console.log('clicked');
        const taskToDelete = tasks.find((t) => t.id === taskId);
        if (!taskToDelete) return;

        setTasks((prev) => prev.filter((task) => task.id !== taskId));

        const { error } = await supabase.from('tasks').delete().eq('id', taskId);

        if (error) {
            console.error('Error deleting task:', error);
            setTasks((prev) => [...prev, taskToDelete]);
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as Task['status'];

        setTasks((prev) =>
            prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
        );

        const { error } = await supabase
            .from('tasks')
            .update({ status: newStatus })
            .eq('id', taskId);

        if (error) {
            console.error('Error updating task:', error);

            setTasks((prev) =>
                prev.map((task) => (task.id === taskId ? { ...task, status: task.status } : task)),
            );
        }
    };
    useEffect(() => {
        const fetchTasks = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            console.log(user);
            if (!user) {
                return;
            }
            //await createTask();

            const { data, error } = await supabase.from('tasks').select('*').eq('user_id', user.id);
            if (error) {
                console.error(error);
            } else {
                setTasks(data || []);
            }
        };
        fetchTasks();
    }, []);
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6 p-6 overflow-x-auto flex-1">
                {COLUMNS.map((column) => (
                    <Column
                        key={column.status}
                        status={column.status}
                        title={column.title}
                        tasks={tasks.filter((task) => task.status === column.status)}
                        onTaskCreated={onTaskCreated}
                        onTaskDeleted={onTaskDeleted}
                    />
                ))}
            </div>
        </DndContext>
    );
};

export default Board;
