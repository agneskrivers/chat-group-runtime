import express, { Router } from 'express';
import multer, { Multer } from 'multer';

import { postAvatar } from '../controllers/profile.controller';

const router = Router();

const upload: Multer = multer({ dest: '/upload' });

router.post('/', upload.single('avatar'), postAvatar);

export default router;
