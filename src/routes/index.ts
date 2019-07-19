import { Router, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import skipper from './skipper';
import utils from './utils';

const routes = Router();

routes.use('/uaa/oauth', auth);
routes.use('/user', user);
routes.use('/skipper/parameters/v1', skipper);
routes.use('/utils', utils);

export default routes;
