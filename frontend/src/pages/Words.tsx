import { Link, useParams } from "react-router-dom";
import BagList from "../components/BagList";
import TopBar from "../components/TopBar";
import {useBags} from "../hooks/useBags"
import AddBag from "../components/AddBag"
import WordList from "../components/WordList";
import AddWord from "../components/AddWord";

const Words = (props: { edittable: boolean; })=>{
    const {bagName}=useParams();

   
    return (
        <div>
            <Link to='/' >Home </Link>
            <div>
                <TopBar address={`${bagName}`}/>
                <WordList edittable={props.edittable}/>
                {props.edittable && bagName && <AddWord bagName={bagName}/>}
            </div>
        </div>
    )
}
export default Words;