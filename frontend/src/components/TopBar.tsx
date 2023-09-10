import { useAuthContext } from "../hooks/useAuthContext";
import { useLogin } from "../hooks/useLogin";
import { useSelection } from "../hooks/useSelection";
import ModeSelection from "./ModeSelection";

const TopBar =()=>{

    const {logout} =useLogin();
    const {user}=useAuthContext();
    const {selectBag}=useSelection();

    return(

         <div className="topbar" >                       
            <div className="emailsection">
            {user && <h3>{`${user.email}`}</h3>}     
            {user && <button className='margin5 selbutton' onClick={()=> logout() }> Log Out</button>} 
            </div>  
        <h2 >WORD PAIR</h2>  
        <button className="margin5 selbutton" onClick={()=>selectBag("","")} >Home</button> 
        <ModeSelection/>
        
        </div>      

    )    
}
export default TopBar;