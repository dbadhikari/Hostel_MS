import express from 'express'
import userRouter from './userRoutes.js'


const mainRoute=express.Router()

mainRoute.use("/user",userRouter)

export default mainRoute