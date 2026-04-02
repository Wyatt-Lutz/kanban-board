import { isDateOverdue } from '../../lib/dateHelpers';
import type { Task } from '../../types/task';

type TopBarProps = {
    boardTitle: string;
    tasks: Task[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
};

const TopBar = ({ boardTitle, tasks, searchQuery, onSearchChange }: TopBarProps) => {
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter((task) => task.status === 'done').length;
    const overdueTasks = tasks.filter((task) => isDateOverdue(task.due_date)).length;
    return (
        <div className="flex justify-between items-center bg-gray-400 px-5 h-14">
            <div>{boardTitle}</div>

            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <div className="flex gap-4 text-sm">
                    <div className="text-white">
                        <strong>Total:</strong> <span>{totalTasks}</span>
                    </div>
                    <div className="text-white">
                        <strong>Done:</strong> <span>{doneTasks}</span>
                    </div>
                    <div className="text-white">
                        <strong>Overdue:</strong> <span>{overdueTasks}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
