"use client";

import Header from "@/components/Header";
import { useGetProjectsQuery } from "@/lib/state/api";
import { useAppSelector } from "@/lib/store";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { ChangeEvent, useMemo, useState } from "react";

type Props = {};

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = (props: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data, isLoading, error } = useGetProjectsQuery();
  const { data: projects } = data || {};

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        id: `Project-${project.id}`,
        name: project.name,
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        type: "project" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching projects</div>;

  const handleViewModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: e.target.value as ViewMode,
    }));
  };

  return (
    <section className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Project Timeline" />
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
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f29317"}
            projectProgressColor={isDarkMode ? "#1f29317" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </section>
  );
};

export default Timeline;
