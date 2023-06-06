import { useEffect, useState } from 'react'
import './App.css'

function App() {
  type WordPair = {
    first: string,
    second: string
}
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
      {words && words.map((word)=>
        <p key= {word.first}>{`${word.first} = ${word.second}`}</p>
       )}
    </div>
  );
}

export default App
