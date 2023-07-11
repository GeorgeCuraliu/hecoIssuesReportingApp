import "../styles/inventory.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
const ProblemList = () => {
    
    const nav = useNavigate();
    
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
                            <div className="tableCat">Hanger</div>
                            <div className="tableCat">Problem</div>
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

export default ProblemList;