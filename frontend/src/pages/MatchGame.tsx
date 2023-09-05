import { useEffect, useState } from 'react'
import { useGameContext } from "../hooks/useGameContext";
import { useSelection } from '../hooks/useSelection'
import arrayGenerator from '../utils/arrayGenerator'

import { Link } from 'react-router-dom';
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
        //console.log(selection)
        //console.log(words)
        const { questions, score } = selection
        const wp = words[questions[i]];
        console.log({func:"_getWordText",wp,i,q:questions[i]})
        const answer = (score !== -1 && !isAnswerCorrect(index)) ? ` = ${wp.second}, NOT ` : ""
        return questions ? questionAnswer === QUESTION ? `${i} ${questions[i]} ${wp.first}${answer}` : `${i} ${questions[i]} ${wp.second}` : "QUESTIONS EMPTY"
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
    const getList = (questionAnswer: number, selIndex: number) => {
        console.log({func:"getList", selection, questionAnswer, selIndex})
        return <>
            {selIndex === DESEL ?
                selection.list[questionAnswer][selIndex].map((i, index) => (<div key={i}><button className={selection.selIndex[questionAnswer] === index ? 'selected' : ""} onClick={() => handleSelection(questionAnswer, index)} >{_getWordText(index, i, questionAnswer)}</button></div>)) :
                selection.list[questionAnswer][selIndex].map((i, index) => (<div key={i}><button >{_getWordText(index, i, questionAnswer)}</button></div>))}
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
        //
    }
    const { score, optionCount } = selection

    return (
        <div >
            <h3>Match Game</h3>
            <h2>{score > -1 && `${score} Correct in ${optionCount}`}</h2>
            <div className='list'>
                <div className='firstlistMG'>
                    <h4>First</h4>
                    {getList(QUESTION, DESEL)}
                </div>

                <div className='secondlistMG'>
                    <h4>Second</h4>
                    {getList(ANSWER, DESEL)}
                </div>

            </div>

            <div className='list'>
                <div className='selfirstlistMG'>
                    <h4>Selected First</h4>
                    {getList(QUESTION, SEL)}
                </div>

                <div className='selsecondlistMG'>
                    <h4>Selected Second</h4>
                    {getList(ANSWER, SEL)}
                </div>
                <div className='cancelMG'>
                    <h4>Cancel Buttons</h4>
                    {score === -1 && selection.list[ANSWER][SEL].map((i, index) => (<button className='cancelbutton' onClick={() => handleCancelSelection(index)} key={i}>X</button>))}
                </div>
            </div>

            <div className='bottombarMG'>
                {selection.list[ANSWER][DESEL].length === 0 && score === -1 && <button onClick={handleFinish} >Finish</button>}
                <Link to={"/"}>
                    <button>Exit</button>
                </Link>
                <input type="number" value={optCount} onChange={handleChange} />
                {<button onClick={newGame} >New Game</button>}

            </div>


        </div>
    )

}

export default MatchGame
