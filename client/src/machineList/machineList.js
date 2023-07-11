import "../styles/machineList.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
const MachineList = () => {
    
    const nav = useNavigate();
    
    return (
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <div className="flex">
                        <button className="backButton" onClick={() => {nav("/")}}>Back</button>
                        <button className="addButton" onClick={() => {nav("/")}}>Edit list</button>
                    </div>
                    <div className="line"></div>
                    <div className="table">
                        <div className="tableContent">
                            <div className="tableCat">Machine ID</div>
                            <div className="tableCat">Hangar</div>
                            <div className="tableCat">Status</div>
                        </div>
                        <div className="tableContent">
                            <div className="tableCat">34</div>
                            <div className="tableCat">Surub</div>
                            <div className="tableCat">40000</div>
                        </div>
                    </div>
                </div>
            }/>
        </div>
    );
}

export default MachineList;