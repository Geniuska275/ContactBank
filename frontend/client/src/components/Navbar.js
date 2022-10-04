import React from 'react';
import {Link} from 'react-router-dom';
import {useState}from "react";
export default function Navbar(){
    const[showsearch,setShowsearch]=useState(true)
    const[text,setText]=useState(true)
    function changeInput(){
        setShowsearch(prevShow=>!prevShow)
        setText(prevText=>!prevText)
    }
    return(
       <nav className="navbar">

     <Link to="/"className='Link' >
    <div className="brand-title" style={{fontSize:"32px",color:"grey"}}>THE MALL.</div>
    </Link>
        
        <div className="nav-links">
        <ul >        
            {/* <Link to="/Addblogs" className='Link'>
                <li>Addblogs</li>
            </Link>
            <Link to="/Allblogs" className='Link'>
                <li>Allblogs</li>
            </Link>
            <Link to="/reactForms" className='Link'>
                <li>ReactForm Valid</li>
            </Link> */}
            <Link to="/breadshop" className='Link'>
                <li>BreadShop</li>
            </Link>
            <Link to="/TeaStore" className='Link'>
                <li>TeaStore</li>
            </Link>
            <Link to="/BeansStore" className='Link'>
                <li>BeansStore</li>
            </Link>
            <Link to="/sales/summary" className='Link'>
                <li>Summary</li>
            </Link>
        </ul>
    </div>
        
            
        {/* {showsearch?
        <div className='suc'>
          <input style={{padding:"10px"}} name="searched"className='search' placeholder="Search blogs..." aria-label="Search"/>
          </div>
          : <input style={{padding:"10px"}} name="searched" className='search' placeholder="all blogs.." aria-label="Search"/>
          }
          <button className="success"  onClick={changeInput}>{text ? "blogs":"searchBlogs"}</button> */}
       </nav>
    )
}