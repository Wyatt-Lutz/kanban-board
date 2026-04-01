import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Task } from '../../types/task';
import { createTask } from '../../createTasks';
import Column from './Column';

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
        <div className="flex gap-4 p-5 overflow-x-auto flex-1">
            {COLUMNS.map((column) => (
                <Column
                    status={column.status}
                    title={column.title}
                    tasks={tasks.filter((task) => task.status === column.status)}
                    onTaskCreated={onTaskCreated}
                />
            ))}
        </div>
    );
};

export default Board;
