import {createContext, useReducer, Dispatch, SetStateAction, ReactNode} from 'react'
import { BagWords } from '../../../backend/types/types';


interface actionType{
    type:"SET_BAGS" | 'CREATE_BAG' | 'DELETE_BAG' | 'CREATE_WORDS' | 'DELETE_WORD';
    payload:any;
}

interface WordContextInterface{
    bags: BagWords[];
    dispatch?: Dispatch<SetStateAction<any>>
}

const initState:WordContextInterface= {
    bags:[],
};

export const WordContext = createContext(initState)


export const wordsReducer = (state: WordContextInterface, action: actionType): WordContextInterface=>{
    switch(action.type){
        case 'SET_BAGS':
            return {
                bags: action.payload
            }
        case 'CREATE_BAG':
            const crBag:BagWords=action.payload
            return {
                bags: [crBag, ...state.bags]                
            }
        case 'DELETE_BAG':
            const delBag:BagWords= action.payload
            return {
                bags: state.bags.filter((bag)=>( bag.bag_id !== delBag.bag_id))               
            }
        case 'CREATE_WORDS':
            const bagWord:BagWords=action.payload;
            const existingWords= state.bags.filter((bag)=>( bag.bag_id === bagWord.bag_id))[0].words                        
            bagWord.words= bagWord.words.concat(existingWords)
            const filtered= state.bags.filter((bag)=>( bag.bag_id !== bagWord.bag_id))
            filtered.push(bagWord);
            console.log({filtered})
            return {                
                bags: filtered
            }
        case 'DELETE_WORD':
            const delWord:BagWords= action.payload
            const filteredWords = state.bags.filter((bag)=>
            ( bag.bag_id === delWord.bag_id))[0].words.filter((word)=>(word._id!==delWord.words[0]._id))
            const modified= state.bags.filter((bag)=>( bag.bag_id !== delWord.bag_id))
            modified.push({bag_id:delWord.bag_id, bag:delWord.bag, words:filteredWords})
            return {
                bags: modified
            }
    }
}
type ChildrenType={
    children:ReactNode
}

export const WordsContextProvider = ({children}:ChildrenType)=>{
    const [state, dispatch] = useReducer(wordsReducer,initState)
    
    console.log('WordContext state: ', state)
    return (<WordContext.Provider value ={{...state, dispatch}}>
        {children}
    </WordContext.Provider>)
}