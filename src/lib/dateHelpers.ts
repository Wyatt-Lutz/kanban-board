export const parseDateOnly = (dateString?: string): Date | null => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('T')[0].split('-').map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
};

export const isDateOverdue = (dateString?: string): boolean => {
    const taskDate = parseDateOnly(dateString);
    if (!taskDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return taskDate < today;
};
