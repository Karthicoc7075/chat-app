const userModel = require('../model/user');
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRETKEY;

const getAllUser =async (req,res)=>{
     const users =await userModel.find();
     res.json(users)
}
const signIn=(async (req,res)=>{
    const {email,password} = req.body;
    try{

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({'err':'Invaild Email'})
        }

        const checkpassword = bcrypt.compare(user.password, password)

        if(!checkpassword){
            return res.status(400).json({'err':'Invaild Password'})
        }

        const token = jwt.sign({email:user.email,_id:user._id},secretKey,{expiresIn:'1h'})
        res.send({user,token})

    }
    catch(error){
        console.log(error);
    }
})


const signUp=(async (req,res)=>{
    const {email,password,phone,name} = req.body;
console.log(req.body);
    try{

        const user = await userModel.findOne({email})
      console.log('already exisits');
        if(user){
            return res.status(400).json({'err':'Email already exisits'})
        }
        const start = Date.now()
        const saltRounds = 12;
        const salt = bcrypt.genSaltSync(saltRounds)

        const encryptPassword = bcrypt.hashSync(password,salt)

        const result = await userModel.create({email:email,password:encryptPassword,number:phone,name:name})

        const token = jwt.sign({email:result.email,_id:result._id},secretKey,{expiresIn:'1h'})
        
        res.status(201).send({result,token})
    }
    catch(error){
        console.log(error);
    }
})
module.exports = {signIn,signUp,getAllUser}