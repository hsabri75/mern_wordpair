import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWordContext } from "./useWordsContext";
import { BagWords } from "../../../backend/types/types";
export const useBags = ()=>{
    const [error, setError] =useState(null);
    const [isLoading, setIsLoading]= useState(false);
    const {dispatch} = useWordContext();

    const {user}=useAuthContext();

    const deleteBag = async (bag: BagWords)=>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/bag',{
            method:'DELETE',
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({bag_id:bag.bag_id})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            if(dispatch){
                dispatch({type:'DELETE_BAG', payload:bag})
                setIsLoading(false)
                setError(null)
            }            
        }
    }

    const addBag = async (bagname:string)=>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/bag',{
            method:'POST',
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({bagname})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            if(dispatch){
                dispatch({type:'CREATE_BAG', payload:json})
                setIsLoading(false)
                setError(null)
                console.log()
            }            
        }
    }
    const addWords = async (bagWords:BagWords)=>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/word',{
            method:'POST',
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify(bagWords)
        })

        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            if(dispatch){
                console.log(json)
                const bw: BagWords=json.msg;
                console.log({bw})
                dispatch({type:'CREATE_WORDS', payload:bw})

            }            
        }

    }

    const deleteWord = async (bag:BagWords)=>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/word',{
            method:'DELETE',
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({word_id:bag.words[0]._id})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            if(dispatch){
                dispatch({type:'DELETE_WORD', payload:bag})
                setIsLoading(false)
                setError(null)
            }            
        }
    }



    return {addBag, deleteBag, addWords, deleteWord}
}