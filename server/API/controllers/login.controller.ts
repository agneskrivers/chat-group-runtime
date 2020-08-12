import express, { Request, Response } from 'express';
import { compare } from 'bcrypt';

import Users from '../../models/Users';
import { generateToken } from '../../helpers/jwt.helper';

export const postLogin = (req: Request, res: Response): void => {
    const { user, pass, keep } = req.body;

    const tokenLife: number = keep ? 1000 * 60 * 60 * 24 : 1000 * 60 * 60;

    Users.find({ user: user }).exec((error, result) => {
        if (error) throw error;

        if (result.length === 0) {
            res.json({
                login: false,
                message: 'Username or Password is incorrect!',
            });
            return;
        }

        const userDB = result[0];

        compare(pass, userDB.pass, (error, result) => {
            if (error) throw error;

            if (!result) {
                res.json({
                    login: false,
                    message: 'Password or Usermame is incorrect!',
                });
                return;
            }

            const userData = {
                id: userDB.id,
                fullName: userDB.fullName,
                avatar: userDB.avatar,
                user: userDB.user,
                isAdmin: userDB.isAdmin,
            };

            if (process.env.ACCESS_TOKEN_SECRET) {
                generateToken(
                    userData,
                    process.env.ACCESS_TOKEN_SECRET,
                    tokenLife,
                )
                    .then(result => {
                        res.json({
                            login: true,
                            token: result,
                            data: userData,
                        });
                    })
                    .catch(error => {
                        if (error) throw error;
                    });
            }
        });
    });
};
