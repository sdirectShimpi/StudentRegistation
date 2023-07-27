
const express=require('express')
const app=express()
const route=require('./route/router')
const router=require('./route/productRouter')
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:3000' }))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',route)
app.use('/',router)



app.listen(3008,console.log("server is runing"))
