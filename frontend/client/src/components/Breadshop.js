import React from "react";
import { buyBread } from "../redux";
import { addBread } from "../redux";
import{connect} from 'react-redux';
import {useState,useContext} from "react";
import { BreadContext } from "./BreadContext";
import {breadReducer} from "../redux/breads/breadReducer"
import { Placeholder } from "react-bootstrap";





 function Breadshop(props){
    const[breads,setBreads]=useState(0);
    const[sold,setSold]=useState(0);
    console.log(props.numOfBreads)
    const styles={
        backgroundColor:"orangered",
        padding:"20px",
        borderRadius:"5px"
    }

    return(
        <div className="BreadShop" style={{marginTop:"30px",textAlign:"center"}}>
           
            <h4 style={{fontSize:"30px"}}>BREADSHOP</h4>
            <h4 style={{marginTop:"60px"}}>Bread Seller</h4>
            

            <span style={{fontWeight:"Bold"}}>Number of Breads-{props.numOfBreads}</span><br></br>
            <button style={styles} onClick={props.buyBread}>sells a  Bread</button>
        
            <h4 style={{fontSize:"30px" ,marginTop:"20px"}}>MANAGER </h4>
            
            
            
            <span style={{fontWeight:"Bold"}}>Number of Breads-{props.numOfBreads}</span><br></br>   
            <button style={styles} onClick={props.addBread}>Add 24 Breads</button>

        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        numOfBreads:state.numOfBreads,
    }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    buyBread:()=>dispatch(buyBread()),
    addBread:()=>dispatch(addBread())
  }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Breadshop)