const express = require('express')
const {signIn,signUp,getAllUser} = require('../controller/user.js');
const auth = require('../middleware/auth');
const user = require('../model/user.js');


const userRoutes = express.Router();
userRoutes.get("/",getAllUser)
userRoutes.post('/signIn',auth,signIn)
userRoutes.post('/signUp',signUp)

module.exports = userRoutes;