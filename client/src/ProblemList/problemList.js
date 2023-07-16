import "../styles/inventory.css";
import "../styles/problemList.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
const ProblemList = () => {
    
    const nav = useNavigate();

    const [pop, setPop] = useState();
    const [repairs, setRepairs] = useState([]);
    const [i, setI] = useState(1);
    const [pieces, setPieces] = useState([1]);
    const [parts, setParts] = useState({});
    const [num, setNum] = useState(); 
    const [text, setText] = useState(); 

    useEffect(() => {
        axios.get("http://localhost:6969/getRepairs").then((response) => {
            console.log(response.data)
            setRepairs(response.data);
        });
    }, [])
    
    const updateData = (e) => {
        if(e.target.value.length < 4) {
            setNum(e.target.value);
        }
    } 
    const updateData2 = (e) => {
        setText(e.target.value);
    } 
    const updatePieces = (props) => {
        setI(i+props);
        console.log(i);
        pieces.push(i);
    }
    const completeRepair = () => {

        setPop(false);
        console.log(num, text);

        let tempObj ={};
        Object.values(parts).forEach(val => {
            tempObj[val[0]] =val[1];
        })
        console.log({ by:"awd", machineCode: num, issue: text, usedParts: tempObj})
        axios.post("http://localhost:6969/repairComplete", { by:"awd", machineCode: num, issue: text, usedParts: tempObj})
        .then(response => {
            console.log(response);
            let tempObj = [...repairs];
            tempObj.every((element, index) => {
                if(element.machineCode == num){
                    tempObj.splice(index, 1);
                    console.log("deleting request " + index)
                    setRepairs([...tempObj])
                    return false;
                }
                return true;
            })
        })

    }
    const updateData3 = (e, index, n) => {//n => id or number
        let tempObj = {...parts};
        if(!tempObj[index]){
            tempObj[index] = [];
        }
        tempObj[index][n] = e;
        setParts({...tempObj});
        console.log(parts);
    }

    return (
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    {pop && <div className="blur" onClick={() => {setPop(false)}}>
                        <div className="popUpGreen" onClick={(e) => {e.stopPropagation()}}>
                            <div className="repairText">Cod Masina</div>
                            <input value={num} className="inputID" type = "number" placeholder="XXX" maxLength="3" onChange={(e) => {updateData(e)}}/>
                            <div className="overflow">
                            <div>
                                <div className="flex">
                                    <div className="repairText">Piese Folosite</div>
                                    <button className="plus" onClick={() => {updatePieces(1)}}>+</button>
                                </div>
                                {pieces.map((value, index) => {
                                    if(!value){
                                        return null;
                                    }
                                    return(
                                        
                                            <div className="flex">
                                                <input placeholder="ID" className="inputPiece" onChange={(e) => {updateData3(e.target.value, index, 0)}}/>
                                                <input placeholder="Number" className="inputPiece" onChange={(e) => {updateData3(e.target.value, index, 1)}}/>
                                            </div>
                                        
                                    );
                                })}
                            </div>
                            </div> 
                            
                            <div className="repairText">Observatii</div>
                            <textarea className="input" value={text} onChange={(e) => {updateData2(e)}}/>
                            <button className="addButton2" style={{marginTop: 10}} onClick={() => {completeRepair()}}>Complete</button> 
                        </div>
                    </div>}
                    <div className="flex">
                        <button className="backButton" onClick={() => {nav("/")}}>Back</button>
                        <button className="backButton" onClick={() => {setPop(true)}}>Complete Repair</button>
                    </div>
                    <div className="line"></div>
                    <div className="table">
                        <div className="tableContent">
                            <div className="tableCat">Machine ID</div>
                            <div className="tableCat">Sent by</div>
                            <div className="tableCat">Group</div>
                            <div className="tableCat">Problem</div>
                        </div>
                        
                        {repairs.map((value, index) => {
                            if(!value){
                                return null;
                            }
                            return(
                                <div className="tableContent" key={index} onClick={() => {}}>
                                    <div className="tableCatItem">{value.machineCode}</div>
                                    <div className="tableCatItem">{value.by}</div>
                                    <div className="tableCatItem">{value.targetGroup}</div>
                                    <div className="tableCatItem">{value.issue}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            }/>
        </div>
    );
}

export default ProblemList;