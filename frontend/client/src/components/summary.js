import { useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Summary(){


    const breads =useSelector(state=>state.breads.numOfBreads);
    const tea=useSelector(state=>state.tea.numOfTea);
    const beans=useSelector(state=>state.beans.numOfBeans);


    

  const total= (function AddProducts(){
        return breads + tea +beans
    })()
   console.log(total)
    return(
        <div style={{textAlign:"center"}}>
        <h4>total products in shop -  {total}</h4>
        <Link to="/sales/summary">
        <button>View Sales Summary</button>
        </Link>
        
        
        </div>
        
    )
}