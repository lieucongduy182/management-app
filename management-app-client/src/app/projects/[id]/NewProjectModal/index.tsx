import { useCreateProjectMutation } from "@/lib/state/api";
import Modal from "@/components/Modal";
import React, { ChangeEvent } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NewProjectModal = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
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

    await createProject(formData);
    onClose();
  };

  const isFormValid = () => {
    return formData.name && formData.startDate && formData.endDate;
  };

  const inputStyles = `w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-outline-none`;

  return (
    <Modal isOpen={isOpen} name="Create New Project" onClose={onClose}>
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
          placeholder="Project Name"
          name="name"
          value={formData.name}
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
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`focus:offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default NewProjectModal;
