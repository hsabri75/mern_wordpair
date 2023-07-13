import {useState} from 'react'
import { useSelection } from '../hooks/useSelection'

const TestGame = () =>{
    const {getBag}=useSelection();
    const optionCount=5;
    const {words}=getBag();
    const [questionNo,setQuestionNo]=useState(0);
    const [score,setScore]=useState(0);
    const [report,setReport]=useState<string[]>([]);

    const arrayRange = (start:number, stop: number, step: number): number[] =>{
        return Array.from({ length: (stop - start) / step + 1 },(value, index) => start + index * step);
    }    

    const getshuffled=(limit:number, optionCount:number):number[]=>{
        const sh:number[]=[];
        const source=arrayRange(0,limit,1);
        while(sh.length<optionCount){
            let lim=limit-sh.length
            const ran = Math.floor(Math.random() * lim);
            const v= source[ran]
            source[ran]= source[lim-1]
            source.pop();
            sh.push(v)
        }
        return sh;
    }

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
