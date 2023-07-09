import { BagWords } from "../../../backend/types/types";
import { useSelectionContext } from "./useSelectionContext";
import { useWordContext } from "./useWordsContext";

export const useSelection=()=>{
    const {bags}= useWordContext();
    const {selection, dispatch:dispatchSel}= useSelectionContext();

    const isEdittable=()=>selection.mode==="EDIT"
    const switchEdit=()=>{
        const md = selection.mode==="NORMAL" ? "EDIT" : "NORMAL"; 
        dispatchSel && dispatchSel({type:"SET_MODE", payload:{bagName:selection.bagName,bag_id:selection.bag_id  ,mode:md}})
    }

    const selectBag=(bagName:string, bag_id:string)=>{
        dispatchSel && dispatchSel({type:"SET_BAG", payload:{bagName,bag_id,mode:selection.mode}})
    }

    const getBag= ():BagWords=>  bags.filter(e=>e.bag_id===selection.bag_id)[0];

    const getBagName= ():string=>selection.bagName

    const getSelection=()=>selection

    return {isEdittable, switchEdit, getBag, selectBag, getBagName, getSelection}

}
