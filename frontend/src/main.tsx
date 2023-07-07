import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { WordsContextProvider } from './context/WordContext';
import { AuthContextProvider } from './context/AuthContext';
import Login from './pages/Login';

ReactDOM.render(
  <React.StrictMode>
      <AuthContextProvider>
        <WordsContextProvider>
          <App />
        </WordsContextProvider>        
      </AuthContextProvider>    
  </React.StrictMode>,
  document.getElementById('root')
)
