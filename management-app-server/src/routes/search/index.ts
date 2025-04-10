import { Router } from 'express';
import searchController from '../../controllers/search';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = Router();

router.get('/', asyncHandler(searchController.search));

export default router;
