import "../styles/header.css";
import Heco from "../Images/hecoLogoTrans.png";
import Heco2 from "../Images/heco-logo.png";
const Header = () => {
    return (
        <header>
            <img className="logo" src={Heco}/>
            <img className="logo2" src={Heco2}/>
            
        </header>
        
    );
};

export default Header;