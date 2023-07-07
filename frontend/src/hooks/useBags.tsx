import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWordContext } from "./useWordsContext";
import { WordPair } from "../../../backend/types/types";
export const useBags = ()=>{
    const [error, setError] =useState(null);
    const [isLoading, setIsLoading]= useState(false);
    const {dispatch} = useWordContext();

    const {user}=useAuthContext();

    const deleteBag = async (bag_id:string)=>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/bag',{
            method:'DELETE',
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({bag_id})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            if(dispatch){
                dispatch({type:'DELETE_BAG', payload:{bag_id}})
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

    const addWord = async (bag_id:string, wp:WordPair)=>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/word',{
            method:'POST',
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({bag_id:bag_id, first:wp.first, second:wp.second})
        })


        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            if(dispatch){
                const wpNew: WordPair={first:wp.first,second:wp.second,_id:json}
                dispatch({type:'CREATE_WORD', payload:{bag_id, wp:wpNew}})
                setIsLoading(false)
                setError(null)
            }            
        }
    }
    const deleteWord = async (bag_id:string,word_id:string)=>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/word',{
            method:'DELETE',
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({word_id})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            if(dispatch){
                dispatch({type:'DELETE_WORD', payload:{dw_bag_id:bag_id, word_id}})
                setIsLoading(false)
                setError(null)
            }            
        }
    }



    return {addBag,deleteBag,addWord, deleteWord}
}