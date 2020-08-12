import jwt from 'jsonwebtoken';

interface UserInterface {
    id: string;
    fullName: string;
    user: string;
    isAdmin: boolean;
}

interface generateTokeInterface {
    (user: UserInterface, secretSignature: string, tokenLife: number): Promise<
        string
    >;
}

interface verifyTokenInterface {
    (token: string, secretKey: string): Promise<object>;
}

export const generateToken: generateTokeInterface = (
    user,
    secretSignature,
    tokenLife,
) => {
    return new Promise((resolve, reject) => {
        const userData: UserInterface = {
            id: user.id,
            fullName: user.fullName,
            user: user.user,
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

export const verifyToken: verifyTokenInterface = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) return reject(error);

            resolve(decoded);
        });
    });
};
