
// import HttpException from '../exceptions/http.exception';
import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
// import token from '../token';



async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    console.log('HERE', bearer)

    if (!bearer || !bearer.startsWith('Bearer ')) {
        // return next(new HttpException(401, 'Unauthorised'));
        return res.status(401).json({
            status: "failed",
            message: "Unauthorised, access token is mising",
          });
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
   

    try {

        jwt.verify(
            accessToken,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) { return res.status(401).json({
                    status: "failed",
                    message: "Unauthorised. Invalid token",
                  });}
                  console.log('payload', payload)
                  return next();
            }
        );


        // const payload: any | jwt.JsonWebTokenError = await token.verifyToken(
        //     accessToken
        // );


        // if (payload instanceof jwt.JsonWebTokenError) {
        //     return res.status(401).json({
        //         status: "failed",
        //         message: "Unauthorised. Invalid token",
        //       });
        // }

        // return next();
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
          });
    }
}

export default authenticatedMiddleware;