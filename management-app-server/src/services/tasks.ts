import { BadRequestError } from '../cores/error';
import { db } from '../database';

interface TaskPayload {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  tags?: string;
  startDate?: Date;
  dueDate?: Date;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;
}

interface UpdateTaskPayload {
  taskId: number;
  status: string;
}

class TaskService {
  static async getTasks({ projectId }: { projectId?: number }) {
    return db.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        taskAssignments: true,
        attachments: true,
        comments: true,
      },
    });
  }

  static async createTask(data: TaskPayload) {
    try {
      const {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      } = data;
      const newTask = await db.task.create({
        data: {
          title,
          description,
          status,
          priority,
          tags,
          startDate: startDate ? new Date(startDate) : undefined,
          dueDate: dueDate ? new Date(dueDate) : undefined,
          points,
          projectId,
          authorUserId,
          assignedUserId,
        },
      });
      return newTask;
    } catch (error: any) {
      throw new BadRequestError('Failed to create task');
    }
  }

  static async updateTaskStatus(data: UpdateTaskPayload) {
    const { taskId, status } = data;
    try {
      const task = await db.task.update({
        where: { id: taskId },
        data: { status },
      });
      return task;
    } catch (error: any) {
      throw new BadRequestError('Failed to update task');
    }
  }

  static async getUserTasks({ userId }: { userId: number }) {
    try {
      const tasks = await db.task.findMany({
        where: {
          OR: [
            { authorUserId: Number(userId) },
            { assignedUserId: Number(userId) },
          ],
        },
        include: {
          author: true,
          assignee: true,
        },
      });
      return tasks;
    } catch (error) {
      throw new BadRequestError('Failed to fetch user tasks');
    }
  }
}

export default TaskService;
