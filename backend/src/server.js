import express from "express"
import { connectDB } from "../config/db.js";
import authRoutes from "../routes/auth.Routes.js"
import dotenv from "dotenv";
import cors from 'cors'
const app = express();


dotenv.config();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    Credentials: true
}))

app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>
    {
        res.send("api created");
    })
    

if(connectDB()){
app.listen(5002,()=>{
    console.log("server connected at port 5002");
})
}