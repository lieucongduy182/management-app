import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { useGetTasksQuery } from "@/lib/state/api";
import { Task as TaskType } from "@/lib/types";
import React from "react";

type Props = {
  id: string;
  openNewTaskModal: () => void;
};

const ListView = ({ id, openNewTaskModal }: Props) => {
  const { data, isLoading, error } = useGetTasksQuery({ projectId: +id });
  const { data: tasks } = data || {};

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching tasks</div>;

  return (
    <section className="p-4 xl:px-6">
      <div className="py-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={openNewTaskModal}
            >
              Add Task
            </button>
          }
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: TaskType) => <TaskCard task={task} key={task.id} />)}
      </div>
    </section>
  );
};

export default ListView;
