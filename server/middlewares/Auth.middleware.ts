import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../helpers/jwt.helper';

interface CustomRequest extends Request {
    token?: string;
}

const isAuth = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const token: string | string[] | undefined = req.headers['access-token'];

    try {
        if (
            token &&
            typeof token === 'string' &&
            process.env.ACCESS_TOKEN_SECRET
        ) {
            const decoded = await verifyToken(
                token,
                process.env.ACCESS_TOKEN_SECRET,
            );

            next();
        }
    } catch (error) {
        localStorage.removeItem('token');
        next();
    }

    next();
};

export default isAuth;
