import dotenv from "dotenv";
import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import cookieParser from "cookie-parser";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import habitrouter from "./src/features/habits/habits.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const corsOptions = {
    origin: 'https://habit-tracker-frontend-olive.vercel.app', 
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/habits", habitrouter);

app.use(appLevelErrorHandlerMiddleware);

app.use("/",(req,res)=>{
  res.json("welcome to habit tracker");
})



export default app;
