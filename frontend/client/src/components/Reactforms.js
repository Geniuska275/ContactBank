import React from 'react';
import {useForm} from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import{ forms ,Card} from "react-bootstrap";


export default function Reactforms(){    
    const[formData,setFormData]=useState({});
    const [success,setSuccess]=useState(false);
    const [email,setEmail]=useState("")
    const navigate=useNavigate();
    
    console.log(formData)
   


     //handle disabled

     
     const{register,
        handleSubmit,
        reset,
        trigger,
        watch,
        formState:{errors}}=useForm();
        
        
        const onSubmit=(data)=>{
            reset()
            const  time=new Date().toLocaleTimeString()
            const  date=new Date().toLocaleDateString()
            console.log(time,date)

            setFormData(prevState=>[...prevState,{
                title:data.title,
                author:data.author,
                body:data.body,
                date:date,
                time:time}])
                
                fetch("http://localhost:3001/blogss",{
                    method:"POST",
                    headers:{"content-type":"application/json"},
                    body:JSON.stringify(data)
                }).then(()=>{
                    navigate("/Allblogs")
                })
                setEmail(data.email)
                setSuccess(true)
                
                
                
            }
            
            const title=watch("title")
            const author=watch("author")
            const body=watch("body");
            console.log("title",title)
            console.log("author",author)
            console.log("body",body)
            const isValid=author && title && body
     
      

        const styles={
            backgroundColor:"red"
        }

    return(
        <div className='valid'>

           {success?<div className='formcard'>

              <p className='succ'> {email} have successfully signed up.
               proceed to login</p>
               <button className='validbtn' onClick={()=>{
                   navigate("/Allblogs")
               }}>login</button>


           </div>:





              
            <div className='Addblogs'>
                <h5>React Form Validation.</h5>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value={new Date().toLocaleTimeString()}
                    {...register("time")}
                     />
                      <input type="hidden" value={new Date().toLocaleDateString()}
                    {...register("date")}
                     />
                    
                    
                    <input 
                    className="forminput"
                    id="title"
                    placeholder='Enter Title...'
                    type="text"
                    {...register("title",{
                        required:{
                        value:true,
                       message: "title is required"}})}
                    onKeyUp={()=>{
                        trigger("title")
                        }}/>
                        <br></br>
            
                    {errors.title &&(<small>{errors.title.message}</small>)}

                    <br></br>
        
                    <input 
                    className="forminput"
                    id="author"
                    placeholder='Enter Author...'
                    type="text"
                    {...register("author",{required:"author is required"})}
                    onKeyUp={()=>{
                        trigger("author")
                        }}/>
                    <br></br>
                    {errors.author&&(<small>{errors.title.author}</small>)}
                     <br></br>
                  
                    <textarea
                    className='forminput formborder'

                    id="body"
                    type="text"
                    placeholder='type a message...'
                    {...register("body",{required:"Body is required",minLength:{
                        value:20,
                        message:"minimum allowed length is 20"
                    },
                    maxLength:{
                        value:50,
                        message:"maximum allowed lenght is 50"
                    }})}
                    onKeyUp={()=>{
                        trigger("body")
                        }}
                    />
                    <br></br>
                    {errors.body && (<small>{errors.body.message}</small>)}

                    <br></br>
        
                         {isValid? <button className='fade'> SUBMIT</button>:<button className="vali"  disabled={true}>SUBMIT</button>}
                </form>
                <div className='Card'></div>
            </div>}
        </div>





    )






}