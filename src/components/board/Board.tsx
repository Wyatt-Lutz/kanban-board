import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Task } from '../../types/task';
import { createTask } from '../../createTasks';

const Board = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

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
    return <div>Hi</div>;
};

export default Board;
