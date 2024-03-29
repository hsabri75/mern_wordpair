
import LoginSignup from './pages/LoginSignup';
import { useAuthContext } from './hooks/useAuthContext';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Bags from './pages/Bags';


function App() {
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

            
      </Routes>
      </BrowserRouter>

      

    </div>
  );
}

export default App
