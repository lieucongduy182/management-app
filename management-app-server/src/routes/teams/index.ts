import { Router } from 'express';
import teamController from '../../controllers/teams';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = Router();

router.get('/', asyncHandler(teamController.getTeams));

export default router;
