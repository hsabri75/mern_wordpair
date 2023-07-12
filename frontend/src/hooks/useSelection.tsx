import { BagWords } from "../../../backend/types/types";
import { useSelectionContext } from "./useSelectionContext";
import { useWordContext } from "./useWordsContext";

export const useSelection=()=>{
    const {bags}= useWordContext();
    const {selection, dispatch:dispatchSel}= useSelectionContext();

    const isEdittable=()=>selection.mode ==="EDIT"
    const switchEdit=()=>{
        const md = selection.mode==="VIEW" ? "EDIT" : "VIEW"; 
        dispatchSel && dispatchSel({type:"SET_MODE", payload:{bagName:selection.bagname,bag_id:selection.bag_id  ,mode:md}})
    }

    const selectBag=(bagname:string, bag_id:string)=>{
        dispatchSel && dispatchSel({type:"SET_BAG", payload:{bagname,bag_id,mode:""}})
    }

    const selectMode=(mode: typeof selection.mode )=>{
        dispatchSel && dispatchSel({type:"SET_MODE", payload:{bagname:"",bag_id:"",mode}})
    }

    const getBag= ():BagWords=>  bags.filter(e=>e.bag_id===selection.bag_id)[0];

    const getBagName= ():string=>selection.bagname

    const getSelection=()=>selection

    return {isEdittable, switchEdit, getBag, selectBag, getBagName, getSelection, selectMode}

}
