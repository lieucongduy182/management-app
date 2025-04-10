import { useCreateTaskMutation } from "@/lib/state/api";
import Modal from "@/components/Modal";
import React, { ChangeEvent, useState } from "react";
import { TaskPriority, TaskStatus } from "@/lib/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string | null;
};

const NewTaskModal = ({ isOpen, onClose, projectId = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: TaskStatus.TODO,
    priority: TaskPriority.BACKLOG,
    tags: "",
    startDate: "",
    dueDate: "",
    authorUserId: "",
    assignedUserId: "",
    projectId: projectId || "",
  });

  const handleChange = (e: ChangeEvent<Element>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    await createTask({
      ...formData,
      authorUserId: parseInt(formData.authorUserId),
      assignedUserId: parseInt(formData.assignedUserId), // Replace with actual assigned user ID
      projectId: Number(formData.projectId),
    });
    onClose();
  };

  const isFormValid = () => {
    if (!formData.title || !formData.authorUserId || !formData.projectId) return false;
    if (!formData.startDate || !formData.dueDate) return false;

    const startDate = new Date(formData.startDate);
    const dueDate = new Date(formData.dueDate);
    if ((startDate > dueDate)) return false;

    return true;
  };

  const selectStyles = `mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none`;
  const inputStyles = `w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-outline-none`;

  return (
    <Modal isOpen={isOpen} name="Create New Task" onClose={onClose}>
      <form
        action=""
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            name="status"
            className={selectStyles}
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value={TaskStatus.TODO}>To Do</option>
            <option value={TaskStatus.WORK_IN_PROGRESS}>
              Work In Progress
            </option>
            <option value={TaskStatus.UNDER_REVIEW}>Under Review</option>
            <option value={TaskStatus.COMPLETED}> Completed</option>
          </select>

          <select
            name="priority"
            className={selectStyles}
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value={TaskPriority.URGENT}>Urgent</option>
            <option value={TaskPriority.HIGH}>High</option>
            <option value={TaskPriority.MEDIUM}>Medium</option>
            <option value={TaskPriority.LOW}>Low</option>
            <option value={TaskPriority.BACKLOG}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            className={inputStyles}
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          className={inputStyles}
          name="authorUserId"
          placeholder="Author User ID"
          value={formData.authorUserId}
          onChange={handleChange}
        />
        <input
          type="text"
          className={inputStyles}
          name="assignedUserId"
          placeholder="Assigned User ID"
          value={formData.assignedUserId}
          onChange={handleChange}
        />
        <button
          type="submit"
          className={`focus:offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default NewTaskModal;
