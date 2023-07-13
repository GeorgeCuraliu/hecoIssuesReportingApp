import "../styles/login.css";
import UserPic from "../Images/userPic.png"; 
import RightArrow from "../Images/rightArrow.png";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    
    const nav = useNavigate();

    return (
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <img src = {UserPic} className="pic"/>  
                    <div className="text">Username</div>
                    <input className="input"/>
                    <div className="text">Password</div>
                    <input className="input"/>
                    <button className="button" onClick={() => {nav("/")}}><img src={RightArrow} className="arrow"/></button>
                </div>
            }/>
        </div>
    );
}

export default LoginPage;