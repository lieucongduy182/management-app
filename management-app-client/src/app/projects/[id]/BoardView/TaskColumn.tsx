import React from "react";
import { Task as TaskType } from "@/lib/types";
import { useDrag, useDrop } from "react-dnd";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

const Task = ({ task }: { task: TaskType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags?.split(",") || [];
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";
  const numberOfComments = task.comments?.length || 0;

  const Priority = ({ priority }: { priority: TaskType["priority"] }) => {
    return (
      <div
        className={`rounded-full px-2 py-1 text-xs font-semibold ${priority === "Urgent" ? "bg-red-200 text-red-700" : ""} ${priority === "High" ? "bg-yellow-200 text-yellow-700" : ""} ${priority === "Medium" ? "bg-green-200 text-green-700" : ""} ${priority === "Low" ? "bg-blue-200 text-blue-700" : ""} `}
      >
        {priority}
      </div>
    );
  };
  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={getImageUrl(task.attachments[0].fileURL)}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <Priority priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag, index) => {
                return (
                  <div
                    key={tag}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>
        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points}pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="mt-3 border-t border-gray-200 dark:border-stroke-dark" />

        {/* User */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.id}
                src={getImageUrl(task.assignee.profilePictureUrl || "")}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
            {task.author && (
              <Image
                key={task.author.id}
                src={getImageUrl(task.author.profilePictureUrl || "")}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-neutral-400">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  openNewTaskModal: () => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  openNewTaskModal,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const taskCount = tasks.filter((task) => task.status === status).length;
  const statusColor: Record<string, string> = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-s-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <div className="flex items-center">
            <h3 className="flex items-center text-lg font-semibold dark:text-white">
              {status}
            </h3>
            <span
              className="ml-2 rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:text-neutral-500"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {taskCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-6 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={openNewTaskModal}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => {
          return <Task key={task.id} task={task} />;
        })}
    </div>
  );
};

export default TaskColumn;
