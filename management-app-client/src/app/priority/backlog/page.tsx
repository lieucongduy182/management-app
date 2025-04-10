import React from "react";
import ReusablePriority from "../reusablePriorityPage";
import { TaskPriority } from "@/lib/types";

const Backlog = () => {
  return <ReusablePriority priority={TaskPriority.BACKLOG} />;
};

export default Backlog;
