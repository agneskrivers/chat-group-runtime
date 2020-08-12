import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../helpers/jwt.helper';

interface isAuthInterface {
    (req: Request, res: Response, next: NextFunction): void;
}

const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;

const isAuth: isAuthInterface = async (req, res, next) => {
    const token: string | undefined | string[] = req.headers['access-token'];
    if (token && typeof token === 'string' && accessTokenSecret) {
        try {
            const decoded = await verifyToken(token, accessTokenSecret);
            console.log(decoded);
            res.locals.token = decoded;
        } catch (error) {
            localStorage.removeItem('token');
        }
    }

    next();
};

export default isAuth;
