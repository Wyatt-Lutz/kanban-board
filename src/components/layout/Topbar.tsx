type TopBarProps = {
    boardTitle: string;
    totalTasks: number;
    doneTasks: number;
    overdueTasks: number;
};

const TopBar = ({ boardTitle, totalTasks, doneTasks, overdueTasks }: TopBarProps) => {
    return (
        <div className="flex justify-between items-center bg-gray-400 px-5 h-14">
            <div>{boardTitle}</div>

            <div className="flex gap-4">
                <div>
                    <span>{totalTasks}</span>
                </div>
                <div>
                    <span>{doneTasks}</span>
                </div>
                <div>
                    <span>{overdueTasks}</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
