import { supabase } from './lib/supabase';
import type { Task, TaskStatus } from './types/task';


type createTaskProps = {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    status: string;
}
export async function createTask({title, description, priority, dueDate, status}: createTaskProps): Promise<Task | null> {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase.from('tasks').insert({ title, description, priority, due_date: dueDate, status, user_id: user.id}).select().single();

    if (error) {
        console.error(error)
        return null;
    }
    return data;

}
