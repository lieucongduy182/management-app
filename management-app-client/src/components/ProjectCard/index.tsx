import { Project } from "@/lib/types";
import React, { memo } from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="rounded border p-4 shadow">
      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <p>
        Start Date:{" "}
        {project.startDate
          ? new Date(project.startDate).toLocaleDateString()
          : ""}
      </p>
      <p>
        End Date:{" "}
        {project.endDate ? new Date(project.endDate).toLocaleDateString() : ""}
      </p>
    </div>
  );
};

export default memo(ProjectCard);
