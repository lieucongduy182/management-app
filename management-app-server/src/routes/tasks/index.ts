import { Router } from 'express';
import taskController from '../../controllers/tasks';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = Router();

router.get('/:projectId', asyncHandler(taskController.getTask));
router.post('/', asyncHandler(taskController.createTask));
router.patch('/status', asyncHandler(taskController.updateTaskStatus));
router.get('/user/:userId', asyncHandler(taskController.getUserTasks));

export default router;
