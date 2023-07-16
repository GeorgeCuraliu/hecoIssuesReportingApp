import "../styles/main.css"
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Main = () => {

    const [pop, setPop] = useState(false);
    const [text, setText] = useState(false);
    const [drop, setDrop] = useState(false);
    const [prob, setProb] = useState();
    const nav = useNavigate();

    const [num, setNum] = useState();

    const updateData = (e) => {
        if(e.target.value.length < 4) {
            setNum(e.target.value);
        }
    } 
    const updateData2 = (e) => {
        setProb(e.target.value);
    }
 
    const sendRepair = () => {
        if(num && prob && text) {
            axios.post("http://localhost:6969/createRepairRequest", {by: "hardcode", machineCode: num, targetGroup: text, issue: prob}).then((response) => {
                console.log(response);
            });
        }
        
    }

    useEffect(() => {if(pop === false){setNum(undefined);setProb(undefined);setText(undefined)}}, [pop])

    return (
        <div>
            <Header />
            <Body component = {
                <div>
                    {pop && <div className="blur" onClick={() => {setPop(false)}}>
                        <div className="popUpRed" onClick={(e) => {e.stopPropagation()}}>
                            <div>
                                <div className="inputText">Cod Masina</div>
                                <input value={num} className="inputID2" type = "number" placeholder="XXX" maxLength="3" onChange={(e) => {updateData(e)}}/>
                            </div>
                            <div>
                                <div className="inputText">Catre:</div>
                                <div className="dropdown">
                                    {!text && <div className="dropdownText2" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>Alege</div>}
                                    {text && <div className="dropdownText2" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>{text}</div>}
                                    {drop && <div className="dropdownContent2" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>
                                        <button className="jobButton" onClick={() => {setText("Muncitori")}}>Muncitori</button>
                                        <button className="jobButton" onClick={() => {setText("Ingineri")}}>Ingineri</button>
                                        <button className="hangerButton" onClick={() => {setText("Admini")}}>Admini</button>
                                        
                                    </div>}
                                </div>
                            </div>
                            <div>
                                <div className="inputText">Observatii</div>
                                <input className="inputProb" onChange={(e) => {updateData2(e)}}/>
                            </div>
                            <button className="sendButton" onClick={() => {sendRepair()}}>Trimite</button>
                        </div>
                    </div>}
                    <div className="topSection">
                        <div className="topText">
                            <div>Logged in as: </div>
                            <div>username</div>
                        </div>
                        <button className="adminButton2" onClick={() => {nav("/admin")}}>Admin</button>
                        <button className="logOutButton" onClick={() => {nav("/login")}}>Log Out</button>
                    </div>
                    <div className="line"></div>
                    <div className="toolBox">
                        <button className="toolButton" onClick={() => {nav("/inventory")}}>Inventar</button>
                        <button className="toolButton" onClick={() => {nav("/machineList")}}>Masina +/-</button>
                        <button className="toolButton" onClick={() => {nav("/registry")}}>Modificare registru</button>
                        <button className="toolButtonPhone" onClick={() => {setPop(true)}}>Raporteaza o problema</button>
                        <button className="toolButton" onClick={() => {nav("/problemList")}}>Vizualizare probleme tehnice</button>
                    </div>
                </div>
            }/>
        </div>
    )
}

export default Main;