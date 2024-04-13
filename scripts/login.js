        document.addEventListener('DOMContentLoaded', ()=>{
        const loginForm= document.getElementById('loginForm');
       

        
        
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
        
            const email = event.target.elements.email.value.trim();
            const password = event.target.elements.password.value.trim();
        
            if (!email || !password) {
              alert('Please fill the form to login!');
              return;
            }
        
            const formData = { email, password };
        
            try {
              const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
        
              if (response.ok) {
                const { token, role } = await response.json();
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                alert('Logged in successfully!');
                window.location.href = role === 'admin' ? 'https://robsdagreat.github.io/MyBrand-Robert/dashboard.html' : 'https://robsdagreat.github.io/MyBrand-Robert/blog.html';
              } else {
                const error = await response.text();
                alert(`Login failed: ${error}`);
              }
            } catch (error) {
              console.error('An error occurred while logging you in:', error);
              alert('An error occurred while logging in. Please try again later!');
            }
        })
});