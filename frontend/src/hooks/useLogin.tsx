import { useState } from "react";
import { useAuthContext} from './useAuthContext';
import { useWordContext } from "./useWordsContext";
import { BagWords } from "../../../backend/types/types";
import { useSelectionContext } from "./useSelectionContext";

export const useLogin = ()=>{
    const [error, setError] =useState(null);
    const [isLoading, setIsLoading]= useState(false);
    const {dispatch} = useAuthContext()
    const {dispatch: wordDispatch} = useWordContext()
    const {dispatch: selectionDispatch} = useSelectionContext()

    const loginSignup = async (email:string,password:string,type:"login"|"signup")=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/user/${type}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
        })
        console.log({response})
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            console.log({json})
            localStorage.setItem('user',JSON.stringify(json))
            if(dispatch){
                dispatch({type:'LOGIN', payload:json})
                setIsLoading(false)
            }            
        }
    }
    const logout = ()=>{
        localStorage.removeItem('user');
        if(dispatch){
            dispatch({type:'LOGOUT'})
            wordDispatch && wordDispatch({type:"RESET"})
            selectionDispatch && selectionDispatch({type:"RESET"})
            setIsLoading(false)
        }            

    }
    return {loginSignup,isLoading,error,logout}


}