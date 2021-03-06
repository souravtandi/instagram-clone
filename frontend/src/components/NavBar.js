import React, { useContext } from "react";
import './NavBar.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const NavBar = () => {
    const {state, dispatch} = useContext(UserContext);
    const history =useHistory();
    const logout = ()=>{
        localStorage.clear();
        dispatch({ type: "LOGOUT" });
        history.push('/login');
    }
    const navList = () => {
        if (state) {// if the user object is present
            return [
                <li key="11111"><Link to="/create-post">Create Post</Link></li>,
                <li key="11112"><Link to="/postsfromfollowing">Posts from Following</Link></li>,
                <li key="11119"><Link to="/profile">Profile</Link></li>,
                <li key="11115">
                    <button onClick={() => logout()} className="btn waves-effect waves-light #e53935 red darken-1">Logout</button>
                </li>
            ]
        } else {
            return [
                <li key="11113"><Link to="/login">Login</Link></li>,
                <li key="11114"><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper white">
                <Link to={state? "/" : "/login"} className="brand-logo">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {navList()}  
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;