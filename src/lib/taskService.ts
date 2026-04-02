import { supabase } from './supabase';
import type { Task } from '../types/task';

export const fetchTasks = async (userId: string): Promise<Task[]> => {
    const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId);
    if (error) {
        throw error;
    }
    return data || [];
};

export const createTask = async (task: Task): Promise<Task> => {
    const { data, error } = await supabase.from('tasks').insert(task).single();
    if (error) {
        throw error;
    }
    return data;
};

export const updateTask = async (
    taskId: string,
    updates: Partial<Pick<Task, 'title' | 'priority' | 'due_date' | 'status'>>,
): Promise<Task> => {
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', taskId).single();
    if (error) {
        throw error;
    }
    return data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) {
        throw error;
    }
};
