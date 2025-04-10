import React from "react";
import ReusablePriority from "../reusablePriorityPage";
import { TaskPriority } from "@/lib/types";

const Urgent = () => {
  return <ReusablePriority priority={TaskPriority.URGENT} />;
};

export default Urgent;
