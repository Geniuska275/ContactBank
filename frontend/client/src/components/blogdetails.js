import React from "react";
import {useState,useEffect}from 'react';
import { useParams,useNavigate } from "react-router-dom";
export default function Blogdetails(){
    const navigate=useNavigate()
    const {id}=useParams()
    const [blog,setBlogs]=useState({})
   const[loading,setLoading]=useState("loading..")
   useEffect(()=>{
    setTimeout(()=>{
        fetch('http://localhost:3000/blogss/' + id).then(res=>res.json()).then(
            data=>{
                setBlogs(data)
                console.log(data)
                setLoading(false)
                }
        )
    },1000)
    },[])

  


   const handleDelete=( )=>{
        fetch('http://localhost:3000/blogss/' + id,{
            method:'DELETE'
        }).then(()=>{
            navigate("/Allblogs")
        })
   }


    return(
        <>
        <div className="card" style={{margin:"200px",}}>
            {loading &&<h1>Loading...</h1>}
            
            {blog && (
                <div>
                    <h3>title:{blog.title}</h3>
                  <p>{blog.body}</p>
                  <h4>Author:{blog.author}</h4><br></br>
                  <span> time_created:{blog.time}</span><br></br>
                  <span>created_at:{blog.date}</span><br></br>
                  <button onClick={handleDelete}>delete</button>          
                </div>
            )}
        </div>
        </>
    )
}