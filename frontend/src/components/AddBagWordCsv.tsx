import { useState } from "react"
import { useWordContext } from "../hooks/useWordsContext";


const AddBagWordCsv = ()=>{
    const [csv,setCsv] = useState("");
    const [bagName, setBagName] = useState("");
    const [disable, setDisable]= useState(true);
    const {bags}= useWordContext();
    const comma=","
    const semicolon=";"


    const checkInput=(newBagName: string, newWords:string):void=>{
        setDisable(bags.filter(e=>e.bag===newBagName).length>0);
    }

    const handleChangeCsv=(e: React.ChangeEvent<HTMLInputElement>)=>{
        checkInput(bagName,e.target.value)
        setCsv(e.target.value)
        
    }
    const handleChangeBagName=(e: React.ChangeEvent<HTMLInputElement>)=>{
        checkInput(e.target.value,csv)
        setBagName(e.target.value)
    }

    const handleClick=()=>{
        console.log(`${csv} clicked`) 
        const words = csv.split(semicolon).map(el=>el.trim()).filter(el=>el.length>0).map(el=>{
            const spl= el.split(comma)
            return {first:spl[0], second:spl[1]}
        })
        const bagWords = {bag:{bagName}, words }
        console.log({bagWords})
        
    }

    return(
        <div className="add">
            <label>Bag Name:</label>
            <input type="text" value={bagName} onChange={handleChangeBagName}/>
            <label>Word Pair as Csv</label>
            <input type="textarea" value={csv} onChange={handleChangeCsv}/>
            <button disabled={disable} onClick={handleClick}>New Bag with Words</button>
        </div>
    )
}
export default AddBagWordCsv;