

import { BagWords, WordPair } from "../../../backend/types/types";
import { useBags } from "../hooks/useBags";
import { useSelection } from "../hooks/useSelection";
import AddWord from "./AddWord";
import AddWordList from "./AddWordList";


const WordList = ()=>{
    const {isEdittable, switchEdit,getBag, getBagName}=useSelection();
    const {deleteWord}=useBags();
    
    const handleDelete=(bag:BagWords,wp:WordPair)=>{   
        const del:BagWords={bag_id:bag.bag_id, bag:bag.bag, words:[wp]}      
        deleteWord(del);
    }

    return (
        <div>
            <h1>Word List ----- {getBagName()}</h1>
            {getBag().words.map((w)=> 
            <div className="item" key={w.first}>
                <h4 > {`${w.first}=${w.second}`} </h4>
                {isEdittable() && <button onClick={()=>{handleDelete(getBag(), w)}}>Delete Word</button>}
            </div>                   
                )} 
                {isEdittable()   && <AddWord/>}
                {isEdittable() &&  <AddWordList />}
                
                {<button onClick={switchEdit} > {isEdittable() ? "View Mode" : "Edit Mode"} </button>}

        </div>
    )

}

export default WordList;
