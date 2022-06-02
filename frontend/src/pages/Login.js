import React, { useState, useContext } from 'react'
import { Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../App';

function Login() {

  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Enter valid email!", classes: "#f44336 red"});

      return
    }
      fetch("/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })

      })
      .then(response=>response.json())
      .then(function(data) {
        console.log(data);
        if(data.error){
          M.toast({html: data.error, classes: "#f44336 red"});
        }
        else{
          localStorage.setItem("token", data.token);
          localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
          //dispatch the action and state to the reducer
          dispatch({type: "USER", payload: data.userInfo});
          M.toast({html: "Login Successful", classes: "#00c853 green accent-4"});
          history.push('/');
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  return (
    <div className="login-container">
        <div className="card login-card input-field">
            <h2>Instagram</h2>
            <input
                type ="text"
                placeholder = "Email"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
            />
            <input
                type ="password"
                placeholder = "Password"
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
            />
            <button onClick={() => login()} className="btn waves-effect waves-light btn-large #90caf9 blue darken-1">Login</button>
            <h6>
              <Link to="/signup">Don't have an account ?</Link>
            </h6>
        </div>
    </div>
  )
}

export default Login