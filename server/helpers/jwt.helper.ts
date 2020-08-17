import jwt from 'jsonwebtoken';

// Helper
import {
    UserInterface,
    generateTokeInterface,
    verifyTokenInterface,
} from '../helpers/interface';

export const generateToken: generateTokeInterface = (
    user: UserInterface,
    secretSignature: string,
    tokenLife: number,
) => {
    return new Promise((resolve, reject) => {
        const userData: UserInterface = {
            id: user.id,
            fullName: user.fullName,
            user: user.user,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
        };

        jwt.sign(
            {
                data: userData,
            },
            secretSignature,
            {
                algorithm: 'HS512',
                expiresIn: tokenLife,
            },
            (error, token) => {
                if (error) return reject(error);

                return resolve(token);
            },
        );
    });
};

export const verifyToken: verifyTokenInterface = (
    token: string,
    secretKey: string,
) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) return reject(error);

            resolve(decoded);
        });
    });
};
