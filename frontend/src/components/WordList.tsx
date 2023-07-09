

import { useBags } from "../hooks/useBags";
import { useSelection } from "../hooks/useSelection";
import AddWord from "./AddWord";
import AddWordList from "./AddWordList";


const WordList = ()=>{
    const {isEdittable, switchEdit,getBag, getBagName}=useSelection();
    const {deleteWord}=useBags();
    
    const handleDelete=(bag_id:string, word_id:string)=>{
        console.log("before: ", getBagName())
        deleteWord(bag_id,word_id);
        console.log("after: ", getBagName() )

    }

    return (
        <div>
            <h1>Word List ----- {getBagName()}</h1>
            {getBag().words.map((w)=> 
            <div className="item" key={w.first}>
                <h4 > {`${w.first}=${w.second}`} </h4>
                {isEdittable() && <button onClick={()=>{handleDelete(getBag().bag_id, w._id)}}>Delete Word</button>}
            </div>                   
                )} 
                {isEdittable()   && <AddWord bagName={getBagName()}/>}
                {isEdittable() &&  <AddWordList bagName={getBagName()}/>}
                
                {<button onClick={switchEdit} > {isEdittable() ? "View Mode" : "Edit Mode"} </button>}

        </div>
    )

}

export default WordList;
