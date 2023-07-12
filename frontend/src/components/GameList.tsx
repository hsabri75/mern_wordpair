import { useAuthContext } from "../hooks/useAuthContext";



const GameList =()=>{
    const {user}=useAuthContext();
    return(
        <div >
            <button>Test</button>
            <button>Find Match</button>
        </div>
    )    
}
export default GameList;