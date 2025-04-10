import React from "react";
import ReusablePriority from "../reusablePriorityPage";
import { TaskPriority } from "@/lib/types";

const Low = () => {
  return <ReusablePriority priority={TaskPriority.LOW} />;
};

export default Low;
