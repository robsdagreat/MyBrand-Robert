    document.addEventListener('DOMContentLoaded', ()=>{

        const signupForm = document.getElementById("signupForm");


        signupForm.addEventListener('submit', (event)=>{
            event.preventDefault();


            const email= event.target.elements.email.value.trim();
            const password= event.target.elements.password.value.trim();

            if(!email || !password){
                alert("Pease fill the form to sign-up")
                return;
            }
            
            const signedUsers= JSON.parse(localStorage.getItem('users')) || [];
            const existingUser= signedUsers.some(user => user.email === email);

            if (existingUser){
                alert("Please user another email, This one already has an account associated to it!");
                return;
            }

            let newUser = { email, password };

            signedUsers.push(newUser);

            localStorage.setItem('users', JSON.stringify(signedUsers));

            alert("Signed up successfully");

            window.location.href = "./login.html";

            // signupForm.reset();

        });
    })