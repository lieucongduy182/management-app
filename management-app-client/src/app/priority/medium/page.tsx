import React from "react";
import ReusablePriority from "../reusablePriorityPage";
import { TaskPriority } from "@/lib/types";

const Medium = () => {
  return <ReusablePriority priority={TaskPriority.MEDIUM} />;
};

export default Medium;
