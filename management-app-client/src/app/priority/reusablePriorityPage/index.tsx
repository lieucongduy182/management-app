"use client";

import { columnTaskTable } from "@/app/projects/[id]/TableView";
import Header from "@/components/Header";
import NewTaskModal from "@/components/NewTaskModal";
import TaskCard from "@/components/TaskCard";
import useModal from "@/hooks/useModal";
import { useGetAuthUserQuery, useGetTasksByUserIdQuery } from "@/lib/state/api";
import { useAppSelector } from "@/lib/store";
import { Task, TaskPriority } from "@/lib/types";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

type Props = {
  priority: TaskPriority;
};

const ReusablePriority = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const { isOpen, openModal, closeModal } = useModal();
  const { data: currentUser } = useGetAuthUserQuery({});
  const userId = currentUser?.userDetail?.id ?? null;
  const { data, isLoading, isError } = useGetTasksByUserIdQuery(
    {
      userId,
    },
    { skip: userId === null },
  );
  const { data: tasks } = data || {};

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );
  console.log('🚀 [Debug] ~ index.tsx:36 ~ ReusablePriority ~ tasks:', tasks)
  console.log(
    "🚀 [Debug] ~ index.tsx:35 ~ ReusablePriority ~ priority:",
    priority,
  );
  console.log(
    "🚀 [Debug] ~ index.tsx:36 ~ ReusablePriority ~ filteredTasks:",
    filteredTasks,
  );

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching tasks</div>;

  return (
    <section className="m-5 p-4">
      <NewTaskModal isOpen={isOpen} onClose={closeModal} />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={openModal}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columnTaskTable}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </section>
  );
};

export default ReusablePriority;
