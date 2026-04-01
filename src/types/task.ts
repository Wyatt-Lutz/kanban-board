export type Task = {
    id: string;
    title: string;
    status: 'todo' | 'in_progress' | 'in_review' | 'done';
    description?: string;
    priority: 'low' | 'normal' | 'high';
    due_date?: string;
    user_id: string;
};
