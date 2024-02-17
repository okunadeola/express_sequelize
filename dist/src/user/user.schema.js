"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterUserQuery = exports.login = exports.register = void 0;
const zod_1 = require("zod");
exports.register = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            required_error: "Username is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        isMale: zod_1.z.boolean({
            required_error: "Gender is required"
        }),
    }),
});
exports.login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
exports.filterUserQuery = zod_1.z.object({
    limit: zod_1.z.number().default(10),
    page: zod_1.z.number().default(1),
});
