import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { fetchTasks, updateTask, deleteTask } from '../../lib/taskService';
import type { Task } from '../../types/task';
import Column from './Column';
import TopBar from '../layout/Topbar';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';

const COLUMNS: { title: string; status: Task['status'] }[] = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'in_progress' },
    { title: 'In Review', status: 'in_review' },
    { title: 'Done', status: 'done' },
];

const Board = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const onTaskCreated = (newTask: Task) => {
        setTasks((prev) => [...prev, newTask]);
    };

    const onTaskDeleted = async (taskId: string) => {
        const taskToDelete = tasks.find((t) => t.id === taskId);
        if (!taskToDelete) return;

        setTasks((prev) => prev.filter((task) => task.id !== taskId));

        try {
            await deleteTask(taskId);
        } catch (error) {
            console.error('Error deleting task:', error);
            setTasks((prev) => [...prev, taskToDelete]);
        }
    };

    const onTaskUpdated = async (
        taskId: string,
        updates: Partial<Pick<Task, 'title' | 'priority' | 'due_date' | 'status'>>,
    ) => {
        const previousTask = tasks.find((task) => task.id === taskId);
        if (!previousTask) return;

        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          ...updates,
                      }
                    : task,
            ),
        );

        try {
            await updateTask(taskId, updates);
        } catch (error) {
            console.error('Error updating task:', error);
            setTasks((prev) => prev.map((task) => (task.id === taskId ? previousTask : task)));
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as Task['status'];

        const previousTask = tasks.find((task) => task.id === taskId);
        setTasks((prev) =>
            prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
        );

        try {
            await updateTask(taskId, { status: newStatus });
        } catch (error) {
            console.error('Error updating task:', error);
            if (previousTask) {
                setTasks((prev) => prev.map((task) => (task.id === taskId ? previousTask : task)));
            }
        }
    };
    useEffect(() => {
        const fetchTasksForUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) return;

            try {
                const initializedTasks = await fetchTasks(user.id);
                setTasks(initializedTasks);
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        };
        fetchTasksForUser();
    }, []);

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <>
            <TopBar
                boardTitle="Kanban Board"
                tasks={filteredTasks}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex gap-6 p-6 overflow-x-auto">
                    {COLUMNS.map((column) => (
                        <Column
                            key={column.status}
                            status={column.status}
                            title={column.title}
                            tasks={filteredTasks.filter((task) => task.status === column.status)}
                            onTaskCreated={onTaskCreated}
                            onTaskDeleted={onTaskDeleted}
                            onTaskUpdated={onTaskUpdated}
                        />
                    ))}
                </div>
            </DndContext>
        </>
    );
};

export default Board;
