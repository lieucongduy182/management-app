import { BadRequestError } from '../cores/error';
import { db } from '../database';

class TeamService {
  static async getTeams() {
    try {
      const teams = await db.team.findMany();

      const teamWithUsernames = await Promise.all(
        teams.map(async (team) => {
          const productOwner = await db.user.findUnique({
            select: {
              username: true,
            },
            where: { id: team.productOwnerUserId! },
          });
          const productManger = await db.user.findUnique({
            select: {
              username: true,
            },
            where: { id: team.projectManagerUserId! },
          });

          return {
            ...team,
            productOwnerUsername: productOwner?.username,
            productManageUsername: productManger?.username,
          };
        }),
      );

      return teamWithUsernames;
    } catch (error: any) {
      throw new BadRequestError('Failed to fetch teams', error?.stack);
    }
  }
}

export default TeamService;
