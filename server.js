require('dotenv').config()
const express = require('express')
const app=express()
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGOURI)
const wr=require('./routes/top')

app.use(express.json())
app.use('/api/data',wr)
mongoose.connect(process.env.MONGOURI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening')
    })
})
.catch((err)=>{
    console.log(err)
})