import { Router } from 'express';
import authController from '../../controllers/auth';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = Router();

router.post('/', asyncHandler(authController.signUp));

export default router;
