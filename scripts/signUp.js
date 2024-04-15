    
    
    document.addEventListener('DOMContentLoaded', ()=>{

        const signupForm = document.getElementById("signupForm");
    

        signupForm.addEventListener('submit', async(event)=>{
            event.preventDefault();
            
            const username = event.target.elements.username.value.trim();
            const email= event.target.elements.email.value.trim();
            const password= event.target.elements.password.value.trim();

            if(!username || !email || !password){
                alert("Pease fill the form to sign-up")
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