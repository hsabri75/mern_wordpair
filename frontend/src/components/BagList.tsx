import { useWordContext } from "../hooks/useWordsContext";
import { useSelection } from "../hooks/useSelection";
import {useBags} from "../hooks/useBags"
import { BagWords } from "../../../backend/types/types";
import AddBag from "./AddBag";


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
                <h3>Bag List </h3>
                {isEdittable() && <AddBag/>}
                {bags.map((bag)=>            
                    <div className="item" key= {bag.bag_id}>
                    <button className="margin5 selbutton" onClick={()=>selectBag(bag.bagname, bag.bag_id)} >{getDisplayText(bag) }</button>
                    {isEdittable() && bag.words.length===0 && <button className="margin5 selbutton" onClick={()=> {handleDelete(bag)}}>delete</button>}
                    </div>
                )}
                             
            </div>            
        )
    
}
export default BagList;
