import {useState} from 'react'
import { useSelection } from '../hooks/useSelection'
import arrayGenerator from '../utils/arrayGenerator'
import { Link } from 'react-router-dom';
const TestGame = () =>{
    const {getBag}=useSelection();
    const [editOptionCount, setEditOptionCount] = useState(5);
    const [optionCount, setOptionCount] = useState(editOptionCount);
    const {words}=getBag();
    const [questionNo,setQuestionNo]=useState(0);
    const [score,setScore]=useState(0);
    const [report,setReport]=useState("");
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
            setReport("")
        }else{
            setReport(getWrongAnswerReport(key))
        }        
    } 
    const newGame=()=>{
        setQuestionNo(0);
        setScore(0);
        setOptionCount(editOptionCount)
    }
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        let cnt = e.target.valueAsNumber;
        cnt = cnt<3 ? 3: cnt>10 ? 10 :cnt
        setEditOptionCount(cnt)    
   }
     
    return (
        <div > 
            <h3>Test Game</h3>
            <h2>{`${score} Correct in ${questionNo}`}</h2>

            <h2>{getQuestionText(0)}</h2>
            <div>
                {options.map((i)=>(<button onClick={()=>handleSelection(i)} key={i}>{getOptionText(i)}</button>))}                     
            </div>   
            <div>
                {report}                     
            </div>  

            <Link to={"/"}>
            <button>Exit</button>
            </Link> 
            <input type="number" value={editOptionCount} onChange={handleChange}/>
            {editOptionCount!==optionCount  && <button onClick={newGame} >New Game</button>}
            
        </div>        
    )
}

export default TestGame
