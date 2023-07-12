import {createContext, useReducer, Dispatch, SetStateAction, ReactNode} from 'react'

type modeType= "VIEW" | "EDIT" | "PLAY"

type Selection={
    bagname:string,
    bag_id:string
    mode: modeType
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
    selection:{bagname:"",bag_id:"",mode:"VIEW"},
};

export const SelectionContext = createContext(initState)

export const selectionReducer = (state: SelectionContextInterface, action: ActionType): SelectionContextInterface=>{
    switch(action.type){        
        case 'SET_BAG':
            const {bagname,bag_id}=action.payload
            const mode= (bagname===""&& state.selection.mode==="PLAY") ? "VIEW" : state.selection.mode 
            console.log({bagname,bag_id,mode})
            return {
               selection:{ bagname, bag_id, mode }
            }
        case 'SET_MODE':
            return {
               selection:{
                bagname:        state.selection.bagname, 
                bag_id:         state.selection.bag_id,  
                mode:           action.payload.mode }
            } 
        case 'RESET':
            return {
                selection:{
                bagname:        "", 
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