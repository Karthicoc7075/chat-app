const jwt =  require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.SECRETKEY
const auth =(async(req,res,next)=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkthcnRoaWNvYzlAZ21haWwuY29tIiwiX2lkIjoiNjNiYWQzZGY4NjM0ZDkyMzBmYTVkM2Y0IiwiaWF0IjoxNjczMTg4NTEyLCJleHAiOjE2NzMxOTIxMTJ9.vsRm88Ut-2nPAWDGHnIdWXY5EWZ1hzJQXnwTaruLsUk"

    if(token){
       const decode = jwt.verify(token,secretKey)
       console.log('decode:',decode);
    }
next()
})

module.exports = auth;