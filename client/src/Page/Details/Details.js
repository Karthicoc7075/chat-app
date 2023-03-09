import React,{useState} from "react";
import "./Details.css";
import bg4 from "../../assets/img/bg5.png";

function Details({userData,socket,setShowChat}) {
    const [username,setUsername] = useState('');
    const [room,setRoomNo] = useState('1234');

    function submitHandle(e){
        e.preventDefault();
    
        if(username !='' && room !==''){
          socket.emit('join_room',room);
          setShowChat(true);
          userData({username,room})
        }
      }
  return (
    <div className="login">
      <div className="login__img">
        <img src={bg4} />
      </div>

      <form className="login__form">
        <h3 className="login__form--title">Register</h3>
        <div className="login__form--group">
          <h5>USERNAME</h5>
          <input
            className="form_input"
            type={"text"}
            placeholder={"John..."}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login__form--group">
          <h5>ROOM NUMBER</h5>
          <input
            className="form_input"
            type={"number"}
            placeholder={"58437"}
            onChange={(e) => setRoomNo(e.target.value)}
          />
        </div>
        <div className="login__form--button">
          <button onClick={submitHandle}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Details;
