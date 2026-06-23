import express from 'express'



const app=express()
app.use(express.json())

app.get("/",(req,res)={
 res.send("this is backend ")
})

app.listen(2000,()=>{
    console.log("backend running ...")
})