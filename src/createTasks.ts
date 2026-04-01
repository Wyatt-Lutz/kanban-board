import { supabase } from './lib/supabase';
import type { Task } from './types/task';

export async function createTask(status: string, title: string): Promise<Task | null> {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase.from('tasks').insert({ title, status, user_id: user.id}).select().single();

    if (error) {
        console.error(error)
        return null;
    }
    return data;

}
