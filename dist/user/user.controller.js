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
exports.findAllUsersController = exports.loginController = exports.registerController = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const token_1 = __importDefault(require("../token"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, isMale } = req.body;
        const hash = yield bcrypt_1.default.hash(password, 10);
        const newuser = yield user_model_1.default.create({
            username, email, password: hash, isMale
        });
        const accessToken = token_1.default.createToken(newuser.toJSON());
        res.status(201).json({
            status: "success",
            data: {
                newuser,
                accessToken
            },
        });
    }
    catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: "failed",
                message: "User with that email already exists",
            });
        }
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield user_model_1.default.findOne({
            where: {
                email
            },
        });
        if (!result) {
            return res.status(400).json({
                status: "error",
                message: 'user not find',
            });
        }
        const data = result === null || result === void 0 ? void 0 : result.toJSON();
        if (!(yield bcrypt_1.default.compare(password, data.password))) {
            return res.status(403).json({
                status: "error",
                message: 'invalid email or password',
            });
        }
        const accessToken = token_1.default.createToken(data);
        res.status(200).json({
            status: "success",
            data: {
                accessToken,
                data
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.loginController = loginController;
const findAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt((req.query.page || 1).toString());
        const limit = parseInt((req.query.limit || 10).toString());
        const skip = (page - 1) * limit;
        const totalCount = yield user_model_1.default.count();
        const users = yield user_model_1.default.findAll({ limit, offset: skip });
        res.status(200).json({
            status: "success",
            results: users.length,
            users,
            nextPgae: (page * limit) <= totalCount ? page + 1 : null
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.findAllUsersController = findAllUsersController;
