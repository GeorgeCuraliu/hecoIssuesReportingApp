import "../styles/inventory.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const ProblemList = () => {
    
    const nav = useNavigate();
    
    const [repairs, setRepairs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:6969/getRepairs").then((response) => {
            setRepairs(response.data);
        });
    }, [])
    useEffect(() => {
        console.log(repairs[1]);
    }, [repairs])

    return (
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <button className="backButton" onClick={() => {nav("/")}}>Back</button>
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