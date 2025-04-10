import { Request, Response } from 'express';
import { CREATED, SuccessResponse } from '../cores/success';
import taskService from '../services/tasks';

class TaskController {
  static async getTask(req: Request, res: Response) {
    console.log('🚀 [Debug] ~ tasks.ts:10 ~ TaskController ~ getTask ~ req.params:', req.params)
    const tasks = await taskService.getTasks({
      projectId: +req.params.projectId,
    });
    return new SuccessResponse({
      message: 'Get Tasks successfully',
      data: tasks,
    }).send(res);
  }

  static async createTask(req: Request, res: Response) {
    const newTask = await taskService.createTask(req.body);
    return new CREATED({
      message: 'Create Task successfully',
      data: newTask,
    }).send(res);
  }

  static async updateTaskStatus(req: Request, res: Response) {
    const { taskId, status } = req.body;
    const updatedTask = await taskService.updateTaskStatus({
      taskId: +taskId,
      status,
    });
    return new SuccessResponse({
      message: 'Update Task successfully',
      data: updatedTask,
    }).send(res);
  }

  static getUserTasks = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const tasks = await taskService.getUserTasks({ userId: +userId });
    return new SuccessResponse({
      message: 'Get User Tasks successfully',
      data: tasks,
    }).send(res);
  };
}

export default TaskController;
