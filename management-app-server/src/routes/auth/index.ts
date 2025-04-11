import { Router } from 'express';
import userController from '../../controllers/users';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = Router();

router.post('/', asyncHandler(userController.getUsers));

export default router;
