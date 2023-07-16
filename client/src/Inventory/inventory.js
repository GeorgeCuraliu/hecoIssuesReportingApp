import "../styles/inventory.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Inventory = () => {
    
    const nav = useNavigate();

    const [parts, setParts] = useState([]);
    const [addToolModal, setAddToolModal] = useState(false);

    const newToolData = useRef({code: undefined, rowCode: undefined, cabinetCode: undefined, pieces: undefined});//Alex, un ref pt data in care obiect

    useEffect(() => {
        axios.get("http://localhost:6969/getParts", {})
        .then(response => {
            console.log(response);
            setParts(response.data);
        })
    }, [])

    const sendData = () => {
        axios.post("http://localhost:6969/addTool", {...newToolData.current})
        .then(response => {
            console.log(response);
            let tempArr = [...parts];
            tempArr.push({...newToolData.current});
            setParts([...tempArr])
        })
    }
    
    return (
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <button className="backButton" onClick={() => {nav("/")}}>Back</button>
                    <button onClick={() => {setAddToolModal(true)}} className="addTool">Add tool</button>
                    <div className="line"></div>
                    <div className="table">
                        <div className="tableContent">
                            <div className="tableCat">Piece ID</div>
                            <div className="tableCat">Cabinet</div>
                            <div className="tableCat">Amount</div>
                        </div>
                       {parts && parts.map(element => {
                            return(
                                <div className="tableContent">
                                    <div className="tableCatItem">{element.code}</div>
                                    <div className="tableCatItem">{element.cabinetCode}</div>
                                    <div className="tableCatItem">{element.pieces}</div>
                                </div>
                            )
                       })}
                    </div>
                    {addToolModal && 
                        <div className="modalAddToolContainer" onClick={() => {setAddToolModal(false)}}>
                            <div className="modalAddTool" onClick={e => e.stopPropagation()}>
                                <div className="rowAddTool">
                                    <p>Piece code</p>
                                    <input placeholder="write here" onChange={e => newToolData.current.code = e.target.value}/>
                                </div>
                                <div className="rowAddTool">
                                    <p>Cabinet code</p>
                                    <input placeholder="write here" onChange={e => newToolData.current.cabinetCode = e.target.value}/>
                                </div>
                                <div className="rowAddTool">
                                    <p>Row code</p>
                                    <input placeholder="write here" onChange={e => newToolData.current.rowCode = e.target.value}/>
                                </div>
                                <div className="rowAddTool">
                                    <p>Piece amount</p>
                                    <input placeholder="write here" onChange={e => newToolData.current.pieces = e.target.value}/>
                                </div>
                                <button className="confirmPart" onClick={sendData}>Add part</button>
                            </div>
                        </div>}
                </div>
            }/>
        </div>
    );
}

export default Inventory;