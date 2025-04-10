import { Request, Response } from 'express';
import { SuccessResponse } from '../cores/success';
import teamService from '../services/teams';

class TeamController {
  static async getTeams(req: Request, res: Response) {
    const teams= await teamService.getTeams();
    return new SuccessResponse({
      message: 'Get Teams successfully',
      data: teams,
    }).send(res);
  }
}

export default TeamController;
