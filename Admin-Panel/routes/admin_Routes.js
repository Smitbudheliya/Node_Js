const express=require("express")
const routes=express.Router();

const adminCtr = require('../controllers/adminCtr')

routes.get('/',adminCtr.admin);
routes.get('/formAdd',adminCtr.addForm);
routes.get('/viewPage',adminCtr.viewForm)

module.exports=routes;