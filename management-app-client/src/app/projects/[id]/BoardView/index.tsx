import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/lib/state/api";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";

type Props = {
  id: string;
  openNewTaskModal: () => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, openNewTaskModal }: Props) => {
  const { data, isLoading, error } = useGetTasksQuery({
    projectId: Number(id),
  });
  const { data: tasks } = data || {};
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => {
          return (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks || []}
              moveTask={moveTask}
              openNewTaskModal={openNewTaskModal}
            />
          );
        })}
      </div>
    </DndProvider>
  );
};

export default BoardView;
