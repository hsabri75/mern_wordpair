import { useAuthContext } from "../hooks/useAuthContext";
import { useLogin } from "../hooks/useLogin";

const TopBar =(props: { address: string })=>{
    const {logout} =useLogin();
    const {user}=useAuthContext();
    return(
        <>
        {user && <h2>{`email: ${user.email}`}</h2>}
        {user && <h2>{`/${props.address}`}</h2>}
        {user && <button onClick={()=> logout() }> Log Out</button>}  
        </>
    )    
}
export default TopBar;