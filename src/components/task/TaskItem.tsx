import type { Task } from "../../types/task";

type TaskProps = {
    task: Task;

}

const TaskItem = ({ task }: TaskProps) => {
    return (
        <div>
            <div>{task.title}</div>
        </div>
    );
}
export default TaskItem;
