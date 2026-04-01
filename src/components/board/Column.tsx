import { useState } from 'react';
import type { Task } from '../../types/task';
import TaskItem from '../task/TaskItem';
import NewTaskItem from '../task/NewTaskItem';

type ColumnProps = {
    status: string;
    title: string;
    tasks: Task[];
    onTaskCreated: (task: Task) => void;
};

const Column = ({ status, title, tasks, onTaskCreated }: ColumnProps) => {
    console.log(tasks);
    const [isAddingTask, setIsAddingTask] = useState(false);

    return (
        <div>
            <div>{title}</div>
            <div>{tasks.length}</div>
            <div>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
            {isAddingTask ? (
                <NewTaskItem
                    status={status}
                    onTaskCreated={(task) => {
                        onTaskCreated(task);
                        setIsAddingTask(false);
                    }}
                    onCancel={() => setIsAddingTask(false)}
                />
            ) : (
                <button onClick={() => setIsAddingTask(true)}> Add task </button>
            )}
        </div>
    );
};

export default Column;
