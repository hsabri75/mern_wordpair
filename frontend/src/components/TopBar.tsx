import { useAuthContext } from "../hooks/useAuthContext";
import { useLogin } from "../hooks/useLogin";
import { useSelection } from "../hooks/useSelection";


const TopBar =()=>{
    const {getSelection}=useSelection();
    const {logout} =useLogin();
    const {user}=useAuthContext();
    return(
        <div className="topbar">
        {user && <h2>{`email: ${user.email}`}</h2>}
        {user && <h2></h2>}
        {user && <h3>{getSelection().bagname}({getSelection().bag_id})</h3>}
        {user && <h3>{getSelection().mode}</h3>}
        {user && <button onClick={()=> logout() }> Log Out</button>}  
        </div>
    )    
}
export default TopBar;