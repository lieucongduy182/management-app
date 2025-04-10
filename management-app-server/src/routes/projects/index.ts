import { Router } from 'express';
import projectController from '../../controllers/projects';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = Router();

router.get('/', asyncHandler(projectController.getProjects));
router.post('/', asyncHandler(projectController.createProject));

export default router;
