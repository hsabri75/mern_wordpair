import {createContext, useReducer, Dispatch, SetStateAction, ReactNode} from 'react'

type Selection={
    bagName:string,
    bag_id:string
    mode: "VIEW" | "EDIT"
  }

type ActionType={
    type:"SET_BAG" | 'SET_MODE' | 'RESET' ;
    payload:Selection;
}

type SelectionContextInterface={
    selection: Selection;
    dispatch?: Dispatch<SetStateAction<any>>
}

const initState:SelectionContextInterface= {
    selection:{bagName:"",bag_id:"",mode:"VIEW"},
};

export const SelectionContext = createContext(initState)

export const selectionReducer = (state: SelectionContextInterface, action: ActionType): SelectionContextInterface=>{
    switch(action.type){        
        case 'SET_BAG':
            return {
               selection:{
                bagName:        action.payload.bagName, 
                bag_id:         action.payload.bag_id, 
                mode:           state.selection.mode }
            }
        case 'SET_MODE':
            return {
               selection:{
                bagName:        state.selection.bagName, 
                bag_id:         state.selection.bag_id,  
                mode:           action.payload.mode }
            } 
        case 'RESET':
            return {
                selection:{
                bagName:        "", 
                bag_id:         "", 
                mode:           "VIEW" }
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