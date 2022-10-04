import React from "react";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addBread } from "../redux";


export default function BreadManager(){
    const [add,setAdd]=useState();
    const breads=useSelector(state=>state.numOfBreads);
    const dispatch=useDispatch();
    const [change,setChange]=useState(true)
    useEffect(()=>{
      setChange(prev=>!prev)
    },[breads])
    return(
        <div className="Breadmanager">
            {change && <h6>Number of breads in Store-{breads}</h6>}
            <h3>Number of breads be Added-{add}</h3><br></br>
             {!change &&<h3>New Number of breads-{breads}</h3>}<br></br>
             <input type="number"
             onChange={(e)=>setAdd(e.target.value)}/><br></br>
            <button onClick={()=>dispatch(addBread())}>{add == 1 ? "Add a Bread":`Add ${add} Breads`}</button>

        </div>

    )
}

