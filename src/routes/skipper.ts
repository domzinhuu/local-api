import { Router } from 'express';
import SkipperController from '../controllers/SkipperController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();

router.post('/adjustclassification', [checkJwt], SkipperController.create);
router.put('/adjustclassification/:id', [checkJwt], SkipperController.update);
router.delete('/adjustclassification/:id', [checkJwt], SkipperController.deleteReason);
router.get('/adjustclassification', [checkJwt], SkipperController.getAll);
router.get('/adjustclassification/:id', [checkJwt], SkipperController.getById);

export default router;
