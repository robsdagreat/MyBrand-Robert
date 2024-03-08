document.addEventListener('DOMContentLoaded', ()=>{
   const loginForm= document.getElementById('loginForm');
   
   loginForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const email= event.target.elements.value.trim();
    const password= event.target.elements.value.trim();

    if(!email || !password){
        alert("Please fill the form to login!");
        return;
    }
    
    
    
   })
})