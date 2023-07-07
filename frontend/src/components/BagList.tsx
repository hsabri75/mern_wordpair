import { useWordContext } from "../hooks/useWordsContext";
import {Link} from 'react-router-dom';
import {useBags} from "../hooks/useBags"
import { BagWords } from "../../../backend/types/types";

function BagList(props: { edittable: boolean }){
    const {bags, dispatch}= useWordContext();
    const {deleteBag}=useBags();
    const handleDelete=(bag_id:string)=>{
        deleteBag(bag_id);
    }
    const getDisplayText = (bag:BagWords) => `${bag.bag}     (${bag.words.length})   `
    const getLink = (bag:BagWords) =>   `${props.edittable ? '/edit' :''}/words/${bag.bag}`    
        return (
            <div>
                {bags.map((bag)=>            
                    <div key= {bag.bag}>
                    <Link  to={getLink(bag)} >
                        <p>{getDisplayText(bag) }  </p>                                        
                    </Link>
                    {props.edittable && bag.words.length===0 && <button onClick={()=> {handleDelete(bag.bag_id)}}>delete</button>}
                    </div>
                )}
                {!props.edittable && <Link to='/edit/bags'>Edit</Link>}
            </div>            
        )
    
}
export default BagList;