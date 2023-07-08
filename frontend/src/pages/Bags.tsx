import { useEffect } from "react";
import { useWordContext } from "../hooks/useWordsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import { Link } from "react-router-dom";
import BagList from "../components/BagList";
import TopBar from "../components/TopBar";
import AddBag from "../components/AddBag"
import AddBagWordCsv from "../components/AddBagWordCsv";

const Bags = (props: { edittable: boolean })=>{
        
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
            <Link to='/' >Home</Link>
            <div>
                <TopBar address=""/>              
                <BagList edittable={props.edittable}/>          
                {props.edittable && <AddBag/>}
                {props.edittable && <AddBagWordCsv/>}
            </div>
        </div>
    )
}
export default Bags;