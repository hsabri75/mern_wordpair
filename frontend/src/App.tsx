//import Home from './pages/Home';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import WordList from './components/WordList';
import Bags from './pages/Bags';
import Words from './pages/Words';

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
              path="/words/:bagName"
              element={ user ? <Words edittable={false}/> : <Navigate to="/login"/>}
            />
          <Route
              path="/edit/words/:bagName"
              element={ user ? <Words edittable={true} /> : <Navigate to="/login"/>}
            />
          <Route
              path="/edit/bags"
              element={ user ? <Bags edittable={true}/> : <Navigate to="/login"/>}
            />
            <Route
              path="/"
              element={user ? <Bags edittable={false}/> : <Navigate to="/login"/>}
            />
            
      </Routes>
      </BrowserRouter>
      {console.log({user})}
      

    </div>
  );
}

export default App
