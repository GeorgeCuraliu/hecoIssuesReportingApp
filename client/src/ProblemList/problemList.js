import "../styles/inventory.css";
import "../styles/problemList.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const ProblemList = () => {
    
    const nav = useNavigate();

    const [pop, setPop] = useState();
    const [repairs, setRepairs] = useState([]);
    const [i, setI] = useState(1);
    const [pieces, setPieces] = useState([1]);
    const [num, setNum] = useState(); 
    const [text, setText] = useState(); 

    useEffect(() => {
        axios.get("http://localhost:6969/getRepairs").then((response) => {
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
        console.log(num, text)
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
                                {pieces.map((value, index) => {
                                    if(!value){
                                        return;
                                    }
                                    return(
                                        <div>
                                            <div className="flex">
                                                <div className="repairText">Piese Folosite</div>
                                                <button className="plus" onClick={() => {updatePieces(1)}}>+</button>
                                            </div>
                                            <div className="flex">
                                                <input placeholder="Piece Name" className="inputPiece"/>
                                                <input placeholder="Number" className="inputPiece"/>
                                            </div>
                                        </div>
                                    );
                                })}
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
                                return;
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