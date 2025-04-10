import { BadRequestError } from '../cores/error';
import { db } from '../database';

class SearchService {
  static async search({ query = '' }: { query: string }) {
    if (!query) {
      return {
        tasks: [],
        projects: [],
        user: [],
      };
    }
    try {
      const [tasks, projects, user] = await Promise.all([
        this.getTasksByQuery(query),
        this.getProjectsByQuery(query),
        this.getUsersByQuery(query),
      ]);

      return { tasks, projects, user };
    } catch (error: any) {
      throw new BadRequestError('Failed to search', error?.stack);
    }
  }

  static async getTasksByQuery(query: string) {
    return db.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });
  }

  static async getProjectsByQuery(query: string) {
    return db.project.findMany({
      where: {
        OR: [
          { name: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });
  }

  static async getUsersByQuery(query: string) {
    return db.user.findMany({
      where: {
        OR: [{ username: { contains: query as string } }],
      },
    });
  }
}

export default SearchService;
