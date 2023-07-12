import { useWordContext } from "../hooks/useWordsContext";
import { useSelection } from "../hooks/useSelection";
import {useBags} from "../hooks/useBags"
import { BagWords } from "../../../backend/types/types";
import AddBag from "./AddBag";
import ModeSelection from "./ModeSelection";

function BagList(){
    const {isEdittable,selectBag}=useSelection();
    const {bags}= useWordContext();
    const {deleteBag}=useBags();
    const handleDelete=(bag: BagWords)=>{
        deleteBag(bag);
    } 
    
    const getDisplayText = (bag:BagWords) => `${bag.bagname}     (${bag.words.length})   `
    
        return (
            <div>
                {bags.map((bag)=>            
                    <div className="item" key= {bag.bag_id}>
                    <button onClick={()=>selectBag(bag.bagname, bag.bag_id)} >{getDisplayText(bag) }</button>
                    {isEdittable() && bag.words.length===0 && <button onClick={()=> {handleDelete(bag)}}>delete</button>}
                    </div>
                )}
                {isEdittable() && <AddBag/>}             
            </div>            
        )
    
}
export default BagList;
