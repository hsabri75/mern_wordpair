

import { BagWords, WordPair } from "../../../backend/types/types";
import { useBags } from "../hooks/useBags";
import { useSelection } from "../hooks/useSelection";
import AddWord from "./AddWord";
import AddWordList from "./AddWordList";


const WordList = ()=>{
    const {isEdittable, getBag}=useSelection();
    const {deleteWord}=useBags();
    
    const handleDelete=(bag:BagWords,wp:WordPair)=>{   
        const del:BagWords={bag_id:bag.bag_id, bagname:bag.bagname, words:[wp]}      
        deleteWord(del);
    }


    return (
        <div>
            
            <h3>Word List</h3>
            {isEdittable()   && <AddWord/>}
            {isEdittable() &&  <AddWordList />}  
            {getBag().words.map((w)=> 
            <div className="item" key={w.first}>
                <h4 > {`${w.first}=${w.second}`} </h4>
                {isEdittable() && <button className="margin5 selbutton" onClick={()=>{handleDelete(getBag(), w)}}>Delete Word</button>}
            </div>                   
                )} 
             

        </div>
    )

}

export default WordList;
