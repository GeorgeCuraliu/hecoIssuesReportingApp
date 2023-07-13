import "../styles/main.css"
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { Navigate, useNavigate } from "react-router-dom";
const Main = () => {

    const nav = useNavigate();
    return (
        <div>
            <Header />
            <Body component = {
                <div>
                    <div className="topSection">
                        <div className="topText">
                            <div>Logged in as: </div>
                            <div>username</div>
                        </div>
                        <button className="logOutButton" onClick={() => {nav("/admin")}}>Admin</button>
                        <button className="logOutButton" onClick={() => {nav("/login")}}>Log Out</button>
                    </div>
                    <div className="line"></div>
                    <div className="toolBox">
                        <button className="toolButton" onClick={() => {nav("/inventory")}}>Inventar</button>
                        <button className="toolButton" onClick={() => {nav("/machineList")}}>Masina +/-</button>
                        <button className="toolButton" onClick={() => {nav("/registry")}}>Modificare registru</button>
                        <button className="toolButtonPhone">Raporteaza o problema</button>
                        <button className="toolButton" onClick={() => {nav("/problemList")}}>Vizualizare probleme tehnice</button>
                    </div>
                </div>
            }/>
        </div>
    )
}

export default Main;