import "../styles/inventory.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
const Inventory = () => {
    
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
                            <div className="tableCat">Piece ID</div>
                            <div className="tableCat">Piece name</div>
                            <div className="tableCat">Amount</div>
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

export default Inventory;