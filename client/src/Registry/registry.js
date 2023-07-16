import "../styles/registry.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DeleteImg from "../Images/delete.png";
import ChangePlaceBtn from "../Images/changePlace.png";

const Registry = () => {

    const nav = useNavigate();
    
    const [selectedCabinet, setSelectedCabinet] = useState(null);
    const [parts, setParts] = useState([]);
    const [currentButton, setCurrentButton] = useState();//delete or modify
    const selectedPart = useRef()

    useEffect(() => {
        axios.get("http://localhost:6969/getParts", {})
            .then((response) => {
                console.log(response);
                setParts(response.data);
            });
    }, [])
    
    const changeCurrentCabinet = (numb) => {
        setSelectedCabinet(numb);
    }

    const chnageCurrentButton = (button) => {
        if(button === currentButton){
            setCurrentButton(undefined);
        }else{
            setCurrentButton(button);
        }
    }

    const handleToolClick = (code, index) => {//used to delete or modify tool info
        console.log("handle tool click f")
        if(currentButton === "delete"){
            console.log("deleting part")
            axios.post("http://localhost:6969/deleteTool", {code: code})
            .then((response) => {
                console.log(response)
                let tempArr = [...parts];
                tempArr.splice(index, 1);
                setParts([...tempArr]);
            });
        }else if(currentButton === "modify"){
            selectedPart.current = index;
        }
    }

    const chnageToolLocation = (row) => {//will move the tool o the row that the click came from
        if(currentButton === "modify"){
            let tempArr = [...parts];
            tempArr[selectedPart.current].rowCode = row;
            tempArr[selectedPart.current].cabinetCode = selectedCabinet;
            setParts([...tempArr]);

            axios.post("http://localhost:6969/modifyToolInfo", {code: parts[selectedPart.current].code, changeCategory: ["cabinetCode", "rowCode"], newValue: [selectedCabinet, row]})
            .then((response) => {
                console.log(response)
            });
        }
    }

    return (
        <div>
            <Header />
            <Body component = {
                <div className="body bodyInv">
                   <div className="leftSection sectionInventory">
                        <div className="topViewInventory">
                            <div 
                                style={selectedCabinet === 1 ? {border: "3px solid green"} : null} 
                                onClick={() => {changeCurrentCabinet(1)}} 
                                className="cabinet0 cabinetTopView"></div>
                            <div 
                                style={selectedCabinet === 2 ? {border: "3px solid green"} : null} 
                                onClick={() => {changeCurrentCabinet(2)}} 
                                className="cabinet1 cabinetTopView"></div>
                            <div 
                                style={selectedCabinet === 3 ? {border: "3px solid green"} : null} 
                                onClick={() => {changeCurrentCabinet(3)}} 
                                className="cabinet2 cabinetTopView"></div>
                            <div 
                                style={selectedCabinet === 4 ? {border: "3px solid green"} : null} 
                                onClick={() => {changeCurrentCabinet(4)}} 
                                className="cabinet3 cabinetTopView"></div>
                            <div 
                                style={selectedCabinet === 5 ? {border: "3px solid green"} : null} 
                                onClick={() => {changeCurrentCabinet(5)}} 
                                className="cabinet4 cabinetTopView"></div>
                            <div 
                                style={selectedCabinet === 6 ? {border: "3px solid green"} : null} 
                                onClick={() => {changeCurrentCabinet(6)}} 
                                className="cabinet5 cabinetTopView"></div>
                        </div>
                        <div className="buttonsContainer">
                            <img style={currentButton === "modify" ? {filter: "grayscale(100%)"} : null} onClick={() => {chnageCurrentButton("delete")}} className="invButton" alt="delete" src={DeleteImg}/>
                            <img style={currentButton === "delete" ? {filter: "grayscale(100%)"} : null} onClick={() => {chnageCurrentButton("modify")}} className="invButton" alt="change" src={ChangePlaceBtn}/>
                        </div>
                   </div>
                   <div className="rightSection sectionInventory">
                        <button className="backButton backButtonInv" onClick={() => {nav("/")}}>Back</button>
                        {selectedCabinet && <div className="cabinetView">
                            <div onClick={() => {chnageToolLocation(4)}} className="row row4">
                                {parts && parts.map((element, index) => {
                                    if(element.cabinetCode === selectedCabinet && element.rowCode === 4){
                                        return(
                                            <div onClick={e => {e.stopPropagation(); handleToolClick(element.code, index)}} className="element">{element.code}</div>
                                        )
                                    }
                                })}
                            </div>
                            <div onClick={() => {chnageToolLocation(3)}} className="row row3">
                            {parts && parts.map((element, index) => {
                                    if(element.cabinetCode === selectedCabinet && element.rowCode === 3){
                                        return(
                                            <div onClick={e => {e.stopPropagation(); handleToolClick(element.code, index)}} className="element">{element.code}</div>
                                        )
                                    }
                                })}
                            </div>
                            <div onClick={() => {chnageToolLocation(2)}} className="row row2">
                            {parts && parts.map((element, index) => {
                                    if(element.cabinetCode === selectedCabinet && element.rowCode === 2){
                                        return(
                                            <div onClick={e => {e.stopPropagation(); handleToolClick(element.code, index)}} className="element">{element.code}</div>
                                        )
                                    }
                                })}
                            </div>
                            <div onClick={() => {chnageToolLocation(1)}} className="row row1">
                            {parts && parts.map((element, index) => {
                                    if(element.cabinetCode === selectedCabinet && element.rowCode === 1){
                                        return(
                                            <div onClick={e => {e.stopPropagation(); handleToolClick(element.code, index)}} className="element">{element.code}</div>
                                        )
                                    }
                                })}
                            </div>
                            <div className="cabinetLegs">
                                <div className="leg"></div>
                                <div className="leg"></div>
                            </div>
                        </div>}
                   </div>
                </div>
            }/>
        </div>
    );
}

export default Registry;