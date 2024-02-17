require("dotenv").config();
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB, sequelize } from "./db";
import noteRouter from "./routes";
import userRouter from "./user/user.routes";
import errorMiddleware from "./middleware/error.middleware";
import authenticatedMiddleware from "./middleware/authenticateValidator";

const app = express();

app.use(express.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(
  cors({
    // origin: ["http://localhost:3000"],
    origin: "*",
    // credentials: true,
  })
);
app.use(errorMiddleware);
app.use("/api/", userRouter);
app.get("/", (req: Request, res: Response) => {
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

app.use(authenticatedMiddleware)



app.use("/api/notes", noteRouter);


const PORT = process.env.PORT || 4000;


app.listen(PORT, async () => {
  console.log("🚀Server started Successfully");
  await connectDB();
  sequelize.sync({ alter: true }).then(() => {
    console.log("✅Synced database successfully...");
  });
  // sequelize.sync({ force: false }).then(() => {
  //   console.log("✅Synced database successfully...");
  // });
});
