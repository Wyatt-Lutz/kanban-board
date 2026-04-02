import { isDateOverdue } from '../../lib/dateHelpers';
import type { Task } from '../../types/task';

type TopBarProps = {
    boardTitle: string;
    tasks: Task[];
};

const TopBar = ({ boardTitle, tasks }: TopBarProps) => {
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter((task) => task.status === 'done').length;
    const overdueTasks = tasks.filter((task) => isDateOverdue(task.due_date)).length;
    return (
        <div className="flex justify-between items-center bg-gray-400 px-5 h-14">
            <div>{boardTitle}</div>

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
    );
};

export default TopBar;
