import { ReactChild, ReactFragment, ReactPortal, useEffect } from "react";
import { useWordContext } from "../hooks/useWordsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { WordPair, BagList, BagWords } from '../../../backend/types/types'

const Home = ()=>{
    const {bags, dispatch}= useWordContext();
    const {user}=useAuthContext();
    useEffect(()=>{
        const fetchWords= async()=>{
            const resp =await fetch('/api/bag',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await resp.json();
            if(resp.ok && dispatch){
                console.log({json})
                dispatch({type:'SET_BAGS', payload:json})
            }
        }
        if(user){
            fetchWords();
        }
    },[dispatch,user])
    return (
        <div>
            <h1>Home</h1>
            <div>
            {bags.map((bag)=>
            <>
                <h2 key= '${bag.bag}'>{bag.bag}</h2>
                {bag.words.map((w)=>
                <>
                    <h4 key={w.first}>{`${w.first}=${w.second}`}</h4>
                </>
                )} 
            </>
                           
            )}
            </div>
        </div>
    )
}
export default Home;