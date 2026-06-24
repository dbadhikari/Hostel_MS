import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectdb from './config/db.js'
import mainRoute from './routes/mainRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectdb()
const frontend={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(frontend))
app.use(cookieParser());
app.use("/api",mainRoute)
app.get("/",(req,res)=>{
 res.send("this is backend ")
})



app.listen(2000,()=>{
    console.log("backend running ...")
})