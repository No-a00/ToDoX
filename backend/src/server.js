import express from "express";
import tasksRouter from "./routes/taksRouters.js"
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import cors from "cors";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001

app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}));

app.use("/api/tasks", tasksRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server đang chạy trên cổng ${PORT}`);
    })
});
