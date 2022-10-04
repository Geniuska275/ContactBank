import React from "react";
import{useState,useEffect} from "react";
export default function Viewrecruiters(){
    const[recruiters,setRecruiters]=useState([]);
    const[norecruiter,setNorecruiter]=useState(true);
    useEffect(()=>{
        fetch("http://localhost:3003/recruiters").then(
             (res)=>{
                res.json
             }
            ).then(
            data=>{
                console.log(data)
                setRecruiters(data)
            }
        )
    },[])
    
   return(
    <>
    {norecruiter && "loading..."}
    {recruiters &&<div className="recruiter">
        {recruiters.map((recruit)=>(
            <div key={recruit.id}>
                <h1>firstname:{recruit.firstname}</h1>
                <h1>lastname:{recruit.lastname}</h1>
                <h1>stack:{recruit.stack}</h1>
                <h1>employmentStatus:{recruit.employment}</h1>
            </div>
        ))}
        </div>}
    </>
   )
}