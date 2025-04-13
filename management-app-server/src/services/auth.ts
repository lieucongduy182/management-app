import { BadRequestError } from '../cores/error';
import { db } from '../database';

interface CreateUserBody {
  username: string;
  cognitoId: string;
  profilePictureUrl?: string;
  teamId?: number;
}

class AuthService {
  static async createUser(body: CreateUserBody) {
    try {
      const {
        username,
        cognitoId,
        profilePictureUrl = 'p13.jpeg',
        teamId = 1,
      } = body;
      const newUsers = await db.user.create({
        data: {
          username,
          cognitoId,
          profilePictureUrl,
          teamId,
        },
      });

      return newUsers;
    } catch (error: any) {
      throw new BadRequestError('Something went wrong', error?.message);
    }
  }
}

export default AuthService;
