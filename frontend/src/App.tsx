//import Home from './pages/Home';
import Login from './pages/LoginSignup';
import { useAuthContext } from './hooks/useAuthContext';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Bags from './pages/Bags';
//import Words from './pages/Words';

function App() {

  const {user}=useAuthContext();  

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
        <Route
              path="/login"
              element={!user ? <Login/> : <Navigate to="/"/>}
            />
            <Route
              path="/"
              element={user ? <Bags /> : <Navigate to="/login"/>}
            />
            
      </Routes>
      </BrowserRouter>
      {console.log({user})}
      

    </div>
  );
}

export default App
