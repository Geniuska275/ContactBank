
const toggleButton=document.getElementsByClassName("toggle-button")[0];
const navbarLinks=document.getElementsByClassName("nav-links")[0];


toggleButton.addEventListener("click",()=>{
    navbarLinks.classList.toggle("active");
})
const body=document.querySelector(".body");
const input=document.querySelector(".clicked");


input.addEventListener("click",()=>{

    body.classList.toggle("mode")
})

var text_to_copy=document.querySelector(".text").value
var copyText=document.querySelector(".copy-text");

console.log(text_to_copy,copyText)


document.querySelector(".button").addEventListener("click",function(){
    if(!navigator.clipboard){
        
    }else{
        navigator.clipboard.writeText(text_to_copy).then(
            function(){
                copyText.classList.add("active");
                 console.log("success")
                 alert("copy successfully copied")
            }
        ).catch(
            function(){
                alert("err")
                console.log("failed to copy")
            }
        )
    }
})


0890536373