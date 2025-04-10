import { BadRequestError } from '../cores/error';
import { db } from '../database';

interface ProjectPayload {
  name: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
}

class ProjectService {
  static async getProject() {
    return db.project.findMany();
  }

  static async createProject(data: ProjectPayload) {
    try {
      const { name, description, startDate, endDate } = data;
      const newProject = await db.project.create({
        data: {
          name,
          description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
      return newProject;
    } catch (error: any) {
      throw new BadRequestError('Failed to create project');
    }
  }
}

export default ProjectService;
