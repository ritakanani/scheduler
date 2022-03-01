import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace = false) {
      // setMode(mode); 
      console.log("first mode", mode)  ;
    if (replace) {
      // make copy of history
      // delete the last element from history array
      // set history with modified copy and mode

      const trimmedHistory = history.slice(0, history.length-1);      
      // console.log("trim", trimmedHistory) // ['first']      
      setHistory(prev => [...trimmedHistory, mode]);      
    } else {
      setHistory(previousItem => [...previousItem, mode]);
    }
           
  }

  function back() {
    if (history.length <= 1) {
      return;
    }
    const trimmedHistory = history.slice(0, history.length-1);
    setHistory(prev => [...trimmedHistory]);    
  }
    
  return { mode: history[history.length-1], transition, back };
}
