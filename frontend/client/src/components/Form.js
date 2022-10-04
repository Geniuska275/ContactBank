import React from "react";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
export default function Form(){
    const navigate=useNavigate()
    const[formData,setFormdata]=useState({
        name:"",
        email:"",
        date:new Date().toLocaleDateString(),
        time:new Date().toLocaleTimeString()
    })

    //function to setForm states

    function CollectInputs(e){
        const {name,value}=e.target
        setFormdata(prevData=>(
            {...prevData,
                [name]:value
            }
        ))
    }

    // submit function
    function handleSubmit(e){
        e.preventDefault()

            fetch("http://localhost:3000/staff", {
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(formData)
            }).then(
                ()=>{
                    navigate("/")
                    console.log("form submitted")
                }
            )
        console.log(formData)
    }





    return(
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label><br></br>
            <input
             type="text"
             name="name"
             onChange={CollectInputs}
             value={formData.name}
             /><br></br>
             <label htmlFor="email">Email:</label><br></br>
             <input 
             type="text"
             name="email"
             onChange={CollectInputs}
             value={formData.email}
             /><br></br>
             <button>submit</button>
        </form>
        </>
    )
}