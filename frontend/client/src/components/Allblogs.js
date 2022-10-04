import React from "react";
import {useState,useEffect}from "react";
import Bloglist from "./Bloglist";
export default function Allblogs(){
    const[blogs,setBlogs]=useState([])
    const[isPending,setisPending]=useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            fetch("http://localhost:3000/blogss").then(res=>res.json())
            .then(data=>{
                console.log(data)
                setBlogs(data)
            setisPending(false)})
                
        },2000)
    },[])
    console.log(blogs)
    return(
        <div className="Allblog">       
            {isPending && <div className="loader"></div>}
           {blogs && <Bloglist blogs={blogs}/>}       
        </div>
    )
}