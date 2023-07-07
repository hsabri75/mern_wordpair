import { useState } from "react"
import { useWordContext } from "../hooks/useWordsContext";
import {useBags} from "../hooks/useBags"
import { WordPair } from "../../../backend/types/types";

const AddWord = (props:{bagName:string})=>{
    const [bag_id,setBag_id]=useState("")
    const [first,setFirst] = useState("");
    const [second,setSecond] = useState("");
    const [disable, setDisable]= useState(true);
    const {bags}= useWordContext();
    const {addWord} = useBags();


    const checkWord=(newWord:WordPair):void=>{
        const bag= bags.filter(e=>e.bag===props.bagName);
        setBag_id(bag[0].bag_id)
        //const newWord={first, second, _id:""}
        console.log(newWord)
        setDisable(bag[0].words.filter(w=> w.first===newWord.first || w.second===newWord.second).length>0 
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

    const handleClick=()=>{
        console.log(`${first}=${second} clicked`)
        addWord(bag_id,{first,second, _id:""})
        setFirst("");
        setSecond("");
        setDisable(true);

    }

    return(
        <div>
            <label>Word Pair:</label>
            <input type="text" value={first} onChange={handleChangeFirst}/>
            <input type="text" value={second} onChange={handleChangeSecond}/>
            <button disabled={disable} onClick={handleClick}>New Word</button>
        </div>
    )
}
export default AddWord;