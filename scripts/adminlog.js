document.addEventListener("DOMContentLoaded", ()=>{

    const adminForm= document.getElementById("adminlog");

    adminForm.addEventListener('submit', (event)=>{
       event.preventDefault();

       const email= event.target.elements.email.value.trim();
       const password= event.target.elements.password.value.trim();

       if(email === 'rwibutsorobert12@gmail.com' && password === 'dreamb4rever'){
        window.location.href= './dashboard.html';
       } else{
        alert('Please check you email or password')
       }

       adminForm.reset();
    })
})