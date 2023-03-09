const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const http = require('http').createServer(app)
const multer = require("multer");
const db = require('./db/connectionDB');
const userRoutes = require('./routes/user');
const path = require('path')
const  io = require('socket.io')(http, {
  cors: {
      origin: "*"
  }
});



const PORT = process.env.PORT || 5000;
const MONGODB__URL= process.env.MONGODB_URL;


io.on('connection',socket=>{
  console.log('socket connect id:'+socket.id);
  socket.on('join_room',(data)=>{
    socket.join(data)
    console.log(`User with id ${socket.id}   joined roomNo ${data} `);
  })


  socket.on('send_message',(data)=>{
       console.log(data);
       socket.to(data.room).emit('receive_message',data)
  })
  
})
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/users',userRoutes)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");



function start(){
   db(MONGODB__URL)
  .then(()=>{
    http.listen(PORT,()=>{
      console.log(`server has started on ${PORT}`);
    })
  })
  .catch((error)=>console.log(error))
}

start()
