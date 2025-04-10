import { Request, Response } from 'express';
import { CREATED, SuccessResponse } from '../cores/success';
import projectService from '../services/projects';

class ProjectController {
  static async getProjects(req: Request, res: Response) {
    const projects = await projectService.getProject();
    return new SuccessResponse({
      message: 'Get Projects successfully',
      data: projects,
    }).send(res);
  }

  static async createProject(req: Request, res: Response) {
    const { name, description, startDate, endDate } = req.body;
    const project = await projectService.createProject({
      name,
      description,
      startDate,
      endDate,
    });
    return new CREATED({
      message: 'Create Project successfully',
      data: project,
    }).send(res);
  }
}

export default ProjectController;
