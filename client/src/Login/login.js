import "../styles/login.css";
import UserPic from "../Images/userPic.png"; 
import RightArrow from "../Images/rightArrow.png";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const LoginPage = () => {
    
    const nav = useNavigate();
    const [users, setUsers] = useState([]);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        axios.get("http://localhost:6969/getUsers").then((response) => {
            if(response.status === 200){
                setUsers(response.data);
            }
        })
    }, [])

    const login = () => {
        for(let i = 0; i < users.length; i++){
            if(users[i].username === username && users[i].password === password) {
                nav("/");
            }
        }
    }

    return (
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <img src = {UserPic} className="pic"/>  
                    <div className="text">Username</div>
                    <input className="input" value={username} onChange={(e) => {setUserName(e.target.value)}}/>
                    <div className="text">Password</div>
                    <input className="input" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    <button className="button" onClick={() => {login()}}><img src={RightArrow} className="arrow"/></button>
                </div>
            }/>
        </div>
    );
}

export default LoginPage;