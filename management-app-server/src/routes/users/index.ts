import { Router } from 'express';
import userController from '../../controllers/users';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = Router();

router.get('/', asyncHandler(userController.getUsers));

export default router;
