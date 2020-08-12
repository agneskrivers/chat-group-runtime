import { Request, Response } from 'express';
import { genSalt, hash } from 'bcrypt';

import Users from '../../models/Users';

const saltRound: number = parseInt(process.env.SALT as string);

export const postSignup = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { fullName, user, pass } = req.body;

    const checkUser = await Users.find({ user: user });

    if (checkUser.length !== 0) {
        res.json({ signup: false, message: 'Account already exists' });
        return;
    }

    genSalt(saltRound, (error, salt) => {
        if (error) throw error;

        hash(pass, salt, (error, passHash) => {
            if (error) throw error;

            const newUser = new Users({
                fullName: fullName,
                user: user,
                pass: passHash,
                avatar: '',
                isAdmin: false,
            });

            newUser.save(error => {
                if (error) throw error;

                res.json({ signup: true });
            });
        });
    });
};
