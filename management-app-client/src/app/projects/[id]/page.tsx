"use client";

import { useState } from "react";
import ProjectHeader from "@/app/projects/[id]/ProjectHeader";
import BoardView from "./BoardView";
import ListView from "./ListView";
import TimelineView from "./TimelineView";
import TableView from "./TableView";
import useModal from "@/hooks/useModal";
import NewTaskModal from "@/components/NewTaskModal";

type Props = {
  params: {
    id: string;
  };
};

function Project({ params }: Props) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const {
    isOpen: isOpenNewTask,
    openModal: openNewTaskModal,
    closeModal: closeNewTaskModal,
  } = useModal();

  return (
    <div>
      <NewTaskModal
        isOpen={isOpenNewTask}
        onClose={closeNewTaskModal}
        projectId={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && (
        <BoardView id={id} openNewTaskModal={openNewTaskModal} />
      )}
      {activeTab === "List" && (
        <ListView id={id} openNewTaskModal={openNewTaskModal} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} openNewTaskModal={openNewTaskModal} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} openNewTaskModal={openNewTaskModal} />
      )}
    </div>
  );
}

export default Project;
