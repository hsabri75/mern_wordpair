import { useEffect, useState } from 'react'
import { useGameContext } from "../hooks/useGameContext";
import { useSelection } from '../hooks/useSelection'
import arrayGenerator from '../utils/arrayGenerator'


const MatchGame = () => {
    const { selection, dispatch } = useGameContext()
    const {getshuffled} = arrayGenerator();
    const [optCount,setOptCount]=useState(selection.optionCount);
    const { words } = useSelection().getBag();
    const QUESTION = 0;
    const ANSWER = 1;
    const DESEL = 0;
    const SEL = 1;

        useEffect(()=>{
            dispatch && dispatch({ type: 'SETOPTIONCOUNT', payload: { questionAnswer: -1, index: optCount, questions: getshuffled(words.length,optCount) } })
        },[])

    const _getWordText = (index: number, i: number, questionAnswer: number) => {
        const { questions, score } = selection
        const wp = words[questions[i]];
        console.log({func:"_getWordText",wp,i,q:questions[i]})
        const answer = (score !== -1 && !isAnswerCorrect(index)) ? ` = ${wp.second}, NOT ` : ""
        return questions ? questionAnswer === QUESTION ? `${wp.first}${answer}` : `${wp.second}` : "QUESTIONS EMPTY"
    }
    const isAnswerCorrect = (index: number): boolean => selection.list[QUESTION][SEL][index] === selection.list[ANSWER][SEL][index]

    const handleFinish = (): void => {
        const scr = (selection.list[QUESTION][SEL].filter(
            (val: number, index: number) => isAnswerCorrect(index)).length)
        dispatch && dispatch({ type: 'SETSCORE', payload: { questionAnswer: -1, index: scr } })
    }

    const handleSelection = (questionAnswer: number, index: number): void => {
        
        dispatch && dispatch({ type: 'SELECT', payload: { questionAnswer, index } })
    }
    const handleCancelSelection = (index: number): void => {
        dispatch && dispatch({ type: 'DESELECT', payload: { questionAnswer: -1, index } })
    }
    const getButtonByCorrectness=(i:number, index:number, questionAnswer:number)=>{
        return <div key={i} ><button className= {(score !== -1 && !isAnswerCorrect(index))? "wrong margin5" :"margin5"} >{_getWordText(index, i, questionAnswer)}</button></div>

    }
    const getList = (questionAnswer: number, selIndex: number) => {
        console.log({func:"getList", selection, questionAnswer, selIndex})
        return <>
            {selIndex === DESEL ?
                selection.list[questionAnswer][selIndex].map((i, index) => (<div key={i}><button className={selection.selIndex[questionAnswer] === index ? 'selected margin5 selbutton' : 'margin5 selbutton'} onClick={() => handleSelection(questionAnswer, index)} >{_getWordText(index, i, questionAnswer)}</button></div>)) :
                selection.list[questionAnswer][selIndex].map((i, index) => getButtonByCorrectness(i,index,questionAnswer))}
        </>
    }
    const newGame = () => {
        dispatch && dispatch({ type: 'SETOPTIONCOUNT', payload: { questionAnswer: -1, index: optCount, questions: getshuffled(words.length,optCount) } })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let cnt = e.target.valueAsNumber;
        cnt = cnt < 3 ? 3 : cnt > 10 ? 10 : cnt
        console.log({func:'handleChange', cnt})
        setOptCount(cnt)
        
    }
    const { score, optionCount } = selection

    return (
        <div >
            <h3>Match Game</h3>
            <h2>{score > -1 && `${score} Correct in ${optionCount}`}</h2>
            <div className='list'>
                <div className='firstlistMG'>
                    
                    {getList(QUESTION, DESEL)}
                </div>

                <div className='secondlistMG'>
                    
                    {getList(ANSWER, DESEL)}
                </div>
            </div>
            <div>
                {selection.list[ANSWER][DESEL].length === 0 && score === -1 && <button className='margin5 selbutton' onClick={handleFinish} >Check Answers</button>}
            </div>

            <div className='list'>
                <div className='selfirstlistMG'>                    
                    {getList(QUESTION, SEL)}
                </div>  
                <div className='selsecondlistMG'>                    
                    {getList(ANSWER, SEL)}
                </div>
                <div className='cancelMG'>

                    {score === -1 && selection.list[ANSWER][SEL].map((i, index) => (<button className='cancelbutton margin5 selbutton' onClick={() => handleCancelSelection(index)} key={i}>X</button>))}
                </div>
            </div>
            
           

            <div className='bottombarMG'>
                
                <input type="number" value={optCount} onChange={handleChange} />
                {<button className='margin5 selbutton' onClick={newGame} >New Game</button>}

            </div>

        </div>
    )

}

export default MatchGame
