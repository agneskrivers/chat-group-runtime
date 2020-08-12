import express, { Request, Response } from 'express';

import { verifyToken } from '../../helpers/jwt.helper';

export const checkToken = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const token: string | undefined | string[] = req.headers['access-token'];

    if (token && typeof token === 'string' && process.env.ACCESS_TOKEN_SECRET) {
        try {
            const decoded = await verifyToken(
                token,
                process.env.ACCESS_TOKEN_SECRET,
            );

            res.json({ token: true, data: decoded });
        } catch (error) {
            res.json({ token: false });
        }
    }
};
