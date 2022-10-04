import React from "react";
import{useState} from "react";
import {useNavigate} from "react-router-dom";
export default function Addblogs(){
    const navigate=useNavigate()
    const [submit,setSubmit]=useState(true)
    const [blog,setBlog]=useState({
        title:"",
        author:"",
        body:"",
        date:new Date().toLocaleDateString(),
        time:new Date().toLocaleTimeString()
    })

    function collectInputs(e){
        const{ name,value}=e.target
        setBlog(prevBlog=>{
            return{
              ...prevBlog,
              [name]:value
            }
        })
    }
     function handleSubmit(e){
        e.preventDefault();
        setSubmit(false)

        setTimeout(()=>{
            fetch("http://localhost:3000/blogss",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(blog)
            }).then(()=>{
                navigate("/Allblogs")

            })
        },6000)
     }
      const buttonStyles={
          padding:"20px",
          border:"none",
          borderRadius:"10px",
          backgroundColor:"orangered"
      }

    return(
        <div className="container">
            <div className="Addblogs" >
                <h5>Addblogs</h5>
                 <form onSubmit={handleSubmit} className="form">
                    <input 
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    value={blog.title}
                    onChange={collectInputs}/><br></br><br></br>
                    <input
                    type="text"
                    name="author"
                    placeholder="Enter Author"
                    value={blog.author}
                    onChange={collectInputs}
                   /><br></br><br></br>
                   <textarea 
                    name="body"
                    onChange={collectInputs}
                    value={blog.body}
                    placeholder="Type here..."
                    row="10"
                    col="12"
                    /><br></br>
                   {submit? <button className="buttonStyles">SUBMIT</button>:
                   <div className="preloader">
                     SUBMITTING
                     <div className="load"></div>
                     </div>}
            </form>
            
        </div>
    </div>
    )
}