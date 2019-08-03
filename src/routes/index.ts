import { Router, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import skipper from './skipper';
import utils from './utils';
import inversare from './inversare';
import angulators from './angulators';

const routes = Router();

routes.use('/uaa/oauth', auth);
routes.use('/api/v1', inversare);
routes.use('/user', user);
routes.use('/skipper/parameters/v1', skipper);
routes.use('/utils', utils);
routes.use('/angulators', angulators);

export default routes;
