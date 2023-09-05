import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { WordsContextProvider } from './context/WordContext';
import { AuthContextProvider } from './context/AuthContext';
import { SelectionContextProvider } from './context/SelectionContext';
import { GameContextProvider } from './context/GameContext';


ReactDOM.render(
  <React.StrictMode>
      <AuthContextProvider>
        <WordsContextProvider>
          <SelectionContextProvider>
            <GameContextProvider>
              <App />
            </GameContextProvider>            
          </SelectionContextProvider>          
        </WordsContextProvider>        
      </AuthContextProvider>    
  </React.StrictMode>,
  document.getElementById('root')
)
