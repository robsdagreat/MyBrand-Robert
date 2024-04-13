    
    
    document.addEventListener('DOMContentLoaded', ()=>{

        const signupForm = document.getElementById("signupForm");
        // const inputPass= document.getElementById('signPass');

        // const validate= ()=>{
        //     const regex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[\d]).{6,}$/;
        //     if(inputPass.value.length < 6){
        //         alert("Please choose a password with atleast 6 characters");
        //         return false;
        //     } else if(!inputPass.value.match(regex)){
        //        alert("Your password must contain atleast a capital letter, a number and a special character");
        //        return false;
        //     } 

        //     return true;
            
        // }


        signupForm.addEventListener('submit', async(event)=>{
            event.preventDefault();
            
            const username = event.target.elements.username.value.trim();
            const email= event.target.elements.email.value.trim();
            const password= event.target.elements.password.value.trim();

            if(!username || !email || !password){
                alert("Pease fill the form to sign-up")
                return;
            }

            if(!validate()){
                return;
            }

            const formData = {username, email, password};

            try{
                const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/signup', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // console.log('Response:', response);

                if(response.ok){
                    const data= await response.json();
                    if(data.success){
                        alert(data.message);
                        signupForm.reset();
                        window.location.href = './login.html';
                    } else{
                       alert(data.message || 'Registration failed, try again later! ');
                    }
                }else{
                    const error = await response.text();
                    alert(`Error: ${error}`);
                }

            } catch(error){
             alery('An error occured during signup, Please do try agin after some time!');   
            console.error('Error:', error);
            }
            
            

        });
    })