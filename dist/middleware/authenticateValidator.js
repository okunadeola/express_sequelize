"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import token from '../token';
function authenticatedMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bearer = req.headers.authorization;
        console.log('HERE', bearer);
        if (!bearer || !bearer.startsWith('Bearer ')) {
            // return next(new HttpException(401, 'Unauthorised'));
            return res.status(401).json({
                status: "failed",
                message: "Unauthorised, access token is mising",
            });
        }
        const accessToken = bearer.split('Bearer ')[1].trim();
        try {
            jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET, (err, payload) => {
                if (err) {
                    return res.status(401).json({
                        status: "failed",
                        message: "Unauthorised. Invalid token",
                    });
                }
                console.log('payload', payload);
                return next();
            });
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
        }
        catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Something went wrong",
            });
        }
    });
}
exports.default = authenticatedMiddleware;
