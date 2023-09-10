import { createContext, useReducer, Dispatch, SetStateAction, ReactNode } from 'react'
import arrayGenerator from '../utils/arrayGenerator'
import { useSelection } from '../hooks/useSelection'

type GameState = {
    list: number[][][],
    selIndex: number[],
    selectionFinished: boolean
    optionCount: number,
    score: number,
    questions: number[],
}

type GameSelection = {
    questionAnswer: number,
    index: number,
    questions: number[],
}

type GameActionType = {
    type: "SELECT" | 'DESELECT' | 'SETSCORE' | 'SETOPTIONCOUNT' ;
    payload: GameSelection;
}


type GameContextInterface = {
    selection: GameState;
    dispatch?: Dispatch<SetStateAction<any>>
}
const { getshuffled, removeAt } = arrayGenerator();

const opt = 4;


const initState: GameContextInterface = {

    selection: {
        list: [[getshuffled(opt, opt), []], [getshuffled(opt, opt), []]], selIndex: [-1, -1],
        selectionFinished: false,
        optionCount: opt,
        score: -1,
        questions: [10, 20, 30, 40]
    },
};

const DESEL = 0;
const SEL = 1;

const move = (from: number[], to: number[], i: number) => {
    const v = from[i];
    removeAt(from, i);
    to.push(v);
}

export const GameContext = createContext(initState)


export const GameReducer = (state: GameContextInterface, action: GameActionType): GameContextInterface => {
    const { questionAnswer, index, questions } = action.payload;
    const sIndex=[...state.selection.selIndex]
    const list = state.selection.list
    const newList= [[[...list[0][0]],[...list[0][1]]],[[...list[1][0]],[...list[1][1]]]]
    switch (action.type) {
        case 'SELECT':
            if (questionAnswer === 0 || questionAnswer == 1) {
                sIndex[questionAnswer] = index;
            }
            if (sIndex[0] > -1 && sIndex[1] > -1) { 
                for (let j = 0; j <= 1; j++) {
                    move(newList[j][DESEL], newList[j][SEL], sIndex[j])
                    sIndex[j] = -1
                }             
            }
            return {
                selection: { ...state.selection, list:newList, selIndex:sIndex}
            }
        case 'DESELECT':
            for (let j = 0; j <= 1; j++) {
                move(newList[j][SEL], newList[j][DESEL], index)
                sIndex[j] = -1
            }
            return {
                selection: { ...state.selection, list:newList, selIndex:sIndex}
            }
        case 'SETSCORE':
            return {
                selection: { ...state.selection, score: index }
            }
        case 'SETOPTIONCOUNT':
            return {
                selection: { ...state.selection, selectionFinished:false, score:-1, optionCount: index, questions: questions, list: [[getshuffled(index, index), []], [getshuffled(index, index), []]], selIndex: [-1, -1], }
            }
    }
}

type ChildrenType = {
    children: ReactNode
}

export const GameContextProvider = ({ children }: ChildrenType) => {
    const [state, dispatch] = useReducer(GameReducer, initState)

    console.log('SelectionContext state: ', state)
    return (<GameContext.Provider value={{ ...state, dispatch }}>
        {children}
    </GameContext.Provider>)
}