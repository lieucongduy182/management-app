import { useGetTasksQuery } from "@/lib/state/api";
import { useAppSelector } from "@/lib/store";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { ChangeEvent, useMemo, useState } from "react";

type Props = {
  id: string;
  openNewTaskModal: () => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const TimelineView = ({ id, openNewTaskModal }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data, isLoading, error } = useGetTasksQuery({
    projectId: Number(id),
  });
  const { data: tasks } = data || {};

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        id: `Task-${task.id}`,
        name: task.title,
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching tasks</div>;

  const handleViewModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: e.target.value as ViewMode,
    }));
  };

  return (
    <section className="p-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Task Timeline
        </h1>
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Month}>Month</option>
            <option value={ViewMode.Year}>Year</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={isDarkMode ? "#101214" : "#AEB8C2"}
            barProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
        <div className="px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={openNewTaskModal}
          >
            Add New Task
          </button>
        </div>
      </div>
    </section>
  );
};

export default TimelineView;
