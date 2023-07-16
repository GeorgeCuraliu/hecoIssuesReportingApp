import "../styles/machineList.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
const MachineList = () => {

    const [del, setDel] = useState(false);
    const [num, setNum] = useState();
    const [num2, setNum2] = useState();
    const [machines, setMachines] = useState([]);
    const [pop, setPop] = useState(false);
    const [drop, setDrop] = useState(false);
    const [text, setText] = useState(false);
    const [drop2, setDrop2] = useState(false);
    const [text2, setText2] = useState(false);
    
    const nav = useNavigate();
    
    let hangar = useRef();
    let day = useRef();


    useEffect(() => {
        axios.get("http://localhost:6969/getMachines").then((response) => {
            setMachines(response.data);
        });
    }, []);

    const addMachine = () => {
        setMachines((value) => [...value, {code: num, hangar: hangar.current, status: "functional", maintenance:[num2, day.current].join(" ")}]);
        axios.post("http://localhost:6969/createMachine", {code: num, hangar: hangar.current, maintenance:[num2, day.current].join(" ")})
    }

    const updateData = (e) => {
        if(e.target.value.length < 4) {
            setNum(e.target.value);
        }
    } 
    const updateData2 = (e) => {
        if(e.target.value.length < 3 && e.target.value < 25 && e.target.value > 0) {
            setNum2(e.target.value);
        }
    } 

    const testing = (props) => {
        hangar.current = props
        setText(true)
        setDrop(false)
    }
    const testing2 = (props) => {
        day.current = props
        setText2(true)
        setDrop2(false)
    }
    const deleteMachine = (code) => {
        if(del){
            axios.post("http://localhost:6969/deleteMachine", {code}).then((response) => {
                console.log(response);
                if(response.status === 200){
                    let tempObj = [...machines];
                    tempObj.forEach((element, index) => {
                        console.log(element.code);
                        if(element.code === code) {
                            delete  tempObj[index];
                        }
                    });
                    setMachines([...tempObj]);
                }
            });

        }
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
                                    <div className="machineDate" >Data de mentenanta</div>
                                    <div className="flexCenter">
                                        <input value={num2} className="inputDate" placeholder="Ora" type="number" maxLength="2" onChange={(f) => {updateData2(f)}}/>
                                        <div className="dropdown">
                                            {!text2 && <div className="dropdownText" onMouseLeave={() => {setDrop2(false)}} onMouseEnter={() => {setDrop2(true)}}>Alege</div>}
                                            {text2 && <div className="dropdownText" onMouseLeave={() => {setDrop2(false)}} onMouseEnter={() => {setDrop2(true)}}>{day.current}</div>}
                                            {drop2 && <div className="dropdownContent" onMouseLeave={() => {setDrop2(false)}} onMouseEnter={() => {setDrop2(true)}}>
                                                <button className="hangerButton" onClick={() => {testing2("Luni")}}>Luni</button>
                                                <button className="hangerButton" onClick={() => {testing2("Marti")}}>Marti</button>
                                                <button className="hangerButton" onClick={() => {testing2("Miercuri")}}>Miercuri</button>
                                                <button className="hangerButton" onClick={() => {testing2("Joi")}}>Joi</button>
                                                <button className="hangerButton" onClick={() => {testing2("Vineri")}}>Vineri</button>
                                                <button className="hangerButton" onClick={() => {testing2("Sambata")}}>Sambata</button>
                                                <button className="hangerButton" onClick={() => {testing2("Duminica")}}>Duminica</button>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="s1">
                                    <div className="machineID">Hall</div>
                                    <div className="dropdown">
                                        {!text && <div className="dropdownText" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>Alege</div>}
                                        {text && <div className="dropdownText" onMouseLeave={() => {setDrop(false)}} onMouseEnter={() => {setDrop(true)}}>{hangar.current}</div>}
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
                                <button className="addButton2" onClick={() => {addMachine(); setPop(false)}}>Adauga</button>
                            </div>
                        </div>
                    </div>}
                    <div className="flex">
                        <button className="backButton" onClick={() => {nav("/")}}>Back</button>
                        {!del && <button className="addButton" onClick={() => {setDel(value => !value)}}>Delete Machine</button>}
                        {del && <button className="addButton" style={{backgroundColor: "red"}} onClick={() => {setDel(value => !value)}}>Delete Machine</button>}
                        <button className="addButton" onClick={() => {setPop(true)}}>Edit list</button> 
                    </div>
                    <div className="line"></div>
                    <div className="table">
                        <div className="tableContent">
                            <div className="tableCat">Machine ID</div>
                            <div className="tableCat">Hangar</div>
                            <div className="tableCat">Status</div>
                            <div className="tableCat">Maintenance</div>
                        </div>
                        {machines.map((value, index) => {
                            if(!value){
                                return;
                            }
                            return(
                                <div className="tableContent" key={index} onClick={() => {deleteMachine(value.code)}}>
                                    <div className="tableCatItem">{value.code}</div>
                                    <div className="tableCatItem">{value.hangar}</div>
                                    <div className="tableCatItem">{value.status}</div>
                                    <div className="tableCatItem">{value.maintenance}</div>
                                </div>
                            );
                        })}
                        
                        
                    </div>
                </div>
            }/>
        </div>
    );
}

export default MachineList;