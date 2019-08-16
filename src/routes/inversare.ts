import { Router } from 'express';
import InversareController from '../controllers/InversareController';

const router = Router();

router.post('/login/cabal-login/login', InversareController.loginInversare);
router.get('/chargeback/chargeback/search/by-parameters', InversareController.getFilaEnviados);
router.get('/queue/queue-mastercard/by-name', InversareController.getFilaRecebidos);
router.post('/brand-transaction/search', InversareController.getBrandTransactions);
router.get('/user/search', InversareController.getCardHolder);
router.post('/send', InversareController.sendFinancialIncentive);
export default router;
