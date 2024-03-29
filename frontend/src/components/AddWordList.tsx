import { useState } from "react"
import { BagWords, WordPair } from "../../../backend/types/types";
import {useBags} from "../hooks/useBags"
import { useSelection } from "../hooks/useSelection";

const AddWordList = ()=>{
    const {getBag, getBagName}=useSelection();
    const [csv,setCsv] = useState("");
    const [disable, setDisable]= useState(true);
    const {addWords} = useBags();
    const comma=","
    const semicolon=";"

    const handleChangeCsv=(e: React.ChangeEvent<HTMLInputElement>)=>{        
        setCsv(e.target.value)  
        setDisable( e.target.value.length==0)      
    }

    const resetInput=()=>{
        setCsv("");
    }

    const handleClick=()=>{
        const parsedArray = csv.split(semicolon).map(el=>el.trim()).filter(el=>el.length>0).map(el=>{
            const spl= el.split(comma)
            const wp:WordPair={first:spl[0], second:spl[1], _id:""}
            return wp
        })
        //console.log({parsed_array_length: parsedArray.length})
        if(parsedArray.length>0){
            const bagWords:BagWords = {bag_id:getBag().bag_id , bagname: getBagName(), words: parsedArray }
            //console.log({bagWords}) 
            addWords(bagWords);  
            //resetInput();
        }else{
            // EMPTY WORD LIST WARNING
        }
     
    }

    return(
        <div className="add">
            <label>Word List as Csv</label>
            <input type="textarea" placeholder="1,one; 2,two;" title="Enter the pair list as csv" value={csv} onChange={handleChangeCsv}/>
            <button className={disable ? "margin5" : "margin5 selbutton" } disabled={disable} onClick={handleClick}>New Words</button>
        </div>
    )
}
export default AddWordList;