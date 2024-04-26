document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const redirectUrl = localStorage.getItem('redirectUrl') || './blog.html';
      // Use the stored redirect URL from localStorage, defaulting to blog.html if not set
      window.location.href = redirectUrl;
    } else {
      localStorage.setItem('redirectUrl', window.location.href);
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const resBox = document.querySelector('.success');
    const resErr = document.querySelector('.error');
  
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = event.target.elements.username.value.trim();
      const email = event.target.elements.email.value.trim();
      const password = event.target.elements.password.value.trim();
  
      if (!username || !email || !password) {
        alert('Please fill out all fields to sign up');
        return;
      }
  
      const formData = { username, email, password };
  
      try {
        const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            resBox.textContent = data.message;
            signupForm.reset();
            const redirectUrl = localStorage.getItem('redirectUrl') || './login.html';
            window.location.href = redirectUrl;
          } else {
            alert(data.message || 'Registration failed. Please try again later.');
          }
        } else {
          const error = await response.text();
          resErr.textContent = `Error: ${error}`;
        }
      } catch (error) {
        resErr.textContent = 'An error occurred during signup. Please try again later.';
        console.error('Error:', error);
      }
    });
  });
  