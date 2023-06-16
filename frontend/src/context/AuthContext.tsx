import React,{createContext, useReducer, useEffect, ReactNode, Dispatch, SetStateAction} from 'react'


interface actionType{
    type:any;
    payload:any;
}

interface AuthContextInterface{
    user?: any;
    dispatch?: Dispatch<SetStateAction<any>>
}

const initState:AuthContextInterface= {
    user:null,
};

export const AuthContext = createContext(initState)

const authReducer = (state: AuthContextInterface, action:actionType): AuthContextInterface =>{    
    console.log("authReducer");
    switch(action.type){
        case('LOGIN'):
            return {user: action.payload}
        case('LOGOUT'):
            return {user: null}
        default:
            return state
    }
}

type ChildrenType={
    children:ReactNode
}
export const AuthContextProvider = ({children}:ChildrenType)=>{
    const [state, dispatch] = useReducer(authReducer,initState)
    
    useEffect(()=>{
        const lcl=localStorage.getItem('user')
        if(lcl){ 
        const user = JSON.parse(lcl)
        if(user){
            dispatch({type: 'LOGIN', payload:user})
        }
        }
    },[])
    console.log('AuthContext state: ', state)
    return (<AuthContext.Provider value ={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>)
}
