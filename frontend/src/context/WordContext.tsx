import {createContext, useReducer, Dispatch, SetStateAction, ReactNode} from 'react'
import { BagList } from '../../../backend/types/types';


interface actionType{
    type:any;
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
    console.log('word reducer')
    console.log({state})
    switch(action.type){
        case 'SET_BAGS':
            return {
                bags: action.payload
            }
        case 'CREATE_BAG':
            return {
                bags: [action.payload, ...state.bags]
            }
        case 'CREATE_WORD':
            return {
                bags: state.bags
                //words: [action.payload, ...state.words]
            }
        case 'DELETE_WORD':
            return {
                bags: state.bags
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