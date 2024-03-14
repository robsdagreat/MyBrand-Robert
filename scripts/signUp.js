    
    
    document.addEventListener('DOMContentLoaded', ()=>{

        const signupForm = document.getElementById("signupForm");
        const inputPass= document.getElementById('signPass');

        const validate= ()=>{
            const regex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[\d]).{6,}$/;
            if(inputPass.value.length < 6){
                alert("Please choose a password with atleast 6 characters");
                return false;
            } else if(!inputPass.value.match(regex)){
               alert("Your password must contain atleast a capital letter, a number and a special character");
               return false;
            } 

            return true;
            
        }


        signupForm.addEventListener('submit', (event)=>{
            event.preventDefault();
            
       
            const email= event.target.elements.email.value.trim();
            const password= event.target.elements.password.value.trim();

            if(!email || !password){
                alert("Pease fill the form to sign-up")
                return;
            }

            if(!validate()){
                return;
            }
            
            const signedUsers= JSON.parse(localStorage.getItem('users')) || [];
            const existingUser= signedUsers.some(user => user.email === email);

            if (existingUser){
                alert("Please user another email, This one already has an account associated to it!");
                return;
            }

            const userId= generateUserId();

            let newUser = { userId, email, password };

            signedUsers.push(newUser);

            localStorage.setItem('users', JSON.stringify(signedUsers));

            

            alert("Signed up successfully");

            window.location.href = "./login.html";

            signupForm.reset();

        });

            const generateUserId= ()=>{
                const timeStamp= new Date().getTime().toString(8);
                const randomPart= Math.floor(Math.random() * 1000000).toString(8);
                const uniqueId= timeStamp + randomPart;

                return uniqueId;
            }
    })