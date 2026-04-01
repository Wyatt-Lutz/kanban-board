import type { Task } from '../../types/task';
import TaskItem from '../task/TaskItem';

type ColumnProps = {
    title: string;
    tasks: Task[];
};

const Column = ({ title, tasks }: ColumnProps) => {
    return (
        <div>
            <div>{title}</div>
            <div>{tasks.length}</div>
            <div>
                {tasks.map((task) => {
                    <TaskItem key={task.id} task={task} />;
                })}
            </div>
        </div>
    );
};

export default Column;
