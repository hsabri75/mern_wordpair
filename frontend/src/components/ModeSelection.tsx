
import { useSelection } from "../hooks/useSelection";


const ModeSelection =()=>{
    const {getSelection, selectMode}=useSelection();

    const getButton=(modename: "VIEW" | "EDIT" | "PLAY" ): JSX.Element =>{
        return <button className={getSelection().mode===modename ? "selected" : "unselected"} 
        onClick={()=> selectMode(modename)} > {modename} </button>
    }

    return(
        <div className="edit">
                {getButton("VIEW")}
                {getButton("EDIT")}
                {getSelection().bagname!=="" && getButton("PLAY")}         
        </div>
    )    
}
export default ModeSelection;
