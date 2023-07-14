import {useState} from 'react'
import { useSelection } from '../hooks/useSelection'
import arrayGenerator from '../utils/arrayGenerator'
const TestGame = () =>{
    const {getBag}=useSelection();
    const optionCount=5;
    const {words}=getBag();
    const [questionNo,setQuestionNo]=useState(0);
    const [score,setScore]=useState(0);
    const [report,setReport]=useState<string[]>([]);
    const {getshuffled} = arrayGenerator();

    

    const questions=getshuffled(words.length,optionCount);
    const options= getshuffled(optionCount,optionCount);   
    const getQuestionText=(num: number)=>{
        return <>
                {` ${words[questions[num]].first} ?`}
            </>        }

    const getOptionText=(num: number)=>{
        return <>
                {` ${words[questions[num]].second}`}
                </>        }

    const getWrongAnswerReport=(key:number)=>{
        return `${words[questions[0]].first} = ${words[questions[0]].second}, NOT ${words[questions[key]].second}`
    }
    const handleSelection=(key:number)=>{
        setQuestionNo(questionNo+1)
        if(key===0){
            setScore(score+1)
        }else{
            const r= getWrongAnswerReport(key)
            report.push(r)
            setReport(report)
            console.log(r)
        }        
    } 
     
    return (
        <div > 
            <h3>Test Game</h3>
            <h2>{`${score} Correct in ${questionNo}`}</h2>
            <h2> {report}</h2>
            <h2>{getQuestionText(0)}</h2>
            <div>
                {options.map((i)=>(<button onClick={()=>handleSelection(i)} key={i}>{getOptionText(i)}</button>))}                     
            </div>   
            <div>
                {report.map((item,index)=>(<div  key={index}>{item}</div>))}                     
            </div>   
        </div>        
    )
}

export default TestGame
