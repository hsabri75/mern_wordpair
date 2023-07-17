import {useEffect, useState} from 'react'
import { useSelection } from '../hooks/useSelection'
import arrayGenerator from '../utils/arrayGenerator'
import { Link } from 'react-router-dom';
const MatchGame = () =>{
    const {getBag}=useSelection();
    const [optionCount, setOptionCount] = useState(5);
    const {words}=getBag();
    const [score,setScore]=useState(-1);
    const {getshuffled,removeAt} = arrayGenerator();
    const [questions,setQuestions]=useState(getshuffled(words.length,optionCount))
    const [selection,setSelection]=useState({list:[[getshuffled(optionCount,optionCount), []] , [getshuffled(optionCount,optionCount), []]], selIndex:[-1,-1] })
    const QUESTION=0;
    const ANSWER=1;
    const DESEL=0;
    const SEL=1;
    
    const move=(from:number[],to:number[],i:number)=>{
        const v= from[i];
        removeAt(from,i);
        to.push(v);
    }

    useEffect(()=>{
        setQuestions(getshuffled(words.length,optionCount));
    },[])

     const getWordText=(index:number, i:number, questionAnswer:number)=>{
        const wp= words[questions[i]];
        const answer = (score!==-1 && !isAnswerCorrect(index)) ? ` = ${wp.second}, NOT ` : "" 
        return questions ? questionAnswer===QUESTION ? `${i} ${questions[i]} ${wp.first}${answer}` : `${i} ${questions[i]} ${wp.second}` : "QUESTIONS EMPTY" 
    }
     const isAnswerCorrect=(index:number):boolean=>selection.list[QUESTION][SEL][index]===selection.list[ANSWER][SEL][index]

     const handleFinish=(): void =>{
        setScore(selection.list[QUESTION][SEL].filter(
            (val:number, index:number)=>isAnswerCorrect(index)).length)
     }
     
    const handleSelection=(questionAnswer:number,  i: number): void =>{
        const {list, selIndex}= selection;
        selIndex[questionAnswer]=i
        if(selIndex[0]>-1 && selIndex[1]>-1){
            for(i=0;i<=1;i++){
                move(list[i][DESEL], list[i][SEL],selIndex[i])
                selIndex[i]=-1
            }
        }
        setSelection({list,selIndex})
    }
    const handleCancelSelection=(i: number): void =>{
        const {list, selIndex}= selection;
        list[i][SEL].forEach((_:number,index:number)=>
            move(list[index][SEL], list[index][DESEL],i)
        )
        setSelection({list,selIndex})
     }
    const getList=(questionAnswer:number, selIndex:number)=>{
        return <>        
        {selIndex===0 ? 
        selection.list[questionAnswer][selIndex].map((i,index)=>(<div key={i}><button className= {selection.selIndex[questionAnswer]===index ? 'selected' :""}  onClick={()=>handleSelection(questionAnswer,index)} >{getWordText(index,i,questionAnswer)}</button></div>)) :
        selection.list[questionAnswer][selIndex].map((i,index)=>(<div key={i}><button >{getWordText(index,i,questionAnswer)}</button></div>))}
        </>
    } 
    const newGame=()=>{
        setQuestions(getshuffled(words.length,optionCount))
        setSelection({list:[[getshuffled(optionCount,optionCount), []] , [getshuffled(optionCount,optionCount), []]], selIndex:[-1,-1] })
        setScore(-1)
    }

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        let cnt = e.target.valueAsNumber;
        cnt = cnt<3 ? 3: cnt>10 ? 10 :cnt
        setOptionCount(cnt)    
   }
    
      return (
         <div > 
             <h3>Match Game</h3>
             <h2>{score>-1 && `${score} Correct in ${optionCount}`}</h2>
             <h4>First</h4>
            <div>
                {getList(QUESTION,DESEL)}
             </div>
             <h4>Second</h4>
             <div>
                {getList(ANSWER,DESEL)}
             </div>
             <h4>Selected First</h4>
             <div>
                {getList(QUESTION,SEL)}
             </div>             
             <h4>Selected Second</h4>
             <div>
                {getList(ANSWER,SEL)}
             </div>
             <div>
             {score===-1 && selection.list[ANSWER][SEL].map((i,index)=>(<button onClick={()=>handleCancelSelection(index)}  key={i}>X</button>))}
             </div>             
             {selection.list[ANSWER][DESEL].length===0 && score===-1 && <button onClick={handleFinish} >Finish</button> }             
            <Link to={"/"}>
            <button>Exit</button>
            </Link>
            <input type="number" value={optionCount} onChange={handleChange}/>
            {(score>-1 || selection.list[QUESTION][DESEL].length+selection.list[QUESTION][SEL].length!==optionCount) && <button onClick={newGame} >New Game</button>}
             
         </div>        
     )

}

export default MatchGame
