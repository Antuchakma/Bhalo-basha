import express from "express"
import { connectDB } from "../config/db.js";
import authRoutes from "../routes/auth.Routes.js"
import productRoutes from "../routes/product.Route.js"
import messageRoutes from "../routes/message.Routes.js"
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://bhalo-basha.vercel.app",
    credentials: true
}))
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/messages", messageRoutes);

app.get("/",(req,res)=>
    {
        res.send("Bhalo-Basha API is running");
    })


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
