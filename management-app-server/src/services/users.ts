import { BadRequestError } from '../cores/error';
import { db } from '../database';

class UserService {
  static async getUsers() {
    try {
      const users = await db.user.findMany();

      return users;
    } catch (error: any) {
      throw new BadRequestError('Failed to fetch users', error?.stack);
    }
  }

  static async getUser({ cognitoId }: { cognitoId: string }) {
    try {
      const user = await db.user.findUnique({
        where: {
          cognitoId,
        },
      });

      if (!user) {
        throw new BadRequestError('User not found');
      }

      return user;
    } catch (error: any) {
      throw new BadRequestError('Failed to fetch users', error?.stack);
    }
  }
}

export default UserService;
