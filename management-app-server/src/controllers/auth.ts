import { Request, Response } from 'express';
import { SuccessResponse } from '../cores/success';
import authService from '../services/auth';

class AuthController {
  static async signUp(req: Request, res: Response) {
    const newUser = await authService.createUser(req.body);
    return new SuccessResponse({
      message: 'Create Users Successfully',
      data: newUser,
    }).send(res);
  }
}

export default AuthController;
