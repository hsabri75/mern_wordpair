//import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import { useAuthContext } from './hooks/useAuthContext';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useSelection } from "./hooks/useSelection"
import Bags from './pages/Bags';
import TestGame from './pages/TestGame';
//import Words from './pages/Words';

function App() {
  const {getBagName}=useSelection();
  const {user}=useAuthContext();  


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
        <Route
              path="/login"
              element={!user ? <LoginSignup/> : <Navigate to="/"/>}
            />
        <Route
              path="/"
              element={user ? <Bags /> : <Navigate to="/login"/>}
            />
        <Route
              path="/testgame"
              element={user ? (getBagName()!=="" ? <TestGame />: <Navigate to="/"/> ): <Navigate to="/login"/>}
            />
            
      </Routes>
      </BrowserRouter>
      {console.log({user})}
      

    </div>
  );
}

export default App
