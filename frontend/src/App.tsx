import { useEffect, useState } from 'react'
import { WordPair } from '../../backend/types/types'
import Home from './pages/Home';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';


function App() {

  const {user}=useAuthContext();
  

  useEffect(()=>{
    const fetchWords=async () => {
      
      const resp = await fetch("http://localhost:4001/api/words");
      console.log(resp)
      const json = await resp.json();
      const js = await JSON.parse(json);
      console.log({json});
      console.log({js});
      if(resp.ok){ 
        console.log("resp ok ! hus")       

      }
      
    }
    //fetchWords();
  },[])
  return (
    <div className="App">
      <Home/>
      {!user && <Login/>}      
      

    </div>
  );
}

export default App
