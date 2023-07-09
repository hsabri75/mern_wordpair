import { SelectionContext } from "../context/SelectionContext";
import { useContext } from "react";

export const useSelectionContext = ()=>{
    const context = useContext(SelectionContext)
    if(!context){
        throw Error('useSelectionContext must be inside an SelectionContextProvider')
    }
    return context
}