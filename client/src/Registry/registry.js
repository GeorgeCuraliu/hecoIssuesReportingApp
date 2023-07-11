import "../styles/inventory.css";
import Header from "../GlobalComponents/header";
import Body from "../GlobalComponents/body";
import { useNavigate } from "react-router-dom";
const Registry = () => {
    
    const nav = useNavigate();
    
    return (
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <button className="backButton" onClick={() => {nav("/")}}>Back</button>
                </div>
            }/>
        </div>
    );
}

export default Registry;