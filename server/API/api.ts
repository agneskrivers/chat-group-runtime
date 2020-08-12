import express, { Router } from 'express';

import LoginAPI from './routers/login.router';
import SignupAPI from './routers/signup.router';
import CheckAPI from './routers/check.router';

const router = Router();

router.use('/login', LoginAPI);
router.use('/signup', SignupAPI);
router.use('/check', CheckAPI);

export default router;
