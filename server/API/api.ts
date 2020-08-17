import express, { Router } from 'express';

import LoginAPI from './routers/login.router';
import SignupAPI from './routers/signup.router';
import CheckAPI from './routers/check.router';
import ProfileAPI from './routers/profile.router';

const router = Router();

router.use('/login', LoginAPI);
router.use('/signup', SignupAPI);
router.use('/check', CheckAPI);
router.use('/profile', ProfileAPI);

export default router;
