import { useState } from "react"
import { useBags } from "../hooks/useBags"
import { BagWords, WordPair } from "../../../backend/types/types";
import { useSelection } from "../hooks/useSelection";

const AddWord = ()=>{
    
    const [first,setFirst] = useState("");
    const [second,setSecond] = useState("");
    const [disable, setDisable]= useState(true);

    const {getBag}=useSelection();
    const {addWords} = useBags();

    const checkWord=(newWord:WordPair):void=>{
        const bag= getBag()
        console.log(newWord)
        setDisable(bag.words.filter(w=> w.first===newWord.first || w.second===newWord.second).length>0 
        || newWord.first.length===0 || newWord.second.length===0)
    }

    const handleChangeFirst=(e: React.ChangeEvent<HTMLInputElement>)=>{
        checkWord({first:e.target.value, second, _id:""})
        setFirst(e.target.value)        
    }
    const handleChangeSecond=(e: React.ChangeEvent<HTMLInputElement>)=>{
        checkWord({first,second:e.target.value, _id:""})
        setSecond(e.target.value)
    }
    const resetInput=()=>{
        setFirst("");
        setSecond("");
        setDisable(true);
    }

    const handleClick=()=>{
        const bag=getBag();
        const newWord:WordPair={first,second,_id:""};
        const bagWords:BagWords={bag_id:bag.bag_id, bagname:bag.bagname, words:[newWord]};
        addWords(bagWords);
        resetInput();
    }

    return(
        <div className="add">
            <label>Word Pair:</label>
            <input type="text" value={first} onChange={handleChangeFirst}/>
            <input type="text" value={second} onChange={handleChangeSecond}/>
            <button disabled={disable} onClick={handleClick}>New Word</button>
        </div>
    )
}
export default AddWord;