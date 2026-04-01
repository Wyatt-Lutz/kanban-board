import { supabase } from './lib/supabase';
import type { Task } from './types/task';

export async function createTask() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const tasks: Partial<Task>[] = [
        { title: 'test1', status: 'todo', user_id: user?.id },
        { title: 'test2', status: 'done', user_id: user?.id },
    ];

    const { data, error } = await supabase.from('tasks').insert(tasks);

    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
}
