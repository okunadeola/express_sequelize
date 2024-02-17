import express from "express";

import { validate } from "../middleware/validate";
import { filterUserQuery, login, register } from "./user.schema";
import { findAllUsersController, loginController, registerController } from "./user.controller";
import authenticatedMiddleware from "../middleware/authenticateValidator";

const router = express.Router();

router.post('/register',  validate(register), registerController);
router.post('/login',   validate(login), loginController);
router.get('/getAll',   [authenticatedMiddleware, validate(filterUserQuery)], findAllUsersController);



export default router;
