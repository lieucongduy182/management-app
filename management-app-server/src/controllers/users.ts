import { Request, Response } from 'express';
import { SuccessResponse } from '../cores/success';
import userService from '../services/users';

class UserController {
  static async getUsers(req: Request, res: Response) {
    const users = await userService.getUsers();
    return new SuccessResponse({
      message: 'Get Users successfully',
      data: users,
    }).send(res);
  }

  static async getUser(req: Request, res: Response) {
    const { cognitoId } = req.params;
    const user = await userService.getUser({ cognitoId });
    return new SuccessResponse({
      message: 'Get User Detail successfully',
      data: user,
    }).send(res);
  }
}

export default UserController;
