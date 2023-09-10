import { useState } from "react"
import { useWordContext } from "../hooks/useWordsContext";
import {useBags} from "../hooks/useBags"


const AddBag = ()=>{
    const [name,setName] = useState("");
    const [disable, setDisable]= useState(true);
    const {bags}= useWordContext();   
    const {addBag} = useBags();

    const isNameWrong=(newName:string):boolean=>{
        return bags.filter(e=>e.bagname===newName).length>0 || newName.length===0
    }

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const newName= e.target.value                
        console.log(newName)
        {setDisable(isNameWrong(newName))}
        setName(newName)
    }

    const handleClick=()=>{
        addBag(name)
        setName("")
        setDisable(true)
    }

    return(
        <div className="add">
            <label>Bag Name:</label>
            <input type="text" placeholder="Bag name" title="Enter bag name to be added" value={name} onChange={handleChange}/>
            <button className={disable ? "margin5" : "margin5 selbutton" }   disabled={disable} onClick={handleClick}>New Bag</button>
        </div>
    )
}
export default AddBag;