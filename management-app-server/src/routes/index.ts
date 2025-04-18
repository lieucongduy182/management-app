import { Router } from 'express';
import projects from './projects';
import tasks from './tasks';
import search from './search';
import users from './users';
import teams from './teams';
import auth from './auth';

const router = Router();

router.use('/projects', projects);
router.use('/tasks', tasks);
router.use('/search', search);
router.use('/users', users);
router.use('/teams', teams);
router.use('/auth', auth);

export default router;
