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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const routes_1 = __importDefault(require("./routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const authenticateValidator_1 = __importDefault(require("./middleware/authenticateValidator"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    // origin: ["http://localhost:3000"],
    origin: "*",
    // credentials: true,
}));
app.use(error_middleware_1.default);
app.use("/api/", user_routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Build CRUD API with Node.js and Sequelize",
    });
});
// app.all("*", (req: Request, res: Response) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Route: ${req.originalUrl} does not exist on this server`,
//   });
// });
app.use(authenticateValidator_1.default);
app.use("/api/notes", routes_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🚀Server started Successfully");
    yield (0, db_1.connectDB)();
    db_1.sequelize.sync({ alter: true }).then(() => {
        console.log("✅Synced database successfully...");
    });
    // sequelize.sync({ force: false }).then(() => {
    //   console.log("✅Synced database successfully...");
    // });
}));
