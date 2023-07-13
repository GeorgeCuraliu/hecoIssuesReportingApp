import "../styles/admin.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
const Admin = () => {
    
    const nav = useNavigate();
    const [showModel, setShowModel] = useState();

    const updateValues = (value, type) => {
        login.current[type] = value;
        
    }
    
    return (
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <button className="backButton" onClick={() => {nav("/contacts")}}>Back</button>
                    <button className="addButton" onClick={() => {setShowModel((value) => !value)}}>Add account</button>
                    <div className="line"></div>
                    {showModel && 
                    <div className="bigBox">
                        <input className="accInput" placeholder="Username" onChange={(e) => {updateValues(e.target.value, "username")}}/>
                        <input className="accInput" placeholder="Surname" onChange={(e) => {updateValues(e.target.value, "surname")}}/>
                        <input className="accInput" placeholder="First name" onChange={(e) => {updateValues(e.target.value, "firstname")}}/>
                        <input className="accInput" placeholder="Password" onChange={(e) => {updateValues(e.target.value, "password")}}/>
                        <input className="accInput" placeholder="Departament" onChange={(e) => {updateValues(e.target.value, "departament")}}/>
                        <div className="adminButton">
                            <div className="adminText">Admin</div>
                            <input className="adminCheck"type="checkbox" onChange={(e) => {updateValues(e.target.checked, "admin")}}v/>
                        </div>
                        <button className="createNewButton" onClick={console.log()}>Create</button>
                        <div className="line"></div>
                    </div>
                    }
                    {Object.entries(users).map(([key, value]) => {
                        return(
                            <div key={key} className="userCard">
                                <img src={ProfilePic} alt={"someIMg"}/>
                                <div className="infoContainer">
                                    <div className="infoText">
                                        Username: {key}
                                    </div>
                                    <div className="infoText">
                                        Departament: {value.departament}
                                    </div>
                                    <div className="infoText">
                                        Admin: {value.adminAcces === undefined?"false":"true"}
                                    </div>
                                </div>
                                <button className="deleteButton"><img alt="someImg" src="" onClick={() => {console.log()}}/></button>
                            </div>
                        );
                    })}
                </div>}/>
        </div>
    );
}

export default Admin;