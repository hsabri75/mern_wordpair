import { useState } from "react"
import { BagWords, WordPair } from "../../../backend/types/types";
import {useBags} from "../hooks/useBags"


const AddWordList = (props:{bagName:string})=>{
    const [csv,setCsv] = useState("");
    const {addWords} = useBags();
    const comma=","
    const semicolon=";"

    const handleChangeCsv=(e: React.ChangeEvent<HTMLInputElement>)=>{        
        setCsv(e.target.value)        
    }

    const handleClick=()=>{
        const parsedArray = csv.split(semicolon).map(el=>el.trim()).filter(el=>el.length>0).map(el=>{
            const spl= el.split(comma)
            const wp:WordPair={first:spl[0], second:spl[1], _id:""}
            return wp
        })
        const bagWords:BagWords = {bag_id:"", bag: props.bagName, words: parsedArray }
        console.log({bagWords}) 
        addWords(bagWords);       
    }

    return(
        <div className="add">
            <label>Word List as Csv</label>
            <input type="textarea" value={csv} onChange={handleChangeCsv}/>
            <button onClick={handleClick}>New Bag with Words</button>
        </div>
    )
}
export default AddWordList;