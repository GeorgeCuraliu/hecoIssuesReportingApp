import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import "../styles/admin.css";
import ProfilePic from "../Images/profilePic.png";
import XMark from "../Images/xMark.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {

    const nav = useNavigate();

    const [drop, setDrop] = useState();
    const [text, setText] = useState();
    const [pop, setPop] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [gmail, setGmail] = useState();
    const [admin, setAdmin] = useState();

    

    useEffect(() => {
        axios.get("http://localhost:6969/getUsers").then((response) => {
            console.log(response)
            setUsers(response.data);
        })
    }, []);

    useEffect(() => {console.log(users)}, [users])

    const updateUsername = (e) => {setUsername(e.target.value);} 
    const updatePassword = (e) => {setPassword(e.target.value);}
    const updateName = (e) => {setName(e.target.value);}
    const updateGmail = (e) => {setGmail(e.target.value);}




    const setType = () => {
        setText(true);
        setDrop(false);
    }

    const addAccount = (props) => {
        if(props[0] && props[1] && props[2] && props[3] && props[4]) {
            axios.post("http://localhost:6969/createAccount", {username: props[0], password:props[1], name:props[2], gmail:props[3], admin:props[4]})
            .then((response) => {
                if(response.status === 200){
                    setPop(false);
                    setError(false);
                }
            });
        } else {
            setError(true);
        }
        
    }



    return(
        <div>
            <Header />
            <Body component = {
                <div>
                    {pop && <div className="blur" onClick={() => {setPop(false); setError(false)}}>
                        <div className="popUpYellow" onClick={(e) => {e.stopPropagation()}}>
                            <div className="section">
                                <div className="inputText">Nume</div>
                                <input className="inputAdmin" onChange={(e) => {updateName(e)}}/>
                                <div className="inputText">Username</div>
                                <input className="inputAdmin" onChange={(e) => {updateUsername(e)}}/>
                                <div className="inputText">Email</div>
                                <input className="inputAdmin" onChange={(e) => {updateGmail(e)}}/>
                            </div>
                            <div className="section">
                                <div className="inputText">Parola</div>
                                <input  className="inputAdmin" onChange={(e) => {updatePassword(e)}}/>
                                <div className="inputText">Tip Utilizator</div>
                                <div className="dropdown">
                                        {!text && <div className="dropdownText" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>Alege</div>}
                                        {text && <div className="dropdownText" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>{admin}</div>}
                                        {drop && <div className="dropdownContent" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>
                                            <button className="hangerButton" onClick={() => {setType("Muncitor"); setAdmin("Muncitor")}}>Muncitor</button>
                                            <button className="hangerButton" onClick={() => {setType("Inginer"); setAdmin("Inginer")}}>Inginer</button>
                                            <button className="hangerButton" onClick={() => {setType("Admin"); setAdmin("Admin")}}>Admin</button>
                                        </div>}
                                    </div>
                            </div>
                            <div className="flex">
                                <button className="addButton3" onClick={() => {addAccount([username, password, name, gmail, admin])}}>Adauga Utilizator</button>
                                {error && <div className="error">Input Invalid</div>}
                            </div>
                        </div>
                    </div>}
                    <div className="flex">
                        <button className="backButton" onClick={() => {nav("/")}}>Back</button>
                        <button className="backButton" onClick={() => {setPop(true)}}>Add Account</button>                        
                    </div>
                    <div className="line"></div>
                    <div className="flexWrap">
                        
                        {users.map((value, index) => {
                            if(!value){
                                return;
                            }
                            return(
                                <div className="userCard" key={index}>
                                    <img src={ProfilePic} alt = "something" className="profileImg"/>
                                    <div>
                                        <div className="infoText">Username: <span style={{fontWeight:"bold"}}>{value.username}</span></div>
                                        <div className="infoText">Name: <span style={{fontWeight:"bold"}}>{value.name}</span></div>
                                        <div className="infoText">Group: <span style={{fontWeight:"bold"}}>{value.admin}</span></div>
                                    </div>
                                    <img src={XMark} alt = "something" className="xImg"/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            }/>
        </div>
    );
}

export default Admin;