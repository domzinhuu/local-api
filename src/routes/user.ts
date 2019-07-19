import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();

router.get('/', [checkJwt], UserController.listAll);
router.get('/:id([0-9]+)', [checkJwt], UserController.getOneBId);
router.delete('/:id([0-9]+)', [checkJwt], UserController.deleteUser);
router.post('/', [checkJwt], UserController.newUser);
router.patch('/', [checkJwt], UserController.editUser);
router.get('/accesses/forgot-password', UserController.requestNewPassword);
router.put('/accesses/password/:token', UserController.resetPassword);

export default router;
