import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Bloglist({blogs}){
    const navigate=useNavigate();


    const handleDeleteAll=()=>{
        fetch('http://localhost:3000/blogss',{
            method:'DELETE'
        }).then(()=>{
            console.log("Deleted all")
            navigate("/")
        })
    }
    return(
        <div className="blogs">
            {blogs.map((blog) =>(
                <div key={blog.id} className="card" >
                    <h3>title: {blog.title}</h3>
                    <div className="body">
                    <p>{blog.body.slice(0,50)}</p>
                    </div>
                    <span>Author:{blog.author}</span><br></br>
                    <span>created_at:{blog.date}</span><br></br>
                    <span>time_created:{blog.time}</span><br></br>
                    <div>                 
                   <Link to={`/Blogs/${blog.id}`} className="link">
                    <button className="btn">read more</button>
                    </Link>
                    </div>
                </div>

            ))
             }
             <button onClick={handleDeleteAll}>Delete All</button>
        </div>
    )
}