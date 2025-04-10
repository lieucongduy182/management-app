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
}

export default UserController;
