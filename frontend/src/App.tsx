import { useEffect, useState } from 'react'
import { WordPair } from '../../backend/models/WordPair'
import './App.css'

function App() {

  const [words ,setWords]=useState<WordPair[]>([]);

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
        setWords(js);
        console.log({words})
      }
    }
    fetchWords();
  },[])
  return (
    <div className="App">
      {words && words.map(({first,second})=>
        <p key= {first}>{`${first} = ${second}`}</p>
       )}
    </div>
  );
}

export default App
