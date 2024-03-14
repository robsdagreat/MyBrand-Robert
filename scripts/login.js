        document.addEventListener('DOMContentLoaded', ()=>{
        const loginForm= document.getElementById('loginForm');
       

        
        
        loginForm.addEventListener('submit', (event)=>{
            event.preventDefault();

            const email= event.target.elements.email.value.trim();
            const password= event.target.elements.password.value.trim();

            if(!email || !password){
                alert("Please fill the form to login!");
                return;
            }

            const signedUsers= JSON.parse(localStorage.getItem('users')) || [];
            const user= signedUsers.find(user => user.email === email);

            if(!user || user.password !== password){
                alert("Invalid credentials, Please try again");
                return;
            }

            localStorage.setItem('currentUserId', user.userId);

            alert("logged in successfully, Welcom back!");
            window.location.href= './blog.html';
            loginForm.reset();
        })
        })