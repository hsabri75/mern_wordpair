import { WordContext } from "../context/WordContext";
import { useContext } from "react";

export const useWordContext = ()=>{
    const context = useContext(WordContext)
    if(!context){
        throw Error('useWordContext must be inside an WordContextProvider')
    }
    return context
}