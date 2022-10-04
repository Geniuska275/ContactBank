import React from "react";
import { useState,useEffect } from "react";
export default function Staff(){
    const [staffs,setStaffs]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000/staff").then(
            res=>res.json()
        ).then(data=>{
            setStaffs(data)
        })
    },[])

    return(
        <>

        {staffs.map((staff)=>(
            <div key={staff.id}>
                <h3>{staff.name}</h3><br></br>
                <h3>{staff.email}</h3><br></br>
            </div>
        ))}
        </>
    )
}