export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
}

export enum TaskStatus {
  TODO = "To Do",
  WORK_IN_PROGRESS = "Work In Progress",
  UNDER_REVIEW = "Under Review",
  COMPLETED = "Completed",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  URGENT = "Urgent",
  BACKLOG = "Backlog",
}

export interface User {
  id: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
}

export interface Comment {
  id: number;
  text: string;
  taskId: number;
  userId: number;
}

export interface Attachment {
  id: number;
  fileName: string;
  fileURL: string;
  taskId: number;
  uploadedByUserId: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: TaskStatus | string;
  priority?: TaskPriority | string;
  tags?: string;
  startDate?: Date | string;
  dueDate?: Date | string;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  projects?: Project[];
  tasks?: Task[];
  user?: User[];
}
export interface Team {
  id: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
  productOwnerUsername?: string;
  productManageUsername?: string;
}
