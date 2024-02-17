"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const user_schema_1 = require("./user.schema");
const user_controller_1 = require("./user.controller");
const authenticateValidator_1 = __importDefault(require("../middleware/authenticateValidator"));
const router = express_1.default.Router();
router.post('/register', (0, validate_1.validate)(user_schema_1.register), user_controller_1.registerController);
router.post('/login', (0, validate_1.validate)(user_schema_1.login), user_controller_1.loginController);
router.get('/getAll', [authenticateValidator_1.default, (0, validate_1.validate)(user_schema_1.filterUserQuery)], user_controller_1.findAllUsersController);
exports.default = router;
