import express from 'express'
import userRouter from './userRoutes.js'
import roomRoutes from './roomRoutes.js';


const mainRoute=express.Router()

mainRoute.use("/user",userRouter)
mainRoute.use("/rooms", roomRoutes);
export default mainRoute