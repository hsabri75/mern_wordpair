
import { useSelection } from "../hooks/useSelection";


const ModeSelection =()=>{
    const {getSelection, selectMode}=useSelection();

    const getPlayButton=(): JSX.Element =>{
        const bagSel= getSelection().bagname!=""
        return <button 
        disabled = {!bagSel} 
        title= "Choose a Bag to play" 
        className={getSelection().mode==="PLAY" ? "selected margin5 selbutton" :  "unselected margin5" + (bagSel&&" selbutton") } 
        onClick={()=> selectMode("PLAY")} > {"PLAY"} </button>
    }
    const getButton=(modename: "VIEW" | "EDIT"  ): JSX.Element =>{
        return <button 
        className={getSelection().mode===modename ? "selected margin5 selbutton" : "unselected margin5 selbutton"} 
        onClick={()=> selectMode(modename)} > {modename} </button>
    }

    return(
        <div className="edit">
                {getButton("VIEW")}
                {getButton("EDIT")}
                {getPlayButton()}         
        </div>
    )    
}
export default ModeSelection;
