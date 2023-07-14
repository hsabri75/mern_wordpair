import {useState} from 'react'
import { useSelection } from '../hooks/useSelection'
import arrayGenerator from '../utils/arrayGenerator'
const MatchGame = () =>{
    const {getBag}=useSelection();
    const optionCount=5;
    const {words}=getBag();
    
    const {getshuffled,removeAt, selectionArray} = arrayGenerator();
    //const [selection,setSelection]=useState({fList:[1,2,3,4], fSelList:[], sList:[11,22,33,44], sSelList:[], f:-1 ,s:-1 })
    const [selection,setSelection]=useState({list:[[[1,2,3,4], []] , [[11,22,33,44], []]], selIndex:[-1,-1] })
    
    const move=(from:number[],to:number[],i:number)=>{
        const v= from[i];
        removeAt(from,i);
        to.push(v);
    }

    const sel=(unsIndex:number, i:number )=>{
        const {list, selIndex}= selection;
        selIndex[unsIndex]=i
        if(selIndex[0]>-1 && selIndex[1]>-1){
            move(list[0][0], list[0][1],selIndex[0])
            move(list[1][0], list[1][1],selIndex[1])
            selIndex[0]=-1,
            selIndex[1]=-1
        }
        setSelection({list,selIndex})
    }
    const unSel=(i:number )=>{
        const {list, selIndex}= selection;

        move(list[0][1], list[0][0],i)
        move(list[1][1], list[1][0],i)

   
        setSelection({list,selIndex})
    }
    



    // const f= selectionArray(optionCount);
    // console.log(f); 
    // f.select(2);
    // console.log(f); 
     const questions=getshuffled(words.length,optionCount);
     const options= getshuffled(optionCount,optionCount); 
     const getWordText=(i:number)=>{
         return `${words[questions[i]].first} = ${words[questions[i]].second}, ${i} - ${questions[i]}`
     }

     
    const handleSelection=(unsIndex:number, selIndex:number, i: number): void =>{
       console.log(unsIndex, "-", selIndex, "-", i)
       sel(unsIndex,i)
    }
    const handleCancelSelection=(i: number): void =>{
        console.log( i)
        unSel(i)
     }
    const getList=(unsIndex:number, selIndex:number)=>{
        return <>
        {selIndex===0 ? 
        selection.list[unsIndex][selIndex].map((i,index)=>(<button className= {selection.selIndex[unsIndex]===index ? 'selected' :""}  onClick={()=>handleSelection(unsIndex,selIndex,index)} key={i}>{i}</button>)) :
        selection.list[unsIndex][selIndex].map((i,index)=>(<button key={i}>{i}</button>))}
        </>
    } 

    // return (
    //     <div > 
    //         <h3>Match Game</h3>
    //         <div>
    //             {selection.fList.map((i)=>(<button onClick={()=>handleSelection(i)} key={i}>{getWordText(i)}</button>))}
    //         </div>
    //         <h2>{getWordText(0)}</h2> 
    //     </div>        
    // )
      return (
         <div > 
             <h3>Match Game</h3>
             <h4>first</h4>
            <div>
                {getList(0,0)}
             </div>
             <h4>second</h4>
             <div>
                {getList(1,0)}
             </div>
             <h4>selected</h4>
             <div>
                {getList(0,1)}
             </div>
             <div>
                {getList(1,1)}
             </div>
             <div>
             {selection.list[1][1].map((i,index)=>(<button onClick={()=>handleCancelSelection(index)}  key={i}>X</button>))}
             </div>
             <h2>{getWordText(0)}</h2> 
         </div>        
     )

}

export default MatchGame
