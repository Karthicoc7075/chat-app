import React, { useEffect, useState } from "react";
import axios from "axios";
import bg4 from "../../assets/img/bg5.png";
import bg5 from "../../assets/img/bg5.png";
import './login.css';
import io from 'socket.io-client'


function Login() {
  const [file, setFile] = useState();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    checkbox:false,
  });
  const [photos, setPhotos] = useState();
  const toggleHandle = (event) => {
    const {name,value,checked,type} = event.target;
     setForm(prevform=>{
      return{
        ...prevform,
        [name]: type =='checkbox' ? checked: value
      }
     })

     console.log(checked);
  };
  
  const socket =io.connect('http://localhost:8000')
  socket.on('connect',()=>{
   console.log(socket.id);
  })

 
  socket.on('receive-msg',msg=>{
    console.log(msg);
  })

console.log('hello_1');

  function submitHandle(e) {
    e.preventDefault();

    // if(!form.name||!form.email||!form.phone|| !form.password || !form.checkbox){
    //   console.log('form fillup')
    //   console.log(!form.name,!form.email,!form.phone,!form.password,!form.checkbox);
    //   return
    // } 
    // axios
    //   .post("http://localhost:8000/users/signUp", form)
    //   .then((res) => console.log(res));

    // setForm({
    //   name: "",
    //   phone: "",
    //   email: "",
    //   password: "",
    //   checkbox:false,
    // });
    socket.emit('room-join',form.name,form.password)
   
    // socket.emit('send-msg',form.name);
    console.log("data sended !!");
  }


  return (
    <div className="container">
    
      <div className="login">
        <div className="login__img" >
        <img src={bg4}/>
        </div>
  
        <form className="login__form" >
          <h3 className="login__form--title" >Register</h3>
          <p className="login__form--desc" >
            Don't have an account? <a className="form__form--link">Create your account</a>,it takes less than
            a minute
          </p>
          <div className="login__form--group" >
            <h5>Name</h5>
            <input
              type={"text"}
              name="name"
              value={form.name}
              onChange={toggleHandle}
            />
          </div>
          <div className="login__form--group" >
          <h5>EMAIL ID</h5>
            <input
              type={"email"}
              name="email"
              value={form.email}
              onChange={toggleHandle}
            />
          </div>
          <div className="login__form--group" >
          <h5>PHONE NO</h5>
            <input
              type={"number"}
              name="phone"
              value={form.phone}
              onChange={toggleHandle}
              placeholder={"+91"}
            />
          </div>
          <div className="login__form--group" >
          <h5>password</h5>
            <input
              type={"password"}
              name="password"
              value={form.password}
              onChange={toggleHandle}
              placeholder={"• • • • •"}
              minLength={8}
            />
          </div>
          <div className="login__form--checkbox" >
            <input type={"checkbox"} name='checkbox' checked={form.checkbox} onChange={toggleHandle}  />
            <p>I Accept terms and conditions & privacy poilcy</p>
          </div>
         <div className="login__form--button">
         <button onClick={submitHandle}>Login</button>
         </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
