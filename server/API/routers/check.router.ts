import express, { Router } from 'express';

import { checkToken } from '../controllers/check.controller';

const router = Router();

router.get('/', checkToken);

export default router;
