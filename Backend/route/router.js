const express =require ('express')
const rout=express.Router()
const{createUser, loginUser,forgotPassword,changePassword}=require('../controller/user.controller')
rout.post('/Signup',createUser)
rout.post('/login',loginUser)
rout.post('/forgotPassword',forgotPassword)
rout.post('/changePassword', changePassword)
module.exports=rout