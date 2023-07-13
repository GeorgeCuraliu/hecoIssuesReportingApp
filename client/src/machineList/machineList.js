import "../styles/machineList.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
const MachineList = () => {
    
    const [num, setNum] = useState();
    const [pop, setPop] = useState(false);
    const [drop, setDrop] = useState(false);
    const [text, setText] = useState(false);

    const nav = useNavigate();
    let temp = useRef();

    const updateData = (e) => {
        if(e.target.value.length < 4) {
            setNum(e.target.value);
        }
    } 

    const testing = (props) => {
        temp.current = props
        setText(true)
        setDrop(false)
    }
    

    return (
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    {pop && <div className="blur" onClick={() => {setPop(false)}}>
                        <div className="popUp" onClick={(e) => {e.stopPropagation()}}>
                            <div className="s4">
                                <div className="s1">
                                    <div className="machineID" >Cod Masina</div>
                                    <input value={num} className="inputID" type = "number" placeholder="XXX" maxLength="3" onChange={(e) => {updateData(e)}}/>
                                </div>
                                <div className="s1">
                                    <div className="machineID">Hall</div>
                                    <div class="dropdown">
                                        {!text && <div className="dropdownText" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>Alege</div>}
                                        {text && <div className="dropdownText" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>{temp.current}</div>}
                                        {drop && <div className="dropdownContent" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>
                                            <button className="hangerButton" onClick={() => {testing("Hala 1")}}>Hala 1</button>
                                            <button className="hangerButton" onClick={() => {testing("Hala 2")}}>Hala 2</button>
                                            <button className="hangerButton" onClick={() => {testing("Hala 3")}}>Hala 3</button>
                                            <button className="hangerButton" onClick={() => {testing("Hala 4")}}>Hala 4</button>
                                            <button className="hangerButton" onClick={() => {testing("Hala 5")}}>Hala 5</button>
                                            <button className="hangerButton" onClick={() => {testing("Hala 6")}}>Hala 6</button>
                                        </div>}
                                    </div>

                                </div>
                            </div>
                            <div className="s3">
                                <button className="addButton2">Adauga</button>
                            </div>
                        </div>
                    </div>}
                    <div className="flex">
                        <button className="backButton" onClick={() => {nav("/")}}>Back</button>
                        <button className="addButton" onClick={() => {setPop(true)}}>Edit list</button>
                    </div>
                    <div className="line"></div>
                    <div className="table">
                        <div className="tableContent">
                            <div className="tableCat">Machine ID</div>
                            <div className="tableCat">Hangar</div>
                            <div className="tableCat">Status</div>
                        </div>
                        <div className="tableContent">
                            <div className="tableCatItem">34</div>
                            <div className="tableCatItem">Surub</div>
                            <div className="tableCatItem">40000</div>
                        </div>
                    </div>
                </div>
            }/>
        </div>
    );
}

export default MachineList;