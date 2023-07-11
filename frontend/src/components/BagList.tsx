import { useWordContext } from "../hooks/useWordsContext";
import { useSelection } from "../hooks/useSelection";
import {useBags} from "../hooks/useBags"
import { BagWords } from "../../../backend/types/types";
import AddBag from "./AddBag";

function BagList(){
    const {isEdittable,switchEdit,selectBag}=useSelection();
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
                {<button onClick={switchEdit} > {isEdittable() ? "View Mode" : "Edit Mode"} </button>}
            </div>            
        )
    
}
export default BagList;
