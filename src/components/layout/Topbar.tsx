import SearchIcon from '../../assets/search';
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
    const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    return (
        <div className="sticky top-0 z-50 px-6 backdrop-blur-xl bg-[rgba(10,10,14,0.92)] border-b border-white/5">
            <div className="flex items-center justify-between h-14">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] text-white/30">Workspace</span>
                        <span className="text-[13px] text-white/20">/</span>
                        <h1 className="text-[13px] font-semibold text-white/85 tracking-[0.01em] font-sans">
                            {boardTitle}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-30 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500 transition-all duration-400"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-[11px] text-white/30 tabular-nums">{progress}%</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-[12px] text-white/40">{totalTasks}</span>
                        <span className="text-[12px] text-white/20 mx-1">·</span>
                        <span className="text-[12px] text-emerald-400">{doneTasks} done</span>

                        {overdueTasks > 0 && (
                            <>
                                <span className="text-[12px] text-white/20 mx-1">·</span>
                                <span className="text-[12px] text-red-400">
                                    {overdueTasks} overdue
                                </span>
                            </>
                        )}
                    </div>

                    <div className="relative">
                        <SearchIcon />

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-45 pl-8 pr-3 py-1.5 text-[12px] text-white/80 bg-white/5 border border-white/10 rounded-l outline-none transition-all duration-150 placeholder:text-white/30 focus:border-indigo-500/50 focus:bg-white/10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
