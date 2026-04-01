export type Task = {
    id: string;
    title: string;
    status: TaskStatus;
    description?: string;
    priority: 'low' | 'normal' | 'high';
    due_date?: string;
    user_id: string;
};

export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done';
