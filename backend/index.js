import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectdb from './config/db.js'
import mainRoute from './routes/mainRoutes.js'



const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectdb()


app.use("/api",mainRoute)
app.get("/",(req,res)=>{
 res.send("this is backend ")
})



app.listen(2000,()=>{
    console.log("backend running ...")
})