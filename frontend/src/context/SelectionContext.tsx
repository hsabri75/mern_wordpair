import {createContext, useReducer, Dispatch, SetStateAction, ReactNode} from 'react'

interface Selection{
    bagName:string,
    bag_id:string
    mode: "NORMAL" | "EDIT" |"PLAY"
}

interface actionType{
    type:"SET_BAG" | 'SET_MODE' ;
    payload:Selection;
}

interface SelectionContextInterface{
    selection: Selection;
    dispatch?: Dispatch<SetStateAction<any>>
}

const initState:SelectionContextInterface= {
    selection:{bagName:"",bag_id:"",mode:"NORMAL"},
};

export const SelectionContext = createContext(initState)

export const selectionReducer = (state: SelectionContextInterface, action: actionType): SelectionContextInterface=>{
    switch(action.type){        
        case 'SET_BAG':
            return {
               selection:{
                bagName:        action.payload.bagName, 
                bag_id:        action.payload.bag_id, 
                mode:       state.selection.mode }
            }
        case 'SET_MODE':
            return {
               selection:{
                bagName:        state.selection.bagName, 
                bag_id:        state.selection.bag_id,  
                mode:       action.payload.mode }
            } 
    }
}

type ChildrenType={
    children:ReactNode
}

export const SelectionContextProvider = ({children}:ChildrenType)=>{
    const [state, dispatch] = useReducer(selectionReducer,initState)
    
    console.log('SelectionContext state: ', state)
    return (<SelectionContext.Provider value ={{...state, dispatch}}>
        {children}
    </SelectionContext.Provider>)
}