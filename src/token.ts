
require("dotenv").config();
import jwt from 'jsonwebtoken';




export const createToken = (user: any): string => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | any> => {
    return new Promise((resolve, reject) => {

        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as any);
            }
        );
    });
};

export default { createToken, verifyToken };