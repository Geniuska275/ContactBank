import React from "react";
import{useState,useMemo,useCallback,useEffect} from 'react';

export default function Callbacks(){
    const[theme,setTheme]=useState(true);
    const [count,setCount]=useState(0);
    const[number,setNumber]=useState(1)

    const styles={
        backgroundColor:theme?"black":"white",
        padding:"50px"
    }
    const handleClick=useCallback(()=>{
        setCount(count=>count +1)
        console.log("fires")
    },[count])

    console.log("component re-renders")

   

    useEffect(()=>{
        console.log("count function is called")
    },[handleClick])
    return(
        <div style={styles}>
            <h4 style={{color:"red"}}>{count}</h4>
            <h4 style={{color:"red"}}>{number}</h4> 
            <input type="type"
             onChange={(e)=>setNumber(e.target.value)}/>
             
            <button onClick={handleClick}>increment</button>
            <button onClick={()=>setTheme(prev=>!prev)}>change theme</button>

        </div>
    )

}