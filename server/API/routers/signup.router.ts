import express, { Router } from 'express';

import { postSignup } from '../controllers/signup.controller';

const router = Router();

router.post('/', postSignup);

export default router;
