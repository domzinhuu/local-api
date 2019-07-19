import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/token', AuthController.login);

export default router;
