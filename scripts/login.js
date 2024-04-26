document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById('loginForm');

  const resBox = document.querySelector('.success');
  const resErr = document.querySelector('.error');

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
        const { token, role, userId } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
        resBox.textContent= response.message;
        window.location.href = role === 'admin' ? 'https://robsdagreat.github.io/MyBrand-Robert/dashboard.html' : 'https://robsdagreat.github.io/MyBrand-Robert/blog.html';
      } else {
        const error = await response.text();
        resErr.textContent= `Login failed: ${error.message.value}`;
      }
    } catch (error) {
      console.error('An error occurred while logging you in:', error);
      resErr.textContent= 'An error occurred while logging in. Please try again later!';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  

  if (token) { 
      window.location.href = redirectToCurrentPage();
  }

  localStorage.setItem('redirectUrl', window.location.href);
});

function redirectToCurrentPage() {
  window.location.replace(window.location.href);
}
