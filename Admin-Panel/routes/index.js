const express=require("express")
const routes=express.Router();
const {loginPage, loginUser} = require('../controllers/index')

routes.get("/",loginPage)

routes.post("/login" , loginUser)
routes.use('/admin',require('./admin_Routes'))

module.exports=routes;