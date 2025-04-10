import React from "react";
import ReusablePriority from "../reusablePriorityPage";
import { TaskPriority } from "@/lib/types";

const High = () => {
  return <ReusablePriority priority={TaskPriority.HIGH} />;
};

export default High;
