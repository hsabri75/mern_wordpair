import {createContext, useReducer, Dispatch, SetStateAction, ReactNode} from 'react'
import { BagList, BagWords } from '../../../backend/types/types';


interface actionType{
    type:"SET_BAGS" | 'CREATE_BAG' | 'DELETE_BAG' | 'CREATE_WORD' | 'DELETE_WORD';
    payload:any;
}

interface WordContextInterface{
    bags: BagList;
    //words?: any;
    dispatch?: Dispatch<SetStateAction<any>>
}

const initState:WordContextInterface= {
    bags:[],
    //words:null
};

export const WordContext = createContext(initState)


export const wordsReducer = (state: WordContextInterface, action: actionType): WordContextInterface=>{
    switch(action.type){
        case 'SET_BAGS':
            return {
                bags: action.payload
            }
        case 'CREATE_BAG':
            return {
                bags: [action.payload, ...state.bags]                
            }
        case 'DELETE_BAG':
            const {bag_id:db_bag_id}= action.payload
            return {
                bags: state.bags.filter((bag)=>( bag.bag_id !== db_bag_id))               
            }
        case 'CREATE_WORD':
            const {bag_id,wp}=action.payload
            const bs= state.bags.filter((bag)=>( bag.bag_id === bag_id))
            const ws=[ wp, ...bs[0].words]
            console.log({ws})
            const bnew= state.bags.filter((bag)=>( bag.bag_id !== bag_id))
            const bg: BagWords={bag_id, bag:bs[0].bag, words:ws};
            bnew.push(bg)
            console.log({bnew})
            return {                
                bags: bnew
                //words: [action.payload, ...state.words]
            }
        case 'DELETE_WORD':
            const {dw_bag_id,word_id}=action.payload
            const dw_bs= state.bags.filter((bag)=>( bag.bag_id === dw_bag_id))
            const dw_ws=dw_bs[0].words.filter((word)=>(word._id!==word_id))
            const dw_bnew= state.bags.filter((bag)=>( bag.bag_id !== dw_bag_id))
            const dw_bg: BagWords={bag_id:dw_bag_id, bag:dw_bs[0].bag, words:dw_ws};
            dw_bnew.push(dw_bg)
            return {            


                bags: dw_bnew
                //words: state.words.filter((w: { _id: any; })=>( w._id !== action.payload._id))
            }
        default:
            return state
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