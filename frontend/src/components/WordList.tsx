import { useParams } from "react-router-dom";
import { useWordContext } from "../hooks/useWordsContext";
import {Link} from 'react-router-dom';
import AddWord from "./AddWord";
import { useBags } from "../hooks/useBags";

const WordList = (props: { edittable: boolean; })=>{
    const {bagName}=useParams();
    const {bags, dispatch}= useWordContext();
    const {deleteWord}=useBags();
    const getBag= (bagName: string)=>{
        let i=0;
        while(bags[i].bag!==bagName){
            i++;
        }
        return bags[i];    
    }
    
    const handleDelete=(bag_id:string, word_id:string)=>{
        deleteWord(bag_id,word_id);
    }

    return (
        <div>
            <h1>Word List ----- {bagName}</h1>


            {bagName && getBag(bagName).words.map((w)=> 
            <div key={w.first}>
                <h4 > {`${w.first}=${w.second}`} </h4>
                {props.edittable && <button onClick={()=>{handleDelete(getBag(bagName).bag_id, w._id)}}>Delete Word</button>}
            </div>                   
                )} 
                
                {!props.edittable && typeof bagName==='string' && <Link to={`/edit/words/${bagName}`}>Edit</Link>}

        </div>
    )

}

export default WordList;

//{props.edittable && typeof bagName==='string' && <AddWord bagName={bagName}/>}