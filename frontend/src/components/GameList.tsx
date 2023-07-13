import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";



const GameList =()=>{
    const {user}=useAuthContext();
    return(
        <div >
            <Link to={"/testgame"}>
            <button>Test Game</button>
            </Link>
            <button>Find Match</button>
        </div>
    )    
}
export default GameList;