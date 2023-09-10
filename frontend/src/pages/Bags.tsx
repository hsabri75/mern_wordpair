import { useEffect } from "react";
import { useWordContext } from "../hooks/useWordsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import BagList from "../components/BagList";
import TopBar from "../components/TopBar";
import { useSelection } from "../hooks/useSelection";
import WordList from "../components/WordList";
import ModeSelection from "../components/ModeSelection";
import MatchGame from "../components/MatchGame";


const Bags = ()=>{
    const {getBagName,selectBag, getSelection}=useSelection();    
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
        console.log({bagsHome:bags})
        if(user && bags.length===0){
            fetchWords();
        }
    },[dispatch,user])


   
    return (            
            <div>
                <TopBar/>           
                {getBagName()==="" ? <BagList /> : ( getSelection().mode==='PLAY'  ? <MatchGame/> :  <WordList/> ) }
                
            </div>

    )
}
export default Bags;