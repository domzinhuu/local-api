import { Router } from 'express';
import AngulatorsController from '../controllers/AngulatorsController';

const router = Router();

router.get('/', AngulatorsController.getAngulators);
router.post('/', AngulatorsController.saveAngulator);
router.put('/:id', AngulatorsController.editAngulator);
router.get('/:id', AngulatorsController.getAngulatorById);

export default router;
