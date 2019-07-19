import { Router } from 'express';
import UtilsController from '../controllers/UtilsController';

const router = Router();

router.post('/sendEmail', UtilsController.sendEmail);

export default router;
